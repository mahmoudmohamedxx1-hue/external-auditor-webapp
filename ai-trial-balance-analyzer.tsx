"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
  BarChart3,
  Target,
  Zap,
  Download,
  Upload,
  Search,
  Filter,
} from "lucide-react"

interface TrialBalanceItem {
  accountCode: string
  accountName: string
  accountNameAr: string
  debitBalance: number
  creditBalance: number
  priorYearBalance: number
  variance: number
  variancePercent: number
  riskScore: number
  aiAnalysis: {
    anomalyDetected: boolean
    confidence: number
    riskLevel: "low" | "medium" | "high" | "critical"
    recommendations: string[]
    recommendationsAr: string[]
    patterns: string[]
    patternsAr: string[]
  }
  category: string
  categoryAr: string
}

interface AITrialBalanceAnalyzerProps {
  isArabic: boolean
}

const mockTrialBalanceData: TrialBalanceItem[] = [
  {
    accountCode: "5130",
    accountName: "Cash and Cash Equivalents",
    accountNameAr: "النقدية بالصندوق ولدى البنوك",
    debitBalance: 2450000,
    creditBalance: 0,
    priorYearBalance: 1890000,
    variance: 560000,
    variancePercent: 29.6,
    riskScore: 75,
    aiAnalysis: {
      anomalyDetected: true,
      confidence: 0.89,
      riskLevel: "high",
      recommendations: [
        "Investigate significant cash increase",
        "Verify bank reconciliations",
        "Test cash management controls",
      ],
      recommendationsAr: [
        "التحقق من الزيادة الكبيرة في النقدية",
        "التحقق من مطابقات البنك",
        "اختبار ضوابط إدارة النقدية",
      ],
      patterns: ["Unusual cash accumulation pattern", "Seasonal variance detected"],
      patternsAr: ["نمط تراكم نقدي غير عادي", "تباين موسمي مكتشف"],
    },
    category: "Assets",
    categoryAr: "الأصول",
  },
  {
    accountCode: "5230",
    accountName: "Trade Receivables and Other Debtors",
    accountNameAr: "المدينون والأرصدة المدينة الأخرى",
    debitBalance: 8750000,
    creditBalance: 0,
    priorYearBalance: 7200000,
    variance: 1550000,
    variancePercent: 21.5,
    riskScore: 65,
    aiAnalysis: {
      anomalyDetected: true,
      confidence: 0.92,
      riskLevel: "medium",
      recommendations: ["Analyze aging of receivables", "Test collectibility assessment", "Review credit policies"],
      recommendationsAr: ["تحليل تقادم الذمم المدينة", "اختبار تقييم القابلية للتحصيل", "مراجعة سياسات الائتمان"],
      patterns: ["Growth in line with revenue increase", "Aging pattern within normal range"],
      patternsAr: ["النمو متماشي مع زيادة الإيرادات", "نمط التقادم ضمن المدى الطبيعي"],
    },
    category: "Assets",
    categoryAr: "الأصول",
  },
  {
    accountCode: "5330",
    accountName: "Customers and Bills Receivable (Net)",
    accountNameAr: "العملاء وأوراق القبض (بالصافي)",
    debitBalance: 12300000,
    creditBalance: 0,
    priorYearBalance: 11800000,
    variance: 500000,
    variancePercent: 4.2,
    riskScore: 35,
    aiAnalysis: {
      anomalyDetected: false,
      confidence: 0.94,
      riskLevel: "low",
      recommendations: ["Standard confirmation procedures", "Test subsequent collections", "Review allowance adequacy"],
      recommendationsAr: ["إجراءات التأكيد المعيارية", "اختبار التحصيلات اللاحقة", "مراجعة كفاية المخصص"],
      patterns: ["Stable growth pattern", "Consistent with business expansion"],
      patternsAr: ["نمط نمو مستقر", "متسق مع توسع الأعمال"],
    },
    category: "Assets",
    categoryAr: "الأصول",
  },
  {
    accountCode: "8130",
    accountName: "Sales and Operating Revenue",
    accountNameAr: "المبيعات وإيرادات النشاط",
    debitBalance: 0,
    creditBalance: 45600000,
    priorYearBalance: 38900000,
    variance: 6700000,
    variancePercent: 17.2,
    riskScore: 55,
    aiAnalysis: {
      anomalyDetected: true,
      confidence: 0.87,
      riskLevel: "medium",
      recommendations: [
        "Test revenue recognition timing",
        "Analyze monthly revenue trends",
        "Verify cut-off procedures",
      ],
      recommendationsAr: ["اختبار توقيت إقرار الإيرادات", "تحليل اتجاهات الإيرادات الشهرية", "التحقق من إجراءات القطع"],
      patterns: ["Q4 revenue spike detected", "New contract impact identified"],
      patternsAr: ["ارتفاع مكتشف في إيرادات الربع الرابع", "تأثير العقود الجديدة محدد"],
    },
    category: "Revenue",
    categoryAr: "الإيرادات",
  },
  {
    accountCode: "8230",
    accountName: "Cost of Activities",
    accountNameAr: "تكاليف النشاط",
    debitBalance: 28900000,
    creditBalance: 0,
    priorYearBalance: 24100000,
    variance: 4800000,
    variancePercent: 19.9,
    riskScore: 45,
    aiAnalysis: {
      anomalyDetected: false,
      confidence: 0.91,
      riskLevel: "low",
      recommendations: ["Test cost allocation methods", "Verify inventory costing", "Analyze gross margin trends"],
      recommendationsAr: ["اختبار طرق توزيع التكاليف", "التحقق من تكلفة المخزون", "تحليل اتجاهات الهامش الإجمالي"],
      patterns: ["Cost increase proportional to revenue", "Margin maintained within target"],
      patternsAr: ["زيادة التكلفة متناسبة مع الإيرادات", "الهامش محافظ عليه ضمن المستهدف"],
    },
    category: "Expenses",
    categoryAr: "المصروفات",
  },
]

export function AITrialBalanceAnalyzer({ isArabic }: AITrialBalanceAnalyzerProps) {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [filterRisk, setFilterRisk] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            setIsAnalyzing(false)
            return 100
          }
          return prev + 10
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isAnalyzing])

  const runAIAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskText = (risk: string) => {
    switch (risk) {
      case "critical":
        return isArabic ? "حرج" : "Critical"
      case "high":
        return isArabic ? "عالي" : "High"
      case "medium":
        return isArabic ? "متوسط" : "Medium"
      case "low":
        return isArabic ? "منخفض" : "Low"
      default:
        return risk
    }
  }

  const filteredData = mockTrialBalanceData.filter((item) => {
    if (filterRisk !== "all" && item.aiAnalysis.riskLevel !== filterRisk) return false
    if (filterCategory !== "all" && item.category !== filterCategory) return false
    if (
      searchTerm &&
      !item.accountName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.accountNameAr.includes(searchTerm) &&
      !item.accountCode.includes(searchTerm)
    )
      return false
    return true
  })

  const totalAnomalies = mockTrialBalanceData.filter((item) => item.aiAnalysis.anomalyDetected).length
  const averageConfidence =
    mockTrialBalanceData.reduce((acc, item) => acc + item.aiAnalysis.confidence, 0) / mockTrialBalanceData.length
  const highRiskAccounts = mockTrialBalanceData.filter(
    (item) => item.aiAnalysis.riskLevel === "high" || item.aiAnalysis.riskLevel === "critical",
  ).length

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Brain className="h-6 w-6 text-purple-600" />
              <span>{isArabic ? "محلل الميزان التجريبي بالذكاء الاصطناعي" : "AI Trial Balance Analyzer"}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isArabic ? "رفع البيانات" : "Upload Data"}
              </Button>
              <Button size="sm" onClick={runAIAnalysis} disabled={isAnalyzing}>
                <Zap className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isAnalyzing
                  ? isArabic
                    ? "جاري التحليل..."
                    : "Analyzing..."
                  : isArabic
                    ? "تشغيل التحليل"
                    : "Run Analysis"}
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            {isArabic
              ? "تحليل متقدم للميزان التجريبي مع كشف الشذوذات وتقييم المخاطر"
              : "Advanced trial balance analysis with anomaly detection and risk assessment"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isAnalyzing && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>{isArabic ? "تقدم التحليل" : "Analysis Progress"}</span>
                <span>{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-600">{totalAnomalies}</p>
              <p className="text-sm text-gray-600">{isArabic ? "شذوذات مكتشفة" : "Anomalies Detected"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{Math.round(averageConfidence * 100)}%</p>
              <p className="text-sm text-gray-600">{isArabic ? "متوسط الثقة" : "Avg Confidence"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{mockTrialBalanceData.length}</p>
              <p className="text-sm text-gray-600">{isArabic ? "حسابات محللة" : "Accounts Analyzed"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BarChart3 className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{highRiskAccounts}</p>
              <p className="text-sm text-gray-600">{isArabic ? "حسابات عالية المخاطر" : "High Risk Accounts"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={isArabic ? "البحث في الحسابات..." : "Search accounts..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rtl:pr-10 rtl:pl-3"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                className="px-3 py-2 border rounded-md text-sm"
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
              >
                <option value="all">{isArabic ? "كل المخاطر" : "All Risks"}</option>
                <option value="critical">{isArabic ? "حرج" : "Critical"}</option>
                <option value="high">{isArabic ? "عالي" : "High"}</option>
                <option value="medium">{isArabic ? "متوسط" : "Medium"}</option>
                <option value="low">{isArabic ? "منخفض" : "Low"}</option>
              </select>
              <select
                className="px-3 py-2 border rounded-md text-sm"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">{isArabic ? "كل الفئات" : "All Categories"}</option>
                <option value="Assets">{isArabic ? "الأصول" : "Assets"}</option>
                <option value="Liabilities">{isArabic ? "الخصوم" : "Liabilities"}</option>
                <option value="Equity">{isArabic ? "حقوق الملكية" : "Equity"}</option>
                <option value="Revenue">{isArabic ? "الإيرادات" : "Revenue"}</option>
                <option value="Expenses">{isArabic ? "المصروفات" : "Expenses"}</option>
              </select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isArabic ? "تصدير" : "Export"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{isArabic ? "نظرة عامة" : "Overview"}</TabsTrigger>
          <TabsTrigger value="anomalies">{isArabic ? "الشذوذات" : "Anomalies"}</TabsTrigger>
          <TabsTrigger value="trends">{isArabic ? "الاتجاهات" : "Trends"}</TabsTrigger>
          <TabsTrigger value="recommendations">{isArabic ? "التوصيات" : "Recommendations"}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {filteredData.map((item) => (
              <Card
                key={item.accountCode}
                className={`hover:shadow-md transition-shadow ${item.aiAnalysis.anomalyDetected ? "border-l-4 border-orange-500" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {item.accountCode} - {isArabic ? item.accountNameAr : item.accountName}
                        </h4>
                        <Badge className={getRiskColor(item.aiAnalysis.riskLevel)}>
                          {getRiskText(item.aiAnalysis.riskLevel)}
                        </Badge>
                        {item.aiAnalysis.anomalyDetected && (
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            <AlertTriangle className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                            {isArabic ? "شذوذ" : "Anomaly"}
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">{isArabic ? "الرصيد الحالي" : "Current Balance"}</p>
                          <p className="font-medium">
                            {(item.debitBalance || item.creditBalance).toLocaleString()} {isArabic ? "ج.م" : "EGP"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{isArabic ? "العام السابق" : "Prior Year"}</p>
                          <p className="font-medium">
                            {item.priorYearBalance.toLocaleString()} {isArabic ? "ج.م" : "EGP"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{isArabic ? "التباين" : "Variance"}</p>
                          <p className={`font-medium ${item.variance > 0 ? "text-green-600" : "text-red-600"}`}>
                            {item.variancePercent > 0 ? "+" : ""}
                            {item.variancePercent.toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{isArabic ? "نقاط المخاطر" : "Risk Score"}</p>
                          <p className="font-medium">{item.riskScore}/100</p>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-3 rounded-lg">
                        <h5 className="font-medium text-purple-900 mb-2 flex items-center space-x-1 rtl:space-x-reverse">
                          <Brain className="h-4 w-4" />
                          <span>{isArabic ? "تحليل الذكاء الاصطناعي" : "AI Analysis"}</span>
                          <Badge variant="outline" className="ml-2 rtl:mr-2 rtl:ml-0">
                            {Math.round(item.aiAnalysis.confidence * 100)}% {isArabic ? "ثقة" : "confidence"}
                          </Badge>
                        </h5>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-purple-800 mb-1">
                              {isArabic ? "التوصيات:" : "Recommendations:"}
                            </p>
                            <ul className="text-sm text-purple-700 space-y-1">
                              {(isArabic ? item.aiAnalysis.recommendationsAr : item.aiAnalysis.recommendations).map(
                                (rec, index) => (
                                  <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                                    <span className="text-purple-600">•</span>
                                    <span>{rec}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-purple-800 mb-1">
                              {isArabic ? "الأنماط المكتشفة:" : "Detected Patterns:"}
                            </p>
                            <ul className="text-sm text-purple-700 space-y-1">
                              {(isArabic ? item.aiAnalysis.patternsAr : item.aiAnalysis.patterns).map(
                                (pattern, index) => (
                                  <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                                    <span className="text-purple-600">•</span>
                                    <span>{pattern}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button variant="outline" size="sm" onClick={() => setSelectedAccount(item.accountCode)}>
                        <FileText className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {isArabic ? "التفاصيل" : "Details"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="anomalies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>{isArabic ? "الشذوذات المكتشفة" : "Detected Anomalies"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrialBalanceData
                  .filter((item) => item.aiAnalysis.anomalyDetected)
                  .map((item) => (
                    <div key={item.accountCode} className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-orange-900">
                          {item.accountCode} - {isArabic ? item.accountNameAr : item.accountName}
                        </h4>
                        <Badge className={getRiskColor(item.aiAnalysis.riskLevel)}>
                          {getRiskText(item.aiAnalysis.riskLevel)}
                        </Badge>
                      </div>
                      <p className="text-sm text-orange-800 mb-2">
                        {isArabic ? "مستوى الثقة:" : "Confidence Level:"} {Math.round(item.aiAnalysis.confidence * 100)}
                        %
                      </p>
                      <div className="text-sm text-orange-700">
                        <p className="font-medium mb-1">{isArabic ? "الأنماط المكتشفة:" : "Detected Patterns:"}</p>
                        <ul className="list-disc list-inside space-y-1">
                          {(isArabic ? item.aiAnalysis.patternsAr : item.aiAnalysis.patterns).map((pattern, index) => (
                            <li key={index}>{pattern}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>{isArabic ? "تحليل الاتجاهات" : "Trend Analysis"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {isArabic ? "تحليل الاتجاهات المتقدم" : "Advanced Trend Analysis"}
                </h3>
                <p className="text-gray-500 mb-4">
                  {isArabic
                    ? "سيتم عرض الرسوم البيانية والاتجاهات التفصيلية هنا"
                    : "Detailed charts and trend analysis will be displayed here"}
                </p>
                <Button>
                  <TrendingUp className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {isArabic ? "إنشاء تحليل الاتجاهات" : "Generate Trend Analysis"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{isArabic ? "توصيات الذكاء الاصطناعي" : "AI Recommendations"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">
                    {isArabic ? "توصيات عالية الأولوية" : "High Priority Recommendations"}
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2 rtl:space-x-reverse">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-green-800">
                        {isArabic
                          ? "التحقق من الزيادة الكبيرة في النقدية (حساب 5130) - تباين 29.6%"
                          : "Investigate significant cash increase (Account 5130) - 29.6% variance"}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2 rtl:space-x-reverse">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-green-800">
                        {isArabic
                          ? "مراجعة إجراءات إقرار الإيرادات للربع الرابع (حساب 8130)"
                          : "Review Q4 revenue recognition procedures (Account 8130)"}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2 rtl:space-x-reverse">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-green-800">
                        {isArabic
                          ? "تعزيز اختبارات تقادم الذمم المدينة (حساب 5230)"
                          : "Enhance aging analysis for trade receivables (Account 5230)"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">
                    {isArabic ? "توصيات متوسطة الأولوية" : "Medium Priority Recommendations"}
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2 rtl:space-x-reverse">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-blue-800">
                        {isArabic
                          ? "تحليل اتجاهات الهامش الإجمالي للتكاليف"
                          : "Analyze gross margin trends for cost accounts"}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2 rtl:space-x-reverse">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-blue-800">
                        {isArabic
                          ? "مراجعة سياسات الائتمان وإجراءات التحصيل"
                          : "Review credit policies and collection procedures"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-3">
                    {isArabic ? "توصيات منخفضة الأولوية" : "Low Priority Recommendations"}
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2 rtl:space-x-reverse">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <span className="text-yellow-800">
                        {isArabic
                          ? "إجراءات التأكيد المعيارية للحسابات منخفضة المخاطر"
                          : "Standard confirmation procedures for low-risk accounts"}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2 rtl:space-x-reverse">
                      <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <span className="text-yellow-800">
                        {isArabic ? "مراجعة دورية لكفاية المخصصات" : "Periodic review of allowance adequacy"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
