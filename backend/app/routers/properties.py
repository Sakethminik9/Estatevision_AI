from fastapi import APIRouter

router = APIRouter()

# ✅ Mock properties endpoint
@router.get("/properties")
def get_properties():
    return [
        {"id": 1, "address": "123 Maple St, Denver, CO", "price": 350000, "beds": 3, "baths": 2},
        {"id": 2, "address": "456 Oak Ave, Dallas, TX", "price": 500000, "beds": 4, "baths": 3},
        {"id": 3, "address": "789 Pine Ln, Miami, FL", "price": 420000, "beds": 3, "baths": 2},
    ]

# ✅ Mock metrics endpoint
@router.get("/metrics")
def get_metrics():
    return {
        "portfolio_value": 2400000,
        "cap_rate": 0.075,
        "cash_on_cash": 0.12
    }
