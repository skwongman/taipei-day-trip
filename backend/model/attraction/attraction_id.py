from flask import *
from backend.route.__init__ import mypool
from backend.view.attraction.attraction_id import ResponseMessage

class Attraction_id:
    def api_attraction_id(attractionId):
        try:
            connection = mypool.get_connection()
            cursor = connection.cursor()
            insert_query = (
                """SELECT attraction_id, name, category, description, address,
                    transport, mrt, lat, lng, images FROM attractions
                        WHERE attraction_id = %s;"""
            )
            insert_value = (attractionId,)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()

            if result == None:
                return ResponseMessage.api_attraction_id_not_found()

            attraction_data = (
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

            return ResponseMessage.api_attraction_id_correct(attraction_data)

        except Exception as e:
            print("Error(1): ", e)
            return ResponseMessage.api_attraction_id_error(e)

        finally:
            cursor.close()
            connection.close()