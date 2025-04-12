from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from mongodb_handler import MongoDBHandler
from bson import json_util
import json
import os

# Import your scraper
from aictcscraper import extract_notices_and_events

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')
CORS(app)

db_handler = MongoDBHandler()

def convert_mongo_to_json(mongo_data):
    """Convert MongoDB documents to JSON-serializable format"""
    return json.loads(json_util.dumps(mongo_data))

@app.route('/api/', methods=['GET'])
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

@app.route('/api/scrape', methods=['POST'])
def run_scraper():
    """
    Trigger web scraping manually (optional)
    """
    try:
        result = extract_notices_and_events()
        return jsonify({"status": "success", "message": result}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Serve React static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    """
    Serves the React frontend from frontend/dist folder
    """
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=False, port=5000)
