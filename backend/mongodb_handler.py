from pymongo import MongoClient

class MongoDBHandler:
    def __init__(self, db_name="AICTE_Scraper", host="localhost", port=27017):
        self.client = MongoClient(host, port)
        self.db = self.client[db_name]
        self.collections = ["notices", "tenders", "upcoming_events", "recruitments", "admissions", "news", "research"]

    def insert_data(self, collection_name, data):
        collection = self.db[collection_name]

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

    def fetch_all_data(self):
        """
        Fetches data from all defined collections and returns a dictionary containing all data.
        """
        data = {}
        for collection_name in self.collections:
            collection = self.db[collection_name]
            data[collection_name] = list(collection.find({}, {"_id": 0}))  # Exclude MongoDB ObjectId
        return data

    def close_connection(self):
        self.client.close()
