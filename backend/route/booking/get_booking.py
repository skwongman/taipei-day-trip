from flask import *
from backend.model.booking.get_booking import Booking
from backend.view.booking.get_booking import ResponseMessage

get_booking = Blueprint("get_booking", __name__)

@get_booking.route('/api/booking', methods = ["GET"])
def api_booking():
    if "token" not in request.cookies:
        return ResponseMessage.get_booking_forbidden()

    return Booking.api_booking()