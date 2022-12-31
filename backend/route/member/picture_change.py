from flask import *
from backend.model.member.picture_change import MemberSystem
from backend.view.member.picture_change import MemberID
from backend.view.member.picture_change import ResponseMessage
from backend.view.member.picture_change import UserUpload
import imghdr

picture_change = Blueprint("picture_change", __name__)

@picture_change.route("/api/user/picture", methods = ["PUT"])
def api_picture_change():
    # If the token of cookie stored in the browser cannot be decoded to member_id, return the forbidden message.
    try:
        MemberID.get_member_id()
    except Exception:
        return ResponseMessage.picture_change_forbidden()

    # If the file type is other than "jpg, jpeg and jpg", return the message for invalid file type.
    (profile_upload_picture, *other_args) = UserUpload.profile_picture()
    file_type = imghdr.what(profile_upload_picture)
    if file_type not in ["jpg", "jpeg", "png"]:
        return ResponseMessage.picture_change_invalid_file()

    # If the picture size is large than 1MB, return the message for not allow to upload.
    picture_size = request.headers.get("Content-Length")
    if int(picture_size) > 1000000:
        return ResponseMessage.picture_change_large_file()

    return MemberSystem.picture_change()