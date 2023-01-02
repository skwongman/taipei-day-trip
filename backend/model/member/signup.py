from backend.route.__init__ import mypool
from backend.view.member.signup import UserInput
from backend.view.member.signup import ResponseMessage

class MemberSystem:
    def signup():
        (name, email, hashed_password, *other_args) = UserInput.input()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            insert_query = "SELECT * FROM members WHERE member_email = %s;"
            insert_value = (email,)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()
            
            # If the same e-mail has been registered, then return the registered message. Otherwise, register the account directly.
            if result != None:
                return ResponseMessage.signup_incorrect()
            else:
                insert_query = "INSERT INTO members(member_name, member_email, member_password) VALUES(%s, %s, %s);"
                insert_value = (name, email, hashed_password)
                cursor.execute(insert_query, insert_value)
                connection.commit()
                return ResponseMessage.signup_correct()

        except Exception as e:
            return ResponseMessage.signup_error(e)

        finally:
            cursor.close()
            connection.close()