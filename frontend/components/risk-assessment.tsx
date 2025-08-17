import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, TrendingDown, MapPin } from "lucide-react"

const riskFactors = [
  {
    type: "Market Risk",
    level: "Medium",
    description: "Local market showing volatility",
    impact: "Price fluctuation potential",
    icon: TrendingDown,
  },
  {
    type: "Property Risk",
    level: "Low",
    description: "Well-maintained properties",
    impact: "Minimal maintenance issues",
    icon: Shield,
  },
  {
    type: "Location Risk",
    level: "Low",
    description: "Prime locations selected",
    impact: "Strong rental demand",
    icon: MapPin,
  },
]

const alerts = [
  {
    property: "1234 Oak Street",
    alert: "Zoning change proposed",
    severity: "Medium",
    date: "2 days ago",
  },
  {
    property: "5678 Pine Avenue",
    alert: "Market rent increase detected",
    severity: "Low",
    date: "1 week ago",
  },
]

export function RiskAssessment() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {riskFactors.map((risk, index) => {
            const Icon = risk.icon
            return (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{risk.type}</span>
                    <Badge
                      variant={
                        risk.level === "High" ? "destructive" : risk.level === "Medium" ? "secondary" : "outline"
                      }
                    >
                      {risk.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{risk.description}</p>
                  <p className="text-xs text-muted-foreground">{risk.impact}</p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
              <AlertTriangle
                className={`h-4 w-4 mt-0.5 ${
                  alert.severity === "High"
                    ? "text-destructive"
                    : alert.severity === "Medium"
                      ? "text-yellow-600"
                      : "text-muted-foreground"
                }`}
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{alert.property}</span>
                  <span className="text-xs text-muted-foreground">{alert.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.alert}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
