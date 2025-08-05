"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface LanguageContextType {
  isArabic: boolean
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    documents: "Documents",
    checklists: "Checklists",
    systemAudit: "System Audit",
    riskAssessment: "Risk Assessment",
    reports: "Reports",
    team: "Team",
    compliance: "Compliance",
    settings: "Settings",

    // Common
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    create: "Create",
    update: "Update",
    search: "Search",
    filter: "Filter",
    export: "Export",
    import: "Import",

    // Dashboard
    totalAudits: "Total Audits",
    completedAudits: "Completed Audits",
    pendingAudits: "Pending Audits",
    overdueAudits: "Overdue Audits",
    highRiskItems: "High Risk Items",

    // Audit
    auditPlanning: "Audit Planning",
    auditExecution: "Audit Execution",
    auditReporting: "Audit Reporting",
    auditFollowUp: "Audit Follow-Up",

    // Risk
    riskLevel: "Risk Level",
    riskCategory: "Risk Category",
    riskDescription: "Risk Description",
    riskMitigation: "Risk Mitigation",

    // Status
    active: "Active",
    inactive: "Inactive",
    completed: "Completed",
    pending: "Pending",
    inProgress: "In Progress",
    overdue: "Overdue",

    // Time
    today: "Today",
    yesterday: "Yesterday",
    thisWeek: "This Week",
    thisMonth: "This Month",
    thisYear: "This Year",
  },
  ar: {
    // Navigation
    dashboard: "الرئيسية",
    documents: "الوثائق",
    checklists: "قوائم المراجعة",
    systemAudit: "مراجعة الأنظمة",
    riskAssessment: "تقييم المخاطر",
    reports: "التقارير",
    team: "الفريق",
    compliance: "الامتثال",
    settings: "الإعدادات",

    // Common
    loading: "جاري التحميل...",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    view: "عرض",
    create: "إنشاء",
    update: "تحديث",
    search: "بحث",
    filter: "تصفية",
    export: "تصدير",
    import: "استيراد",

    // Dashboard
    totalAudits: "إجمالي المراجعات",
    completedAudits: "المراجعات المكتملة",
    pendingAudits: "المراجعات المعلقة",
    overdueAudits: "المراجعات المتأخرة",
    highRiskItems: "العناصر عالية المخاطر",

    // Audit
    auditPlanning: "تخطيط المراجعة",
    auditExecution: "تنفيذ المراجعة",
    auditReporting: "تقرير المراجعة",
    auditFollowUp: "متابعة المراجعة",

    // Risk
    riskLevel: "مستوى المخاطر",
    riskCategory: "فئة المخاطر",
    riskDescription: "وصف المخاطر",
    riskMitigation: "تخفيف المخاطر",

    // Status
    active: "نشط",
    inactive: "غير نشط",
    completed: "مكتمل",
    pending: "معلق",
    inProgress: "قيد التنفيذ",
    overdue: "متأخر",

    // Time
    today: "اليوم",
    yesterday: "أمس",
    thisWeek: "هذا الأسبوع",
    thisMonth: "هذا الشهر",
    thisYear: "هذا العام",
  },
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [isArabic, setIsArabic] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage === "ar") {
      setIsArabic(true)
      document.documentElement.dir = "rtl"
      document.documentElement.lang = "ar"
    } else {
      setIsArabic(false)
      document.documentElement.dir = "ltr"
      document.documentElement.lang = "en"
    }
  }, [])

  const toggleLanguage = () => {
    const newIsArabic = !isArabic
    setIsArabic(newIsArabic)

    if (newIsArabic) {
      localStorage.setItem("language", "ar")
      document.documentElement.dir = "rtl"
      document.documentElement.lang = "ar"
    } else {
      localStorage.setItem("language", "en")
      document.documentElement.dir = "ltr"
      document.documentElement.lang = "en"
    }
  }

  const t = (key: string): string => {
    const currentTranslations = isArabic ? translations.ar : translations.en
    return currentTranslations[key as keyof typeof currentTranslations] || key
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
