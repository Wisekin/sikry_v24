"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Download, Upload, Filter, Search, Calendar, Play, Settings, UserPlus, ShieldCheck, LayoutGrid, List, Share2 } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SecondaryMenuBar() {
  const { t } = useTranslation('common')
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("view", value)
    router.push(`${pathname}?${params.toString()}`)
  }

  const currentView = searchParams.get("view") || "list"

  const getContextualContent = () => {
    if (pathname.includes("/admin/team")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs 
            defaultValue={searchParams.get('tab') || "overview"} 
            className="w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-auto grid-cols-4 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Overview</TabsTrigger>
              <TabsTrigger value="members" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Members</TabsTrigger>
              <TabsTrigger value="roles" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Roles</TabsTrigger>
              <TabsTrigger value="permissions" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Permissions</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${searchParams.get('view') === 'grid' ? 'bg-[#3C4568] text-white' : ''}`}
              onClick={() => handleTabChange('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${searchParams.get('view') === 'list' ? 'bg-[#3C4568] text-white' : ''}`}
              onClick={() => handleTabChange('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )
    }

    if (pathname.includes("/analytics/conversion")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs
            defaultValue={searchParams.get('tab') || "funnel"}
            className="w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-auto grid-cols-2 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="funnel" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Funnel Analysis</TabsTrigger>
              <TabsTrigger value="trends" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Trends</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )
    }

    if (pathname.includes("/gap-analysis/letters")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs
            defaultValue={searchParams.get('tab') || "templates"}
            className="w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-auto grid-cols-2 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="templates" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Templates</TabsTrigger>
              <TabsTrigger value="generated" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Generated Letters</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )
    }

    if (pathname.includes("/gap-analysis/form")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs
            defaultValue={searchParams.get('tab') || "editor"}
            className="w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-auto grid-cols-2 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="editor" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Form Editor</TabsTrigger>
              <TabsTrigger value="submissions" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Submissions</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )
    }

    if (pathname.includes("/reviews/booster")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs
            defaultValue={searchParams.get('tab') || "boosters"}
            className="w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-auto grid-cols-2 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="boosters" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Boosters</TabsTrigger>
              <TabsTrigger value="settings" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )
    }

    if (pathname.includes("/reengagement/automation")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs
            defaultValue={searchParams.get('tab') || "workflows"}
            className="w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-auto grid-cols-2 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="workflows" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Workflows</TabsTrigger>
              <TabsTrigger value="activity" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Activity</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )
    }

    if (pathname.includes("/reengagement/classification")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs
            defaultValue={searchParams.get('tab') || "rules"}
            className="w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-auto grid-cols-2 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="rules" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Rules</TabsTrigger>
              <TabsTrigger value="history" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">History</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )
    }

    if (pathname.includes("/admin/security")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs 
            defaultValue={searchParams.get('tab') || "overview"} 
            className="w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-auto grid-cols-4 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Overview</TabsTrigger>
              <TabsTrigger value="logs" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Security Logs</TabsTrigger>
              <TabsTrigger value="policies" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Policies</TabsTrigger>
              <TabsTrigger value="access" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Access Control</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${searchParams.get('view') === 'grid' ? 'bg-[#3C4568] text-white' : ''}`}
              onClick={() => handleTabChange('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${searchParams.get('view') === 'list' ? 'bg-[#3C4568] text-white' : ''}`}
              onClick={() => handleTabChange('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )
    }

    if (pathname.includes("/companies")) {
      return (
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => router.push("/companies/new")}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("nav.secondary.addCompany")}
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push("/companies/import")}>
            <Upload className="h-4 w-4 mr-2" />
            {t("nav.secondary.importCompanies")}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t("nav.secondary.exportData")}
          </Button>
        </div>
      )
    }

    if (pathname.includes("/comms")) {
      return (
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => router.push("/comms/new")}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("nav.secondary.newMessage")}
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push("/comms/campaigns/new")}>
            <Calendar className="h-4 w-4 mr-2" />
            {t("nav.secondary.newCampaign")}
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push("/comms/templates")}>
            <Settings className="h-4 w-4 mr-2" />
            {t("nav.secondary.templates")}
          </Button>
        </div>
      )
    }

    if (pathname.includes("/scrapers")) {
      return (
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => router.push("/scrapers/new")}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("nav.secondary.newScraper")}
          </Button>
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-2" />
            {t("nav.secondary.runScraper")}
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            {t("nav.secondary.scheduleJob")}
          </Button>
        </div>
      )
    }

    if (pathname.includes("/search")) {
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Input placeholder={t("search.refine")} className="w-64 h-8" />
            <Button size="sm" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("search.filters.allIndustries")}</SelectItem>
              <SelectItem value="tech">{t("search.filters.softwareDev")}</SelectItem>
              <SelectItem value="marketing">{t("search.filters.marketing")}</SelectItem>
              <SelectItem value="fintech">{t("search.filters.fintech")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {t("search.filters.label")}
          </Button>
        </div>
      )
    }

    if (pathname.includes("/admin/billing")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs 
            defaultValue={searchParams.get('tab') || "overview"} 
            className="w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-auto grid-cols-4 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Overview</TabsTrigger>
              <TabsTrigger value="invoices" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Invoices</TabsTrigger>
              <TabsTrigger value="usage" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Usage</TabsTrigger>
              <TabsTrigger value="plans" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Plans</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${searchParams.get('view') === 'grid' ? 'bg-[#3C4568] text-white' : ''}`}
              onClick={() => handleTabChange('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${searchParams.get('view') === 'list' ? 'bg-[#3C4568] text-white' : ''}`}
              onClick={() => handleTabChange('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )
    }

    if (pathname.includes("/admin/users")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs 
            defaultValue={searchParams.get('tab') || "overview"} 
            className="w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-auto grid-cols-3 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Overview</TabsTrigger>
              <TabsTrigger value="users" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Users</TabsTrigger>
              <TabsTrigger value="invites" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Invites</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${searchParams.get('view') === 'grid' ? 'bg-[#3C4568] text-white' : ''}`}
              onClick={() => handleTabChange('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${searchParams.get('view') === 'list' ? 'bg-[#3C4568] text-white' : ''}`}
              onClick={() => handleTabChange('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )
    }

    if (pathname.includes("/admin/compliance")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs 
            defaultValue={searchParams.get('tab') || "overview"} 
            className="w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-auto grid-cols-4 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Overview</TabsTrigger>
              <TabsTrigger value="logs" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Compliance Logs</TabsTrigger>
              <TabsTrigger value="policies" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Policies</TabsTrigger>
              <TabsTrigger value="reports" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Reports</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${searchParams.get('view') === 'grid' ? 'bg-[#3C4568] text-white' : ''}`}
              onClick={() => handleTabChange('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${searchParams.get('view') === 'list' ? 'bg-[#3C4568] text-white' : ''}`}
              onClick={() => handleTabChange('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )
    }

    if (pathname.includes("/admin/monitoring")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs 
            defaultValue={searchParams.get('tab') || "overview"} 
            className="w-auto"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-auto grid-cols-3 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Overview</TabsTrigger>
              <TabsTrigger value="alerts" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Alerts</TabsTrigger>
              <TabsTrigger value="metrics" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Metrics</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${searchParams.get('view') === 'grid' ? 'bg-[#3C4568] text-white' : ''}`}
              onClick={() => handleTabChange('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${searchParams.get('view') === 'list' ? 'bg-[#3C4568] text-white' : ''}`}
              onClick={() => handleTabChange('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="text-xs">
          {t("dashboard.overview")}
        </Badge>
      </div>
    )
  }

  const getActions = () => {
    if (pathname.includes("/admin/team")) {
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Input placeholder="Search members..." className="w-64 h-8" />
            <Button size="sm" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button
            size="sm"
            onClick={() => router.push("/admin/team/new")}
            className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      )
    }

    if (pathname.includes("/admin/security")) {
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Input placeholder="Search security logs..." className="w-64 h-8" />
            <Button size="sm" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button
            size="sm"
            onClick={() => router.push("/admin/security/new-policy")}
            className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white"
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            New Policy
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      )
    }

    if (pathname.includes("/reengagement/classification")) {
      return (
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => router.push("/reengagement/classification/new-rule")}
            className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Rule
          </Button>
        </div>
      )
    }

    if (pathname.includes("/reengagement/automation")) {
      return (
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => router.push("/reengagement/automation/new-workflow")}
            className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Workflow
          </Button>
        </div>
      )
    }

    if (pathname.includes("/reviews/booster")) {
      return (
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => router.push("/reviews/booster/new-campaign")}
            className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Booster Campaign
          </Button>
        </div>
      )
    }

    if (pathname.includes("/gap-analysis/form")) {
      return (
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => router.push("/gap-analysis/form/share")}
            className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Form
          </Button>
        </div>
      )
    }

    if (pathname.includes("/gap-analysis/letters")) {
      return (
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => router.push("/gap-analysis/letters/new-template")}
            className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      )
    }

    if (pathname.includes("/analytics/conversion")) {
      return (
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => router.push("/analytics/conversion/customize")}
            className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white"
          >
            <Settings className="h-4 w-4 mr-2" />
            Customize Dashboard
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {pathname.split("/").pop()?.replace("-", " ") || t("dashboard.title")}
        </Badge>
      </div>
    )
  }

  // Only render if we're not on a disabled path
  return (
    <div className="sticky top-16 z-40 w-full border-b border-gray-100/80 bg-white/98 backdrop-blur-md">
      <div className="flex h-12 items-center justify-between px-6">
        <div className="flex items-center gap-4">{getContextualContent()}</div>
        <div className="flex items-center gap-2">
          {getActions()}
        </div>
      </div>
    </div>
  )
}
