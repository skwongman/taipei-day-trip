from flask import *
from backend.route.__init__ import mypool
from backend.view.member.name_change import MemberID
from backend.view.member.name_change import ResponseMessage
from backend.view.member.name_change import UserInput

class MemberSystem:
    def name_change():
        member_id = MemberID.get_member_id()
        (new_name, *other_args) = UserInput.input()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            insert_query = "UPDATE members SET member_name = %s WHERE member_id = %s;"
            insert_value = (new_name, member_id)
            cursor.execute(insert_query, insert_value)
            connection.commit()
            return ResponseMessage.name_change_correct()

        except Exception as e:
            print("Error(14): ", e)
            return ResponseMessage.name_change_error(e)

        finally:
            cursor.close()
            connection.close()