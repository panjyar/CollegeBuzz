from pymongo import MongoClient

class MongoDBHandler:
    def __init__(self, db_name="AICTE_Scraper", host="localhost", port=27017):
        self.client = MongoClient(host, port)
        self.db = self.client[db_name]

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

    def close_connection(self):
        self.client.close()
