from flask import *
from backend.route.__init__ import mypool
from backend.view.order.get_order import ResponseMessage
from backend.view.order.get_order import MemberID

class Order:
    def api_get_order(orderNumber):
        member_id = MemberID.get_member_id()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            insert_query = "SELECT * FROM orders WHERE order_number = %s AND order_member_id = %s;"
            insert_value = (orderNumber, member_id)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()

            if result == None:
                return ResponseMessage.get_order_forbidden()

            data = {
                "number": result["order_number"],
                "price": result["order_price"],
                "trip": {
                    "attraction": {
                        "id": result["order_attraction_id"],
                        "name": result["order_attraction_name"],
                        "address": result["order_attraction_address"],
                        "image": result["order_attraction_image"]
                    },
                    "date": result["order_date"],
                    "time": result["order_time"]
                },
                "contact": {
                    "name": result["order_contact_name"],
                    "email": result["order_contact_email"],
                    "phone": result["order_contact_phone"]
                },
                "status": result["order_status"]
            }
            return ResponseMessage.get_order_correct(data)

        except Exception as e:
            print("Error(8): ", e)
            return ResponseMessage.get_order_error(e)

        finally:
            cursor.close()
            connection.close()