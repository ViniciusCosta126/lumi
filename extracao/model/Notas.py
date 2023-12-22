from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from utils import engine


Base = declarative_base()

class Nota(Base):
    __tablename__ = 'notas'

    id = Column(Integer, primary_key=True)
    scee_kwh = Column(Integer)
    scee_valor_total = Column(Float)
    gdi_kwh = Column(Integer)
    gdi_valor_total = Column(Float)
    contrib_valor_total = Column(Float)
    energia_kwh = Column(Integer)
    energia_valor_total = Column(Float)
    nota = Column(String)
    numero_cliente = Column(String)

Base.metadata.create_all(engine)
