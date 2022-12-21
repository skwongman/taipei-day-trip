from flask import *
from backend.model.member.signin_status import MemberSystem
from backend.view.member.signin_status import ResponseMessage
from backend.view.member.signin_status import MemberID

signin_status = Blueprint("signin_status", __name__)

@signin_status.route("/api/user/auth", methods = ["GET"])
def api_signin_status():
	try:
		MemberID.get_member_id()
	except Exception:
		return ResponseMessage.signin_status_forbidden()

	return MemberSystem.signin_status()