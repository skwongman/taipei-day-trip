from flask import *
from backend.route.__init__ import mypool
from backend.view.booking.add_booking import MemberID
from backend.view.booking.add_booking import UserInput
from backend.view.booking.add_booking import ResponseMessage

class Booking:
    def api_booking_post():
        member_id = MemberID.get_member_id()

        (booking_id, booking_date, booking_time, booking_fee) = UserInput.booking_input()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor()
            insert_query = (
                """INSERT INTO booking(booking_attraction_id, booking_date, booking_time, booking_price, booking_member_id)
                    VALUES(%s, %s, %s, %s, %s);"""
            )
            insert_value = (booking_id, booking_date, booking_time, booking_fee, member_id)
            cursor.execute(insert_query, insert_value)
            connection.commit()
            return ResponseMessage.add_booking_correct()

        except Exception as e:
            print("Error: ", e)
            return ResponseMessage.add_booking_error(e)

        finally:
            cursor.close()
            connection.close()