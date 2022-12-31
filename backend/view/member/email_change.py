from flask import *
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
        new_email = request.json.get("email")
        verify_email = re.fullmatch(r"^([\w-]+)@([a-z\d-]+)\.([a-z]{2,8})([\.a-z]{2,8})?$", new_email)
        return new_email, verify_email

class ResponseMessage():
    def email_change_correct():
        return jsonify({"ok": True}), 200

    def email_change_incorrect():
        return jsonify({"error": True, "message": "This e-mail has been registered."}), 400

    def email_change_incorrect_input():
        return jsonify({"error": True, "message": "The user input does not match with the designated format."}), 400

    def email_change_forbidden():
        return jsonify({"error": True, "message": "403 Forbidden."}), 403

    def email_change_error(e):
        print("Error(17): ", e)
        return jsonify({"error": True, "message": str(e)}), 500