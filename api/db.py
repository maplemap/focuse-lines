from app import app
from flaskext.mysql import MySQL
import pymysql

mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'api'
app.config['MYSQL_DATABASE_HOST'] = 'api_db'
mysql.init_app(app)

def connect_db():
    class Connection():
        def __init__(self):
            mysql_connection = mysql.connect()
            cursor = mysql_connection.cursor(pymysql.cursors.DictCursor)

            self.execute = cursor.execute
            self.commit = mysql_connection.commit
            self.close = mysql_connection.close
            self.fetchall = cursor.fetchall
            self.fetchone = cursor.fetchone

    return Connection()
