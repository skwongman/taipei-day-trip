from flask import *
import os
import jwt

class MemberID():
    def get_member_id():
        token = request.cookies
        token = token["token"]
        secret_key = os.getenv("SECRET_KEY")
        member_id = jwt.decode(token, secret_key, algorithms = "HS256")["member_id"]
        return member_id

class ResponseMessage():
    def signin_status_correct(memberData):
        return jsonify({"data": memberData}), 200

    def signin_status_token():
        return jsonify({"data": None}), 403

    def signin_status_error(e):
        print("Error: ", e)
        return jsonify({"error": True, "message": str(e)}), 500