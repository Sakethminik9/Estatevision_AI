from sqlalchemy.orm import Session
from app import models, schemas

def create_deal(db: Session, deal: schemas.DealCreate):
    db_deal = models.Deal(**deal.dict())
    db.add(db_deal)
    db.commit()
    db.refresh(db_deal)
    return db_deal

def get_deals(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Deal).offset(skip).limit(limit).all()
