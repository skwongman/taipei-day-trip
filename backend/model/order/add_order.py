from flask import *
from backend.route.__init__ import mypool
from backend.view.order.add_order import UserInput
from backend.view.order.add_order import ResponseMessage
from backend.view.order.add_order import PaymentAPI

class Order:
    def api_order_post():
        (order_prime_number, *other_args) = UserInput.input()
        
        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            # Save all user order information into the database.
            def insert_order_into_database():
                insert_query = (
                    """INSERT INTO orders(order_prime_number, order_member_id, order_price, order_contact_phone,
                        order_contact_name, order_contact_email, order_attraction_id, order_attraction_name,
                            order_attraction_address, order_attraction_image, order_date, order_time, order_status)
                                VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"""
                )
                insert_value = (order_prime_number, *other_args)
                cursor.execute(insert_query, insert_value)
                connection.commit()
            insert_order_into_database()

            # Get order data including order number and other necessary information from the database.
            def get_order_from_database():
                insert_query = "SELECT * FROM orders WHERE order_prime_number = %s;"
                insert_value = (order_prime_number,)
                cursor.execute(insert_query, insert_value)
                result = cursor.fetchone()
                order_data = {
                    "order_number": result["order_number"],
                    "order_prime_number": result["order_prime_number"],
                    "order_price": result["order_price"],
                    "order_contact_phone": result["order_contact_phone"],
                    "order_contact_name": result["order_contact_name"],
                    "order_contact_email": result["order_contact_email"]
                }
                return order_data
            order_data = get_order_from_database()

            # Fetch TapPay API for credit card transaction.
            (transaction_status, transaction_message, response_message) = PaymentAPI.make_payment(order_data)

            # No matter the transaction successful or not successful, save all relevant credit card transaction records into the database for record purpose right after fetching the TapPay API.
            def insert_transaction_into_database():
                insert_query = "INSERT INTO payment(payment_order_number, payment_status, payment_message) VALUES(%s, %s, %s);"
                insert_value = (order_data["order_number"], transaction_status, transaction_message)
                cursor.execute(insert_query, insert_value)
                connection.commit()
            insert_transaction_into_database()

            # According to the TapPay API document, "0" means that the transaction is successful, which represents the status code of each successful transaction.
            def handle_payment_response():
                # If the transaction is successful, update the order status from "1" (not yet paid) to "0" (paid) in the database.
                if transaction_status == 0:
                    insert_query = "UPDATE orders SET order_status = %s WHERE order_number = %s;"
                    insert_value = (transaction_status, order_data["order_number"])
                    cursor.execute(insert_query, insert_value)
                    connection.commit()
                    data = {"number": order_data["order_number"], "payment": {"status": transaction_status, "message": "付款成功"}}
                    return ResponseMessage.add_order_transaction_correct(data)
                # If the transaction is unsuccessful, simply return the error message.
                else:
                    print("Error(12): ", response_message)
                    data = {"number": order_data["order_number"], "payment": {"status": transaction_status, "message": response_message}}
                    return ResponseMessage.add_order_transaction_error(data)
            return handle_payment_response()

        except Exception as e:
            print("Error(7): ", e)
            return ResponseMessage.add_order_error(e)

        finally:
            cursor.close()
            connection.close()