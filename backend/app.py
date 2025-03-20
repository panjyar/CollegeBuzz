from flask import Flask, jsonify
from flask_cors import CORS
from mongodb_handler import MongoDBHandler
from auth.auth_routes import auth_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp)
db_handler = MongoDBHandler()

@app.route('/', methods=['GET'])
def get_data():
    data = db_handler.fetch_all_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
