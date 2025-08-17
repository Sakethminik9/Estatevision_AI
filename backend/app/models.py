from sqlalchemy import Column, Integer, String, Float, DateTime
from app.database import Base
from datetime import datetime

class Deal(Base):
    __tablename__ = "deals"
    id = Column(Integer, primary_key=True, index=True)
    address = Column(String, index=True)
    price = Column(Float)
    noi = Column(Float)
    cap_rate = Column(Float)
    cash_on_cash = Column(Float)
    rrr = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
