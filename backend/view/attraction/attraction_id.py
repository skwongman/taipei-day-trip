from flask import *

class ResponseMessage:
    def api_attraction_id_correct(attraction_data):
        return jsonify({"data": attraction_data}), 200
    
    def api_attraction_id_not_found():
        return jsonify({"error": True, "message": "Attraction ID Not Found"}), 400
    
    def api_attraction_id_error(e):
        return jsonify({"error": True, "message": str(e)}), 500