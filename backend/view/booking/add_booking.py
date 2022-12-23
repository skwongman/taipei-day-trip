from flask import *
import os
import jwt

class MemberID:
    def get_member_id():
        token = request.cookies
        token = token["token"]
        secret_key = os.getenv("SECRET_KEY")
        member_id = jwt.decode(token, secret_key, algorithms = "HS256")["member_id"]
        return member_id

class UserInput:
    def booking_input():
        booking_id = request.json.get("attractionId")
        booking_date = request.json.get("date")
        booking_time = request.json.get("time")
        booking_fee = request.json.get("price")
        return booking_id, booking_date, booking_time, booking_fee

class ResponseMessage:
    def add_booking_correct():
        return jsonify({"ok": True}), 200
    
    def add_booking_no_date():
        return jsonify({"error": True, "message": "Please select the booking date."}), 400

    def add_booking_forbidden():
        return jsonify({"error": True, "message": "403 Forbidden."}), 403

    def add_booking_error(e):
        return jsonify({"error": True, "message": str(e)}), 500