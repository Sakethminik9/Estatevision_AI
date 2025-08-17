from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from backend.app.config import DATABASE_URL

def test_connection():
    try:
        engine = create_engine(DATABASE_URL)
        with engine.connect() as conn:
            print("✅ Connection successful!")
    except OperationalError as e:
        print("❌ Connection failed:", e)

if __name__ == "__main__":
    test_connection()
