from flask import Flask, jsonify, request
from flask_cors import CORS
from mongodb_handler import MongoDBHandler
from bson import json_util
import json

app = Flask(__name__)
CORS(app)

db_handler = MongoDBHandler()

def convert_mongo_to_json(mongo_data):
    """Convert MongoDB documents to JSON-serializable format"""
    return json.loads(json_util.dumps(mongo_data))

@app.route('/', methods=['GET'])
def home():
    """
    Home route to provide available collections
    """
    collections = [
        "notices", "tenders", "upcoming_events", 
        "recruitments", "admissions", "news", "research"
    ]
    return jsonify({
        "message": "AICTE News Aggregator API",
        "available_collections": collections
    })

@app.route('/api/active/<string:collection_name>', methods=['GET'])
def get_active_records(collection_name):
    """
    Retrieve active records for a specific collection
    """
    # Validate collection name
    valid_collections = [
        "notices", "tenders", "upcoming_events", 
        "recruitments", "admissions", "news", "research"
    ]
    
    if collection_name not in valid_collections:
        return jsonify({
            "error": "Invalid collection name",
            "available_collections": valid_collections
        }), 400

    limit = int(request.args.get('limit', 50))
    records = db_handler.get_active_records(collection_name, limit)
    return jsonify(convert_mongo_to_json(records))

@app.route('/api/archived/<string:collection_name>', methods=['GET'])
def get_archived_records(collection_name):
    """
    Retrieve archived records for a specific collection
    """
    # Validate collection name
    valid_collections = [
        "notices", "tenders", "upcoming_events", 
        "recruitments", "admissions", "news", "research"
    ]
    
    if collection_name not in valid_collections:
        return jsonify({
            "error": "Invalid collection name",
            "available_collections": valid_collections
        }), 400

    limit = int(request.args.get('limit', 50))
    records = db_handler.get_archived_records(collection_name, limit)
    return jsonify(convert_mongo_to_json(records))

if __name__ == '__main__':
    app.run(debug=True, port=5000)