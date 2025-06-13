"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"
import {
  LayoutDashboard,
  Search,
  Building2,
  LineChart,
  Database,
  BarChart3,
  BarChart2,
  Map,
  PieChart,
  BarChart,
  MessageSquare,
  Wallet,
  RefreshCw,
  Users,
  Star,
  Filter,
  Gauge,
  Video,
  MessageCircle,
  BarChart4,
  Settings,
  Shield,
  UserPlus,
  CreditCard,
  ShieldAlert,
  Monitor,
  FileCheck,
} from "lucide-react"

export function SidebarNav() {
  const pathname = usePathname()
  const { t } = useTranslation('common')

  const navItems = [
    {
      title: t('nav.dashboard'),
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: t('nav.search'),
      href: "/search",
      icon: Search,
    },
    {
      title: t('nav.companies'),
      href: "/companies",
      icon: Building2,
    },
    {
      title: t('nav.marketIntel'),
      href: "/market-intel",
      icon: LineChart,
    },
    {
      title: t('nav.scrapers'),
      href: "/scrapers",
      icon: Database,
    },
    {
      title: t('nav.statistics.title'),
      href: "/statistics",
      icon: BarChart3,
      subItems: [
        {
          title: t('nav.statistics.overview'),
          href: "/statistics/overview",
          icon: BarChart2,
        },
        {
          title: t('nav.statistics.collectionTrends'),
          href: "/statistics/collection-trends",
          icon: BarChart,
        },
        {
          title: t('nav.statistics.geographicDistribution'),
          href: "/statistics/geographic-distribution",
          icon: Map,
        },
        {
          title: t('nav.statistics.sectorDistribution'),
          href: "/statistics/sector-distribution",
          icon: PieChart,
        },
        {
          title: t('nav.statistics.sourceComparison'),
          href: "/statistics/source-comparison",
          icon: BarChart,
        },
      ],
    },
    {
      title: t('nav.communications.title'),
      href: "/comms",
      icon: MessageSquare,
      subItems: [
        {
          title: t('nav.communications.overview'),
          href: "/comms/overview",
          icon: BarChart2,
        },
        {
          title: t('nav.communications.campaigns'),
          href: "/comms/campaigns",
          icon: MessageSquare,
        },
        {
          title: t('nav.communications.templates'),
          href: "/comms/templates",
          icon: MessageSquare,
        },
        {
          title: t('nav.communications.bulkSender'),
          href: "/comms/bulk-sender",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: t('nav.financial.title'),
      href: "/financial",
      icon: Wallet,
      subItems: [
        {
          title: t('nav.financial.records'),
          href: "/financial/records",
          icon: BarChart2,
        },
        {
          title: t('nav.financial.summary'),
          href: "/financial/summary",
          icon: BarChart2,
        },
        {
          title: t('nav.financial.campaignRoi'),
          href: "/financial/campaign-roi",
          icon: BarChart2,
        },
      ],
    },
    {
      title: t('nav.reengagement.title'),
      href: "/reengagement",
      icon: RefreshCw,
      subItems: [
        {
          title: t('nav.reengagement.tasks'),
          href: "/reengagement/tasks",
          icon: BarChart2,
        },
        {
          title: t('nav.reengagement.classification'),
          href: "/reengagement/classification",
          icon: BarChart2,
        },
        {
          title: t('nav.reengagement.automation'),
          href: "/reengagement/automation",
          icon: BarChart2,
        },
      ],
    },
    {
      title: t('nav.referrals.title'),
      href: "/referrals",
      icon: Users,
      subItems: [
        {
          title: t('nav.referrals.dashboard'),
          href: "/referrals/dashboard",
          icon: BarChart2,
        },
        {
          title: t('nav.referrals.tracking'),
          href: "/referrals/tracking",
          icon: BarChart2,
        },
        {
          title: t('nav.referrals.rewards'),
          href: "/referrals/rewards",
          icon: BarChart2,
        },
      ],
    },
    {
      title: t('nav.reviews.title'),
      href: "/reviews",
      icon: Star,
      subItems: [
        {
          title: t('nav.reviews.requests'),
          href: "/reviews/requests",
          icon: BarChart2,
        },
        {
          title: t('nav.reviews.booster'),
          href: "/reviews/booster",
          icon: BarChart2,
        },
        {
          title: t('nav.reviews.monitoring'),
          href: "/reviews/monitoring",
          icon: BarChart2,
        },
      ],
    },
    {
      title: t('nav.funnels.title'),
      href: "/funnels",
      icon: Filter,
      subItems: [
        {
          title: t('nav.funnels.builder'),
          href: "/funnels/builder",
          icon: BarChart2,
        },
        {
          title: t('nav.funnels.progress'),
          href: "/funnels/progress",
          icon: BarChart2,
        },
        {
          title: t('nav.funnels.automation'),
          href: "/funnels/automation",
          icon: BarChart2,
        },
      ],
    },
    {
      title: t('nav.gapAnalysis.title'),
      href: "/gap-analysis",
      icon: Gauge,
      subItems: [
        {
          title: t('nav.gapAnalysis.form'),
          href: "/gap-analysis/form",
          icon: BarChart2,
        },
        {
          title: t('nav.gapAnalysis.letters'),
          href: "/gap-analysis/letters",
          icon: BarChart2,
        },
        {
          title: t('nav.gapAnalysis.results'),
          href: "/gap-analysis/results",
          icon: BarChart2,
        },
      ],
    },
    {
      title: t('nav.vsl.title'),
      href: "/vsl",
      icon: Video,
      subItems: [
        {
          title: t('nav.vsl.templates'),
          href: "/vsl/templates",
          icon: BarChart2,
        },
        {
          title: t('nav.vsl.pages'),
          href: "/vsl/pages",
          icon: BarChart2,
        },
        {
          title: t('nav.vsl.tracking'),
          href: "/vsl/tracking",
          icon: BarChart2,
        },
      ],
    },
    {
      title: t('nav.leadResponse.title'),
      href: "/lead-response",
      icon: MessageCircle,
      subItems: [
        {
          title: t('nav.leadResponse.rules'),
          href: "/lead-response/rules",
          icon: BarChart2,
        },
        {
          title: t('nav.leadResponse.queue'),
          href: "/lead-response/queue",
          icon: BarChart2,
        },
        {
          title: t('nav.leadResponse.analytics'),
          href: "/lead-response/analytics",
          icon: BarChart2,
        },
      ],
    },
    {
      title: t('nav.analytics.title'),
      href: "/analytics",
      icon: BarChart4,
      subItems: [
        {
          title: t('nav.analytics.performance'),
          href: "/analytics/performance",
          icon: BarChart2,
        },
        {
          title: t('nav.analytics.conversion'),
          href: "/analytics/conversion",
          icon: BarChart2,
        },
        {
          title: t('nav.analytics.revenue'),
          href: "/analytics/revenue",
          icon: BarChart2,
        },
      ],
    },
    {
      title: t('nav.admin.title'),
      href: "/admin",
      icon: Shield,
      subItems: [
        {
          title: t('nav.admin.teamManagement'),
          href: "/admin/team",
          icon: UserPlus,
        },
        {
          title: t('nav.admin.users'),
          href: "/admin/users",
          icon: Users,
        },
        {
          title: t('nav.admin.billing'),
          href: "/admin/billing",
          icon: CreditCard,
        },
        {
          title: t('nav.admin.security'),
          href: "/admin/security",
          icon: ShieldAlert,
        },
        {
          title: t('nav.admin.compliance'),
          href: "/admin/compliance",
          icon: FileCheck,
        },
        {
          title: t('nav.admin.monitoring'),
          href: "/admin/monitoring",
          icon: Monitor,
        },
        {
          title: t('nav.admin.antiSpam'),
          href: "/admin/anti-spam",
          icon: ShieldAlert,
        },
      ],
    },
    {
      title: t('nav.settings'),
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="flex flex-col gap-2 p-4">
      {navItems.map((item) => (
        <div key={item.href}>
          <Link
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
          {item.subItems && (
            <div className="ml-6 mt-1 flex flex-col gap-1">
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    pathname === subItem.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <subItem.icon className="h-4 w-4" />
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
