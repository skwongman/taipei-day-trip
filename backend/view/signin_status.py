class ResponseMessage():
    def signin_status_correct(jsonify, memberData):
        return jsonify({"data": memberData}), 200
    
    def signin_status_error(e, jsonify):
        return jsonify({"error": True, "message": str(e)}), 500