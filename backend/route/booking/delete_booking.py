from flask import *
from backend.model.booking.delete_booking import Booking
from backend.view.booking.delete_booking import ResponseMessage

delete_booking = Blueprint("delete_booking", __name__)

@delete_booking.route('/api/booking', methods = ["DELETE"])
def api_booking_delete():
    if "token" not in request.cookies:
        return ResponseMessage.api_delete_booking_forbidden()

    return Booking.api_booking_delete()