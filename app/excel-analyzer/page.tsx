"use client"

import { DeloitteInterface } from "@/components/deloitte-interface"
import { ExcelAnalyzer } from "@/components/excel-analyzer"
import { LanguageProvider, useLanguage } from "@/components/language-provider"

function ExcelAnalyzerContent() {
  const { isArabic } = useLanguage()

  return (
    <DeloitteInterface isArabic={isArabic}>
      <ExcelAnalyzer isArabic={isArabic} />
    </DeloitteInterface>
  )
}

export default function ExcelAnalyzerPage() {
  return (
    <LanguageProvider>
      <ExcelAnalyzerContent />
    </LanguageProvider>
  )
}
