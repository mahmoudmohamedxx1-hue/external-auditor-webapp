"use client"

import { DeloitteInterface } from "@/components/deloitte-interface"
import { ExcelAnalyzer } from "@/components/excel-analyzer"
import { AIAuditAssistant } from "@/components/ai-audit-assistant"
import { AdvancedDashboard } from "@/components/advanced-dashboard"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { FileText, Shield, Target, Brain, CheckCircle, AlertTriangle, FileSpreadsheet, Code } from "lucide-react"

function DashboardContent() {
  const { isArabic } = useLanguage()

  const dashboardStats = [
    {
      title: isArabic ? "المراجعات النشطة" : "Active Audits",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: <Shield className="h-8 w-8" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: isArabic ? "ملفات Excel المحللة" : "Excel Files Analyzed",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: <FileSpreadsheet className="h-8 w-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: isArabic ? "المخاطر المحددة" : "Risks Identified",
      value: "43",
      change: "-5%",
      trend: "down",
      icon: <AlertTriangle className="h-8 w-8" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: isArabic ? "معدل الامتثال" : "Compliance Rate",
      value: "94.5%",
      change: "+2%",
      trend: "up",
      icon: <CheckCircle className="h-8 w-8" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "excel-analysis",
      title: isArabic ? "تحليل ملف Financial_Report_Q4.xlsx" : "Analyzed Financial_Report_Q4.xlsx",
      description: isArabic ? "تم اكتشاف 12 شذوذ محتمل" : "12 potential anomalies detected",
      time: "2 hours ago",
      status: "completed",
      user: "Ahmed Hassan",
      icon: <FileSpreadsheet className="h-4 w-4" />,
      color: "text-blue-600",
    },
    {
      id: 2,
      type: "audit-finding",
      title: isArabic ? "اكتشاف مخاطر عالية في قسم المحاسبة" : "High risk finding in Accounting department",
      description: isArabic ? "يتطلب مراجعة فورية" : "Requires immediate review",
      time: "4 hours ago",
      status: "pending",
      user: "Fatima Ali",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "text-red-600",
    },
    {
      id: 3,
      type: "vba-generation",
      title: isArabic ? "إنشاء كود VBA لتحليل البيانات" : "Generated VBA code for data analysis",
      description: isArabic ? "كود التحقق من صحة البيانات" : "Data validation code",
      time: "6 hours ago",
      status: "completed",
      user: "Mohamed Saeed",
      icon: <Code className="h-4 w-4" />,
      color: "text-green-600",
    },
    {
      id: 4,
      type: "report-generation",
      title: isArabic ? "إنشاء تقرير مراجعة شهري" : "Generated monthly audit report",
      description: isArabic ? "تقرير شامل للمخاطر والامتثال" : "Comprehensive risk and compliance report",
      time: "1 day ago",
      status: "completed",
      user: "Sarah Ahmed",
      icon: <FileText className="h-4 w-4" />,
      color: "text-purple-600",
    },
  ]

  const quickActions = [
    {
      id: "new-analysis",
      title: isArabic ? "تحليل جديد" : "New Analysis",
      description: isArabic ? "ابدأ تحليل ملف Excel جديد" : "Start analyzing a new Excel file",
      icon: <FileSpreadsheet className="h-5 w-5" />,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: "generate-vba",
      title: isArabic ? "إنشاء VBA" : "Generate VBA",
      description: isArabic ? "أنشئ كود VBA مخصص" : "Create custom VBA code",
      icon: <Code className="h-5 w-5" />,
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      id: "risk-assessment",
      title: isArabic ? "تقييم المخاطر" : "Risk Assessment",
      description: isArabic ? "قم بتقييم المخاطر المالية" : "Assess financial risks",
      icon: <Target className="h-5 w-5" />,
      color: "bg-orange-600 hover:bg-orange-700",
    },
    {
      id: "ai-assistant",
      title: isArabic ? "المساعد الذكي" : "AI Assistant",
      description: isArabic ? "احصل على مساعدة من Grok" : "Get help from Grok",
      icon: <Brain className="h-5 w-5" />,
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ]

  const systemHealth = [
    {
      name: isArabic ? "xAI Grok" : "xAI Grok",
      status: "online",
      uptime: "99.9%",
      responseTime: "1.2s",
    },
    {
      name: isArabic ? "محلل Excel" : "Excel Analyzer",
      status: "online",
      uptime: "99.8%",
      responseTime: "0.8s",
    },
    {
      name: isArabic ? "قاعدة البيانات" : "Database",
      status: "online",
      uptime: "100%",
      responseTime: "0.3s",
    },
    {
      name: isArabic ? "API الخدمات" : "Services API",
      status: "online",
      uptime: "99.7%",
      responseTime: "0.5s",
    },
  ]

  return (
    <DeloitteInterface isArabic={isArabic}>
      <div className="space-y-8">
        {/* Advanced Dashboard */}
        <AdvancedDashboard isArabic={isArabic} />

        {/* Main Tools Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Excel Analyzer */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isArabic ? "محلل Excel المتقدم" : "Advanced Excel Analyzer"}
            </h2>
            <ExcelAnalyzer isArabic={isArabic} />
          </div>

          {/* AI Assistant */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">{isArabic ? "المساعد الذكي" : "AI Assistant"}</h2>
            <AIAuditAssistant isArabic={isArabic} />
          </div>
        </div>
      </div>
    </DeloitteInterface>
  )
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  )
}
