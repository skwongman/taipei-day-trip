from backend.view.signin import UserInput
from backend.view.signin import ResponseMessage

class MemberSystem:
    def signin(mypool, jsonify, jwt, current_app, make_response, request):
        
        [email, password, verify_email, verify_password] = UserInput.input(request)

        if (verify_email == None) or (verify_password == None):
            return ResponseMessage.signin_incorrect_input(jsonify)

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor()
            insert_query = "SELECT * FROM members WHERE email = %s AND password = %s;"
            insert_value = (email, password)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()
            if result == None:
                return ResponseMessage.signin_incorrect(jsonify)
            else:
                token = jwt.encode({
                    "member_id": result[0]
                }, current_app.config["SECRET_KEY"])
                token = token.decode("utf-8")
                response = ResponseMessage.signin_correct(make_response, jsonify)
                response.set_cookie("token", token, max_age = 60*60*24*7, secure = False)
                return response

        except Exception as e:
            return ResponseMessage.signin_error(e, jsonify)

        finally:
            cursor.close()
            connection.close()