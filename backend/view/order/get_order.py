from flask import *
import os
import jwt

class SigninStatus:
    def signin_token():
        token = request.cookies["token"]
        secret_key = os.getenv("SECRET_KEY")
        jwt.decode(token, secret_key, algorithms = "HS256")
        return None

class ResponseMessage:
    def get_order_correct(data):
        return jsonify({"data": data}), 200
    
    def get_order_forbidden():
        return jsonify({"error": True, "message": "403 Forbidden."}), 403

    def get_order_error(e):
        return jsonify({"error": True, "message": str(e)}), 500