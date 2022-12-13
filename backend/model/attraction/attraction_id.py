from flask import *
from backend.route.__init__ import mypool
from backend.view.attraction.attraction_id import ResponseMessage

class Attraction_id:
    def api_attraction_id(attractionId):
        try:
            connection = mypool.get_connection()
            cursor = connection.cursor()
            insert_query = "SELECT * FROM attractions WHERE attraction_id = %s;"
            insert_value = (attractionId,)
            cursor.execute(insert_query, insert_value)
            results = cursor.fetchall()

            attraction_data = []
            for result in results:
                attraction_data.append(
                    {
                        "id": result[1],
                        "name": result[2],
                        "category": result[3],
                        "description": result[4],
                        "address": result[5],
                        "transport": result[6],
                        "mrt": result[7],
                        "lat": result[8],
                        "lng": result[9],
                        "images": eval(result[10])
                    }
                )

            if len(results) == 0:
                return ResponseMessage.api_attraction_id_not_found()

            return ResponseMessage.api_attraction_id_correct(attraction_data)

        except Exception as e:
            print("Error: ", e)
            return ResponseMessage.api_attraction_id_error(e)

        finally:
            cursor.close()
            connection.close()