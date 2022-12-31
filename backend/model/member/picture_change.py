from flask import *
from backend.route.__init__ import mypool
from backend.view.member.picture_change import UserUpload
from backend.view.member.picture_change import MemberID
from backend.view.member.picture_change import ResponseMessage
import boto3
import os

class MemberSystem:
    def picture_change():
        member_id = MemberID.get_member_id()
        (profile_upload_picture, picture_extension) = UserUpload.profile_picture()
        picture_name = UserUpload.profile_picture_name()

        # Upload user's profile picture to AWS s3 bucket.
        s3 = boto3.resource("s3")
        s3.Bucket(os.getenv("BUCKET_NAME")).put_object(Key = picture_name + picture_extension, Body = profile_upload_picture)

        # Retrieve the picture URL from AWS s3 bucket.
        s3 = boto3.client("s3")
        picture_url = s3.generate_presigned_url(
            ClientMethod = "get_object",
            Params = {
                "Bucket": os.getenv("BUCKET_NAME"),
                "Key": picture_name
            }
        )
        picture_url = picture_url.split("?")[0] + picture_extension

        try:
            connection = mypool.get_connection()
            cursor = connection.cursor(dictionary = True)
            insert_query = "UPDATE members SET member_picture = %s WHERE member_id = %s;"
            insert_value = (picture_url, member_id)
            cursor.execute(insert_query, insert_value)
            connection.commit()
            return ResponseMessage.picture_change_correct()

        except Exception as e:
            print("Error(20): ", e)
            return ResponseMessage.picture_change_error(e)

        finally:
            cursor.close()
            connection.close()