from pymongo import MongoClient
from datetime import datetime, timedelta
import re

class MongoDBHandler:
    def __init__(self, db_name="AICTE_Scraper", uri=None):
        try:
            # Use MongoDB URI from environment if provided, else fallback to localhost
            if uri:
                self.client = MongoClient(uri, serverSelectionTimeoutMS=5000)
            else:
                self.client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=5000)
            
            # Test connection
            self.client.server_info()

            self.db = self.client[db_name]
            
            # Define active and archived collections
            self.active_collections = [
                "notices", "tenders", "upcoming_events", 
                "recruitments", "admissions", "news", "research"
            ]
            
            # Create archived collections if they don't exist
            for collection in self.active_collections:
                archived_collection = f"{collection}_archived"
                self.create_collection_if_not_exists(archived_collection)
            
            # Fetch collection names dynamically
            self.collections = self.db.list_collection_names()
            print("✅ Connected to MongoDB successfully!")

        except Exception as e:
            print(f"❌ Error connecting to MongoDB: {e}")
    
    def create_collection_if_not_exists(self, collection_name):
        if collection_name not in self.db.list_collection_names():
            self.db.create_collection(collection_name)
            print(f"Collection '{collection_name}' created.")
        
        # Update the collections list to include the newly created collection
        self.collections = self.db.list_collection_names()

    def _parse_date(self, date_str):
        """
        Parse date from various possible formats
        """
        if not date_str or not isinstance(date_str, str):
            return None
        
        # List of possible date formats to try
        date_formats = [
            "%d %B %Y",     # "15 May 2024"
            "%Y-%m-%d",     # "2024-05-15"
            "%d-%m-%Y",     # "15-05-2024"
            "%B %d, %Y",    # "May 15, 2024"
            "%d %b %Y",     # "15 May 2024"
        ]
        
        # Remove any non-date characters and extra whitespaces
        clean_date_str = re.sub(r'\s+', ' ', date_str.strip())
        
        for fmt in date_formats:
            try:
                return datetime.strptime(clean_date_str, fmt).date()
            except ValueError:
                continue
        
        return None

    def _create_unique_identifier(self, record):
        """
        Create a more robust unique identifier dictionary from a record
        """
        unique_identifier = {}
        
        # Prioritize URL for unique identification as it's typically most reliable
        if 'url' in record and record['url']:
            # Normalize URL by removing trailing slashes and query parameters
            normalized_url = re.sub(r'\?.*$', '', record['url'].strip().rstrip('/'))
            unique_identifier['url'] = normalized_url
        
        # Add title as secondary identifier - normalize by removing extra spaces
        if 'title' in record and record['title']:
            normalized_title = re.sub(r'\s+', ' ', record['title'].strip())
            unique_identifier['title'] = normalized_title
        
        # If we still don't have identifiers, use content hash or other fields
        if not unique_identifier:
            content_fields = ['content', 'description', 'body']
            for field in content_fields:
                if field in record and record[field]:
                    # Use the first content field we find
                    content = str(record[field])
                    if len(content) > 20:  # Only use content if substantial
                        # Create a hash of content to use as identifier
                        import hashlib
                        content_hash = hashlib.md5(content.encode()).hexdigest()
                        unique_identifier['content_hash'] = content_hash
                        break
        
        # If still no unique identifiers, use everything except timestamps
        if not unique_identifier:
            unique_identifier = {k: v for k, v in record.items() 
                            if k not in ['crawled_at', 'last_updated_at', '_id']}
                
        return unique_identifier

    def insert_data(self, collection_name, records):
        """
        Insert records with archiving logic and preserving original crawl date.
        Also adds indexes for 'crawled_at' and 'last_updated_at' fields.
        Records older than 30 days (based on first crawl date) will be moved to archive.
        """
        if collection_name not in self.active_collections:
            print(f"Warning: '{collection_name}' is not in the list of active collections.")
            
        current_time = datetime.now()
        archive_threshold = current_time - timedelta(days=30)

        # Select the appropriate collection
        active_collection = self.db[collection_name]
        archived_collection = self.db[f"{collection_name}_archived"]

        # Ensure indexes for efficient querying/sorting
        active_collection.create_index("crawled_at")
        active_collection.create_index("last_updated_at")
        active_collection.create_index("url")
        active_collection.create_index("title")
        archived_collection.create_index("crawled_at")
        archived_collection.create_index("last_updated_at")
        archived_collection.create_index("url")
        archived_collection.create_index("title")

        records_processed = 0
        records_archived = 0
        records_updated = 0
        records_new = 0

        for record in records:
            records_processed += 1
            
            # Create unique identifier for checking existing records
            unique_identifier = self._create_unique_identifier(record)
            if not unique_identifier:
                print(f"Warning: Could not create unique identifier for record, skipping: {record}")
                continue

            # Build a query for finding existing records
            or_conditions = []
            
            # If URL exists, it's the most reliable identifier
            if 'url' in unique_identifier and unique_identifier['url']:
                # Do a regex search to accommodate minor URL variations
                url_pattern = f"^{re.escape(unique_identifier['url'])}/?.*$"
                or_conditions.append({"url": {"$regex": url_pattern, "$options": "i"}})
            
            # Add title as a fallback with some flexibility
            if 'title' in unique_identifier and unique_identifier['title']:
                # Use regex match to accommodate slight differences in title
                title_pattern = f"^{re.escape(unique_identifier['title'])}.*$"
                or_conditions.append({"title": {"$regex": title_pattern, "$options": "i"}})
                
            # Add content hash if we have it
            if 'content_hash' in unique_identifier:
                or_conditions.append({"content_hash": unique_identifier['content_hash']})
                
            # Construct the final query
            query = {"$or": or_conditions} if or_conditions else unique_identifier

            # Try to extract an event-related date
            event_date = None
            date_fields = ['upcoming_Event_date', 'notice_date', 'event_date', 'admission_date', 'date']
            for field in date_fields:
                if field in record and record[field]:
                    event_date = self._parse_date(record[field])
                    if event_date:
                        break

            # Check for existing record in either collection - use the constructed query
            existing_active = active_collection.find_one(query)
            existing_archived = archived_collection.find_one(query)

            # Determine the original crawled_at timestamp (preserve the first time we saw this record)
            if existing_active and 'crawled_at' in existing_active:
                original_crawled_at = existing_active['crawled_at']
                
                # This is a record update - set different last_updated_at
                record['crawled_at'] = original_crawled_at  # Keep original crawl date
                record['last_updated_at'] = current_time    # Update to current time
                
                print(f"Updating existing record - Title: '{record.get('title', 'Unknown')}', URL: '{record.get('url', 'N/A')}'")
                records_updated += 1
                
            elif existing_archived and 'crawled_at' in existing_archived:
                original_crawled_at = existing_archived['crawled_at']
                
                # This is a record from archive - keep original crawled_at
                record['crawled_at'] = original_crawled_at  # Keep original crawl date
                record['last_updated_at'] = current_time    # Update to current time
                
                print(f"Updating archived record - Title: '{record.get('title', 'Unknown')}', URL: '{record.get('url', 'N/A')}'")
                records_updated += 1
                
            else:
                # This is a new record - set crawled_at to slightly earlier time than last_updated_at
                # Add a small offset (e.g., 1 second) to ensure timestamps are different
                crawled_time = current_time - timedelta(seconds=1)  # 1 second earlier
                record['crawled_at'] = crawled_time                # Set crawl date to 1 second earlier
                record['last_updated_at'] = current_time           # Set update time to now
                
                print(f"New record - Title: '{record.get('title', 'Unknown')}', URL: '{record.get('url', 'N/A')}'")
                records_new += 1

            # Determine if record should be archived based on:
            # 1. Event date is in the past, OR
            # 2. First crawl date (crawled_at) was more than 30 days ago
            should_archive = False
            
            if event_date and event_date < current_time.date():
                should_archive = True
                print(f"[{collection_name}] → Archiving record with past event date: {event_date}")
            elif isinstance(record['crawled_at'], datetime) and record['crawled_at'] < archive_threshold:
                should_archive = True
                print(f"[{collection_name}] → Archiving record older than 30 days (first crawled on {record['crawled_at']})")
            
            if should_archive:
                records_archived += 1
                # Move to archive
                if existing_active:
                    # Use the document's _id for more reliable deletion
                    active_collection.delete_one({"_id": existing_active["_id"]})

                if existing_archived:
                    archived_collection.update_one({"_id": existing_archived["_id"]}, {"$set": record})
                else:
                    archived_collection.insert_one(record)
            else:
                # Keep in active collection
                if existing_active:
                    active_collection.update_one({"_id": existing_active["_id"]}, {"$set": record})
                else:
                    active_collection.insert_one(record)
        
        print(f"Processed {records_processed} records for {collection_name}:")
        print(f"  - New records: {records_new}")
        print(f"  - Updated records: {records_updated}")
        print(f"  - Archived records: {records_archived}")
    def archive_old_records(self):
        """
        Move records older than 30 days from active collections to archived collections
        """
        current_time = datetime.now()
        threshold = current_time - timedelta(days=30)
        print(f"Archiving records older than: {threshold}")

        total_archived = 0
        
        for collection_name in self.active_collections:
            active = self.db[collection_name]
            archive = self.db[f"{collection_name}_archived"]

            # Make sure we have proper indexes
            active.create_index("crawled_at")
            archive.create_index("crawled_at")

            # Find records to archive - those with crawled_at older than 30 days
            old_records = list(active.find({
                "crawled_at": {"$lt": threshold}
            }))

            print(f"[{collection_name}] Found {len(old_records)} records to archive.")
            collection_archived = 0

            for record in old_records:
                # Get the record ID before removing it from the record
                if '_id' in record:
                    record_id = record.pop('_id')  # Remove MongoDB _id to avoid conflicts
                else:
                    print(f"Warning: Record missing _id field: {record}")
                    continue
                
                # Create a unique identifier
                unique_identifier = self._create_unique_identifier(record)
                
                if not unique_identifier:
                    print(f"Warning: Could not create unique identifier for record: {record}")
                    continue
                
                # Print record details for debugging
                print(f"Archiving: {unique_identifier}")
                print(f"  - crawled_at: {record.get('crawled_at')}")
                print(f"  - last_updated_at: {record.get('last_updated_at')}")
                
                # Archive the record
                if archive.find_one(unique_identifier):
                    archive.update_one(unique_identifier, {"$set": record})
                else:
                    archive.insert_one(record)
                
                # Remove from active collection
                active.delete_one({"_id": record_id})
                collection_archived += 1

            if collection_archived > 0:
                print(f"✅ Archived {collection_archived} record(s) from {collection_name}")
                total_archived += collection_archived
        
        print(f"Total records archived: {total_archived}")

    def get_active_records(self, collection_name, limit=50, sort_by=None):
        """
        Retrieve active records from a collection
        """
        if collection_name not in self.collections:
            print(f"Collection '{collection_name}' does not exist.")
            return []
            
        active_collection = self.db[collection_name]
        
        # Default sort by last updated, most recent first
        sort_field = sort_by if sort_by else "last_updated_at"
        sort_direction = -1  # Descending order (newest first)
        
        try:
            return list(active_collection.find().sort(sort_field, sort_direction).limit(limit))
        except Exception as e:
            print(f"Error retrieving records from '{collection_name}': {e}")
            return []

    def get_archived_records(self, collection_name, limit=50, sort_by=None):
        """
        Retrieve archived records from a collection
        """
        archived_name = f"{collection_name}_archived"
        if archived_name not in self.collections:
            print(f"Collection '{archived_name}' does not exist.")
            return []
            
        archived_collection = self.db[archived_name]
        
        # Default sort by last updated, most recent first
        sort_field = sort_by if sort_by else "last_updated_at"
        sort_direction = -1  # Descending order (newest first)
        
        try:
            return list(archived_collection.find().sort(sort_field, sort_direction).limit(limit))
        except Exception as e:
            print(f"Error retrieving archived records from '{archived_name}': {e}")
            return []

    # def clear_collection(self, collection_name):
    #     """Deletes all documents from a collection."""
    #     if collection_name not in self.collections:
    #         print(f"Collection '{collection_name}' does not exist.")
    #         return
        
    #     try:
    #         collection = self.db[collection_name]
    #         result = collection.delete_many({})
    #         print(f"Cleared {result.deleted_count} documents from '{collection_name}' collection.")
    #     except Exception as e:
    #         print(f"Error clearing collection '{collection_name}': {e}")

    def test_archive_functionality(self, collection_name="news"):
        """
        Test function to verify archiving functionality by:
        1. Creating a test record with an old date
        2. Running archive_old_records
        3. Verifying the record moved to archive
        """
        print("\n====== Testing Archive Functionality ======")
        
        # 1. Create a test record with an old date (more than 30 days ago)
        test_collection = self.db[collection_name]
        archived_collection = self.db[f"{collection_name}_archived"]
        
        old_date = datetime.now() - timedelta(days=31)
        test_record = {
            "title": f"Test Archive Record {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
            "url": f"https://test.com/archive-test-{datetime.now().timestamp()}",
            "crawled_at": old_date,
            "last_updated_at": old_date,
            "content": "This is a test record to verify archiving functionality."
        }
        
        # Insert the test record
        print(f"Inserting test record with crawled_at = {old_date}")
        result = test_collection.insert_one(test_record)
        inserted_id = result.inserted_id
        print(f"Test record inserted with ID: {inserted_id}")
        
        # 2. Run archive_old_records
        print("\nRunning archive_old_records...")
        self.archive_old_records()
        
        # 3. Verify the record moved to archive
        print("\nVerifying record was archived...")
        
        # Check if record is no longer in active collection
        active_result = test_collection.find_one({"_id": inserted_id})
        if active_result:
            print("❌ Test FAILED: Record still exists in active collection")
        else:
            print("✅ Record no longer in active collection")
        
        # Check if record is now in archived collection
        unique_identifier = {"title": test_record["title"], "url": test_record["url"]}
        archived_result = archived_collection.find_one(unique_identifier)
        
        if archived_result:
            print("✅ Record found in archived collection")
            print(f"  - crawled_at: {archived_result.get('crawled_at')}")
            print(f"  - last_updated_at: {archived_result.get('last_updated_at')}")
            print("✅ Test PASSED: Archiving functionality is working correctly")
        else:
            print("❌ Test FAILED: Record not found in archived collection")
        
        print("====== Archive Test Complete ======\n")
        
        # Return test results
        return {
            "success": archived_result is not None and active_result is None,
            "active_record": active_result,
            "archived_record": archived_result
        }

    def manually_archive_old_records(self, days_threshold=30):
        """
        Manually force archive records older than specified number of days
        """
        current_time = datetime.now()
        threshold = current_time - timedelta(days=days_threshold)
        print(f"Manually archiving records older than: {threshold} ({days_threshold} days)")

        total_archived = 0
        
        for collection_name in self.active_collections:
            active = self.db[collection_name]
            archive = self.db[f"{collection_name}_archived"]
            
            # Find all records in the active collection
            print(f"Checking all records in {collection_name}...")
            all_records = list(active.find())
            
            to_archive = []
            for record in all_records:
                crawled_at = record.get('crawled_at')
                
                # If crawled_at is a string, try to parse it
                if isinstance(crawled_at, str):
                    try:
                        crawled_at = datetime.strptime(crawled_at, "%Y-%m-%d %H:%M:%S")
                    except ValueError:
                        try:
                            crawled_at = datetime.strptime(crawled_at, "%Y-%m-%d")
                        except ValueError:
                            print(f"Could not parse date: {crawled_at}")
                            continue
                    
                    # Update the record with the parsed datetime
                    active.update_one({"_id": record["_id"]}, {"$set": {"crawled_at": crawled_at}})
                    record['crawled_at'] = crawled_at
                
                # Check if the record should be archived
                if isinstance(crawled_at, datetime) and crawled_at < threshold:
                    to_archive.append(record)
                    print(f"  - Found record to archive: {record.get('title')} (crawled: {crawled_at})")
            
            print(f"[{collection_name}] Found {len(to_archive)} records to archive.")
            collection_archived = 0

            for record in to_archive:
                record_id = record.pop('_id')  # Remove MongoDB _id to avoid conflicts
                
                # Create a unique identifier
                unique_identifier = self._create_unique_identifier(record)
                
                # Print record details
                print(f"Archiving: {unique_identifier.get('title', 'Unknown title')}")  
                print(f"  - crawled_at: {record.get('crawled_at')}")
                
                # Archive the record
                if archive.find_one(unique_identifier):
                    archive.update_one(unique_identifier, {"$set": record})
                else:
                    archive.insert_one(record)
                
                # Remove from active collection
                active.delete_one({"_id": record_id})
                collection_archived += 1

            if collection_archived > 0:
                print(f"✅ Manually archived {collection_archived} record(s) from {collection_name}")
                total_archived += collection_archived
        
        print(f"Total records manually archived: {total_archived}")
        return total_archived

    def check_collection_statistics(self):
        """
        Display statistics about all collections
        """
        print("\n====== Collection Statistics ======")
        
        for collection_name in self.active_collections:
            active = self.db[collection_name]
            archive = self.db[f"{collection_name}_archived"]
            
            active_count = active.count_documents({})
            archived_count = archive.count_documents({})
            
            print(f"{collection_name}:")
            print(f"  - Active records: {active_count}")
            print(f"  - Archived records: {archived_count}")
            
            # Sample dates from active collection
            if active_count > 0:
                newest = active.find_one({}, sort=[("crawled_at", -1)])
                oldest = active.find_one({}, sort=[("crawled_at", 1)])
                
                print(f"  - Oldest active record: {oldest.get('crawled_at') if oldest else 'N/A'}")
                print(f"  - Newest active record: {newest.get('crawled_at') if newest else 'N/A'}")
            
            print("")
        
        print("==============================\n")

    def close_connection(self):
        """Closes the MongoDB connection."""
        try:
            self.client.close()
            print("MongoDB connection closed.")
        except Exception as e:
            print(f"Error closing MongoDB connection: {e}")


# Test code to run if this file is executed directly
if __name__ == "__main__":
    # Create a MongoDB handler instance
    db_handler = MongoDBHandler()
    
    # Show statistics for all collections
    db_handler.check_collection_statistics()
    
    # Test the archive functionality
    db_handler.test_archive_functionality()
    
    # Close the MongoDB connection
    db_handler.close_connection()