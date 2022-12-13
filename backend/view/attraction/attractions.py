from flask import *

class UserInput:
    def input():
        page = request.args.get("page", 0, type = int)
        page_interval = 12
        next_page_number = 1
        keyword = request.args.get("keyword", "")
        handled_keyword1 = ("%" + keyword + "%")
        handled_keyword2 = ("%" + keyword)
        handled_keyword3 = (keyword + "%")
        return page, page_interval, next_page_number, keyword, handled_keyword1, handled_keyword2, handled_keyword3

class ResponseMessage:
    def api_attractions_correct(next_page, attraction_data):
        return jsonify({"nextPage": next_page, "data": attraction_data}), 200
    
    def api_attractions_error(e):
        return jsonify({"error": True, "message": str(e)}), 500