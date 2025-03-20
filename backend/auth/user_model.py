import bcrypt
from pymongo import MongoClient
from bson import ObjectId
import datetime
from config import MONGO_URI, DB_NAME

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
users_collection = db.users

class User:
    @staticmethod
    def create_user(name, email, password, institution=None, role='student'):
        """Create a new user with hashed password"""
        # Check if user already exists
        existing_user = users_collection.find_one({'email': email.lower()})
        if existing_user:
            return None
            
        # Hash the password
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        
        # Create user document
        user = {
            'name': name,
            'email': email.lower(),
            'password': hashed_password,
            'institution': institution,
            'role': role,
            'created_at': datetime.datetime.utcnow()
        }
        
        # Insert user into database
        result = users_collection.insert_one(user)
        user['_id'] = result.inserted_id
        
        # Return user without password
        del user['password']
        return user
    
    @staticmethod
    def verify_user(email, password):
        """Verify user credentials"""
        user = users_collection.find_one({'email': email.lower()})
        
        if not user:
            return None
            
        # Compare hashed password
        if bcrypt.checkpw(password.encode('utf-8'), user['password']):
            # Return user without password
            user_dict = dict(user)
            del user_dict['password']
            return user_dict
            
        return None
    
    @staticmethod
    def get_user_by_id(user_id):
        """Get user by ID"""
        try:
            user = users_collection.find_one({'_id': ObjectId(user_id)})
            if user:
                user_dict = dict(user)
                del user_dict['password']
                return user_dict
        except:
            pass
        return None