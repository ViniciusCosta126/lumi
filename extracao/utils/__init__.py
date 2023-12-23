from dotenv import load_dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
# Carregar variáveis do arquivo .env
load_dotenv()



# Acessar as variáveis do ambiente
db_user = os.getenv("USER")
db_password = os.getenv("PASSWORD")
db_name = os.getenv("DB")
db_host = os.getenv("host",'localhost')

engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_host}:5432/{db_name}')

Session = sessionmaker(bind=engine)
session = Session()