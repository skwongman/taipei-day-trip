from flask import *
from backend.model.booking.delete_booking import Booking
from backend.view.booking.delete_booking import ResponseMessage
from backend.view.booking.delete_booking import MemberID

delete_booking = Blueprint("delete_booking", __name__)

@delete_booking.route('/api/booking', methods = ["DELETE"])
def api_booking_delete():
    # If the token of cookie stored in the browser cannot be decoded to member_id, return the forbidden message.
    try:
        MemberID.get_member_id()
    except Exception:
        return ResponseMessage.api_delete_booking_forbidden()

    return Booking.api_booking_delete()