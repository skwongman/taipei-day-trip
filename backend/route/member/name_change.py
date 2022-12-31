from flask import *
from backend.model.member.name_change import MemberSystem
from backend.view.member.name_change import MemberID
from backend.view.member.name_change import ResponseMessage
from backend.view.member.name_change import UserInput

name_change = Blueprint("name_change", __name__)

@name_change.route("/api/user/name", methods = ["PUT"])
def api_name_change():
	# If the token of cookie stored in the browser cannot be decoded to member_id, return the forbidden message.
	try:
		MemberID.get_member_id()
	except Exception:
		return ResponseMessage.name_change_forbidden()
		
	# Not allow other unauthorized input just in case someone bypassing the frontend environment.
	(*other_args, verify_name) = UserInput.input()
	if verify_name == None:
		return ResponseMessage.name_change_incorrect_input()

	return MemberSystem.name_change()