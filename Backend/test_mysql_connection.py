import pymysql

try:
    connection = pymysql.connect(
        host="localhost",
        user="root",
        password="Jams@#3489",  # RAW password, no encoding needed here
        database="user_management"
    )
    print("✅ Connected to MySQL successfully!")
    connection.close()
except pymysql.MySQLError as e:
    print("❌ MySQL Connection Error:")
    print(e)
