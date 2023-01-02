from flask import *
import os
import jwt

class MemberID():
    def get_member_id():
        # Get the member_id from the cookie by decoding the token saved in the browser.
        token = request.cookies
        token = token["token"]
        secret_key = os.getenv("SECRET_KEY")
        member_id = jwt.decode(token, secret_key, algorithms = "HS256")["member_id"]
        return member_id

class ResponseMessage():
    def signin_status_correct(memberData):
        return jsonify({"data": memberData}), 200

    def signin_status_forbidden():
        return jsonify({"data": None}), 403

    def signin_status_error(e):
        print("Error(9): ", e)
        return jsonify({"error": True, "message": str(e)}), 500