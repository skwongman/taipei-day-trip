from flask import *
from flask_bcrypt import generate_password_hash
import re

class UserInput:
    def input():
        name = request.json.get("name")
        email = request.json.get("email")
        password = request.json.get("password")
        # Hash the password for encryption by using bcrypt before save it into the database.
        hashed_password = generate_password_hash(password).decode("utf-8")
        verify_name = re.fullmatch(r"[\u4E00-\u9FFF\u3400-\u4DBF\a-z\d]{1,20}", name)
        verify_email = re.fullmatch(r"^([\w-]+)@([a-z\d-]+)\.([a-z]{2,8})([\.a-z]{2,8})?$", email)
        verify_password = re.fullmatch(r"^[\w`~!@#$%^&*()=+-]{8,20}$", password)
        return name, email, hashed_password, verify_name, verify_email, verify_password

class ResponseMessage:
    def signup_correct():
        return make_response(jsonify({"ok": True}), 200)

    def signup_incorrect():
        return jsonify({"error": True, "message": "This e-mail has been registered."}), 400

    def signup_incorrect_input():
        return jsonify({"error": True, "message": "The user input does not match with the designated format."}), 400

    def sigup_incorrect_referer():
        return jsonify({"error": True, "message": "Incorrect referer."}), 400

    def signup_error(e):
        print("Error(11): ", e)
        return jsonify({"error": True, "message": str(e)}), 500
