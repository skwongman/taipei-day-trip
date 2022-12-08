import re

class UserInput:
    def input(request):
        email = request.json.get("email")
        password = request.json.get("password")
        verify_email = re.fullmatch(r"^([\w-]+)@([a-z\d-]+)\.([a-z]{2,8})([\.a-z]{2,8})?$", email)
        verify_password = re.fullmatch(r"^[\w`~!@#$%^&*()=+-]{8,20}$", password)
        return email, password, verify_email, verify_password

class ResponseMessage:
    def signin_incorrect(jsonify):
        return jsonify({"error": True, "message": "The e-mail and/or password is/are not correct."}), 400
    
    def signin_correct(make_response, jsonify):
        return make_response(jsonify({"ok": True}), 200)

    def signin_error(e, jsonify):
        print("Error: ", e)
        return jsonify({"error": True, "message": str(e)}), 500
    
    def sigin_incorrect_referer(jsonify):
        return jsonify({"error": True, "message": "Incorrect referer."}), 400

    def signin_incorrect_input(jsonify):
        return jsonify({"error": True, "message": "The user input does not match with the designated format."}), 400