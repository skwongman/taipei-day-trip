from flask import *
from flask_bcrypt import generate_password_hash
import os
import jwt
import re

class MemberID():
    def get_member_id():
        # Get the member_id from the cookie by decoding the token saved in the browser.
        token = request.cookies
        token = token["token"]
        secret_key = os.getenv("SECRET_KEY")
        member_id = jwt.decode(token, secret_key, algorithms = "HS256")["member_id"]
        return member_id

class UserInput:
    def input():
        new_password = request.json.get("password")
        # Hash the password for encryption by using bcrypt before save it into the database.
        hashed_password = generate_password_hash(new_password).decode("utf-8")
        verify_password = re.fullmatch(r"^[\w`~!@#$%^&*()=+-]{8,20}$", new_password)
        return hashed_password, verify_password

class ResponseMessage():
    def password_change_correct():
        return jsonify({"ok": True}), 200

    def password_change_incorrect_input():
        return jsonify({"error": True, "message": "The user input does not match with the designated format."}), 400

    def password_change_forbidden():
        return jsonify({"error": True, "message": "403 Forbidden."}), 403

    def password_change_error(e):
        print("Error(19): ", e)
        return jsonify({"error": True, "message": str(e)}), 500