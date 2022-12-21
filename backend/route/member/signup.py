from flask import *
from backend.model.member.signup import MemberSystem
from backend.view.member.signup import ResponseMessage
import os

signup = Blueprint("signup", __name__)

@signup.route("/api/user", methods = ["POST"])
def api_signup():
	referer = request.headers.get("Referer")
	if (referer == None) or (referer.split("/")[2] != os.getenv("REFERER")):
		return ResponseMessage.sigup_incorrect_referer()
	
	return MemberSystem.signup()