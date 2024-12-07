from flask import *
from backend.view.attraction.categories import ResponseMessage
from backend.route.__init__ import mypool

class Categories:
    def api_categories():
        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            cursor.execute("SELECT attraction_id, category FROM attractions ORDER BY attraction_id;")
            results = cursor.fetchall()
            category_data = []
            for result in results:
                if result["category"] not in category_data:
                    category_data.append(result["category"])
            return ResponseMessage.api_categories_correct(category_data)

        except Exception as e:
            print("Error(3): ", e)
            return ResponseMessage.api_categories_error(e)

        finally:
            cursor.close()
            connection.close()