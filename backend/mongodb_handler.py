from pymongo import MongoClient

class MongoDBHandler:
    def __init__(self, db_name="AICTE_Scraper", host="localhost", port=27017):
        try:
            self.client = MongoClient(host, port, serverSelectionTimeoutMS=5000)  # Timeout for better error handling
            self.db = self.client[db_name]
            # Fetch collection names dynamically instead of hardcoding
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

    def insert_data(self, collection_name, data, clear_existing=False):
        """
        Insert data into collection.
        
        Args:
            collection_name (str): The name of the collection
            data (dict or list): The data to insert
            clear_existing (bool): Whether to clear existing data before inserting
        """
        if collection_name not in self.collections:
            print(f"Collection '{collection_name}' does not exist.")
            return
        
        # Clear existing data if requested
        if clear_existing:
            self.clear_collection(collection_name)

        collection = self.db[collection_name]
        try:
            if isinstance(data, list):
                if data:
                    collection.insert_many(data)
                    print(f"Inserted {len(data)} records into '{collection_name}' collection.")
                else:
                    print(f"No data to insert into '{collection_name}'.")
            elif isinstance(data, dict):
                collection.insert_one(data)
                print(f"Inserted one record into '{collection_name}' collection.")
            else:
                print("Invalid data format. Must be a dictionary or a list of dictionaries.")
        except Exception as e:
            print(f"Error inserting data into '{collection_name}': {e}")

    def fetch_all_data(self):
        """Fetches data from all collections and returns a dictionary containing all data."""
        data = {}
        try:
            for collection_name in self.collections:
                collection = self.db[collection_name]
                data[collection_name] = list(collection.find({}, {"_id": 0}))  # Exclude MongoDB ObjectId
        except Exception as e:
            print(f"Error fetching data: {e}")
        return data

    def fetch_collection_data(self, collection_name, query={}):
        """Fetches data from a specific collection based on the given query."""
        if collection_name not in self.collections:
            print(f"Collection '{collection_name}' does not exist.")
            return []
        try:
            collection = self.db[collection_name]
            return list(collection.find(query, {"_id": 0}))
        except Exception as e:
            print(f"Error fetching data from '{collection_name}': {e}")
            return []

    def close_connection(self):
        """Closes the MongoDB connection."""
        self.client.close()
        print("MongoDB connection closed.")