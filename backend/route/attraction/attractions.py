from flask import *
from backend.route.__init__ import mypool

attractions = Blueprint("attractions", __name__)

@attractions.route('/api/attractions', methods = ["GET"])
def api_attractions():
	page = request.args.get("page", 0, type = int)
	page_interval = 12
	next_page_number = 1
	keyword = request.args.get("keyword", "")
	handled_keyword1 = ("%" + keyword + "%")
	handled_keyword2 = ("%" + keyword)
	handled_keyword3 = (keyword + "%")

	try:
		connection = mypool.get_connection()
		cursor = connection.cursor()
		insert_query = ("""
			SELECT * FROM attractions
			WHERE category = %s OR name LIKE %s OR name LIKE %s OR name LIKE %s 
			ORDER BY attraction_id LIMIT %s, %s;
		""")

		# Function to check the next page information.
		def results(next_page_number = 0):
			insert_value = (
				keyword, handled_keyword1, handled_keyword2, handled_keyword3,
				((page + next_page_number) * page_interval), page_interval
			)
			cursor.execute(insert_query, insert_value)
			results = cursor.fetchall()
			return results

		attraction_data = []
		for result in results():
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

		# Input page no. (i.e. 1) in the above function to check the next page information.
		if len(results(next_page_number)) == 0:
			next_page = None
		else:
			next_page = (page + next_page_number)
		
		return jsonify({"nextPage": next_page, "data": attraction_data}), 200

	except Exception as e:
		print("Error: ", e)
		return jsonify({"error": True, "message": str(e)}), 500

	finally:
		cursor.close()
		connection.close()