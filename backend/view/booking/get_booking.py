from flask import *
import os
import jwt

class MemberID:
    def get_member_id():
        # Get the member_id from the cookie by decoding the token saved in the browser.
        token = request.cookies
        token = token["token"]
        secret_key = os.getenv("SECRET_KEY")
        member_id = jwt.decode(token, secret_key, algorithms = "HS256")["member_id"]
        return member_id

class ResponseMessage:
    def get_booking_correct(attraction_data):
        return jsonify({"data": attraction_data}), 200
    
    def get_booking_no_data():
        return jsonify({"data": None}), 200

    def get_booking_forbidden():
        return jsonify({"error": True, "message": "403 Forbidden."}), 403

    def get_booking_error(e):
        return jsonify({"error": True, "message": str(e)}), 500