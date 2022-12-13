from flask import *
from backend.model.member.signin_status import MemberSystem
from backend.view.member.signin_status import ResponseMessage

signin_status = Blueprint("signin_status", __name__)

@signin_status.route("/api/user/auth", methods = ["GET"])
def api_signin_status():
	if "token" not in request.cookies:
		return ResponseMessage.signin_status_token()

	return MemberSystem.signin_status()