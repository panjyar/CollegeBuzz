from pymongo import MongoClient
from datetime import datetime, timedelta
import re

class MongoDBHandler:
    def __init__(self, db_name="AICTE_Scraper", host="localhost", port=27017):
        try:
            self.client = MongoClient(host, port, serverSelectionTimeoutMS=5000)
            self.db = self.client[db_name]
            
            # Define collections for active and archived data
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
            print("Connected to MongoDB successfully!")
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
    
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
        if not date_str:
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

    def insert_data(self, collection_name, records):
        """
        Insert records with archiving logic and preserving original crawl date
        """
        current_time = datetime.now()
        
        # Select the appropriate collection
        active_collection = self.db[collection_name]
        archived_collection = self.db[f"{collection_name}_archived"]
        
        for record in records:
            # Create a unique identifier for each record to check if it already exists
            # Using title and URL as they're typically unique for web content
            unique_identifier = {}
            
            if 'title' in record:
                unique_identifier['title'] = record['title']
            if 'url' in record:
                unique_identifier['url'] = record['url']
            
            # If no unique identifiers found, use the entire record
            if not unique_identifier:
                unique_identifier = record.copy()
                if 'crawled_at' in unique_identifier:
                    del unique_identifier['crawled_at']
            
             # Add the first crawl timestamp if it's a new record
        existing_record = active_collection.find_one(unique_identifier)
        if existing_record:
            # Record exists, preserve the original crawl date
            record['crawled_at'] = existing_record.get('crawled_at')  # Keep original crawl date
            record['last_updated_at'] = current_time  # Update last updated timestamp
            
            # Update the existing record
            active_collection.update_one(
                unique_identifier, 
                {"$set": record}
            )
        else:
            # Check if it exists in the archived collection
            existing_archived = archived_collection.find_one(unique_identifier)
            if existing_archived:
                # It exists in archives, preserve original crawl date
                record['crawled_at'] = existing_archived.get('crawled_at')
                record['last_updated_at'] = current_time
                
                # Decide which collection to update based on event date
                # (rest of your logic for deciding collection)
            else:
                # It's a completely new record
                record['crawled_at'] = current_time  # First time we're seeing this
                record['last_updated_at'] = current_time  # Also updated now
                
                # Insert into appropriate collection
                # (rest of your logic for deciding collection)
                    # Try to extract event date
            event_date = None
            date_fields = [
                'upcoming_Event_date', 'notice_date', 
                'event_date', 'admission_date'
            ]
            
            for field in date_fields:
                if field in record:
                    event_date = self._parse_date(record[field])
                    if event_date:
                        break
            
            # Determine collection based on date
            if event_date and event_date < current_time.date():
                # Check if this record already exists in archived collection
                existing = archived_collection.find_one(unique_identifier)
                if existing:
                    # Update existing archived record
                    archived_collection.update_one(
                        unique_identifier, 
                        {"$set": record}
                    )
                else:
                    # Move to archived collection if event date is in the past
                    # First check if it exists in active collection and remove it
                    active_record = active_collection.find_one(unique_identifier)
                    if active_record:
                        active_collection.delete_one(unique_identifier)
                    archived_collection.insert_one(record)
            else:
                # Check if record exists in active collection
                existing = active_collection.find_one(unique_identifier)
                if existing:
                    # Update existing active record
                    active_collection.update_one(
                        unique_identifier, 
                        {"$set": record}
                    )
                else:
                    # Insert into active collection
                    active_collection.insert_one(record)

    def get_active_records(self, collection_name, limit=50):
        """
        Retrieve active records from a collection
        """
        active_collection = self.db[collection_name]
        return list(active_collection.find().limit(limit))

    def get_archived_records(self, collection_name, limit=50):
        """
        Retrieve archived records from a collection
        """
        archived_collection = self.db[f"{collection_name}_archived"]
        return list(archived_collection.find().limit(limit))

    def clear_collection(self, collection_name):
        """Deletes all documents from a collection."""
        if collection_name not in self.collections:
            print(f"Collection '{collection_name}' does not exist.")
            return
        
        try:
            collection = self.db[collection_name]
            result = collection.delete_many({})
            print(f"Cleared {result.deleted_count} documents from '{collection_name}' collection.")
        except Exception as e:
            print(f"Error clearing collection '{collection_name}': {e}")

    def close_connection(self):
        """Closes the MongoDB connection."""
        self.client.close()
        print("MongoDB connection closed.")