from flask import *
from backend.model.order.add_order import Order
from backend.view.order.add_order import SigninStatus
from backend.view.order.add_order import UserInput
from backend.view.order.add_order import ResponseMessage

add_order = Blueprint("add_order", __name__)

@add_order.route("/api/orders", methods = ["POST"])
def api_order_post():
    # If the token of cookie stored in the browser cannot be decoded to member_id, return the forbidden message.
    try:
        SigninStatus.signin_token()
    except Exception:
        return ResponseMessage.add_order_forbidden()

    # Not allow other unauthorized input just in case someone bypassing the frontend environment.
    (verify_order_contact_phone, verify_order_contact_name, verify_order_contact_email) = UserInput.verify_input()
    if (verify_order_contact_phone == None) or (verify_order_contact_name == None) or (verify_order_contact_email == None):
        return ResponseMessage.add_order_incorrect_input()

    # Credit card input error message.
    (order_prime_number, *other_args) = UserInput.input()
    # If the case is "Get prime error".
    if ("Get prime error" in order_prime_number):
        return ResponseMessage.add_order_get_prime_error(order_prime_number)
    # If the case is "Cannot get prime".
    if (order_prime_number == "Cannot get prime"):
        return ResponseMessage.add_order_cannot_get_prime()
    
    return Order.api_order_post()