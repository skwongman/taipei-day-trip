from flask import *
from backend.model.attraction.attractions import Attraction

attractions = Blueprint("attractions", __name__)

@attractions.route('/api/attractions', methods = ["GET"])
def api_attractions():
	return Attraction.api_attractions()