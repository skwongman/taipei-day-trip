from flask import *
from backend.route.__init__ import mypool
from backend.model.signin_status import MemberSystem
import jwt
import os

signin_status = Blueprint("signin_status", __name__)

@signin_status.route("/api/user/auth", methods = ["GET"])
def api_signin_status():
	return MemberSystem.signin_status(request, os, jsonify, jwt, mypool)