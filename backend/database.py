from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import psycopg2
DB_URL = 'postgresql://default:2ytpuU7swTql@ep-young-salad-a10bjpmp-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require'

db_name = "internship_db_2gps"
db_user = "internship_db_2gps_user"
db_pass = "oP5esjf28Xc7AWCuCFVBSaqT9LkSClMd"
db_host = "dpg-cs5plslumphs73b0qhs0-a"
db_port = "5432"

POSTGRES_URL="postgres://default:2ytpuU7swTql@ep-young-salad-a10bjpmp-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_PRISMA_URL="postgres://default:2ytpuU7swTql@ep-young-salad-a10bjpmp-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NO_SSL="postgres://default:2ytpuU7swTql@ep-young-salad-a10bjpmp-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb"
POSTGRES_URL_NON_POOLING="postgres://default:2ytpuU7swTql@ep-young-salad-a10bjpmp.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_USER="default"
POSTGRES_HOST="ep-young-salad-a10bjpmp-pooler.ap-southeast-1.aws.neon.tech"
POSTGRES_PASSWORD="2ytpuU7swTql"
POSTGRES_DATABASE="verceldb"

def get_database_conn():
    try:
        conn = psycopg2.connect(
            DB_URL
        )
        print("Database Connected!")

        return conn
    
    except Exception as e:
        print("Database Connection Error:", e)
        return None




engine = create_engine(DB_URL)
sessionLocal = sessionmaker(bind = engine)

Base = declarative_base()