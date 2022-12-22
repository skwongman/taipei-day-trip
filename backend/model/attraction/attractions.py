from flask import *
from backend.route.__init__ import mypool
from backend.view.attraction.attractions import UserInput
from backend.view.attraction.attractions import ResponseMessage

class Attraction:
    def api_attractions():
        (page, page_interval, next_page_number, keyword,
        handled_keyword1, handled_keyword2, handled_keyword3) = UserInput.input()

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            insert_query = (
                """SELECT * FROM attractions
                        WHERE category = %s OR name LIKE %s OR name LIKE %s OR name LIKE %s 
                            ORDER BY attraction_id LIMIT %s, %s;"""
            )

            insert_value = (keyword, handled_keyword1, handled_keyword2, handled_keyword3, ((page) * page_interval), page_interval)
            cursor.execute(insert_query, insert_value)
            results = cursor.fetchall()

            next_page_insert_value = (keyword, handled_keyword1, handled_keyword2, handled_keyword3, ((page + next_page_number) * page_interval), page_interval)
            cursor.execute(insert_query, next_page_insert_value)
            next_page_results = cursor.fetchall()

            attraction_data = []
            for result in results:
                attraction_data.append(
                    {
                        "id": result["attraction_id"],
                        "name": result["name"],
                        "category": result["category"],
                        "description": result["description"],
                        "address": result["address"],
                        "transport": result["transport"],
                        "mrt": result["mrt"],
                        "lat": result["lat"],
                        "lng": result["lng"],
                        "images": eval(result["images"])
                    }
                )

            if len(next_page_results) == 0:
                next_page = None
            else:
                next_page = (page + next_page_number)
            
            return ResponseMessage.api_attractions_correct(next_page, attraction_data)

        except Exception as e:
            print("Error(2): ", e)
            return ResponseMessage.api_attractions_error(e)

        finally:
            cursor.close()
            connection.close()