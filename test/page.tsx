"use client"

import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { WebsiteTester } from "@/components/website-tester"
import { ManualTestChecklist } from "@/components/manual-test-checklist"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TestTube, CheckSquare } from "lucide-react"

function TestPageContent() {
  const { isArabic, toggleLanguage } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isArabic={isArabic} toggleLanguage={toggleLanguage} />

      <main className={`p-6 ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isArabic ? "مركز اختبار الموقع" : "Website Testing Center"}
            </h1>
            <p className="text-gray-600">
              {isArabic
                ? "اختبار شامل لجميع وظائف نظام المراجعة المصري"
                : "Comprehensive testing for all Egyptian Audit System functions"}
            </p>
          </div>

          <Tabs defaultValue="automated" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="automated" className="flex items-center space-x-2 rtl:space-x-reverse">
                <TestTube className="h-4 w-4" />
                <span>{isArabic ? "الاختبار التلقائي" : "Automated Testing"}</span>
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center space-x-2 rtl:space-x-reverse">
                <CheckSquare className="h-4 w-4" />
                <span>{isArabic ? "الاختبار اليدوي" : "Manual Testing"}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="automated">
              <WebsiteTester isArabic={isArabic} />
            </TabsContent>

            <TabsContent value="manual">
              <ManualTestChecklist isArabic={isArabic} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default function TestPage() {
  return (
    <LanguageProvider>
      <TestPageContent />
    </LanguageProvider>
  )
}
