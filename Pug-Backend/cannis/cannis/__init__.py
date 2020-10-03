import pymysql
pymysql.version_info = (1, 4, 0, "final", 0)
pymysql.install_as_MySQLdb()

from django.db import connections
from django.db.utils import OperationalError
db_conn = connections['default']
try:
    c = db_conn.cursor()
except OperationalError:
    connected = False
else:
    connected = True