from flask import *
from backend.model.booking.add_booking import Booking
from backend.view.booking.add_booking import ResponseMessage
from backend.view.booking.add_booking import MemberID
from backend.view.booking.add_booking import UserInput

add_booking = Blueprint("add_booking", __name__)

@add_booking.route('/api/booking', methods = ["POST"])
def api_booking_post():
    # If the token of cookie stored in the browser cannot be decoded to member_id, return the forbidden message.
    try:
        MemberID.get_member_id()
    except Exception:
        return ResponseMessage.add_booking_forbidden()

    # If the booking date is not selected, reminder the user to select it accordingly.
    user_input = UserInput.booking_input()
    booking_date = user_input[1]
    if (booking_date == ""):
        return ResponseMessage.add_booking_no_date()

    return Booking.api_booking_post()