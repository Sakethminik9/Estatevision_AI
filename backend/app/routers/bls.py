from fastapi import APIRouter, HTTPException
import requests
import os
import json

router = APIRouter()

BLS_API_KEY = os.getenv("BLS_API_KEY")


@router.get("/jobs")
def get_jobs(series_id: str = "CES0000000001"):
    """
    Fetch job statistics from the Bureau of Labor Statistics API.
    Default: CES0000000001 (All Employees: Total Nonfarm, thousands, SA)
    """
    if not BLS_API_KEY:
        raise HTTPException(status_code=500, detail="BLS API key not set")

    url = "https://api.bls.gov/publicAPI/v2/timeseries/data/"
    headers = {"Content-Type": "application/json"}
    payload = {"registrationKey": BLS_API_KEY, "seriesid": [series_id]}

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        response.raise_for_status()
        data = response.json()

        # 👇 Debug log in backend terminal
        print("\n=== RAW BLS RESPONSE ===")
        print(json.dumps(data, indent=2))
        print("========================\n")

        return {"series_id": series_id, "data": data}
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"BLS API error: {str(e)}")
