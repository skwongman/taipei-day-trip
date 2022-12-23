from flask import *
from backend.model.order.get_order import Order
from backend.view.order.get_order import ResponseMessage
from backend.view.order.get_order import SigninStatus

get_order = Blueprint("get_order", __name__)

@get_order.route("/api/orders/{orderNumber}".replace("{", "<").replace("}", ">"), methods = ["GET"])
def api_order_get(orderNumber):
    try:
        SigninStatus.signin_token()
    except Exception:
        return ResponseMessage.get_order_forbidden()

    return Order.api_get_order(orderNumber)