from flask import *
from backend.route.__init__ import mypool

attraction_id = Blueprint("attraction_id", __name__)

@attraction_id.route('/api/attraction/{attractionId}'.replace("{", "<int:").replace("}", ">"), methods = ["GET"])
def api_attraction_id(attractionId):
	try:
		connection = mypool.get_connection()
		cursor = connection.cursor()
		insert_query = "SELECT * FROM attractions WHERE attraction_id = %s ORDER BY attraction_id;"
		insert_value = (attractionId,)
		cursor.execute(insert_query, insert_value)
		results = cursor.fetchall()

		attraction_data = []
		for result in results:
			attraction_data.append(
				{
					"id": result[1],
					"name": result[2],
					"category": result[3],
					"description": result[4],
					"address": result[5],
					"transport": result[6],
					"mrt": result[7],
					"lat": result[8],
					"lng": result[9],
					"images": eval(result[10])
				}
			)

		if len(results) == 0:
			return jsonify({"error": True, "message": "Attraction ID Not Found"}), 400

		return jsonify({"data": attraction_data[0]}), 200

	except Exception as e:
		print("Error: ", e)
		return jsonify({"error": True, "message": str(e)}), 500

	finally:
		cursor.close()
		connection.close()