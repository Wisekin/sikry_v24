"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download, Upload, Building2, Globe, MapPin, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTranslation } from 'react-i18next';
import { getCompanies } from "@/actions/companies"
import type { DiscoveredCompany } from "@/types/database"

export default function CompaniesPage() {
  const router = useRouter()
  const { t } = useTranslation(['companiesPage', 'common']); // Add 'common' to default namespaces
  const [companies, setCompanies] = useState<DiscoveredCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")

  useEffect(() => {
    loadCompanies()
  }, [])

  const loadCompanies = async () => {
    try {
      setLoading(true)
      const data = await getCompanies()
      setCompanies(data)
    } catch (error) {
      console.error("Error loading companies:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.domain?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = industryFilter === "all" || company.industry === industryFilter
    return matchesSearch && matchesIndustry
  })

  const renderStatusBadge = (verified: boolean, t: any) => { // t can be typed with TFunction from i18next
    if (verified) {
      return <Badge className="bg-green-100 text-green-800">{t("status.verified", { ns: 'common' })}</Badge>
    }
    return <Badge variant="outline">{t("status.pending", { ns: 'common' })}</Badge>
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Building2 className="h-12 w-12 text-gray-400 mb-4 animate-pulse" />
        <p className="mt-2 text-sm text-muted-foreground">{t("loading", { ns: 'common' })}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("pagination.showingResults", { count: filteredCompanies.length, ns: 'common' })}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            {t("importButton")}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {t("exportButton")}
          </Button>
          <Button onClick={() => router.push("/companies/new")}>
            <Plus className="mr-2 h-4 w-4" />
            {t("addNewButton")}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">{t("filters.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="search"
                placeholder={t("filters.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t("filters.selectIndustryPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("filters.industries.all")}</SelectItem>
                  <SelectItem value="Technology">{t("filters.industries.technology")}</SelectItem>
                  <SelectItem value="Marketing">{t("filters.industries.marketing")}</SelectItem>
                  <SelectItem value="Finance">{t("filters.industries.finance")}</SelectItem>
                  {/* Add more industries as needed */}
                </SelectContent>
              </Select>
            </div>
            {/* Add more filters here, e.g., location, company size */}
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>{t("listTitle")}</CardTitle>
            <CardDescription>
              {t("pagination.showingCount", { count: filteredCompanies.length, total: companies.length, ns: 'common' })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredCompanies.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("tableHeaders.name")}</TableHead>
                    <TableHead>{t("tableHeaders.domain")}</TableHead>
                    <TableHead>{t("tableHeaders.industry")}</TableHead>
                    <TableHead>{t("tableHeaders.location")}</TableHead>
                    <TableHead>{t("tableHeaders.size")}</TableHead>
                    <TableHead>{t("tableHeaders.confidence")}</TableHead>
                    <TableHead>{t("tableHeaders.status")}</TableHead>
                    <TableHead>{t("actions", { ns: 'common' })}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium flex items-center">
                        {company.logo_url ? (
                          <img src={company.logo_url} alt={`${company.name} logo`} className="h-6 w-6 mr-2 rounded-sm object-contain" />
                        ) : (
                          <Building2 className="h-5 w-5 mr-2 text-gray-400" />
                        )}
                        {company.name}
                      </TableCell>
                      <TableCell>
                        <a href={`http://${company.domain}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {company.domain}
                        </a>
                      </TableCell>
                      <TableCell>{company.industry}</TableCell>
                      <TableCell>{company.location_text || t("notAvailable", { ns: 'common' })}</TableCell>
                      <TableCell>{company.company_size ? t("companySizeValue", { count: company.company_size }) : t("notAvailable", { ns: 'common' })}</TableCell>
                      <TableCell>
                        {/* Refactored getConfidenceBadge to be called here or use t directly */}
                        <Badge variant={(company.confidence_score || 0) > 70 ? "default" : "secondary"} className={(company.confidence_score || 0) > 70 ? "bg-sky-100 text-sky-700" : ""}>
                          {t("confidencePercentage", { value: company.confidence_score || 0 })}
                        </Badge>
                      </TableCell>
                      <TableCell>{renderStatusBadge(company.is_verified || false, t)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => router.push(`/companies/${company.id}`)}>
                          {t("viewDetails", { ns: 'common' })}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-10">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium">{t("noResults.title")}</h3>
                <p className="text-muted-foreground">{t("noResults.description")}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Define helper functions here if they need access to `t` or pass `t` as an argument
// For simplicity in this tool, direct modification was made.
// A better refactor would involve passing `t` to these functions:
// const getConfidenceBadge = (confidence: number, t: TFunction) => { ... }
// const renderStatusBadge = (verified: boolean, t: TFunction) => { ... }

// Or define them inside the CompaniesPage component if they are only used there.
// For instance, if renderStatusBadge is moved inside CompaniesPage:
// const renderStatusBadge = (verified: boolean) => {
//   if (verified) {
//     return <Badge className="bg-green-100 text-green-800">{t("status.verified", { ns: 'common' })}</Badge>;
//   }
//   return <Badge variant="outline">{t("status.pending", { ns: 'common' })}</Badge>;
// };
// And similar for getConfidenceBadge for the percentage.
// The direct change to t("confidencePercentage") in the JSX for confidence badge has been made.
// The renderStatusBadge call was updated to pass `t`. It implies renderStatusBadge's signature changes.
// Let's ensure renderStatusBadge is correctly defined or modified.
// For the purpose of this tool, I will assume the TSX will be adjusted slightly for helper functions
// by the developer, or the direct embedding of t() calls is preferred if helpers are simple.

// Corrected renderStatusBadge to be defined inside or t passed.
// The diff shows `renderStatusBadge(company.is_verified || false, t)`
// So, the definition of renderStatusBadge must be changed to accept `t`
// This change is outside the direct diffs but implied by the call.
// Let's refine the diff for renderStatusBadge definition if possible or assume it's handled.
// Given the tool, I'll focus on the calling part.
// The `getConfidenceBadge` was removed, and its logic inlined with `t()`.
