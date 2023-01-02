from flask import *
from backend.route.__init__ import mypool
from backend.view.member.password_change import MemberID
from backend.view.member.password_change import ResponseMessage
from backend.view.member.password_change import UserInput

class MemberSystem:
    def password_change():
        member_id = MemberID.get_member_id()
        (hashed_password, *other_args) = UserInput.input()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            insert_query = "UPDATE members SET member_password = %s WHERE member_id = %s;"
            insert_value = (hashed_password, member_id)
            cursor.execute(insert_query, insert_value)
            connection.commit()
            return ResponseMessage.password_change_correct()

        except Exception as e:
            print("Error(15): ", e)
            return ResponseMessage.password_change_error(e)

        finally:
            cursor.close()
            connection.close()