import { Suspense } from "react"
import Link from "next/link"
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import { DataTable } from "@/components/data/tables/DataTable"
import { PageLoader } from "@/components/core/loading/PageLoader"
import { ROUTES } from "@/constants/routes"

export const metadata = {
  title: "Campaigns | SIKRY",
  description: "Manage your communication campaigns",
}

export default function CampaignsPage() {
  const { t } = useTranslation('commsPage');

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('campaignsList.header.title')}</h1>
          <p className="text-muted-foreground">{t('campaignsList.header.description')}</p>
        </div>
        <Button asChild>
          <Link href={ROUTES.CAMPAIGNS + "/new"}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('campaignsList.header.newButton')}
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">{t('campaignsList.tabs.active')}</TabsTrigger>
          <TabsTrigger value="draft">{t('campaignsList.tabs.draft')}</TabsTrigger>
          <TabsTrigger value="completed">{t('campaignsList.tabs.completed')}</TabsTrigger>
          <TabsTrigger value="all">{t('campaignsList.tabs.all')}</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <Suspense fallback={<PageLoader />}>
            <CampaignsList status="active" />
          </Suspense>
        </TabsContent>
        <TabsContent value="draft" className="space-y-4">
          <Suspense fallback={<PageLoader />}>
            <CampaignsList status="draft" />
          </Suspense>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <Suspense fallback={<PageLoader />}>
            <CampaignsList status="completed" />
          </Suspense>
        </TabsContent>
        <TabsContent value="all" className="space-y-4">
          <Suspense fallback={<PageLoader />}>
            <CampaignsList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import CampaignsTable from "@/components/comms/CampaignsTable";

function CampaignsList({ status }: { status?: string }) {
  // In a real app, this would fetch data from the API
  const campaigns = Array.from({ length: 10 }).map((_, i) => ({
    id: `camp-${i + 1}`,
    name: `Campaign ${i + 1}`,
    type: i % 3 === 0 ? "email" : i % 3 === 1 ? "linkedin" : "multi-channel",
    status: status || (i % 4 === 0 ? "active" : i % 4 === 1 ? "draft" : i % 4 === 2 ? "paused" : "completed"),
    sent: Math.floor(Math.random() * 1000),
    opened: Math.floor(Math.random() * 500),
    clicked: Math.floor(Math.random() * 200),
    replied: Math.floor(Math.random() * 100),
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  }))

  return <CampaignsTable campaigns={campaigns} status={status} />
}
