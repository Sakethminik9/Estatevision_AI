import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# API Keys (required)
CENSUS_API_KEY = os.getenv("CENSUS_API_KEY")
BLS_API_KEY = os.getenv("BLS_API_KEY")
ATTOM_API_KEY = os.getenv("ATTOM_API_KEY")

# Database (optional: has a fallback)
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://realuser:realpass@localhost:5432/realestate_ai"
)

# --- Validation (fail fast if keys are missing) ---
missing = []
if not CENSUS_API_KEY:
    missing.append("CENSUS_API_KEY")
if not BLS_API_KEY:
    missing.append("BLS_API_KEY")
if not ATTOM_API_KEY:
    missing.append("ATTOM_API_KEY")

if missing:
    raise ValueError(f"Missing required API keys in .env: {', '.join(missing)}")

def mask_key(key: str) -> str:
    """Mask key for safe debug logging."""
    if not key:
        return "MISSING"
    return key[:4] + "..." + key[-4:]

print("🔑 Loaded API keys:")
print("  CENSUS_API_KEY:", mask_key(CENSUS_API_KEY))
print("  BLS_API_KEY:", mask_key(BLS_API_KEY))
print("  ATTOM_API_KEY:", mask_key(ATTOM_API_KEY))
print("  DATABASE_URL:", DATABASE_URL)
