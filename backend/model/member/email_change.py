from flask import *
from backend.route.__init__ import mypool
from backend.view.member.email_change import MemberID
from backend.view.member.email_change import ResponseMessage
from backend.view.member.email_change import UserInput

class MemberSystem:
    def email_change():
        member_id = MemberID.get_member_id()
        (new_email, *other_args) = UserInput.input()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            insert_query = "SELECT * FROM members WHERE member_email = %s;"
            insert_value = (new_email,)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()
            
            if result != None:
                return ResponseMessage.email_change_incorrect()
            else:
                insert_query = "UPDATE members SET member_email = %s WHERE member_id = %s;"
                insert_value = (new_email, member_id)
                cursor.execute(insert_query, insert_value)
                connection.commit()
                return ResponseMessage.email_change_correct()

        except Exception as e:
            print("Error(13): ", e)
            return ResponseMessage.email_change_error(e)

        finally:
            cursor.close()
            connection.close()