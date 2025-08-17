"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const capRateData = [
  { month: "Jan", rate: 7.2 },
  { month: "Feb", rate: 7.8 },
  { month: "Mar", rate: 8.1 },
  { month: "Apr", rate: 8.4 },
  { month: "May", rate: 8.2 },
  { month: "Jun", rate: 8.6 },
]

const propertyTypeData = [
  { type: "Multi-Family", value: 45, color: "hsl(var(--chart-1))" },
  { type: "Single Family", value: 30, color: "hsl(var(--chart-2))" },
  { type: "Commercial", value: 15, color: "hsl(var(--chart-3))" },
  { type: "Industrial", value: 10, color: "hsl(var(--chart-4))" },
]

const dealFlowData = [
  { week: "W1", analyzed: 12, qualified: 3 },
  { week: "W2", analyzed: 18, qualified: 5 },
  { week: "W3", analyzed: 15, qualified: 4 },
  { week: "W4", analyzed: 22, qualified: 7 },
]

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Cap Rate Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              rate: {
                label: "Cap Rate",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={capRateData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Property Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Properties",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={propertyTypeData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                  {propertyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-serif">Deal Flow Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              analyzed: {
                label: "Analyzed",
                color: "hsl(var(--chart-2))",
              },
              qualified: {
                label: "Qualified",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dealFlowData}>
                <XAxis dataKey="week" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="analyzed" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="qualified" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
