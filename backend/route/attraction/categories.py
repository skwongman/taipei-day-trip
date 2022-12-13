from flask import *
from backend.model.attraction.categories import Categories

categories = Blueprint("categories", __name__)

@categories.route('/api/categories', methods = ["GET"])
def api_categories():
	return Categories.api_categories()