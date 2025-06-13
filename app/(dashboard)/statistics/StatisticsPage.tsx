"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Text } from "@/components/core/typography/Text"
import { CollectionTrends } from "./CollectionTrends"
import { GeographicDistribution } from "./GeographicDistribution"
import { SectorDistribution } from "./SectorDistribution"
import { SourceComparison } from "./SourceComparison"

export function StatisticsPage() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Total Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,458</div>
            <Text size="sm" className="text-emerald-600">
              +124 this month
            </Text>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Active Scrapers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <Text size="sm" className="text-secondary">
              Last run: 2 hours ago
            </Text>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <Text size="sm" className="text-emerald-600">
              92% delivery rate
            </Text>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Data Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <Text size="sm" className="text-emerald-600">
              +2% from last month
            </Text>
          </CardContent>
        </Card>
      </div>

      {/* Collection Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Collection Trends</CardTitle>
          <CardDescription>Data collection trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <CollectionTrends />
          </div>
        </CardContent>
      </Card>

      {/* Geographic and Sector Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Data distribution by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <GeographicDistribution />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sector Distribution</CardTitle>
            <CardDescription>Data distribution by industry sector</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <SectorDistribution />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Source Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Source Comparison</CardTitle>
          <CardDescription>Data quality and volume by source</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <SourceComparison />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
