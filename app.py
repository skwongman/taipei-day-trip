from flask import *
from backend.pages.__init__ import pages
from backend.route.attraction.attractions import attractions
from backend.route.attraction.attraction_id import attraction_id
from backend.route.attraction.categories import categories
from backend.route.member.signup import signup
from backend.route.member.signin import signin
from backend.route.member.signout import signout
from backend.route.member.signin_status import signin_status
from backend.route.member.email_change import email_change
from backend.route.member.name_change import name_change
from backend.route.member.password_change import password_change
from backend.route.member.picture_change import picture_change
from backend.route.booking.add_booking import add_booking
from backend.route.booking.get_booking import get_booking
from backend.route.booking.delete_booking import delete_booking
from backend.route.order.add_order import add_order
from backend.route.order.get_order import get_order
from backend.route.order.get_order_history import get_order_history
import os

app = Flask(
	__name__,
	static_folder = "frontend/static",
	static_url_path = "/",
	template_folder = "frontend/templates"
)

app.config["JSON_AS_ASCII"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

# Pages
app.register_blueprint(pages)

# Attraction API
app.register_blueprint(attractions)
app.register_blueprint(attraction_id)
app.register_blueprint(categories)

# Member API
app.register_blueprint(signup)
app.register_blueprint(signin)
app.register_blueprint(signout)
app.register_blueprint(signin_status)
app.register_blueprint(email_change)
app.register_blueprint(name_change)
app.register_blueprint(password_change)
app.register_blueprint(picture_change)

# Booking API
app.register_blueprint(add_booking)
app.register_blueprint(get_booking)
app.register_blueprint(delete_booking)

# Order API
app.register_blueprint(add_order)
app.register_blueprint(get_order)
app.register_blueprint(get_order_history)

if __name__ == "__main__":
	app.run(port = 80, host = "0.0.0.0")