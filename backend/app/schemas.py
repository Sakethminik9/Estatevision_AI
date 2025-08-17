from pydantic import BaseModel
from datetime import datetime

class DealBase(BaseModel):
    address: str
    price: float
    noi: float
    cap_rate: float
    cash_on_cash: float
    rrr: float

class DealCreate(DealBase):
    pass

class DealResponse(DealBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

