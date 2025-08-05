"use client"

import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { SystemAuditFramework } from "@/components/system-audit-framework"
import { AuditToolsTechniques } from "@/components/audit-tools-techniques"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function SystemAuditContent() {
  const { isArabic, toggleLanguage } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isArabic={isArabic} toggleLanguage={toggleLanguage} />

      <main className={`p-6 ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isArabic ? "إطار عمل مراجعة الأنظمة المتقدم" : "Advanced System Audit Framework"}
            </h1>
            <p className="text-gray-600">
              {isArabic
                ? "نظام شامل لإجراء مراجعات الأنظمة المختلفة مع أدوات وتقنيات متقدمة"
                : "Comprehensive system for conducting various system audits with advanced tools and techniques"}
            </p>
          </div>

          <Tabs defaultValue="framework" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="framework">{isArabic ? "إطار العمل" : "Framework"}</TabsTrigger>
              <TabsTrigger value="tools">{isArabic ? "الأدوات والتقنيات" : "Tools & Techniques"}</TabsTrigger>
            </TabsList>

            <TabsContent value="framework">
              <SystemAuditFramework isArabic={isArabic} />
            </TabsContent>

            <TabsContent value="tools">
              <AuditToolsTechniques isArabic={isArabic} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default function SystemAuditPage() {
  return (
    <LanguageProvider>
      <SystemAuditContent />
    </LanguageProvider>
  )
}
