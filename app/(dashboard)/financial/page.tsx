"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"
import type { FinancialRecord, CampaignROI, FinancialFilters } from "@/types/financial"
import { FinancialSummaryPanel } from "@/components/financial/FinancialSummaryPanel"
import { DollarSign, Download, Filter, Plus, Search, TrendingUp, TrendingDown, Calendar } from "lucide-react"
import { format } from "date-fns"

export default function FinancialDashboard() {
  const { t } = useTranslation(['financialPage', 'common'])
  const [records, setRecords] = useState<FinancialRecord[]>([])
  const [campaignROI, setCampaignROI] = useState<CampaignROI[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FinancialFilters>({ source_type: "", type: "", currency: "" })

  useEffect(() => {
    fetchData()
  }, [filters])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch financial records
      const recordsParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) recordsParams.append(key, value)
      })

      const [recordsResponse, roiResponse] = await Promise.all([
        fetch(`/api/financial/records?${recordsParams}`),
        fetch("/api/financial/campaign-roi"),
      ])

      const recordsData = await recordsResponse.json()
      const roiData = await roiResponse.json()

      if (recordsData.records) setRecords(recordsData.records)
      if (roiData.campaigns) setCampaignROI(roiData.campaigns)
    } catch (error) {
      console.error("Error fetching financial data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: keyof FinancialFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value || undefined }))
  }

  const exportToCSV = () => {
    const csvContent = [
      ["Date", "Type", "Source", "Amount", "Currency", "Category", "Description"].join(","),
      ...records.map((record) =>
        [
          format(new Date(record.recorded_at), "yyyy-MM-dd"),
          record.type,
          record.source_type,
          record.amount,
          record.currency,
          record.category || "",
          record.description || "",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `financial-records-${format(new Date(), "yyyy-MM-dd")}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const formatCurrency = (amount: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "revenue":
        return "bg-green-100 text-green-800"
      case "cost":
        return "bg-red-100 text-red-800"
      case "expense":
        return "bg-orange-100 text-orange-800"
      case "refund":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("dashboard.title", { ns: 'financialPage' })}</h1>
          <p className="text-muted-foreground">{t("dashboard.description", { ns: 'financialPage' })}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {t("export", { ns: 'common' })}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t("buttons.addRecord", { ns: 'financialPage' })}
          </Button>
        </div>
      </div>

      {/* Summary Panel */}
      <FinancialSummaryPanel className="w-full" />

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t("filters", { ns: 'common' })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("search", { ns: 'common' })}</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("filter.searchPlaceholder", { ns: 'financialPage' })}
                  value={filters.search || ""}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("filter.sourceTypeLabel", { ns: 'financialPage' })}</label>
              <Select
                value={filters.source_type || "all"}
                onValueChange={(value) => handleFilterChange("source_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("all", { ns: 'common' })} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all", { ns: 'common' })}</SelectItem>
                  <SelectItem value="campaign">{t("filter.sourceTypeOptions.campaign", { ns: 'financialPage' })}</SelectItem>
                  <SelectItem value="contact">{t("filter.sourceTypeOptions.contact", { ns: 'financialPage' })}</SelectItem>
                  <SelectItem value="scraper">{t("filter.sourceTypeOptions.scraper", { ns: 'financialPage' })}</SelectItem>
                  <SelectItem value="subscription">{t("filter.sourceTypeOptions.subscription", { ns: 'financialPage' })}</SelectItem>
                  <SelectItem value="manual">{t("filter.sourceTypeOptions.manual", { ns: 'financialPage' })}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("filter.typeLabel", { ns: 'financialPage' })}</label>
              <Select value={filters.type || "all"} onValueChange={(value) => handleFilterChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("all", { ns: 'common' })} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all", { ns: 'common' })}</SelectItem>
                  <SelectItem value="revenue">{t("types.revenue", { ns: 'financialPage' })}</SelectItem>
                  <SelectItem value="cost">{t("types.cost", { ns: 'financialPage' })}</SelectItem>
                  <SelectItem value="expense">{t("types.expense", { ns: 'financialPage' })}</SelectItem>
                  <SelectItem value="refund">{t("types.refund", { ns: 'financialPage' })}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("filter.currencyLabel", { ns: 'financialPage' })}</label>
              <Select
                value={filters.currency || "all"}
                onValueChange={(value) => handleFilterChange("currency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("all", { ns: 'common' })} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("common.all")}</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign ROI Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {t("campaignROITable.title", { ns: 'financialPage' })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">{t("campaignROITable.headers.campaign", { ns: 'financialPage' })}</th>
                  <th className="text-right p-2">{t("campaignROITable.headers.revenue", { ns: 'financialPage' })}</th>
                  <th className="text-right p-2">{t("campaignROITable.headers.costs", { ns: 'financialPage' })}</th>
                  <th className="text-right p-2">{t("campaignROITable.headers.netProfit", { ns: 'financialPage' })}</th>
                  <th className="text-right p-2">{t("campaignROITable.headers.roi", { ns: 'financialPage' })}</th>
                </tr>
              </thead>
              <tbody>
                {campaignROI.map((campaign) => (
                  <tr key={campaign.campaign_id} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{campaign.campaign_name}</td>
                    <td className="p-2 text-right text-green-600">{formatCurrency(campaign.total_revenue)}</td>
                    <td className="p-2 text-right text-red-600">{formatCurrency(campaign.total_costs)}</td>
                    <td
                      className={`p-2 text-right font-semibold ${campaign.net_profit >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {formatCurrency(campaign.net_profit)}
                    </td>
                    <td className="p-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {campaign.roi_percentage >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <span className={campaign.roi_percentage >= 0 ? "text-green-600" : "text-red-600"}>
                          {campaign.roi_percentage.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Financial Records Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            {t("recordsTable.title", { ns: 'financialPage' })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">{t("date", { ns: 'common' })}</th>
                  <th className="text-left p-2">{t("type", { ns: 'common' })}</th>
                  <th className="text-left p-2">{t("recordsTable.headers.source", { ns: 'financialPage' })}</th>
                  <th className="text-right p-2">{t("recordsTable.headers.amount", { ns: 'financialPage' })}</th>
                  <th className="text-left p-2">{t("recordsTable.headers.category", { ns: 'financialPage' })}</th>
                  <th className="text-left p-2">{t("description", { ns: 'common' })}</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {format(new Date(record.recorded_at), "MMM dd, yyyy")}
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge className={getTypeColor(record.type)}>{t(`types.${record.type}`, { ns: 'financialPage' })}</Badge>
                    </td>
                    <td className="p-2 capitalize">{record.source_type}</td>
                    <td
                      className={`p-2 text-right font-semibold ${
                        record.type === "revenue" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(record.amount, record.currency)}
                    </td>
                    <td className="p-2">{record.category || "-"}</td>
                    <td className="p-2 text-muted-foreground max-w-xs truncate">{record.description || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
