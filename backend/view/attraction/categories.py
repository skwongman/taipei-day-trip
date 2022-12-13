from flask import *

class ResponseMessage:
    def api_categories_correct(category_data):
        return jsonify({"data": category_data}), 200
        
    def api_categories_error(e):
        return jsonify({"error": True, "message": str(e)}), 500