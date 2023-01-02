from flask import *
from flask_bcrypt import check_password_hash
from backend.route.__init__ import mypool
from backend.view.member.signin import UserInput
from backend.view.member.signin import ResponseMessage
import jwt

class MemberSystem:
    def signin(current_app):
        (email, password, *other_args) = UserInput.input()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            insert_query = "SELECT * FROM members WHERE member_email = %s;"
            insert_value = (email,)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()

            # If the e-mail is incorrect, then return the e-mail incorrect message.
            if result == None:
                return ResponseMessage.signin_incorrect()

            # Check whether the hashed password is correct or not, return "True" if it corrects.
            check_hashed_password = check_password_hash(result["member_password"], password)
            if not check_hashed_password:
                return ResponseMessage.signin_incorrect()
            else:
                # Let the member_id be part of the JWT and store in the cookie for seven days, which is used to identify the identity of member and signin status.
                token = jwt.encode({"member_id": result["member_id"]}, current_app.config["SECRET_KEY"])
                token = token.decode("utf-8")
                response = ResponseMessage.signin_correct()
                response.set_cookie("token", token, max_age = 60*60*24*7)
                return response

        except Exception as e:
            return ResponseMessage.signin_error(e)

        finally:
            cursor.close()
            connection.close()