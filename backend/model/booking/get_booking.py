from flask import *
from backend.route.__init__ import mypool
from backend.view.booking.get_booking import MemberID
from backend.view.booking.get_booking import ResponseMessage

class Booking:
    def api_booking():
        member_id = MemberID.get_member_id()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            insert_query = (
                """SELECT * FROM attractions INNER JOIN booking ON
                    attractions.attraction_id = booking.booking_attraction_id
                        INNER JOIN members ON booking.booking_member_id = members.member_id
                            WHERE booking.booking_member_id = %s
                                ORDER BY booking_registration_time DESC LIMIT 1;"""
            )
            insert_value = (member_id,)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()

            # After deletion of booking data, return the no booking message. Otherwise, error message will be printed out.
            if result == None:
                return ResponseMessage.get_booking_no_data()

            attraction_data = (
                {
                    "attraction":
                        {
                            "id": result["attraction_id"],
                            "name": result["name"],
                            "address": result["address"],
                            # Display only the first photo among all attraction photos.
                            "image": eval(result["images"])[0]
                        },
                    "date": result["booking_date"],
                    "time": result["booking_time"],
                    "price": result["booking_price"]
                }
            )
            return ResponseMessage.get_booking_correct(attraction_data)

        except Exception as e:
            print("Error(6): ", e)
            return ResponseMessage.get_booking_error(e)

        finally:
            cursor.close()
            connection.close()