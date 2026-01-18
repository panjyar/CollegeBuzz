from flask import Flask, jsonify, request
from flask_cors import CORS
from mongodb_handler import MongoDBHandler
from bson import json_util
from aictcscraper import extract_notices_and_events
from functools import wraps
from collections import defaultdict
import time
import json
import os
import asyncio
from dotenv import load_dotenv
import logging

load_dotenv()

app = Flask(__name__)

# ===== SECURITY: Strict CORS Configuration =====
# Only allow requests from your frontend domains
ALLOWED_ORIGINS = [
    "https://www.thecollegebuzz.in",
    "https://thecollegebuzz.in",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

CORS(app, origins=ALLOWED_ORIGINS, supports_credentials=True)

# ===== SECURITY: API Key for protected endpoints =====
API_SECRET_KEY = os.environ.get("API_SECRET_KEY", "your-secret-key-change-in-production")

def require_api_key(f):
    """Decorator to require API key for protected endpoints"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('X-API-Key')
        if not api_key or api_key != API_SECRET_KEY:
            return jsonify({"error": "Unauthorized - Invalid or missing API key"}), 401
        return f(*args, **kwargs)
    return decorated_function

# ===== SECURITY: Rate Limiting =====
rate_limit_store = defaultdict(list)
RATE_LIMIT = 100  # requests per minute
RATE_WINDOW = 60  # seconds

def rate_limit(f):
    """Decorator to rate limit requests per IP"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        ip = request.headers.get('X-Forwarded-For', request.remote_addr)
        if ip:
            ip = ip.split(',')[0].strip()  # Handle proxy chains
        
        current_time = time.time()
        # Clean old requests
        rate_limit_store[ip] = [t for t in rate_limit_store[ip] if current_time - t < RATE_WINDOW]
        
        if len(rate_limit_store[ip]) >= RATE_LIMIT:
            return jsonify({
                "error": "Rate limit exceeded",
                "message": f"Maximum {RATE_LIMIT} requests per minute allowed"
            }), 429
        
        rate_limit_store[ip].append(current_time)
        return f(*args, **kwargs)
    return decorated_function

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ===== SECURITY: Request Logging =====
@app.before_request
def log_request():
    """Log every incoming request for monitoring"""
    ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    if ip:
        ip = ip.split(',')[0].strip()
    
    logger.info(f"REQUEST | IP: {ip} | {request.method} {request.path} | Origin: {request.headers.get('Origin', 'N/A')} | User-Agent: {request.headers.get('User-Agent', 'N/A')[:50]}")

@app.after_request
def log_response(response):
    """Log response status"""
    ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    if ip:
        ip = ip.split(',')[0].strip()
    
    # Log warnings for errors and rate limits
    if response.status_code >= 400:
        logger.warning(f"RESPONSE | IP: {ip} | {request.method} {request.path} | Status: {response.status_code}")
    
    return response

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
@rate_limit
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
@rate_limit
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
@require_api_key
def run_scraper():
    try:
        result = asyncio.run(extract_notices_and_events())
        logger.info("Scraping completed.")
        return jsonify({"status": "success", "message": result}), 200
    except Exception as e:
        logger.exception("Scraping failed.")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/test', methods=['GET'])
@rate_limit
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