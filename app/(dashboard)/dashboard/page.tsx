"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, MessageSquare, Bot, TrendingUp, Calendar, BarChart3, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTranslation } from 'react-i18next';
import { getCompanies } from "@/actions/companies"
import { getCommunications } from "@/actions/communications"

interface Activity {
  type: "new_company" | "new_communication" | "scraper_run";
  title: string;
  timestamp: string;
}

export default function DashboardPage() {
  const router = useRouter()
  const { t } = useTranslation('dashboardPage');
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalCommunications: 0,
    activeScrapers: 0,
    recentActivity: [] as Activity[],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [companies, communications] = await Promise.all([getCompanies(), getCommunications()])

      setStats({
        totalCompanies: companies.length,
        totalCommunications: communications.length,
        activeScrapers: 3, // This would come from scrapers API
        recentActivity: [],
      })
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: t("quickActions.buttons.addNewCompany"),
      description: t("quickActions.buttons.addNewCompany"),
      icon: Building2,
      href: "/companies/new",
      color: "bg-blue-500",
    },
    {
      title: t("quickActions.buttons.newMessage"),
      description: t("quickActions.buttons.newMessage"),
      icon: MessageSquare,
      href: "/comms/new",
      color: "bg-green-500",
    },
    {
      title: t("quickActions.buttons.newScraper"),
      description: t("quickActions.buttons.newScraper"),
      icon: Bot,
      href: "/scrapers/new",
      color: "bg-purple-500",
    },
    {
      title: t("quickActions.buttons.newCampaign"),
      description: t("quickActions.buttons.newCampaign"),
      icon: Calendar,
      href: "/comms/campaigns/new",
      color: "bg-orange-500",
    },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-4 text-lg text-muted-foreground">{t("loading", { ns: 'common' })}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button onClick={() => router.push("/companies/new")} className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" /> {t("header.addNewCompanyButton")}
        </Button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title={t("stats.totalCompanies")}
          value={stats.totalCompanies.toLocaleString()}
          icon={<Building2 className="h-8 w-8 text-blue-500" />}
          description={t("stats.companiesTracked")}
        />
        <StatCard
          title={t("stats.totalCommunications")}
          value={stats.totalCommunications.toLocaleString()}
          icon={<MessageSquare className="h-8 w-8 text-purple-500" />}
          description={t("stats.communicationsSent")}
        />
        <StatCard
          title={t("stats.activeScrapers")}
          value={stats.activeScrapers.toLocaleString()}
          icon={<Bot className="h-8 w-8 text-green-500" />}
          description={t("stats.scrapersRunning")}
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{t("quickActions.title")}</CardTitle>
            <CardDescription>{t("quickActions.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <QuickActionButton
              icon={<Building2 className="h-5 w-5" />}
              label={t("quickActions.viewCompanies")}
              onClick={() => router.push("/companies")}
            />
            <QuickActionButton
              icon={<MessageSquare className="h-5 w-5" />}
              label={t("quickActions.viewCommunications")}
              onClick={() => router.push("/comms")}
            />
            <QuickActionButton
              icon={<Bot className="h-5 w-5" />}
              label={t("quickActions.manageScrapers")}
              onClick={() => router.push("/scrapers")}
            />
            <QuickActionButton
              icon={<BarChart3 className="h-5 w-5" />}
              label={t("quickActions.viewAnalytics")}
              onClick={() => router.push("/analytics")}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t("recentActivity.title")}</CardTitle>
            <CardDescription>{t("recentActivity.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.recentActivity.length > 0 ? (
              <ul className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <li key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex-shrink-0">
                      {activity.type === "new_company" && <Building2 className="h-5 w-5 text-blue-500" />}
                      {activity.type === "new_communication" && <MessageSquare className="h-5 w-5 text-purple-500" />}
                      {activity.type === "scraper_run" && <Bot className="h-5 w-5 text-green-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()} {new Date(activity.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-10">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-sm text-muted-foreground">{t("recentActivity.noActivity")}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Call to Action / Next Steps */}
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">{t("cta.title")}</CardTitle>
          <CardDescription className="text-blue-100">{t("cta.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" size="lg" onClick={() => router.push("/market-intel")}>
            <TrendingUp className="mr-2 h-5 w-5" /> {t("cta.button")}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper components (StatCard, QuickActionButton)
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
)

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, label, onClick }) => (
  <Button variant="outline" className="w-full justify-start" onClick={onClick}>
    {icon}
    <span className="ml-2">{label}</span>
  </Button>
)
