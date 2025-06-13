import { Suspense } from "react"
import Link from "next/link"
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Mail, Linkedin, Phone } from "lucide-react"
import { PageLoader } from "@/components/core/loading/PageLoader"
import { ROUTES } from "@/constants/routes"

export const metadata = {
  title: "Templates | SIKRY",
  description: "Manage your communication templates",
}

export default function TemplatesPage() {
  const { t } = useTranslation('commsPage');

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('templatesList.header.title')}</h1>
          <p className="text-muted-foreground">{t('templatesList.header.description')}</p>
        </div>
        <Button asChild>
          <Link href={ROUTES.TEMPLATES + "/new"}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('templatesList.header.newButton')}
          </Link>
        </Button>
      </div>

      <Suspense fallback={<PageLoader />}>
        <TemplatesList />
      </Suspense>
    </div>
  )
}

function TemplatesList() {
  const { t } = useTranslation('commsPage');

  // Define static parts and map them to include translated fields
  const templateDefinitions = [
    {
      id: "email-welcome",
      type: "email",
      nameKey: "templatesList.mockTemplates.emailWelcome.name",
      descriptionKey: "templatesList.mockTemplates.emailWelcome.description",
      lastModified: "2024-03-15", // This would typically come from data, not hardcoded
      icon: Mail,
    },
    {
      id: "linkedin-connection",
      type: "linkedin",
      nameKey: "templatesList.mockTemplates.linkedinConnection.name",
      descriptionKey: "templatesList.mockTemplates.linkedinConnection.description",
      lastModified: "2024-03-14",
      icon: Linkedin,
    },
    {
      id: "phone-call-script",
      type: "phone",
      nameKey: "templatesList.mockTemplates.salesCallScript.name",
      descriptionKey: "templatesList.mockTemplates.salesCallScript.description",
      lastModified: "2024-03-13",
      icon: Phone,
    },
  ];

  const templates = templateDefinitions.map(def => ({
    ...def,
    name: t(def.nameKey),
    description: t(def.descriptionKey),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Link key={template.id} href={`/comms/templates/${template.id}`}>
          <Card className="h-full hover:bg-muted/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <template.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{template.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="capitalize">{t(`templatesList.types.${template.type}`)}</span>
                <span>{t("templatesList.card.modifiedLabel", { date: template.lastModified })}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
