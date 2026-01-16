from flask import Flask, jsonify, request
from flask_cors import CORS
from mongodb_handler import MongoDBHandler
from bson import json_util
from aictcscraper import extract_notices_and_events
import json
import os
import asyncio
from dotenv import load_dotenv
import logging

load_dotenv()

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
    raise Exception("Missing MONGO_URI in .env file")

db_handler = MongoDBHandler(uri=mongo_uri)

try:
    print("Running initial scrape to populate data...")
    print("Initial scraping completed")
except Exception as e:
    logger.exception(f"Initial scraping failed: {e}")

def convert_mongo_to_json(mongo_data):
    return json.loads(json_util.dumps(mongo_data))

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "CollegeBuzz API"}), 200

@app.route('/api/', methods=['GET'])
def home():
    collections = ["notices", "tenders", "upcoming_events", "recruitments", "admissions", "news", "research"]
    return jsonify({
        "message": "AICTE News Aggregator API",
        "available_collections": collections
    })

@app.route('/api/active/<string:collection_name>', methods=['GET'])
def get_active_records(collection_name):
    valid_collections = ["notices", "tenders", "upcoming_events", "recruitments", "admissions", "news", "research"]
    if collection_name not in valid_collections:
        return jsonify({
            "error": "Invalid collection name",
            "available_collections": valid_collections
        }), 400

    limit = int(request.args.get('limit', 500))
    records = db_handler.get_active_records(collection_name, limit)
    return jsonify(convert_mongo_to_json(records))

@app.route('/api/archived/<string:collection_name>', methods=['GET'])
def get_archived_records(collection_name):
    valid_collections = ["notices", "tenders", "upcoming_events", "recruitments", "admissions", "news", "research"]
    if collection_name not in valid_collections:
        return jsonify({
            "error": "Invalid collection name",
            "available_collections": valid_collections
        }), 400

    limit = int(request.args.get('limit', 500))
    records = db_handler.get_archived_records(collection_name, limit)
    return jsonify(convert_mongo_to_json(records))

@app.route('/api/scrape', methods=['GET', 'POST'])
def run_scraper():
    try:
        result = asyncio.run(extract_notices_and_events())
        logger.info("Scraping completed.")
        return jsonify({"status": "success", "message": result}), 200
    except Exception as e:
        logger.exception("Scraping failed.")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/test', methods=['GET'])
def test_db():
    try:
        # Try to get one document from any collection
        for collection_name in db_handler.db.list_collection_names():
            doc = db_handler.db[collection_name].find_one()
            if doc:
                return jsonify({"status": "success", "data": convert_mongo_to_json(doc)})
        return jsonify({"status": "warning", "message": "Connected to database but no documents found"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000)) 
    app.run(debug=False, host='0.0.0.0', port=port)