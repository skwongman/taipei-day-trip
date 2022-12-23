from flask import *
from backend.route.__init__ import mypool
from backend.view.attraction.attraction_id import ResponseMessage

class Attraction_id:
    def api_attraction_id(attractionId):
        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            insert_query = ("SELECT * FROM attractions WHERE attraction_id = %s;")
            insert_value = (attractionId,)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()

            if result == None:
                return ResponseMessage.api_attraction_id_not_found()
                
            attraction_data = (
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
            return ResponseMessage.api_attraction_id_correct(attraction_data)

        except Exception as e:
            print("Error(1): ", e)
            return ResponseMessage.api_attraction_id_error(e)

        finally:
            cursor.close()
            connection.close()