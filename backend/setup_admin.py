# /backend/setup_admin.py
import bcrypt
from pymongo import MongoClient
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# Get MongoDB connection
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/aicte_hub')
DB_NAME = os.getenv('DB_NAME', 'aicte_hub')

def setup_admin():
    # Connect to MongoDB
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    
    # Check if users collection exists and has admin
    users_collection = db.users
    admin_exists = users_collection.find_one({'role': 'admin'})
    
    if admin_exists:
        print("Admin user already exists!")
        return
    
    # Admin credentials - use these for first login
    admin_email = "admin@aicte.hub"
    admin_password = "AdminPassword123!"  # Change this!
    
    # Hash password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(admin_password.encode('utf-8'), salt)
    
    # Create admin user
    admin_user = {
        'name': 'AICTE Admin',
        'email': admin_email,
        'password': hashed_password,
        'role': 'admin',
        'institution': 'AICTE Central Hub',
        'created_at': datetime.datetime.utcnow()
    }
    
    # Insert admin into database
    result = users_collection.insert_one(admin_user)
    
    if result.inserted_id:
        print("Admin user created successfully!")
        print(f"Email: {admin_email}")
        print(f"Password: {admin_password}")
        print("Please change this password after first login!")
    else:
        print("Failed to create admin user")

if __name__ == "__main__":
    setup_admin()