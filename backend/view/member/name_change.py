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
        new_name = request.json.get("name")
        verify_name = re.fullmatch(r"[\u4E00-\u9FFF\u3400-\u4DBF\a-z\d]{1,20}", new_name)
        return new_name, verify_name

class ResponseMessage():
    def name_change_correct():
        return jsonify({"ok": True}), 200

    def name_change_incorrect_input():
        return jsonify({"error": True, "message": "The user input does not match with the designated format."}), 400

    def name_change_forbidden():
        return jsonify({"error": True, "message": "403 Forbidden."}), 403

    def name_change_error(e):
        print("Error(18): ", e)
        return jsonify({"error": True, "message": str(e)}), 500