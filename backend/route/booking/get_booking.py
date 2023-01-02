from flask import *
from backend.model.booking.get_booking import Booking
from backend.view.booking.get_booking import ResponseMessage
from backend.view.booking.get_booking import MemberID

get_booking = Blueprint("get_booking", __name__)

@get_booking.route('/api/booking', methods = ["GET"])
def api_booking():
    # If the token of cookie stored in the browser cannot be decoded to member_id, return the forbidden message.
    try:
        MemberID.get_member_id()
    except Exception:
        return ResponseMessage.get_booking_forbidden()

    return Booking.api_booking()