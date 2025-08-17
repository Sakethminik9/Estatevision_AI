import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const pipelineStages = [
  {
    stage: "Sourcing",
    count: 45,
    color: "bg-chart-2",
    deals: [
      { address: "123 Main St", value: "$450K", progress: 25 },
      { address: "456 Oak Ave", value: "$380K", progress: 60 },
    ],
  },
  {
    stage: "Analysis",
    count: 12,
    color: "bg-chart-1",
    deals: [
      { address: "789 Pine Rd", value: "$520K", progress: 75 },
      { address: "321 Elm St", value: "$395K", progress: 40 },
    ],
  },
  {
    stage: "Due Diligence",
    count: 6,
    color: "bg-chart-4",
    deals: [{ address: "654 Maple Dr", value: "$610K", progress: 90 }],
  },
  {
    stage: "Closing",
    count: 3,
    color: "bg-primary",
    deals: [{ address: "987 Cedar Ln", value: "$485K", progress: 95 }],
  },
]

export function DealPipeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Deal Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pipelineStages.map((stage) => (
          <div key={stage.stage} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                <span className="font-medium">{stage.stage}</span>
              </div>
              <Badge variant="secondary">{stage.count}</Badge>
            </div>

            <div className="space-y-2 ml-5">
              {stage.deals.map((deal, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{deal.address}</span>
                    <span className="font-medium">{deal.value}</span>
                  </div>
                  <Progress value={deal.progress} className="h-1" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
