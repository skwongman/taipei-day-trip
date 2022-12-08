from mysql.connector import pooling
import os
from dotenv import load_dotenv
load_dotenv()

dbconfig = {
    "host": os.getenv("HOST"),
    "user": os.getenv("USER"),
    "password": os.getenv("PASSWORD"),
    "database": os.getenv("DATABASE")
}

mypool = pooling.MySQLConnectionPool(
    pool_name = "mypool",
    pool_size = 10,
	pool_reset_session = True,
    **dbconfig
)