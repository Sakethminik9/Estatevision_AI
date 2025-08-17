from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, schemas, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.DealResponse)
def create_deal(deal: schemas.DealCreate, db: Session = Depends(get_db)):
    return crud.create_deal(db=db, deal=deal)

@router.get("/", response_model=list[schemas.DealResponse])
def read_deals(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_deals(db, skip=skip, limit=limit)
