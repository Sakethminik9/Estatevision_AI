from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from app.routers import attom, census, bls, deals, properties

app = FastAPI(title="Real Estate AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routers
app.include_router(attom.router, prefix="/attom", tags=["ATTOM"])
app.include_router(census.router, prefix="/census", tags=["Census"])
app.include_router(bls.router, prefix="/bls", tags=["BLS"])
app.include_router(deals.router, prefix="/deals", tags=["Deals"])
app.include_router(properties.router, prefix="/properties", tags=["Properties"])

@app.get("/")
def root():
    return {"message": "Real Estate AI Backend is running"}
