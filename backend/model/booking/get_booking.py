from flask import *
from backend.route.__init__ import mypool
from backend.view.booking.get_booking import MemberID
from backend.view.booking.get_booking import ResponseMessage

class Booking:
    def api_booking():
        member_id = MemberID.get_member_id()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor()
            insert_query = (
                """SELECT attraction_id, attractions.name, address, images,
                    booking_date, booking_time, booking_price, booking_member_id, booking_registration_time
                    FROM attractions INNER JOIN booking ON
                    attractions.attraction_id = booking.booking_attraction_id
                    INNER JOIN members ON booking.booking_member_id = members.member_id
                    WHERE booking.booking_member_id = %s
                    ORDER BY booking_registration_time DESC LIMIT 1;"""
            )
            insert_value = (member_id,)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()

            if result == None:
                return ResponseMessage.get_booking_no_data()

            attraction_data = (
                {
                    "attraction":
                        {
                            "id": result[0],
                            "name": result[1],
                            "address": result[2],
                            "image": eval(result[3])[0]
                        },
                    "date": result[4],
                    "time": result[5],
                    "price": result[6]
                }
            )

            return ResponseMessage.get_booking_correct(attraction_data)

        except Exception as e:
            print("Error(6): ", e)
            return ResponseMessage.get_booking_error(e)

        finally:
            cursor.close()
            connection.close()