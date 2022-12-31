from flask import *
from backend.model.member.password_change import MemberSystem
from backend.view.member.password_change import MemberID
from backend.view.member.password_change import ResponseMessage
from backend.view.member.password_change import UserInput

password_change = Blueprint("password_change", __name__)

@password_change.route("/api/user/password", methods = ["PUT"])
def api_password_change():
	# If the token of cookie stored in the browser cannot be decoded to member_id, return the forbidden message.
	try:
		MemberID.get_member_id()
	except Exception:
		return ResponseMessage.password_change_forbidden()
		
	# Not allow other unauthorized input just in case someone bypassing the frontend environment.
	(*other_args, verify_password) = UserInput.input()
	if verify_password == None:
		return ResponseMessage.password_change_incorrect_input()

	return MemberSystem.password_change()