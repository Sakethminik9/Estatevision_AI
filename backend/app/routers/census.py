from fastapi import APIRouter, HTTPException
import requests
import os
import json

router = APIRouter()

CENSUS_API_KEY = os.getenv("CENSUS_API_KEY")


@router.get("/population")
def get_population(state: str, county: str):
    """
    Fetch population data from the Census API.
    Example: /census/population?state=48&county=201
    (state and county should be FIPS codes, not names)
    """
    if not CENSUS_API_KEY:
        raise HTTPException(status_code=500, detail="Census API key not set")

    url = (
        f"https://api.census.gov/data/2020/dec/pl"
        f"?get=P1_001N&for=county:{county}&in=state:{state}&key={CENSUS_API_KEY}"
    )

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()

        # 👇 Debug log in backend terminal
        print("\n=== RAW CENSUS RESPONSE ===")
        print(json.dumps(data, indent=2))
        print("===========================\n")

        return {"state": state, "county": county, "population": data}
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Census API error: {str(e)}")
