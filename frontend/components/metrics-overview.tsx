import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle, BarChart3 } from "lucide-react"

const metrics = [
  {
    title: "Active Deals",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Target,
    description: "Properties under analysis",
  },
  {
    title: "Avg Cap Rate",
    value: "8.2%",
    change: "+0.3%",
    trend: "up",
    icon: BarChart3,
    description: "Portfolio average",
  },
  {
    title: "Monthly NOI",
    value: "$18.4K",
    change: "+5.2%",
    trend: "up",
    icon: DollarSign,
    description: "Net operating income",
  },
  {
    title: "Risk Score",
    value: "6.8/10",
    change: "-0.2",
    trend: "down",
    icon: AlertTriangle,
    description: "Portfolio risk level",
  },
]

export function MetricsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isPositive = metric.trend === "up"

        return (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-serif font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-primary" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span className={`text-xs font-medium ${isPositive ? "text-primary" : "text-destructive"}`}>
                  {metric.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
