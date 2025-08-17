# app/routers/attom.py
from typing import Any, Dict, Optional
import os
import requests
from fastapi import APIRouter, HTTPException, Query

router = APIRouter()

# --- Config / constants ---
ATTOM_API_KEY = os.getenv("ATTOM_API_KEY")
BASE_URL = "https://api.gateway.attomdata.com/propertyapi/v1.0.0"

# Financial assumption knobs (safe defaults; change in .env if you like)
ASSUME_RENT_PCT = float(os.getenv("ASSUME_RENT_PCT", "0.008"))     # 0.8% of value / month
ASSUME_EXPENSE_PCT = float(os.getenv("ASSUME_EXPENSE_PCT", "0.30")) # 30% of rent
DEMO_VALUE_FALLBACK = float(os.getenv("DEMO_VALUE_FALLBACK", "450000"))  # used if value missing


def call_attom(endpoint: str, params: Dict[str, Any]) -> Dict[str, Any]:
    """HTTP GET to ATTOM with basic error handling."""
    if not ATTOM_API_KEY:
        raise HTTPException(status_code=500, detail="ATTOM API key not set")

    headers = {"apikey": ATTOM_API_KEY}
    try:
        resp = requests.get(f"{BASE_URL}{endpoint}", headers=headers, params=params, timeout=15)
        print(f"🏡 ATTOM API Response ({endpoint}):", resp.text)
        resp.raise_for_status()
        return resp.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"ATTOM API error: {str(e)}")


def _extract_market_value(p: Dict[str, Any]) -> Optional[float]:
    """
    Try to find a market/assessed value in various shapes ATTOM may return.
    The /property/address endpoint often returns only address/location (no valuation),
    so this frequently returns None (we'll use a demo fallback then).
    """
    # Common places to look; all guarded to avoid KeyErrors
    assessment = p.get("assessment") or {}
    market = assessment.get("market") or {}
    assessed = assessment.get("assessed") or {}

    # Try likely fields (any one of these might exist depending on product tier)
    candidates = [
        market.get("totalValue"),
        market.get("improvementValue"),
        market.get("landValue"),
        assessed.get("totalValue"),
        assessed.get("assdttlvalue") or assessed.get("assdTotal"),  # sometimes snake/camel/abbr variants
        p.get("avm", {}).get("amount"),
        p.get("sale", {}).get("amount") or p.get("sale", {}).get("price"),
    ]

    for v in candidates:
        try:
            if v is None:
                continue
            fv = float(v)
            if fv > 0:
                return fv
        except (TypeError, ValueError):
            continue
    return None


def _compute_financials(value: float) -> Dict[str, Optional[float]]:
    """
    Compute demo estimates for NOI (monthly), Cap Rate (%), and Cash-on-Cash (%).
    """
    if not value or value <= 0:
        return {"noi": None, "cap_rate": None, "cash_on_cash": None}

    monthly_rent = value * ASSUME_RENT_PCT
    expenses = monthly_rent * ASSUME_EXPENSE_PCT
    noi_monthly = monthly_rent - expenses  # monthly NOI
    # Using value as the denominator keeps it simple for a demo; replace with equity later if you add financing.
    cap_rate_pct = (noi_monthly * 12.0 / value) * 100.0
    coc_pct = cap_rate_pct  # placeholder; same as cap rate until you model debt/equity

    return {
        "noi": round(noi_monthly, 2),
        "cap_rate": round(cap_rate_pct, 2),
        "cash_on_cash": round(coc_pct, 2),
    }


@router.get("/property")
def get_property(
    address1: Optional[str] = Query(None, description="Street address (e.g., 123 Main St)"),
    city: Optional[str] = Query(None, description="City (required with address1)"),
    state: Optional[str] = Query(None, description="State code (required with address1)"),
    zipcode: Optional[str] = Query(None, description="ZIP for bulk search"),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    use_demo_fallback: bool = Query(True, description="If true, use a demo value when ATTOM lacks valuation"),
):
    """
    - If `zipcode` is provided -> list properties in that ZIP.
    - Else if `address1 + city + state` provided -> fetch expanded profile for that address.
    - Adds `financials` to each property so the UI can show Cap Rate / NOI / Cash-on-Cash.
    """
    if zipcode:
        data = call_attom("/property/address", {"postalcode": zipcode, "page": page, "pagesize": page_size})
    elif address1 and city and state:
        data = call_attom("/property/expandedprofile", {"address1": address1, "address2": f"{city} {state}"})
    else:
        raise HTTPException(status_code=400, detail="Provide either (address1 + city + state) OR zipcode")

    props = data.get("property") or []
    for p in props:
        # Try to get a real value from ATTOM; if not present and demo fallback is allowed, use constant.
        value = _extract_market_value(p)
        if (value is None or value <= 0) and use_demo_fallback:
            value = DEMO_VALUE_FALLBACK

        p["financials"] = _compute_financials(value if value else 0.0)

    # Ensure the same shape is returned; we mutated properties in-place.
    return data
