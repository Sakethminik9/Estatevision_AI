"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, TrendingUp } from "lucide-react"

export function PropertyListings() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProperties(zipcode: string) {
      try {
        // 🔹 Primary ATTOM request
        let res = await fetch(
          `http://127.0.0.1:8000/attom/property?zipcode=${zipcode}&page=1&page_size=8`
        )
        let data = await res.json()

        // ATTOM response is usually under data.property or property array
        let props = data.property || data.properties || []

        // 🔹 If no results, fallback to demo ZIP
        if (!props || props.length === 0) {
          console.warn("⚠️ No results found. Falling back to demo ZIP 60614.")
          res = await fetch("http://127.0.0.1:8000/attom/property?zipcode=60614&page=1&page_size=8")
          data = await res.json()
          props = data.property || data.properties || []
        }

        // 🔹 Normalize ATTOM response → frontend format
        const mapped = props.map((item: any, index: number) => ({
          id: index,
          address:
            item.address?.oneLine ||
            `${item.address?.line1 || ""}, ${item.address?.locality || ""}, ${item.address?.countrySubd || ""}`,
          price: item.sale?.amount
            ? `$${item.sale.amount.toLocaleString()}`
            : item.assessment?.market?.landValue
            ? `$${item.assessment.market.landValue.toLocaleString()}`
            : "N/A",
          beds: item.building?.rooms?.beds || 0,
          baths: item.building?.rooms?.bathstotal || 0,
          sqft: item.building?.size?.livingsize || "—",
          status: "Analyzing",

          // 🔹 Use backend financials
          capRate: item.financials?.cap_rate
            ? `${item.financials.cap_rate}%`
            : "—",
          noi: item.financials?.noi
            ? `$${item.financials.noi.toLocaleString()}`
            : "—",
          cashOnCash: item.financials?.cash_on_cash
            ? `${item.financials.cash_on_cash}%`
            : "—",

          riskScore: "Medium",
          image: "/placeholder.svg", // ATTOM doesn’t provide images in basic plan
        }))

        setProperties(mapped)
      } catch (err) {
        console.error("❌ Error fetching ATTOM data:", err)
      } finally {
        setLoading(false)
      }
    }

    // 🔹 Start with Austin zip (or pick dynamically later)
    fetchProperties("73301") // Austin demo zip
  }, [])

  if (loading) {
    return <div className="p-4">Loading properties...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Active Property Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {properties.length === 0 ? (
          <div>No properties found.</div>
        ) : (
          properties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex gap-4">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.address}
                  className="w-32 h-20 object-cover rounded-md"
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{property.address}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Bed className="h-3 w-3" />
                          {property.beds}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="h-3 w-3" />
                          {property.baths}
                        </span>
                        <span className="flex items-center gap-1">
                          <Square className="h-3 w-3" />
                          {property.sqft} sq ft
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-serif font-bold">{property.price}</div>
                      <Badge
                        variant={
                          property.status === "High Priority"
                            ? "default"
                            : property.status === "Qualified"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {property.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 pt-2 border-t">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Cap Rate</div>
                      <div className="font-semibold text-primary">{property.capRate}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Monthly NOI</div>
                      <div className="font-semibold">{property.noi}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Cash-on-Cash</div>
                      <div className="font-semibold text-primary">{property.cashOnCash}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Risk</div>
                      <div
                        className={`font-semibold ${
                          property.riskScore === "Low"
                            ? "text-primary"
                            : property.riskScore === "Medium"
                            ? "text-yellow-600"
                            : "text-destructive"
                        }`}
                      >
                        {property.riskScore}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Analyze
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
