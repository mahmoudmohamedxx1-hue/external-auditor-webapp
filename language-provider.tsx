"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface LanguageContextType {
  isArabic: boolean
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  // Dashboard
  "dashboard.title": { en: "Audit Dashboard", ar: "لوحة المراجعة" },
  "dashboard.overview": { en: "Overview", ar: "نظرة عامة" },
  "dashboard.activeAudits": { en: "Active Audits", ar: "المراجعات النشطة" },
  "dashboard.pendingReviews": { en: "Pending Reviews", ar: "المراجعات المعلقة" },
  "dashboard.completedAudits": { en: "Completed Audits", ar: "المراجعات المكتملة" },
  "dashboard.highRiskItems": { en: "High Risk Items", ar: "العناصر عالية المخاطر" },

  // Documents
  "documents.title": { en: "Document Management", ar: "إدارة المستندات" },
  "documents.upload": { en: "Upload Document", ar: "رفع مستند" },
  "documents.search": { en: "Search documents...", ar: "البحث في المستندات..." },

  // Risk Assessment
  "risk.title": { en: "Risk Assessment", ar: "تقييم المخاطر" },
  "risk.heatmap": { en: "Risk Heat Map", ar: "خريطة المخاطر الحرارية" },
  "risk.trends": { en: "Risk Trends", ar: "اتجاهات المخاطر" },

  // Common
  "common.save": { en: "Save", ar: "حفظ" },
  "common.cancel": { en: "Cancel", ar: "إلغاء" },
  "common.edit": { en: "Edit", ar: "تعديل" },
  "common.delete": { en: "Delete", ar: "حذف" },
  "common.view": { en: "View", ar: "عرض" },
  "common.download": { en: "Download", ar: "تحميل" },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [isArabic, setIsArabic] = useState(false)

  const toggleLanguage = () => {
    setIsArabic(!isArabic)
    document.documentElement.dir = !isArabic ? "rtl" : "ltr"
    document.documentElement.lang = !isArabic ? "ar" : "en"
  }

  const t = (key: string): string => {
    const translation = translations[key as keyof typeof translations]
    if (!translation) return key
    return isArabic ? translation.ar : translation.en
  }

  return <LanguageContext.Provider value={{ isArabic, toggleLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
