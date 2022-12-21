from flask import *
from backend.view.attraction.categories import ResponseMessage
from backend.route.__init__ import mypool

class Categories:
    def api_categories():
        try:
            connection = mypool.get_connection()
            cursor = connection.cursor()
            cursor.execute("SELECT category FROM attractions GROUP BY category ORDER BY attraction_id;")
            results = cursor.fetchall()
            category_data = []

            for result in results:
                category_data.append(result[0])
                
            return ResponseMessage.api_categories_correct(category_data)

        except Exception as e:
            print("Error(3): ", e)
            return ResponseMessage.api_categories_error(e)

        finally:
            cursor.close()
            connection.close()