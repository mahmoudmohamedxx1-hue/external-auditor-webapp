"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  Cell,
} from "recharts"
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

const riskTrendData = [
  { month: "Jan", high: 15, medium: 25, low: 35 },
  { month: "Feb", high: 12, medium: 28, low: 40 },
  { month: "Mar", high: 18, medium: 22, low: 38 },
  { month: "Apr", high: 14, medium: 30, low: 42 },
  { month: "May", high: 10, medium: 26, low: 45 },
  { month: "Jun", high: 8, medium: 24, low: 48 },
]

const riskHeatmapData = [
  { area: "Financial Reporting", areaAr: "التقارير المالية", impact: 9, probability: 7, risk: 63 },
  { area: "Tax Compliance", areaAr: "الامتثال الضريبي", impact: 8, probability: 6, risk: 48 },
  { area: "Internal Controls", areaAr: "الضوابط الداخلية", impact: 7, probability: 8, risk: 56 },
  { area: "Regulatory Changes", areaAr: "التغييرات التنظيمية", impact: 9, probability: 5, risk: 45 },
  { area: "IT Security", areaAr: "أمن المعلومات", impact: 8, probability: 7, risk: 56 },
  { area: "Fraud Detection", areaAr: "كشف الاحتيال", impact: 10, probability: 4, risk: 40 },
  { area: "Cash Flow", areaAr: "التدفق النقدي", impact: 6, probability: 6, risk: 36 },
  { area: "Inventory", areaAr: "المخزون", impact: 5, probability: 7, risk: 35 },
]

const riskCategories = [
  {
    name: "Strategic Risk",
    nameAr: "المخاطر الاستراتيجية",
    count: 12,
    trend: "down",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    name: "Operational Risk",
    nameAr: "المخاطر التشغيلية",
    count: 18,
    trend: "up",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    name: "Financial Risk",
    nameAr: "المخاطر المالية",
    count: 8,
    trend: "down",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    name: "Compliance Risk",
    nameAr: "مخاطر الامتثال",
    count: 15,
    trend: "up",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
]

const riskItems = [
  {
    id: 1,
    title: "Revenue Recognition Compliance",
    titleAr: "الامتثال لإقرار الإيرادات",
    category: "Financial",
    categoryAr: "مالية",
    impact: "High",
    impactAr: "عالي",
    probability: "Medium",
    probabilityAr: "متوسط",
    status: "Active",
    statusAr: "نشط",
    owner: "Ahmed Hassan",
    dueDate: "2024-02-15",
  },
  {
    id: 2,
    title: "Tax Law Changes Impact",
    titleAr: "تأثير تغييرات القانون الضريبي",
    category: "Compliance",
    categoryAr: "امتثال",
    impact: "High",
    impactAr: "عالي",
    probability: "High",
    probabilityAr: "عالي",
    status: "Critical",
    statusAr: "حرج",
    owner: "Fatima Ali",
    dueDate: "2024-01-30",
  },
  {
    id: 3,
    title: "IT System Vulnerabilities",
    titleAr: "نقاط ضعف نظام المعلومات",
    category: "Operational",
    categoryAr: "تشغيلية",
    impact: "Medium",
    impactAr: "متوسط",
    probability: "Medium",
    probabilityAr: "متوسط",
    status: "Monitoring",
    statusAr: "مراقبة",
    owner: "Mohamed Saeed",
    dueDate: "2024-02-28",
  },
]

function RiskAssessmentContent() {
  const { isArabic, toggleLanguage } = useLanguage()
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  const getRiskColor = (risk: number) => {
    if (risk >= 60) return "#EF4444" // Red for high risk
    if (risk >= 40) return "#F59E0B" // Orange for medium risk
    return "#10B981" // Green for low risk
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "Active":
        return "bg-orange-100 text-orange-800"
      case "Monitoring":
        return "bg-blue-100 text-blue-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isArabic={isArabic} toggleLanguage={toggleLanguage} />

      <main className={`p-6 ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{isArabic ? "تقييم المخاطر" : "Risk Assessment"}</h1>
            <p className="text-gray-600">
              {isArabic ? "تحليل وإدارة المخاطر في عمليات المراجعة" : "Analyze and manage risks in audit processes"}
            </p>
          </div>

          {/* Risk Categories Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {riskCategories.map((category, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{isArabic ? category.nameAr : category.name}</p>
                      <p className="text-3xl font-bold text-gray-900">{category.count}</p>
                      <div className="flex items-center mt-2">
                        {category.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                        )}
                        <span className={`text-sm ${category.trend === "up" ? "text-red-600" : "text-green-600"}`}>
                          {category.trend === "up" ? "+5%" : "-8%"}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${category.bgColor}`}>
                      <AlertTriangle className={`h-6 w-6 ${category.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="heatmap" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="heatmap">{isArabic ? "خريطة المخاطر" : "Risk Heatmap"}</TabsTrigger>
                <TabsTrigger value="trends">{isArabic ? "الاتجاهات" : "Trends"}</TabsTrigger>
                <TabsTrigger value="items">{isArabic ? "عناصر المخاطر" : "Risk Items"}</TabsTrigger>
              </TabsList>

              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">{isArabic ? "شهر واحد" : "1 Month"}</SelectItem>
                  <SelectItem value="3months">{isArabic ? "3 أشهر" : "3 Months"}</SelectItem>
                  <SelectItem value="6months">{isArabic ? "6 أشهر" : "6 Months"}</SelectItem>
                  <SelectItem value="1year">{isArabic ? "سنة واحدة" : "1 Year"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="heatmap" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Risk Heatmap */}
                <Card>
                  <CardHeader>
                    <CardTitle>{isArabic ? "خريطة المخاطر الحرارية" : "Risk Heat Map"}</CardTitle>
                    <CardDescription>{isArabic ? "التأثير مقابل الاحتمالية" : "Impact vs Probability"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        risk: { label: isArabic ? "المخاطر" : "Risk", color: "hsl(var(--chart-1))" },
                      }}
                      className="h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart data={riskHeatmapData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="probability"
                            name={isArabic ? "الاحتمالية" : "Probability"}
                            domain={[0, 10]}
                          />
                          <YAxis dataKey="impact" name={isArabic ? "التأثير" : "Impact"} domain={[0, 10]} />
                          <ChartTooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload
                                return (
                                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                                    <p className="font-medium">{isArabic ? data.areaAr : data.area}</p>
                                    <p className="text-sm text-gray-600">
                                      {isArabic ? "التأثير" : "Impact"}: {data.impact}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {isArabic ? "الاحتمالية" : "Probability"}: {data.probability}
                                    </p>
                                    <p className="text-sm font-medium">
                                      {isArabic ? "المخاطر" : "Risk"}: {data.risk}
                                    </p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          <Scatter dataKey="risk" fill="#8884d8">
                            {riskHeatmapData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={getRiskColor(entry.risk)} />
                            ))}
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Risk Areas List */}
                <Card>
                  <CardHeader>
                    <CardTitle>{isArabic ? "مناطق المخاطر" : "Risk Areas"}</CardTitle>
                    <CardDescription>{isArabic ? "مرتبة حسب مستوى المخاطر" : "Ranked by risk level"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {riskHeatmapData
                        .sort((a, b) => b.risk - a.risk)
                        .map((area, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                            <div>
                              <p className="font-medium text-gray-900">{isArabic ? area.areaAr : area.area}</p>
                              <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 mt-1">
                                <span>
                                  {isArabic ? "التأثير" : "Impact"}: {area.impact}
                                </span>
                                <span>
                                  {isArabic ? "الاحتمالية" : "Probability"}: {area.probability}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: getRiskColor(area.risk) }}
                              />
                              <span className="font-medium text-gray-900">{area.risk}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? "اتجاهات المخاطر" : "Risk Trends"}</CardTitle>
                  <CardDescription>{isArabic ? "تطور المخاطر عبر الزمن" : "Risk evolution over time"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      high: { label: isArabic ? "عالية" : "High", color: "#EF4444" },
                      medium: { label: isArabic ? "متوسطة" : "Medium", color: "#F59E0B" },
                      low: { label: isArabic ? "منخفضة" : "Low", color: "#10B981" },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={riskTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="high" stroke="var(--color-high)" strokeWidth={2} />
                        <Line type="monotone" dataKey="medium" stroke="var(--color-medium)" strokeWidth={2} />
                        <Line type="monotone" dataKey="low" stroke="var(--color-low)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="items" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? "عناصر المخاطر" : "Risk Items"}</CardTitle>
                  <CardDescription>
                    {isArabic ? "قائمة تفصيلية بعناصر المخاطر المحددة" : "Detailed list of identified risk items"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskItems.map((item) => (
                      <Card
                        key={item.id}
                        className="border-l-4"
                        style={{
                          borderLeftColor:
                            item.status === "Critical" ? "#EF4444" : item.status === "Active" ? "#F59E0B" : "#10B981",
                        }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">
                                {isArabic ? item.titleAr : item.title}
                              </h3>
                              <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 mb-3">
                                <span>
                                  {isArabic ? "الفئة" : "Category"}: {isArabic ? item.categoryAr : item.category}
                                </span>
                                <span>•</span>
                                <span>
                                  {isArabic ? "المسؤول" : "Owner"}: {item.owner}
                                </span>
                                <span>•</span>
                                <span>
                                  {isArabic ? "تاريخ الاستحقاق" : "Due Date"}: {item.dueDate}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <Badge className={getImpactColor(item.impact)}>
                                  {isArabic ? "التأثير" : "Impact"}: {isArabic ? item.impactAr : item.impact}
                                </Badge>
                                <Badge className={getImpactColor(item.probability)}>
                                  {isArabic ? "الاحتمالية" : "Probability"}:{" "}
                                  {isArabic ? item.probabilityAr : item.probability}
                                </Badge>
                                <Badge className={getStatusColor(item.status)}>
                                  {isArabic ? item.statusAr : item.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <Button variant="outline" size="sm">
                                {isArabic ? "عرض" : "View"}
                              </Button>
                              <Button variant="outline" size="sm">
                                {isArabic ? "تعديل" : "Edit"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default function RiskAssessment() {
  return (
    <LanguageProvider>
      <RiskAssessmentContent />
    </LanguageProvider>
  )
}
