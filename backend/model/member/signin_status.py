from flask import *
from backend.route.__init__ import mypool
from backend.view.member.signin_status import ResponseMessage
from backend.view.member.signin_status import MemberID

class MemberSystem:
    def signin_status():
        member_id = MemberID.get_member_id()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor()
            insert_query = "SELECT member_id, name, email FROM members WHERE member_id = %s;"
            insert_value = (member_id,)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()
            member_data = {"id": result[0], "name": result[1], "email": result[2]}
            return ResponseMessage.signin_status_correct(member_data)

        except Exception as e:
            return ResponseMessage.signin_status_error(e)
            
        finally:
            cursor.close()
            connection.close()