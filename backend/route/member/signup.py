from flask import *
from backend.route.__init__ import mypool
from backend.model.signup import MemberSystem
from backend.view.signup import ResponseMessage

signup = Blueprint("signup", __name__)

@signup.route("/api/user", methods = ["POST"])
def api_signup():
	referer = request.headers.get("Referer")
	if (referer == None) or (referer.split("/")[2] != "52.205.132.168:3000"):
		return ResponseMessage.sigup_incorrect_referer(jsonify)
	
	return MemberSystem.signup(mypool, jsonify, make_response, request)