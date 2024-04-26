from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import psycopg2
DB_URL = 'postgresql://postgres:ask123@localhost/Internship_DB'

db_name = "postgres"
db_user = "postgres"
db_pass = "ask123"
db_host = "localhost"
db_port = "5432"

def get_database_conn():
    try:
        conn = psycopg2.connect(
            dbname = db_name, 
            user = db_user, 
            password = db_pass, 
            host = db_host, 
            port = db_port
        )
        print("Database Connected!")
        return conn
    
    except Exception as e:
        print("Database Connection Error:", e)
        return None




engine = create_engine(DB_URL)
sessionLocal = sessionmaker(bind = engine)

Base = declarative_base()