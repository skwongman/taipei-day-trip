from flask import *
import os
import jwt
import random
import string

class MemberID():
    def get_member_id():
        # Get the member_id from the cookie by decoding the token saved in the browser.
        token = request.cookies
        token = token["token"]
        secret_key = os.getenv("SECRET_KEY")
        member_id = jwt.decode(token, secret_key, algorithms = "HS256")["member_id"]
        return member_id

class UserUpload:
    def profile_picture():
        # Retrieve the fetch picture data from frontend side.
        profile_upload_picture = request.files["profileUploadPicture"]
        picture_extension = "." + profile_upload_picture.filename.split(".").pop()
        return profile_upload_picture, picture_extension

    def profile_picture_name():
        # Generate a random picture name in the mixture of letters and digits.
        gen_picture_name = [random.choice(string.ascii_letters + string.digits) for _ in range(8)]
        member_id = MemberID.get_member_id()
        picture_name = str(member_id) + "_" + "".join(gen_picture_name)
        return picture_name

class ResponseMessage():
    def picture_change_correct():
        return jsonify({"ok": True}), 200

    def picture_change_invalid_file():
        return jsonify({"error": True, "message": "Invalid file type."}), 400

    def picture_change_large_file():
        return jsonify({"error": True, "message": "The picture size is too large."}), 400

    def picture_change_forbidden():
        return jsonify({"error": True, "message": "403 Forbidden."}), 403

    def picture_change_error(e):
        print("Error(21): ", e)
        return jsonify({"error": True, "message": str(e)}), 500