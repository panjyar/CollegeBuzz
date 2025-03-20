import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB Configuration
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
DB_NAME = os.getenv('DB_NAME', 'AICTE_Scraper')

# JWT Configuration
JWT_SECRET = os.getenv('JWT_SECRET', 'aicte_hub_2025_super_secret_key_for_development_only_7840392184')
JWT_EXPIRATION = 86400