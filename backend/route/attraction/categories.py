from flask import *
from backend.route.__init__ import mypool

categories = Blueprint("categories", __name__)

@categories.route('/api/categories', methods = ["GET"])
def api_categories():
	try:
		connection = mypool.get_connection()
		cursor = connection.cursor()
		cursor.execute("SELECT category FROM attractions GROUP BY category ORDER BY attraction_id;")
		results = cursor.fetchall()
		category_data = []
		for result in results:
			category_data.append(result[0])
		return jsonify({"data": category_data}), 200

	except Exception as e:
		print("Error: ", e)
		return jsonify({"error": True, "message": str(e)}), 500

	finally:
		cursor.close()
		connection.close()