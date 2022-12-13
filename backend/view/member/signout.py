from flask import *

class ResponseMessage:
    def signout():
        response = make_response(jsonify({"ok": True}), 200)
        response.set_cookie("token", "", max_age = -1)
        return response