from flask import *
from backend.route.__init__ import mypool
from backend.model.signin import MemberSystem
from backend.view.signin import ResponseMessage
import jwt

signin = Blueprint("signin", __name__)

@signin.route("/api/user/auth", methods = ["PUT"])
def api_signin():
	referer = request.headers.get("Referer")
	if (referer == None) or (referer.split("/")[2] != "52.205.132.168:3000"):
		return ResponseMessage.sigin_incorrect_referer(jsonify)

	return MemberSystem.signin(mypool, jsonify, jwt, current_app, make_response, request)