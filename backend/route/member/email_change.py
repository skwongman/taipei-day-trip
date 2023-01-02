from flask import *
from backend.model.member.email_change import MemberSystem
from backend.view.member.email_change import MemberID
from backend.view.member.email_change import ResponseMessage
from backend.view.member.email_change import UserInput

email_change = Blueprint("email_change", __name__)

@email_change.route("/api/user/email", methods = ["PUT"])
def api_email_change():
	# If the token of cookie stored in the browser cannot be decoded to member_id, return the forbidden message.
	try:
		MemberID.get_member_id()
	except Exception:
		return ResponseMessage.email_change_forbidden()
		
	# Not allow other unauthorized input just in case someone bypassing the frontend environment.
	(*other_args, verify_email) = UserInput.input()
	if verify_email == None:
		return ResponseMessage.email_change_incorrect_input()

	return MemberSystem.email_change()