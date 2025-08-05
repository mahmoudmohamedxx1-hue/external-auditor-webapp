"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Target, AlertTriangle, Shield, TrendingUp, Users, Calendar, FileText, Plus, Edit, Eye } from "lucide-react"

interface RiskFactor {
  id: string
  name: string
  nameAr: string
  category: string
  categoryAr: string
  inherentRisk: number
  controlRisk: number
  detectionRisk: number
  overallRisk: number
  impact: "low" | "medium" | "high" | "critical"
  probability: "low" | "medium" | "high" | "critical"
  velocity: "slow" | "medium" | "fast" | "immediate"
  mitigationStrategies: string[]
  mitigationStrategiesAr: string[]
  owner: string
  status: "identified" | "assessed" | "mitigated" | "monitored"
  lastAssessment: string
  nextReview: string
  trend: "increasing" | "stable" | "decreasing"
}

interface RiskAssessmentMatrixProps {
  isArabic: boolean
}

const mockRiskFactors: RiskFactor[] = [
  {
    id: "RF001",
    name: "Revenue Recognition Complexity",
    nameAr: "تعقيد إقرار الإيرادات",
    category: "Financial Reporting",
    categoryAr: "التقارير المالية",
    inherentRisk: 8,
    controlRisk: 6,
    detectionRisk: 4,
    overallRisk: 7.5,
    impact: "high",
    probability: "medium",
    velocity: "medium",
    mitigationStrategies: [
      "Implement automated revenue recognition system",
      "Enhance contract review procedures",
      "Increase management oversight",
      "Regular training on revenue standards",
    ],
    mitigationStrategiesAr: [
      "تطبيق نظام آلي لإقرار الإيرادات",
      "تعزيز إجراءات مراجعة العقود",
      "زيادة الإشراف الإداري",
      "التدريب المنتظم على معايير الإيرادات",
    ],
    owner: "CFO",
    status: "assessed",
    lastAssessment: "2024-01-15",
    nextReview: "2024-04-15",
    trend: "stable",
  },
  {
    id: "RF002",
    name: "Cash Management Controls",
    nameAr: "ضوابط إدارة النقدية",
    category: "Internal Controls",
    categoryAr: "الضوابط الداخلية",
    inherentRisk: 9,
    controlRisk: 7,
    detectionRisk: 3,
    overallRisk: 8.2,
    impact: "critical",
    probability: "high",
    velocity: "fast",
    mitigationStrategies: [
      "Implement dual authorization for large transactions",
      "Daily cash reconciliation procedures",
      "Segregation of duties in cash handling",
      "Regular surprise cash counts",
    ],
    mitigationStrategiesAr: [
      "تطبيق التفويض المزدوج للمعاملات الكبيرة",
      "إجراءات مطابقة النقدية اليومية",
      "فصل المهام في التعامل مع النقدية",
      "جرد النقدية المفاجئ المنتظم",
    ],
    owner: "Treasury Manager",
    status: "mitigated",
    lastAssessment: "2024-01-20",
    nextReview: "2024-03-20",
    trend: "decreasing",
  },
  {
    id: "RF003",
    name: "Related Party Transactions",
    nameAr: "معاملات الأطراف ذات العلاقة",
    category: "Compliance",
    categoryAr: "الامتثال",
    inherentRisk: 7,
    controlRisk: 8,
    detectionRisk: 5,
    overallRisk: 7.8,
    impact: "high",
    probability: "medium",
    velocity: "medium",
    mitigationStrategies: [
      "Maintain comprehensive related party register",
      "Board approval for significant transactions",
      "Independent valuation for material transactions",
      "Enhanced disclosure procedures",
    ],
    mitigationStrategiesAr: [
      "الاحتفاظ بسجل شامل للأطراف ذات العلاقة",
      "موافقة مجلس الإدارة على المعاملات المهمة",
      "التقييم المستقل للمعاملات الجوهرية",
      "إجراءات الإفصاح المعززة",
    ],
    owner: "Legal Counsel",
    status: "assessed",
    lastAssessment: "2024-01-10",
    nextReview: "2024-07-10",
    trend: "stable",
  },
  {
    id: "RF004",
    name: "IT System Security",
    nameAr: "أمان أنظمة تكنولوجيا المعلومات",
    category: "Technology",
    categoryAr: "التكنولوجيا",
    inherentRisk: 8,
    controlRisk: 5,
    detectionRisk: 6,
    overallRisk: 6.8,
    impact: "critical",
    probability: "medium",
    velocity: "immediate",
    mitigationStrategies: [
      "Regular security assessments",
      "Multi-factor authentication implementation",
      "Employee cybersecurity training",
      "Incident response plan updates",
    ],
    mitigationStrategiesAr: [
      "تقييمات الأمان المنتظمة",
      "تطبيق المصادقة متعددة العوامل",
      "تدريب الموظفين على الأمن السيبراني",
      "تحديث خطة الاستجابة للحوادث",
    ],
    owner: "IT Director",
    status: "monitored",
    lastAssessment: "2024-01-25",
    nextReview: "2024-02-25",
    trend: "increasing",
  },
  {
    id: "RF005",
    name: "Regulatory Compliance",
    nameAr: "الامتثال التنظيمي",
    category: "Compliance",
    categoryAr: "الامتثال",
    inherentRisk: 6,
    controlRisk: 4,
    detectionRisk: 3,
    overallRisk: 4.8,
    impact: "medium",
    probability: "low",
    velocity: "slow",
    mitigationStrategies: [
      "Regular regulatory updates monitoring",
      "Compliance training programs",
      "Legal counsel consultation",
      "Regulatory filing calendar maintenance",
    ],
    mitigationStrategiesAr: [
      "مراقبة التحديثات التنظيمية المنتظمة",
      "برامج التدريب على الامتثال",
      "استشارة المستشار القانوني",
      "الاحتفاظ بتقويم الإيداعات التنظيمية",
    ],
    owner: "Compliance Officer",
    status: "mitigated",
    lastAssessment: "2024-01-05",
    nextReview: "2024-06-05",
    trend: "stable",
  },
]

export function RiskAssessmentMatrix({ isArabic }: RiskAssessmentMatrixProps) {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [showAddRisk, setShowAddRisk] = useState(false)

  const getRiskColor = (level: number) => {
    if (level >= 8) return "bg-red-100 text-red-800"
    if (level >= 6) return "bg-orange-100 text-orange-800"
    if (level >= 4) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  const getRiskLevel = (level: number) => {
    if (level >= 8) return isArabic ? "حرج" : "Critical"
    if (level >= 6) return isArabic ? "عالي" : "High"
    if (level >= 4) return isArabic ? "متوسط" : "Medium"
    return isArabic ? "منخفض" : "Low"
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "mitigated":
        return "bg-green-100 text-green-800"
      case "monitored":
        return "bg-blue-100 text-blue-800"
      case "assessed":
        return "bg-yellow-100 text-yellow-800"
      case "identified":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "mitigated":
        return isArabic ? "مخفف" : "Mitigated"
      case "monitored":
        return isArabic ? "مراقب" : "Monitored"
      case "assessed":
        return isArabic ? "مقيم" : "Assessed"
      case "identified":
        return isArabic ? "محدد" : "Identified"
      default:
        return status
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-600" />
      case "decreasing":
        return <TrendingUp className="h-4 w-4 text-green-600 transform rotate-180" />
      case "stable":
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
      default:
        return null
    }
  }

  const filteredRisks = mockRiskFactors.filter((risk) => {
    if (filterCategory !== "all" && risk.category !== filterCategory) return false
    if (filterStatus !== "all" && risk.status !== filterStatus) return false
    return true
  })

  const riskDistribution = {
    critical: mockRiskFactors.filter((r) => r.overallRisk >= 8).length,
    high: mockRiskFactors.filter((r) => r.overallRisk >= 6 && r.overallRisk < 8).length,
    medium: mockRiskFactors.filter((r) => r.overallRisk >= 4 && r.overallRisk < 6).length,
    low: mockRiskFactors.filter((r) => r.overallRisk < 4).length,
  }

  return (
    <div className="space-y-6">
      {/* Risk Matrix Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Target className="h-6 w-6 text-red-600" />
              <span>{isArabic ? "مصفوفة تقييم المخاطر" : "Risk Assessment Matrix"}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isArabic ? "تقرير المخاطر" : "Risk Report"}
              </Button>
              <Button size="sm" onClick={() => setShowAddRisk(true)}>
                <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isArabic ? "إضافة مخاطر" : "Add Risk"}
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            {isArabic
              ? "تقييم وإدارة المخاطر مع استراتيجيات التخفيف والمراقبة"
              : "Comprehensive risk assessment and management with mitigation strategies"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-600">{riskDistribution.critical}</p>
              <p className="text-sm text-gray-600">{isArabic ? "مخاطر حرجة" : "Critical Risks"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-600">{riskDistribution.high}</p>
              <p className="text-sm text-gray-600">{isArabic ? "مخاطر عالية" : "High Risks"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-yellow-600">{riskDistribution.medium}</p>
              <p className="text-sm text-gray-600">{isArabic ? "مخاطر متوسطة" : "Medium Risks"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{riskDistribution.low}</p>
              <p className="text-sm text-gray-600">{isArabic ? "مخاطر منخفضة" : "Low Risks"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{isArabic ? "عوامل المخاطر" : "Risk Factors"}</h3>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <select
            className="px-3 py-1 border rounded-md text-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">{isArabic ? "كل الفئات" : "All Categories"}</option>
            <option value="Financial Reporting">{isArabic ? "التقارير المالية" : "Financial Reporting"}</option>
            <option value="Internal Controls">{isArabic ? "الضوابط الداخلية" : "Internal Controls"}</option>
            <option value="Compliance">{isArabic ? "الامتثال" : "Compliance"}</option>
            <option value="Technology">{isArabic ? "التكنولوجيا" : "Technology"}</option>
          </select>
          <select
            className="px-3 py-1 border rounded-md text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">{isArabic ? "كل الحالات" : "All Status"}</option>
            <option value="identified">{isArabic ? "محدد" : "Identified"}</option>
            <option value="assessed">{isArabic ? "مقيم" : "Assessed"}</option>
            <option value="mitigated">{isArabic ? "مخفف" : "Mitigated"}</option>
            <option value="monitored">{isArabic ? "مراقب" : "Monitored"}</option>
          </select>
        </div>
      </div>

      {/* Risk Matrix */}
      <Tabs defaultValue="matrix" className="space-y-4">
        <TabsList>
          <TabsTrigger value="matrix">{isArabic ? "المصفوفة" : "Matrix"}</TabsTrigger>
          <TabsTrigger value="heatmap">{isArabic ? "خريطة الحرارة" : "Heat Map"}</TabsTrigger>
          <TabsTrigger value="trends">{isArabic ? "الاتجاهات" : "Trends"}</TabsTrigger>
          <TabsTrigger value="mitigation">{isArabic ? "التخفيف" : "Mitigation"}</TabsTrigger>
        </TabsList>

        <TabsContent value="matrix" className="space-y-4">
          <div className="grid gap-4">
            {filteredRisks.map((risk) => (
              <Card key={risk.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                        <h4 className="font-semibold text-gray-900 text-lg">{isArabic ? risk.nameAr : risk.name}</h4>
                        <Badge className={getRiskColor(risk.overallRisk)}>
                          {getRiskLevel(risk.overallRisk)} ({risk.overallRisk.toFixed(1)})
                        </Badge>
                        <Badge className={getStatusColor(risk.status)}>{getStatusText(risk.status)}</Badge>
                        <Badge variant="outline">{isArabic ? risk.categoryAr : risk.category}</Badge>
                        {getTrendIcon(risk.trend)}
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">{isArabic ? "المخاطر الكامنة" : "Inherent Risk"}</p>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Progress value={risk.inherentRisk * 10} className="h-2 flex-1" />
                            <span className="text-sm font-medium">{risk.inherentRisk}/10</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{isArabic ? "مخاطر الضوابط" : "Control Risk"}</p>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Progress value={risk.controlRisk * 10} className="h-2 flex-1" />
                            <span className="text-sm font-medium">{risk.controlRisk}/10</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{isArabic ? "مخاطر الاكتشاف" : "Detection Risk"}</p>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Progress value={risk.detectionRisk * 10} className="h-2 flex-1" />
                            <span className="text-sm font-medium">{risk.detectionRisk}/10</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{isArabic ? "التأثير" : "Impact"}</p>
                          <Badge className={getImpactColor(risk.impact)} variant="outline">
                            {isArabic
                              ? risk.impact === "critical"
                                ? "حرج"
                                : risk.impact === "high"
                                  ? "عالي"
                                  : risk.impact === "medium"
                                    ? "متوسط"
                                    : "منخفض"
                              : risk.impact}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{isArabic ? "المسؤول" : "Owner"}</p>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Users className="h-3 w-3" />
                            <span className="text-sm font-medium">{risk.owner}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">{isArabic ? "آخر تقييم:" : "Last Assessment:"}</p>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{risk.lastAssessment}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">
                            {isArabic ? "المراجعة القادمة:" : "Next Review:"}
                          </p>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{risk.nextReview}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-2 flex items-center space-x-1 rtl:space-x-reverse">
                          <Shield className="h-4 w-4" />
                          <span>{isArabic ? "استراتيجيات التخفيف:" : "Mitigation Strategies:"}</span>
                        </h5>
                        <ul className="text-sm text-blue-800 space-y-1">
                          {(isArabic ? risk.mitigationStrategiesAr : risk.mitigationStrategies).map(
                            (strategy, index) => (
                              <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                                <span className="text-blue-600">•</span>
                                <span>{strategy}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button variant="outline" size="sm" onClick={() => setSelectedRisk(risk.id)}>
                        <Eye className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {isArabic ? "عرض" : "View"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {isArabic ? "تحرير" : "Edit"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="heatmap">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "خريطة حرارة المخاطر" : "Risk Heat Map"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {isArabic ? "خريطة الحرارة التفاعلية" : "Interactive Heat Map"}
                </h3>
                <p className="text-gray-500 mb-4">
                  {isArabic
                    ? "سيتم عرض خريطة حرارة تفاعلية للمخاطر هنا"
                    : "Interactive risk heat map visualization will be displayed here"}
                </p>
                <Button>
                  <Target className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {isArabic ? "إنشاء خريطة الحرارة" : "Generate Heat Map"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "اتجاهات المخاطر" : "Risk Trends"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {isArabic ? "تحليل اتجاهات المخاطر" : "Risk Trend Analysis"}
                </h3>
                <p className="text-gray-500 mb-4">
                  {isArabic
                    ? "سيتم عرض تحليل اتجاهات المخاطر عبر الزمن هنا"
                    : "Risk trend analysis over time will be displayed here"}
                </p>
                <Button>
                  <TrendingUp className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {isArabic ? "إنشاء تحليل الاتجاهات" : "Generate Trend Analysis"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mitigation">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "خطة التخفيف" : "Mitigation Plan"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-3">
                    {isArabic ? "إجراءات فورية مطلوبة" : "Immediate Actions Required"}
                  </h4>
                  <ul className="space-y-2">
                    {mockRiskFactors
                      .filter((r) => r.overallRisk >= 8)
                      .map((risk) => (
                        <li key={risk.id} className="flex items-start space-x-2 rtl:space-x-reverse">
                          <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-red-800">{isArabic ? risk.nameAr : risk.name}</p>
                            <p className="text-sm text-red-700">
                              {isArabic ? "المسؤول:" : "Owner:"} {risk.owner} | {isArabic ? "المراجعة:" : "Review:"}{" "}
                              {risk.nextReview}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-3">
                    {isArabic ? "إجراءات قصيرة المدى" : "Short-term Actions"}
                  </h4>
                  <ul className="space-y-2">
                    {mockRiskFactors
                      .filter((r) => r.overallRisk >= 6 && r.overallRisk < 8)
                      .map((risk) => (
                        <li key={risk.id} className="flex items-start space-x-2 rtl:space-x-reverse">
                          <Shield className="h-4 w-4 text-orange-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-orange-800">{isArabic ? risk.nameAr : risk.name}</p>
                            <p className="text-sm text-orange-700">
                              {isArabic ? "المسؤول:" : "Owner:"} {risk.owner} | {isArabic ? "المراجعة:" : "Review:"}{" "}
                              {risk.nextReview}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-3">
                    {isArabic ? "مراقبة مستمرة" : "Ongoing Monitoring"}
                  </h4>
                  <ul className="space-y-2">
                    {mockRiskFactors
                      .filter((r) => r.overallRisk < 6)
                      .map((risk) => (
                        <li key={risk.id} className="flex items-start space-x-2 rtl:space-x-reverse">
                          <Eye className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-800">{isArabic ? risk.nameAr : risk.name}</p>
                            <p className="text-sm text-yellow-700">
                              {isArabic ? "المسؤول:" : "Owner:"} {risk.owner} | {isArabic ? "المراجعة:" : "Review:"}{" "}
                              {risk.nextReview}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Risk Modal */}
      {showAddRisk && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{isArabic ? "إضافة عامل مخاطر جديد" : "Add New Risk Factor"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="riskName">{isArabic ? "اسم المخاطر" : "Risk Name"}</Label>
                  <Input id="riskName" placeholder={isArabic ? "أدخل اسم المخاطر" : "Enter risk name"} />
                </div>
                <div>
                  <Label htmlFor="riskCategory">{isArabic ? "الفئة" : "Category"}</Label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option value="">{isArabic ? "اختر الفئة" : "Select category"}</option>
                    <option value="Financial Reporting">{isArabic ? "التقارير المالية" : "Financial Reporting"}</option>
                    <option value="Internal Controls">{isArabic ? "الضوابط الداخلية" : "Internal Controls"}</option>
                    <option value="Compliance">{isArabic ? "الامتثال" : "Compliance"}</option>
                    <option value="Technology">{isArabic ? "التكنولوجيا" : "Technology"}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="inherentRisk">{isArabic ? "المخاطر الكامنة" : "Inherent Risk"}</Label>
                  <Input id="inherentRisk" type="number" min="1" max="10" placeholder="1-10" />
                </div>
                <div>
                  <Label htmlFor="controlRisk">{isArabic ? "مخاطر الضوابط" : "Control Risk"}</Label>
                  <Input id="controlRisk" type="number" min="1" max="10" placeholder="1-10" />
                </div>
                <div>
                  <Label htmlFor="detectionRisk">{isArabic ? "مخاطر الاكتشاف" : "Detection Risk"}</Label>
                  <Input id="detectionRisk" type="number" min="1" max="10" placeholder="1-10" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="owner">{isArabic ? "المسؤول" : "Owner"}</Label>
                  <Input id="owner" placeholder={isArabic ? "اسم المسؤول" : "Owner name"} />
                </div>
                <div>
                  <Label htmlFor="nextReview">{isArabic ? "تاريخ المراجعة القادمة" : "Next Review Date"}</Label>
                  <Input id="nextReview" type="date" />
                </div>
              </div>

              <div>
                <Label htmlFor="mitigationStrategies">
                  {isArabic ? "استراتيجيات التخفيف" : "Mitigation Strategies"}
                </Label>
                <Textarea
                  id="mitigationStrategies"
                  placeholder={isArabic ? "أدخل استراتيجيات التخفيف..." : "Enter mitigation strategies..."}
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <Button variant="outline" onClick={() => setShowAddRisk(false)}>
                  {isArabic ? "إلغاء" : "Cancel"}
                </Button>
                <Button onClick={() => setShowAddRisk(false)}>{isArabic ? "إضافة" : "Add Risk"}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
