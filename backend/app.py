from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from mongodb_handler import MongoDBHandler
from bson import json_util
import json
import os
from dotenv import load_dotenv
import logging

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')
CORS(app)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Validate Mongo URI
mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
    raise Exception("Missing MONGO_URI in .env file")

# Connect to MongoDB
db_handler = MongoDBHandler(uri=mongo_uri)

# Import the scraper logic
from aictcscraper import extract_notices_and_events


def convert_mongo_to_json(mongo_data):
    """Convert MongoDB documents to JSON-serializable format"""
    return json.loads(json_util.dumps(mongo_data))


@app.route('/api/', methods=['GET'])
def home():
    """API Welcome Message and Collections"""
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
    """Get active records for the given collection"""
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
    """Get archived records for the given collection"""
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
    """Run the scraper manually (optional)"""
    try:
        result = extract_notices_and_events()
        logger.info("Scraping completed.")
        return jsonify({"status": "success", "message": result}), 200
    except Exception as e:
        logger.exception("Scraping failed.")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    """Serve frontend static files"""
    full_path = os.path.join(app.static_folder, path)

    if path != "" and os.path.exists(full_path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    # For production use a WSGI server like Gunicorn (don't use Flask's dev server)
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)), debug=False)
