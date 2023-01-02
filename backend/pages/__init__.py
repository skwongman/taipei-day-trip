from flask import *

pages = Blueprint("pages", __name__)

@pages.route("/")
def index():
	return render_template("index.html")

@pages.route("/attraction/<id>")
def attraction(id):
	return render_template("attraction.html")

@pages.route("/booking")
def booking():
	return render_template("booking.html")
    
@pages.route("/thankyou")
def thankyou():
	return render_template("thankyou.html")

@pages.route("/profile")
def profile():
	return render_template("profile.html")

@pages.route("/order")
def order():
	return render_template("order.html")

@pages.route("/order/history")
def order_history():
	return render_template("history.html")