from functools import wraps
from flask import request, jsonify
import jwt
from backend.config import JWT_SECRET

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
            request.user = payload
            return f(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 401
        except (jwt.InvalidTokenError, Exception) as e:
            return jsonify({'message': 'Invalid token'}), 401
            
    return decorated 

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'message': 'Authorization header required'}), 401
        
        token = auth_header.split(' ')[1]
        
        try:
            # Decode token
            payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            
            # Check if user is admin
            if payload.get('role') != 'admin':
                return jsonify({'message': 'Admin privileges required'}), 403
                
            request.user = payload
            return f(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 401
        except (jwt.InvalidTokenError, Exception) as e:
            return jsonify({'message': 'Invalid token'}), 401
            
    return decorated