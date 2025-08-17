// frontend/services/api.ts
const API_BASE_URL = "http://127.0.0.1:8000";

// ✅ Fetch property listings
export async function getProperties() {
  const res = await fetch(`${API_BASE_URL}/properties/properties`);
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}

// ✅ Fetch metrics overview
export async function getMetrics() {
  const res = await fetch(`${API_BASE_URL}/properties/metrics`);
  if (!res.ok) throw new Error("Failed to fetch metrics");
  return res.json();
}

// ✅ Fetch deals
export async function getDeals() {
  const res = await fetch(`${API_BASE_URL}/deals`);
  if (!res.ok) throw new Error("Failed to fetch deals");
  return res.json();
}
