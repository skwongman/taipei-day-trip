from flask import *
from backend.model.member.signin import MemberSystem
from backend.view.member.signin import ResponseMessage
from backend.view.member.signin import UserInput
import os

signin = Blueprint("signin", __name__)

@signin.route("/api/user/auth", methods = ["PUT"])
def api_signin():
	# Not allow any unauthorized access to the api endpoint by using referer.
	referer = request.headers.get("Referer")
	if (referer == None) or (referer.split("/")[2] != os.getenv("REFERER")):
		return ResponseMessage.sigin_incorrect_referer()

	# Not allow other unauthorized input just in case someone bypassing the frontend environment.
	(*other_args, verify_email, verify_password) = UserInput.input()
	if (verify_email == None) or (verify_password == None):
		return ResponseMessage.signin_incorrect_input()

	return MemberSystem.signin(current_app)