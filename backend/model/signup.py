from backend.view.signup import UserInput
from backend.view.signup import ResponseMessage

class MemberSystem:
    def signup(mypool, jsonify, make_response, request):
        
        [name, email, password, verify_name, verify_email, verify_password] = UserInput.input(request)

        if (verify_name == None) or (verify_email == None) or (verify_password == None):
            return ResponseMessage.signup_incorrect_input(jsonify)

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor()
            insert_query = "SELECT * FROM members WHERE email = %s;"
            insert_value = (email,)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()
            if result != None:
                return ResponseMessage.signup_incorrect(jsonify)
            else:
                insert_query = "INSERT INTO members(name, email, password) VALUES(%s, %s, %s);"
                insert_value = (name, email, password)
                cursor.execute(insert_query, insert_value)
                connection.commit()
                return ResponseMessage.signup_correct(make_response, jsonify)

        except Exception as e:
            return ResponseMessage.signup_error(e, jsonify)

        finally:
            cursor.close()
            connection.close()