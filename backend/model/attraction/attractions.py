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
            cursor = connection.cursor()
            insert_query = (
                """SELECT attraction_id, name, category, description, address,
                    transport, mrt, lat, lng, images FROM attractions
                        WHERE category = %s OR name LIKE %s OR name LIKE %s OR name LIKE %s 
                            ORDER BY attraction_id LIMIT %s, %s;"""
                )

            # Function to check the next page information.
            def results(next_page_number = 0):
                insert_value = (
                    keyword, handled_keyword1, handled_keyword2, handled_keyword3,
                    ((page + next_page_number) * page_interval), page_interval
                )
                cursor.execute(insert_query, insert_value)
                results = cursor.fetchall()
                return results

            attraction_data = []
            for result in results():
                attraction_data.append(
                    {
                        "id": result[0],
                        "name": result[1],
                        "category": result[2],
                        "description": result[3],
                        "address": result[4],
                        "transport": result[5],
                        "mrt": result[6],
                        "lat": result[7],
                        "lng": result[8],
                        "images": eval(result[9])
                    }
                )

            # Input page no. (i.e. 1) in the above function to check the next page information.
            if len(results(next_page_number)) == 0:
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