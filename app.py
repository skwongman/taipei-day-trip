from flask import *
from flask_cors import CORS
from mysql.connector import pooling
import os
from dotenv import load_dotenv
load_dotenv()
import re

dbconfig = {
    "host": os.getenv("HOST"),
    "user": os.getenv("USER"),
    "password": os.getenv("PASSWORD"),
    "database": os.getenv("DATABASE")
}

mypool = pooling.MySQLConnectionPool(
    pool_name = "mypool",
    pool_size = 5,
	pool_reset_session=True,
    **dbconfig
)

app=Flask(__name__, static_folder = "static", static_url_path = "/")
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
# CORS(app)

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

# Error Handling
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
			images = result[10]
			# Use Regex for sortling the image URLs, where .split() is used to split all images in every single line.
			handled_images = re.sub("[^\w:/,-\.$]", "", images).split(",")
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
					"images": handled_images
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

@app.route('/api/attraction/{attractionId}'.replace("{", "<int:").replace("}", ">"), methods = ["GET"])
def api_attraction_id(attractionId):
	try:
		connection = mypool.get_connection()
		cursor = connection.cursor()
		insert_query = "SELECT * FROM attractions WHERE attraction_id = %s ORDER BY attraction_id;"
		insert_value = (attractionId,)
		cursor.execute(insert_query, insert_value)
		results = cursor.fetchone()
		images = results[10]
		handled_images = re.sub("[^\w:/,-\.$]", "", images).split(",")
		
		attraction_data = {
			"id": results[1],
			"name": results[2],
			"category": results[3],
			"description": results[4],
			"address": results[5],
			"transport": results[6],
			"mrt": results[7],
			"lat": results[8],
			"lng": results[9],
			"images": handled_images
		}
		
		if len(results) == 0:
			return jsonify({"error": True, "message": "Attraction ID Not Found"}), 400

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

if __name__ == "__main__":
	app.run(port = 3000, host = "0.0.0.0")