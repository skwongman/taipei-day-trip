from flask import *
from backend.route.__init__ import mypool
from backend.view.booking.delete_booking import MemberID
from backend.view.booking.delete_booking import ResponseMessage

class Booking:
    def api_booking_delete():
        member_id = MemberID.get_member_id()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor()
            insert_query = ("DELETE FROM booking WHERE booking_member_id = %s;")
            insert_value = (member_id,)
            cursor.execute(insert_query, insert_value)
            connection.commit()
            return ResponseMessage.api_delete_booking_correct()

        except Exception as e:
            print("Error(5): ", e)
            return ResponseMessage.api_delete_booking_error(e)

        finally:
            cursor.close()
            connection.close()