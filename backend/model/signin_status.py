from backend.view.signin_status import ResponseMessage

class MemberSystem:
    def signin_status(request, os, jsonify, jwt, mypool):
        if "token" not in request.cookies:
            return jsonify({"data": None})

        token = request.cookies
        token = token["token"]
        secret_key = os.getenv("SECRET_KEY")
        member_id = jwt.decode(token, secret_key, algorithms = "HS256")["member_id"]

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor()
            insert_query = "SELECT member_id, name, email FROM members WHERE member_id = %s;"
            insert_value = (member_id,)
            cursor.execute(insert_query, insert_value)
            result = cursor.fetchone()
            memberData = {
                "id": result[0],
                "name": result[1],
                "email": result[2]
            }
            return ResponseMessage.signin_status_correct(jsonify, memberData)

        except Exception as e:
            print("Error: ", e)
            return ResponseMessage.signin_status_error(e, jsonify)
            
        finally:
            cursor.close()
            connection.close()