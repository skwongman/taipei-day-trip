import json
import mysql.connector
import os
from dotenv import load_dotenv
load_dotenv()

db = mysql.connector.connect(
    host = os.getenv("HOST"),
    user = os.getenv("USER"),
    password = os.getenv("PASSWORD"),
    database = os.getenv("DATABASE")
)

with open("./backend/data/taipei-attractions.json", mode = "r", encoding = "utf-8") as file:
    json_data = json.load(file)

attraction_data = json_data["result"]["results"]

for i in attraction_data:
    
    if(i["MRT"] != None):
        image = i["file"].split("https")
        all_images = []
        for n in range(1, len(image)):
            clear_data = image[n].replace("://", "https://")[-4:]
            if (clear_data != ".mp3" and clear_data != ".flv"):
                all_images.append(image[n].replace("://", "https://").replace(".JPG", ".jpg"))

        cursor = db.cursor()
        insert_query = ("""
            INSERT INTO attractions(
            attraction_id, name, category, description,
            address, transport, mrt, lat, lng, images) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
        """)
        insert_value = (
            i["_id"], i["name"], i["CAT"], i["description"], i["address"],
            i["direction"], i["MRT"], i["latitude"], i["longitude"],
            (str(all_images))
        )
        cursor.execute(insert_query, insert_value)
        db.commit()