from flask import *
from backend.model.member.signup import MemberSystem
from backend.view.member.signup import ResponseMessage
from backend.view.member.signup import UserInput
import os

signup = Blueprint("signup", __name__)

@signup.route("/api/user", methods = ["POST"])
def api_signup():
	# Not allow any unauthorized access to the api endpoint by using referer. 
	referer = request.headers.get("Referer")
	if (referer == None) or (referer.split("/")[2] != os.getenv("REFERER")):
		return ResponseMessage.sigup_incorrect_referer()

	# Not allow other unauthorized input just in case someone bypassing the frontend environment. 
	(*other_args, verify_name, verify_email, verify_password) = UserInput.input()
	if (verify_name == None) or (verify_email == None) or (verify_password == None):
		return ResponseMessage.signup_incorrect_input()

	return MemberSystem.signup()