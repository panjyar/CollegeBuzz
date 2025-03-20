from flask import Blueprint, request, jsonify, g
from functools import wraps
import jwt
import datetime
import bcrypt
from bson.json_util import dumps
from bson import json_util, ObjectId
import json
from auth.user_model import User
from config import JWT_SECRET, JWT_EXPIRATION

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# Helper to parse MongoDB ObjectId
def parse_json(data):
    return json.loads(json_util.dumps(data))

# Token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'message': 'Authorization header required'}), 401
        
        token = auth_header.split(' ')[1]
        
        try:
            # Decode token
            payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            
            # Attach user info to request
            request.user = payload
            
            return f(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 401
        except (jwt.InvalidTokenError, Exception) as e:
            return jsonify({'message': 'Invalid token'}), 401
    
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['name', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({'message': f'Missing required field: {field}'}), 400
    
    # Create user
    user = User.create_user(
        name=data['name'],
        email=data['email'],
        password=data['password'],
        institution=data.get('institution'),
        role=data.get('role', 'student')
    )
    
    if not user:
        return jsonify({'message': 'User already exists'}), 400
    
    # Generate JWT token
    token_payload = {
        'user_id': str(user['_id']),
        'role': user['role'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=JWT_EXPIRATION)
    }
    token = jwt.encode(token_payload, JWT_SECRET, algorithm='HS256')
    
    # Return user data and token
    return jsonify({
        'token': token,
        'user': parse_json(user)
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login a user"""
    data = request.get_json()
    
    # Validate required fields
    if 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Email and password required'}), 400
    
    # Verify user credentials
    user = User.verify_user(data['email'], data['password'])
    
    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401
    
    # Generate JWT token
    token_payload = {
        'user_id': str(user['_id']),
        'role': user['role'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=JWT_EXPIRATION)
    }
    token = jwt.encode(token_payload, JWT_SECRET, algorithm='HS256')
    
    # Return user data and token
    return jsonify({
        'token': token,
        'user': parse_json(user)
    })

@auth_bp.route('/me', methods=['GET'])
@token_required
def get_me():
    """Get current user from token"""
    user_id = request.user['user_id']
    
    # Get user from database
    user = User.get_user_by_id(user_id)
    
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    return jsonify(parse_json(user))

@auth_bp.route('/change-password', methods=['POST'])
@token_required
def change_password():
    """Change user password"""
    data = request.get_json()
    user_id = request.user['user_id']
    
    # Validate payload
    if 'current_password' not in data or 'new_password' not in data:
        return jsonify({'message': 'Current and new password required'}), 400
        
    current_password = data['current_password']
    new_password = data['new_password']
    
    # Get user from database
    try:
        # Assuming users_collection is accessible through User model
        user = User.get_user_by_id(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404
            
        # Verify current password
        if not User.verify_password(user, current_password):
            return jsonify({'message': 'Current password is incorrect'}), 401
            
        # Update password in database
        success = User.update_password(user_id, new_password)
        
        if not success:
            return jsonify({'message': 'Failed to update password'}), 500
            
        return jsonify({'message': 'Password changed successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500