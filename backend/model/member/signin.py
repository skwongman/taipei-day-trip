from flask import *
from flask_bcrypt import check_password_hash
from backend.route.__init__ import mypool
from backend.view.member.signin import UserInput
from backend.view.member.signin import ResponseMessage
import jwt

class MemberSystem:
    def signin(current_app):
        
        (email, password, verify_email, verify_password) = UserInput.input()

        if (verify_email == None) or (verify_password == None):
            return ResponseMessage.signin_incorrect_input()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            insert_query = "SELECT * FROM members WHERE email = %s;"
            insert_value = (email,)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()

            if result == None:
                return ResponseMessage.signin_incorrect()

            member_data = {"member_id": result["member_id"], "password": result["password"]}
            check_hashed_password = check_password_hash(member_data["password"], password)

            if not check_hashed_password:
                return ResponseMessage.signin_incorrect()
            else:
                token = jwt.encode({
                    "member_id": member_data["member_id"]
                }, current_app.config["SECRET_KEY"])
                token = token.decode("utf-8")
                response = ResponseMessage.signin_correct()
                response.set_cookie("token", token, max_age = 60*60*24*7)
                return response

        except Exception as e:
            return ResponseMessage.signin_error(e)

        finally:
            cursor.close()
            connection.close()