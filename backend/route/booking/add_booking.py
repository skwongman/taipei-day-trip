from flask import *
from backend.model.booking.add_booking import Booking
from backend.view.booking.add_booking import ResponseMessage
from backend.view.booking.add_booking import UserInput
import datetime

add_booking = Blueprint("add_booking", __name__)

@add_booking.route('/api/booking', methods = ["POST"])
def api_booking_post():
    if "token" not in request.cookies:
        return ResponseMessage.add_booking_forbidden()

    (_, booking_date) = UserInput.booking_input()[:2]

    if (booking_date == ""):
        return ResponseMessage.add_booking_no_date()

    user_input_booking_date = int(booking_date.replace("-", ""))
    today_date = int(datetime.datetime.now().strftime("%Y%m%d"))

    if (user_input_booking_date) <= (today_date):
        return ResponseMessage.add_booking_incorrect_date()

    return Booking.api_booking_post()