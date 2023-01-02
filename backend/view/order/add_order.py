from flask import *
import jwt
import os
import requests
import re

class SigninStatus:
    def signin_token():
        # Get the member_id from the cookie by decoding the token saved in the browser.
        token = request.cookies
        token = token["token"]
        secret_key = os.getenv("SECRET_KEY")
        member_id = jwt.decode(token, secret_key, algorithms = "HS256")["member_id"]
        return member_id

class UserInput:
    def input():
        data = request.get_json()
        order_prime_number = data["prime"]
        member_id = SigninStatus.signin_token()
        order_member_id = member_id
        order_price = data["order"]["price"]
        order_contact_phone = data["order"]["contact"]["phone"]
        order_contact_name = data["order"]["contact"]["name"]
        order_contact_email = data["order"]["contact"]["email"]
        order_attraction_id = data["order"]["trip"]["attraction"]["id"]
        order_attraction_name = data["order"]["trip"]["attraction"]["name"]
        order_attraction_address = data["order"]["trip"]["attraction"]["address"]
        order_attraction_image = data["order"]["trip"]["attraction"]["image"]
        order_date = data["order"]["trip"]["date"]
        order_time = data["order"]["trip"]["time"]
        order_status = 1
        return (
            order_prime_number, order_member_id, order_price, order_contact_phone, order_contact_name, order_contact_email,
            order_attraction_id, order_attraction_name, order_attraction_address, order_attraction_image,
            order_date, order_time, order_status
        )
    
    def verify_input():
        (_, _, _, order_contact_phone, order_contact_name, order_contact_email, *other_args) = UserInput.input()
        verify_order_contact_phone = re.fullmatch(r"[\d]{10}", order_contact_phone)
        verify_order_contact_name = re.fullmatch(r"[\u4E00-\u9FFF\u3400-\u4DBF\a-z\d]{1,20}", order_contact_name)
        verify_order_contact_email = re.fullmatch(r"^([\w-]+)@([a-z\d-]+)\.([a-z]{2,8})([\.a-z]{2,8})?$", order_contact_email)
        return verify_order_contact_phone, verify_order_contact_name, verify_order_contact_email

class PaymentAPI:
    def make_payment(order_data):
        # Required user inputs for TapPay API.
        api_url = os.getenv("API_URL")
        partner_key = os.getenv("PARTNER_KEY")
        merchant_id = os.getenv("MERCHANT_ID")
        headers = {"Content-Type": "application/json", "x-api-key": partner_key}
        payload = {
            "prime": order_data["order_prime_number"],
            "partner_key": partner_key,
            "merchant_id": merchant_id,
            "details": "Attraction Order Booking Fee",
            "amount": order_data["order_price"],
            "currency": "TWD",
            "cardholder": {
                "phone_number": order_data["order_contact_phone"],
                "name": order_data["order_contact_name"],
                "email": order_data["order_contact_email"]
            },
            "remember": True
        }
        response = requests.post(api_url, json = payload, headers = headers)
        transaction_result = response.json()
        transaction_status = transaction_result["status"]
        transaction_message = transaction_result["msg"]
        # Response message, it could be either transaction successful or not successful case.
        response_message = response.text
        return transaction_status, transaction_message, response_message

class ResponseMessage:
    def add_order_transaction_correct(data):
        return jsonify({"data": data}), 200

    def add_order_transaction_error(data):
        return jsonify({"error": True, "message": "Transaction error.", "data": data}), 200

    def add_order_get_prime_error(order_prime_number):
        return jsonify({"error": True, "message": order_prime_number}), 400
    
    def add_order_cannot_get_prime():
        return jsonify({"error": True, "message": "Cannot get prime."}), 400

    def add_order_incorrect_input():
        return jsonify({"error": True, "message": "The user input does not match with the designated format."}), 400

    def add_order_forbidden():
        return jsonify({"error": True, "message": "403 Forbidden."}), 403

    def add_order_error(e):
        return jsonify({"error": True, "message": str(e)}), 500