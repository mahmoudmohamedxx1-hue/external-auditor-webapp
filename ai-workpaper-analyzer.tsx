"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ScatterChart, Scatter, Cell } from "recharts"
import { Brain, AlertTriangle, CheckCircle, TrendingUp, Eye, Download, Zap, Target, Search } from "lucide-react"

interface WorkpaperAnalysis {
  id: string
  fileName: string
  fileNameAr: string
  analysisStatus: "completed" | "processing" | "pending"
  riskScore: number
  anomalies: number
  confidence: number
  findings: Finding[]
  patterns: Pattern[]
  recommendations: Recommendation[]
}

interface Finding {
  id: string
  type: "anomaly" | "inconsistency" | "missing_data" | "compliance_issue"
  severity: "high" | "medium" | "low"
  description: string
  descriptionAr: string
  location: string
  confidence: number
  suggestedAction: string
  suggestedActionAr: string
}

interface Pattern {
  id: string
  name: string
  nameAr: string
  frequency: number
  significance: number
  trend: "increasing" | "decreasing" | "stable"
}

interface Recommendation {
  id: string
  priority: "critical" | "high" | "medium" | "low"
  category: string
  categoryAr: string
  action: string
  actionAr: string
  impact: string
  impactAr: string
  effort: "low" | "medium" | "high"
}

const mockAnalysis: WorkpaperAnalysis = {
  id: "wp_001",
  fileName: "Financial_Statements_Q4_2023.pdf",
  fileNameAr: "القوائم_المالية_الربع_الرابع_2023.pdf",
  analysisStatus: "completed",
  riskScore: 75,
  anomalies: 8,
  confidence: 92,
  findings: [
    {
      id: "f1",
      type: "anomaly",
      severity: "high",
      description: "Unusual spike in revenue during December 2023",
      descriptionAr: "ارتفاع غير عادي في الإيرادات خلال ديسمبر 2023",
      location: "Income Statement - Line 15",
      confidence: 89,
      suggestedAction: "Verify revenue recognition procedures and supporting documentation",
      suggestedActionAr: "التحقق من إجراءات إقرار الإيرادات والمستندات المؤيدة",
    },
    {
      id: "f2",
      type: "inconsistency",
      severity: "medium",
      description: "Accounts receivable aging doesn't match subsidiary ledger",
      descriptionAr: "تقادم الذمم المدينة لا يطابق دفتر الأستاذ المساعد",
      location: "Balance Sheet - Note 3",
      confidence: 94,
      suggestedAction: "Reconcile accounts receivable aging with detailed records",
      suggestedActionAr: "مطابقة تقادم الذمم المدينة مع السجلات التفصيلية",
    },
    {
      id: "f3",
      type: "compliance_issue",
      severity: "high",
      description: "Missing disclosure for related party transactions per EAS 24",
      descriptionAr: "إفصاح مفقود عن معاملات الأطراف ذات العلاقة وفقاً لمعيار المراجعة المصري 24",
      location: "Notes to Financial Statements",
      confidence: 96,
      suggestedAction: "Add required disclosures for related party transactions",
      suggestedActionAr: "إضافة الإفصاحات المطلوبة لمعاملات الأطراف ذات العلاقة",
    },
  ],
  patterns: [
    {
      id: "p1",
      name: "Seasonal Revenue Pattern",
      nameAr: "نمط الإيرادات الموسمية",
      frequency: 85,
      significance: 78,
      trend: "increasing",
    },
    {
      id: "p2",
      name: "Expense Timing Variations",
      nameAr: "تغيرات توقيت المصروفات",
      frequency: 62,
      significance: 45,
      trend: "stable",
    },
  ],
  recommendations: [
    {
      id: "r1",
      priority: "critical",
      category: "Compliance",
      categoryAr: "الامتثال",
      action: "Implement automated EAS compliance checking",
      actionAr: "تنفيذ فحص الامتثال التلقائي لمعايير المراجعة المصرية",
      impact: "Reduces compliance risk by 60%",
      impactAr: "يقلل مخاطر الامتثال بنسبة 60%",
      effort: "medium",
    },
    {
      id: "r2",
      priority: "high",
      category: "Data Quality",
      categoryAr: "جودة البيانات",
      action: "Establish monthly reconciliation procedures",
      actionAr: "وضع إجراءات مطابقة شهرية",
      impact: "Improves data accuracy by 40%",
      impactAr: "يحسن دقة البيانات بنسبة 40%",
      effort: "low",
    },
  ],
}

const anomalyTrendData = [
  { month: "Jan", anomalies: 5, resolved: 4 },
  { month: "Feb", anomalies: 8, resolved: 6 },
  { month: "Mar", anomalies: 6, resolved: 5 },
  { month: "Apr", anomalies: 12, resolved: 8 },
  { month: "May", anomalies: 9, resolved: 7 },
  { month: "Jun", anomalies: 8, resolved: 8 },
]

const riskDistribution = [
  { category: "Revenue Recognition", risk: 85, impact: 9, probability: 7 },
  { category: "Asset Valuation", risk: 72, impact: 8, probability: 6 },
  { category: "Compliance", risk: 68, impact: 7, probability: 8 },
  { category: "Internal Controls", risk: 45, impact: 5, probability: 7 },
  { category: "Related Parties", risk: 90, impact: 9, probability: 8 },
]

interface AIWorkpaperAnalyzerProps {
  isArabic: boolean
}

export function AIWorkpaperAnalyzer({ isArabic }: AIWorkpaperAnalyzerProps) {
  const [selectedAnalysis] = useState<WorkpaperAnalysis>(mockAnalysis)
  const [activeTab, setActiveTab] = useState("findings")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return "#EF4444"
    if (risk >= 60) return "#F59E0B"
    return "#10B981"
  }

  return (
    <div className="space-y-6">
      {/* Analysis Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>{isArabic ? "تحليل أوراق العمل بالذكاء الاصطناعي" : "AI-Powered Workpaper Analysis"}</span>
          </CardTitle>
          <CardDescription>{isArabic ? selectedAnalysis.fileNameAr : selectedAnalysis.fileName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">{selectedAnalysis.riskScore}</p>
              <p className="text-sm text-gray-600">{isArabic ? "نقاط المخاطر" : "Risk Score"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-600">{selectedAnalysis.anomalies}</p>
              <p className="text-sm text-gray-600">{isArabic ? "الشذوذات" : "Anomalies"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{selectedAnalysis.confidence}%</p>
              <p className="text-sm text-gray-600">{isArabic ? "الثقة" : "Confidence"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{selectedAnalysis.findings.length}</p>
              <p className="text-sm text-gray-600">{isArabic ? "النتائج" : "Findings"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{isArabic ? "تقدم التحليل" : "Analysis Progress"}</span>
              <span>100%</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="findings">{isArabic ? "النتائج" : "Findings"}</TabsTrigger>
          <TabsTrigger value="patterns">{isArabic ? "الأنماط" : "Patterns"}</TabsTrigger>
          <TabsTrigger value="recommendations">{isArabic ? "التوصيات" : "Recommendations"}</TabsTrigger>
          <TabsTrigger value="analytics">{isArabic ? "التحليلات" : "Analytics"}</TabsTrigger>
        </TabsList>

        <TabsContent value="findings" className="space-y-4">
          {selectedAnalysis.findings.map((finding) => (
            <Card
              key={finding.id}
              className="border-l-4"
              style={{
                borderLeftColor:
                  finding.severity === "high" ? "#EF4444" : finding.severity === "medium" ? "#F59E0B" : "#10B981",
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                      <Badge className={getSeverityColor(finding.severity)}>
                        {isArabic
                          ? finding.severity === "high"
                            ? "عالي"
                            : finding.severity === "medium"
                              ? "متوسط"
                              : "منخفض"
                          : finding.severity}
                      </Badge>
                      <Badge variant="outline">
                        {isArabic ? "الثقة" : "Confidence"}: {finding.confidence}%
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {isArabic ? finding.descriptionAr : finding.description}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {isArabic ? "الموقع" : "Location"}: {finding.location}
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        {isArabic ? "الإجراء المقترح:" : "Suggested Action:"}
                      </p>
                      <p className="text-sm text-blue-800">
                        {isArabic ? finding.suggestedActionAr : finding.suggestedAction}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          {selectedAnalysis.patterns.map((pattern) => (
            <Card key={pattern.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{isArabic ? pattern.nameAr : pattern.name}</h4>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                      <span>
                        {isArabic ? "التكرار" : "Frequency"}: {pattern.frequency}%
                      </span>
                      <span>
                        {isArabic ? "الأهمية" : "Significance"}: {pattern.significance}%
                      </span>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <TrendingUp
                          className={`h-4 w-4 ${
                            pattern.trend === "increasing"
                              ? "text-red-500"
                              : pattern.trend === "decreasing"
                                ? "text-green-500"
                                : "text-gray-500"
                          }`}
                        />
                        <span>
                          {isArabic
                            ? pattern.trend === "increasing"
                              ? "متزايد"
                              : pattern.trend === "decreasing"
                                ? "متناقص"
                                : "مستقر"
                            : pattern.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                    {isArabic ? "تحليل" : "Analyze"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          {selectedAnalysis.recommendations.map((rec) => (
            <Card key={rec.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                      <Badge className={getPriorityColor(rec.priority)}>
                        {isArabic
                          ? rec.priority === "critical"
                            ? "حرج"
                            : rec.priority === "high"
                              ? "عالي"
                              : rec.priority === "medium"
                                ? "متوسط"
                                : "منخفض"
                          : rec.priority}
                      </Badge>
                      <Badge variant="outline">{isArabic ? rec.categoryAr : rec.category}</Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{isArabic ? rec.actionAr : rec.action}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">{isArabic ? "التأثير المتوقع:" : "Expected Impact:"}</span>{" "}
                      {isArabic ? rec.impactAr : rec.impact}
                    </p>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm text-gray-500">{isArabic ? "الجهد المطلوب:" : "Effort Required:"}</span>
                      <Badge variant="secondary">
                        {isArabic
                          ? rec.effort === "high"
                            ? "عالي"
                            : rec.effort === "medium"
                              ? "متوسط"
                              : "منخفض"
                          : rec.effort}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm">{isArabic ? "تنفيذ" : "Implement"}</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Anomaly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? "اتجاهات الشذوذات" : "Anomaly Trends"}</CardTitle>
                <CardDescription>
                  {isArabic ? "الشذوذات المكتشفة والمحلولة شهرياً" : "Monthly detected and resolved anomalies"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    anomalies: { label: isArabic ? "الشذوذات" : "Anomalies", color: "hsl(var(--chart-1))" },
                    resolved: { label: isArabic ? "المحلولة" : "Resolved", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={anomalyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="anomalies" fill="var(--color-anomalies)" />
                      <Bar dataKey="resolved" fill="var(--color-resolved)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Risk Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? "توزيع المخاطر" : "Risk Distribution"}</CardTitle>
                <CardDescription>
                  {isArabic ? "المخاطر حسب الفئة والتأثير" : "Risk by category and impact"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    risk: { label: isArabic ? "المخاطر" : "Risk", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={riskDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="probability" name={isArabic ? "الاحتمالية" : "Probability"} />
                      <YAxis dataKey="impact" name={isArabic ? "التأثير" : "Impact"} />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-3 border rounded-lg shadow-lg">
                                <p className="font-medium">{data.category}</p>
                                <p className="text-sm text-gray-600">
                                  {isArabic ? "المخاطر" : "Risk"}: {data.risk}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {isArabic ? "التأثير" : "Impact"}: {data.impact}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {isArabic ? "الاحتمالية" : "Probability"}: {data.probability}
                                </p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Scatter dataKey="risk" fill="#8884d8">
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getRiskColor(entry.risk)} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
