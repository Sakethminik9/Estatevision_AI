import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsOverview } from "@/components/metrics-overview"
import { PropertyListings } from "@/components/property-listings"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { DealPipeline } from "@/components/deal-pipeline"
import { RiskAssessment } from "@/components/risk-assessment"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8 space-y-8">
        <MetricsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AnalyticsCharts />
            <PropertyListings />
          </div>

          <div className="space-y-8">
            <DealPipeline />
            <RiskAssessment />
          </div>
        </div>
      </main>
    </div>
  )
}
