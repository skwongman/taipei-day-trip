from flask import *
from backend.route.__init__ import mypool
from backend.view.order.get_order_history import MemberID
from backend.view.order.get_order_history import ResponseMessage

class OrderHistory:
    def api_get_order_history():
        member_id = MemberID.get_member_id()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            insert_query = "SELECT * FROM orders WHERE order_member_id = %s;"
            insert_value = (member_id,)
            cursor.execute(insert_query, insert_value)
            results = cursor.fetchall()
            data = []
            for result in results:
                history_data = {
                    "number": result["order_number"],
                    "order_record_time": result["order_registration_time"],
                    "member_id": result["order_member_id"],
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
                data.append(history_data)
            return ResponseMessage.get_order_history_correct(data)

        except Exception as e:
            print("Error(16): ", e)
            return ResponseMessage.get_order_history_error(e)

        finally:
            cursor.close()
            connection.close()