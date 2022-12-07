from flask import *
from backend.view.signout import ResponseMessage

signout = Blueprint("signout", __name__)

@signout.route("/api/user/auth", methods = ["DELETE"])
def api_signout():
	return ResponseMessage.signout(make_response, jsonify)