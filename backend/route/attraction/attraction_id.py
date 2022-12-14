from flask import *
from backend.model.attraction.attraction_id import Attraction_id

attraction_id = Blueprint("attraction_id", __name__)

@attraction_id.route('/api/attraction/{attractionId}'.replace("{", "<int:").replace("}", ">"), methods = ["GET"])
def api_attraction_id(attractionId):
	return Attraction_id.api_attraction_id(attractionId)