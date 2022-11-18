from flask import *
from mysql.connector import pooling
import os
from dotenv import load_dotenv
load_dotenv()

dbconfig = {
    "host": os.getenv("HOST"),
    "user": os.getenv("USER"),
    "password": os.getenv("PASSWORD"),
    "database": os.getenv("DATABASE")
}

mypool = pooling.MySQLConnectionPool(
    pool_name = "mypool",
    pool_size = 5,
    **dbconfig
)

app=Flask(__name__)
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True

# Pages
@app.route("/")
def index():
	return render_template("index.html")
@app.route("/attraction/<id>")
def attraction(id):
	return render_template("attraction.html")
@app.route("/booking")
def booking():
	return render_template("booking.html")
@app.route("/thankyou")
def thankyou():
	return render_template("thankyou.html")

#Error Handling
@app.errorhandler(404)
def error_404(e):
    return jsonify({"error": True, "message": str(e)}), 404

@app.errorhandler(403)
def error_403(e):
    return jsonify({"error": True, "message": str(e)}), 403

@app.errorhandler(500)
def error_500(e):
    return jsonify({"error": True, "message": str(e)}), 500

# API
@app.route('/api/attractions', methods = ["GET"])
def api_attractions():
	page = request.args.get("page", 0, type = int)
	keyword = request.args.get("keyword", "")

	try:
		connection = mypool.get_connection()
		cursor = connection.cursor()
		insert_query = ("""
			SELECT
			attraction_id, name, category, description,
			address, transport, mrt, lat, lng,
			GROUP_CONCAT(images) AS all_images
			FROM attractions WHERE FIND_IN_SET(%s, category) OR name LIKE '%{}%' OR name LIKE '%{}' OR name LIKE '{}%' 
			GROUP BY name ORDER BY attraction_id LIMIT %s, 12;
		""".format(keyword, keyword, keyword))

		insert_value = (keyword, (page * 12))
		cursor.execute(insert_query, insert_value)
		results = cursor.fetchall()

		next_page_insert_value = (keyword, ((page + 1) * 12))
		cursor.execute(insert_query, next_page_insert_value)
		next_page_results = cursor.fetchall()

		def attraction_images(index):
			try:
				connection = mypool.get_connection()
				cursor = connection.cursor()
				insert_query = ("""
					SELECT
					attraction_id, images
					FROM attractions WHERE attraction_id = %s
					GROUP BY images ORDER BY attraction_id;
				""")
				insert_value = (results[index][0],)
				cursor.execute(insert_query, insert_value)
				images = cursor.fetchall()
				all_images = []
				for image in images:
					all_images.append(image[1])
				return all_images

			except Exception as e:
				print("Error: ", e)
				return jsonify({"error": True, "message": str(e)}), 500
				
			finally:
				cursor.close()
				connection.close()

		api_attractions.sub = attraction_images
		
		attraction_data = []
		for result in results:
			attraction_data.append(
				{
					"id": result[0],
					"name": result[1],
					"category": result[2],
					"description": result[3],
					"address": result[4],
					"transport": result[5],
					"mrt": result[6],
					"lat": result[7],
					"lng": result[8],
					"images": attraction_images(results.index(result))
				}
			)

		if len(next_page_results) == 0:
			next_page = None
		else:
			next_page = (page + 1)
		
		return jsonify({"nextPage": next_page, "data": attraction_data}), 200

	except Exception as e:
		print("Error: ", e)
		return jsonify({"error": True, "message": str(e)}), 500

	finally:
		cursor.close()
		connection.close()

@app.route('/api/attraction/{attractionId}'.replace("{", "<int:").replace("}", ">"), methods = ["GET"])
def api_attraction_id(attractionId):
	try:
		connection = mypool.get_connection()
		cursor = connection.cursor()
		insert_query = ("""
			SELECT
			attraction_id, name, category, description,
			address, transport, mrt, lat, lng,
			GROUP_CONCAT(images) AS all_images
			FROM attractions WHERE attraction_id = %s
			GROUP BY name ORDER BY attraction_id;
		""")
		insert_value = (attractionId,)
		cursor.execute(insert_query, insert_value)
		results = cursor.fetchall()

		api_attractions() # Call the same function inside api_attractions route.

		attraction_data = []
		for result in results:
			attraction_data.append(
				{
					"id": result[0],
					"name": result[1],
					"category": result[2],
					"description": result[3],
					"address": result[4],
					"transport": result[5],
					"mrt": result[6],
					"lat": result[7],
					"lng": result[8],
					"images": api_attractions.sub(results.index(result))
				}
			)
		
		if len(results) == 0:
			return jsonify({"error": True, "message": "Attraction ID Not Found"}), 404

		return jsonify({"data": attraction_data}), 200

	except Exception as e:
		print("Error: ", e)
		return jsonify({"error": True, "message": str(e)}), 500

	finally:
		cursor.close()
		connection.close()

@app.route('/api/categories', methods = ["GET"])
def api_categories():
	try:
		connection = mypool.get_connection()
		cursor = connection.cursor()
		cursor.execute("SELECT category FROM attractions GROUP BY category;")
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

if __name__ == "__main__":
	app.run(port = 3000, host = "0.0.0.0")