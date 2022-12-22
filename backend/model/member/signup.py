from backend.route.__init__ import mypool
from backend.view.member.signup import UserInput
from backend.view.member.signup import ResponseMessage

class MemberSystem:
    def signup():

        (name, email, hashed_password, verify_name, verify_email, verify_password) = UserInput.input()

        if (verify_name == None) or (verify_email == None) or (verify_password == None):
            return ResponseMessage.signup_incorrect_input()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            insert_query = "SELECT * FROM members WHERE email = %s;"
            insert_value = (email,)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()
            
            if result != None:
                return ResponseMessage.signup_incorrect()
            else:
                insert_query = "INSERT INTO members(name, email, password) VALUES(%s, %s, %s);"
                insert_value = (name, email, hashed_password)
                cursor.execute(insert_query, insert_value)
                connection.commit()
                return ResponseMessage.signup_correct()

        except Exception as e:
            return ResponseMessage.signup_error(e)

        finally:
            cursor.close()
            connection.close()