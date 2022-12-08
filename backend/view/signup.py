import re

class UserInput:
    def input(request):
        name = request.json.get("name")
        email = request.json.get("email")
        password = request.json.get("password")
        verify_name = re.fullmatch(r"[\u4E00-\u9FFF\u3400-\u4DBF\a-z\d]{1,20}", name)
        verify_email = re.fullmatch(r"^([\w-]+)@([a-z\d-]+)\.([a-z]{2,8})([\.a-z]{2,8})?$", email)
        verify_password = re.fullmatch(r"^[\w`~!@#$%^&*()=+-]{8,20}$", password)
        return name, email, password, verify_name, verify_email, verify_password

class ResponseMessage:
    def signup_incorrect(jsonify):
        return jsonify({"error": True, "message": "This e-mail has been registered."}), 400
    
    def signup_correct(make_response, jsonify):
        return make_response(jsonify({"ok": True}), 200)

    def signup_error(e, jsonify):
        print("Error: ", e)
        return jsonify({"error": True, "message": str(e)}), 500
    
    def sigup_incorrect_referer(jsonify):
        return jsonify({"error": True, "message": "Incorrect referer."}), 400

    def signup_incorrect_input(jsonify):
        return jsonify({"error": True, "message": "The user input does not match with the designated format."}), 400