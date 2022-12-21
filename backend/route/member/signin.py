from flask import *
from backend.model.member.signin import MemberSystem
from backend.view.member.signin import ResponseMessage
import os

signin = Blueprint("signin", __name__)

@signin.route("/api/user/auth", methods = ["PUT"])
def api_signin():
	referer = request.headers.get("Referer")
	if (referer == None) or (referer.split("/")[2] != os.getenv("REFERER")):
		return ResponseMessage.sigin_incorrect_referer()

	return MemberSystem.signin(current_app)