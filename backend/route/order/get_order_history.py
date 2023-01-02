from flask import *
from backend.model.order.get_order_history import OrderHistory
from backend.model.order.get_order_history import MemberID
from backend.model.order.get_order_history import ResponseMessage

get_order_history = Blueprint("get_order_history", __name__)

@get_order_history.route("/api/order_history", methods = ["GET"])
def api_order_get_history():
    # If the token of cookie stored in the browser cannot be decoded to member_id, return the forbidden message.
    try:
        MemberID.get_member_id()
    except Exception:
        return ResponseMessage.get_order_history_forbidden()

    return OrderHistory.api_get_order_history()