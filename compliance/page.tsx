"use client"
import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { Shield, AlertTriangle, CheckCircle, Clock, FileText, TrendingUp, Calendar, Eye, Download } from "lucide-react"

const complianceStandards = [
  {
    id: 1,
    name: "Egyptian Auditing Standard 1",
    nameAr: "معيار المراجعة المصري 1",
    code: "EAS 1",
    category: "Auditing",
    categoryAr: "المراجعة",
    compliance: 95,
    lastReview: "2024-01-15",
    status: "Compliant",
    statusAr: "متوافق",
    requirements: 12,
    completed: 11,
    description: "Objective and General Principles Governing an Audit",
    descriptionAr: "الهدف والمبادئ العامة التي تحكم المراجعة",
  },
  {
    id: 2,
    name: "Egyptian Auditing Standard 2",
    nameAr: "معيار المراجعة المصري 2",
    code: "EAS 2",
    category: "Auditing",
    categoryAr: "المراجعة",
    compliance: 88,
    lastReview: "2024-01-10",
    status: "Minor Issues",
    statusAr: "مشاكل طفيفة",
    requirements: 15,
    completed: 13,
    description: "Terms of Audit Engagements",
    descriptionAr: "شروط عمليات المراجعة",
  },
  {
    id: 3,
    name: "Egyptian Tax Law 2023",
    nameAr: "قانون الضرائب المصري 2023",
    code: "ETL 2023",
    category: "Tax",
    categoryAr: "ضرائب",
    compliance: 92,
    lastReview: "2024-01-20",
    status: "Compliant",
    statusAr: "متوافق",
    requirements: 25,
    completed: 23,
    description: "Egyptian Income Tax Law and Regulations",
    descriptionAr: "قانون ضريبة الدخل المصري واللوائح",
  },
  {
    id: 4,
    name: "Corporate Governance Code",
    nameAr: "دليل حوكمة الشركات",
    code: "CGC 2024",
    category: "Governance",
    categoryAr: "حوكمة",
    compliance: 85,
    lastReview: "2024-01-08",
    status: "Needs Attention",
    statusAr: "يحتاج انتباه",
    requirements: 18,
    completed: 15,
    description: "Egyptian Corporate Governance Guidelines",
    descriptionAr: "إرشادات حوكمة الشركات المصرية",
  },
  {
    id: 5,
    name: "Data Protection Regulations",
    nameAr: "لوائح حماية البيانات",
    code: "DPR 2024",
    category: "Privacy",
    categoryAr: "خصوصية",
    compliance: 78,
    lastReview: "2024-01-05",
    status: "Action Required",
    statusAr: "مطلوب إجراء",
    requirements: 20,
    completed: 16,
    description: "Egyptian Data Protection and Privacy Laws",
    descriptionAr: "قوانين حماية البيانات والخصوصية المصرية",
  },
]

const complianceTrends = [
  { month: "Jan", overall: 88, auditing: 92, tax: 90, governance: 85, privacy: 78 },
  { month: "Feb", overall: 89, auditing: 93, tax: 91, governance: 86, privacy: 80 },
  { month: "Mar", overall: 90, auditing: 94, tax: 92, governance: 87, privacy: 82 },
  { month: "Apr", overall: 91, auditing: 95, tax: 93, governance: 88, privacy: 84 },
  { month: "May", overall: 90, auditing: 94, tax: 92, governance: 87, privacy: 83 },
  { month: "Jun", overall: 92, auditing: 95, tax: 94, governance: 89, privacy: 85 },
]

const recentUpdates = [
  {
    id: 1,
    title: "EAS 315 Updated - Risk Assessment Procedures",
    titleAr: "تحديث معيار المراجعة المصري 315 - إجراءات تقييم المخاطر",
    date: "2024-01-22",
    type: "Standard Update",
    typeAr: "تحديث معيار",
    impact: "Medium",
    impactAr: "متوسط",
    description: "New requirements for risk assessment documentation",
    descriptionAr: "متطلبات جديدة لتوثيق تقييم المخاطر",
  },
  {
    id: 2,
    title: "Tax Authority Circular 2024/01",
    titleAr: "منشور مصلحة الضرائب 2024/01",
    date: "2024-01-18",
    type: "Regulatory Change",
    typeAr: "تغيير تنظيمي",
    impact: "High",
    impactAr: "عالي",
    description: "Changes to VAT calculation methods",
    descriptionAr: "تغييرات في طرق حساب ضريبة القيمة المضافة",
  },
  {
    id: 3,
    title: "EFSA Guidelines on Board Composition",
    titleAr: "إرشادات الهيئة العامة للرقابة المالية حول تكوين مجلس الإدارة",
    date: "2024-01-15",
    type: "Guidance",
    typeAr: "إرشادات",
    impact: "Medium",
    impactAr: "متوسط",
    description: "Updated requirements for board independence",
    descriptionAr: "متطلبات محدثة لاستقلالية مجلس الإدارة",
  },
]

const complianceActions = [
  {
    id: 1,
    action: "Update risk assessment procedures per EAS 315",
    actionAr: "تحديث إجراءات تقييم المخاطر وفقاً لمعيار المراجعة المصري 315",
    standard: "EAS 315",
    priority: "High",
    priorityAr: "عالية",
    dueDate: "2024-02-15",
    assignee: "Ahmed Hassan",
    status: "In Progress",
    statusAr: "قيد التنفيذ",
  },
  {
    id: 2,
    action: "Implement new VAT calculation procedures",
    actionAr: "تنفيذ إجراءات حساب ضريبة القيمة المضافة الجديدة",
    standard: "ETL 2023",
    priority: "Critical",
    priorityAr: "حرجة",
    dueDate: "2024-01-30",
    assignee: "Fatima Ali",
    status: "Pending",
    statusAr: "معلق",
  },
  {
    id: 3,
    action: "Review board composition compliance",
    actionAr: "مراجعة الامتثال لتكوين مجلس الإدارة",
    standard: "CGC 2024",
    priority: "Medium",
    priorityAr: "متوسطة",
    dueDate: "2024-02-28",
    assignee: "Sara Ibrahim",
    status: "Not Started",
    statusAr: "لم يبدأ",
  },
]

function ComplianceContent() {
  const { isArabic, toggleLanguage } = useLanguage()

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return "text-green-600"
    if (compliance >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant":
        return "bg-green-100 text-green-800"
      case "Minor Issues":
        return "bg-yellow-100 text-yellow-800"
      case "Needs Attention":
        return "bg-orange-100 text-orange-800"
      case "Action Required":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActionStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Not Started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const overallCompliance = Math.round(
    complianceStandards.reduce((sum, std) => sum + std.compliance, 0) / complianceStandards.length,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isArabic={isArabic} toggleLanguage={toggleLanguage} />

      <main className={`p-6 ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isArabic ? "إدارة الامتثال" : "Compliance Management"}
            </h1>
            <p className="text-gray-600">
              {isArabic
                ? "مراقبة الامتثال للمعايير والقوانين المصرية"
                : "Monitor compliance with Egyptian standards and regulations"}
            </p>
          </div>

          {/* Compliance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {isArabic ? "الامتثال العام" : "Overall Compliance"}
                    </p>
                    <p className={`text-3xl font-bold ${getComplianceColor(overallCompliance)}`}>
                      {overallCompliance}%
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+2%</span>
                    </div>
                  </div>
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {isArabic ? "المعايير المتوافقة" : "Compliant Standards"}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {complianceStandards.filter((s) => s.compliance >= 90).length}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isArabic ? `من أصل ${complianceStandards.length}` : `of ${complianceStandards.length}`}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{isArabic ? "تحتاج انتباه" : "Need Attention"}</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {complianceStandards.filter((s) => s.compliance < 90).length}
                    </p>
                    <p className="text-sm text-gray-500">{isArabic ? "معايير" : "standards"}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {isArabic ? "الإجراءات المعلقة" : "Pending Actions"}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {complianceActions.filter((a) => a.status !== "Completed").length}
                    </p>
                    <p className="text-sm text-gray-500">{isArabic ? "إجراءات" : "actions"}</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="standards" className="space-y-6">
            <TabsList>
              <TabsTrigger value="standards">{isArabic ? "المعايير" : "Standards"}</TabsTrigger>
              <TabsTrigger value="trends">{isArabic ? "الاتجاهات" : "Trends"}</TabsTrigger>
              <TabsTrigger value="updates">{isArabic ? "التحديثات" : "Updates"}</TabsTrigger>
              <TabsTrigger value="actions">{isArabic ? "الإجراءات" : "Actions"}</TabsTrigger>
            </TabsList>

            <TabsContent value="standards" className="space-y-6">
              <div className="grid gap-6">
                {complianceStandards.map((standard) => (
                  <Card key={standard.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {isArabic ? standard.nameAr : standard.name}
                            </h3>
                            <Badge variant="outline">{standard.code}</Badge>
                            <Badge variant="outline">{isArabic ? standard.categoryAr : standard.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {isArabic ? standard.descriptionAr : standard.description}
                          </p>
                          <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {isArabic ? "آخر مراجعة" : "Last Review"}: {standard.lastReview}
                              </span>
                            </div>
                            <span>•</span>
                            <span>
                              {isArabic ? "المتطلبات" : "Requirements"}: {standard.completed}/{standard.requirements}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <Badge className={getStatusColor(standard.status)}>
                            {isArabic ? standard.statusAr : standard.status}
                          </Badge>
                          <div className="text-right rtl:text-left">
                            <p className={`text-2xl font-bold ${getComplianceColor(standard.compliance)}`}>
                              {standard.compliance}%
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{isArabic ? "مستوى الامتثال" : "Compliance Level"}</span>
                          <span>{standard.compliance}%</span>
                        </div>
                        <Progress value={standard.compliance} className="h-2" />
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          {isArabic ? "عرض التفاصيل" : "View Details"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          {isArabic ? "تحميل التقرير" : "Download Report"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? "اتجاهات الامتثال" : "Compliance Trends"}</CardTitle>
                  <CardDescription>
                    {isArabic ? "تطور مستويات الامتثال عبر الزمن" : "Evolution of compliance levels over time"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      overall: { label: isArabic ? "العام" : "Overall", color: "hsl(var(--chart-1))" },
                      auditing: { label: isArabic ? "المراجعة" : "Auditing", color: "hsl(var(--chart-2))" },
                      tax: { label: isArabic ? "الضرائب" : "Tax", color: "hsl(var(--chart-3))" },
                      governance: { label: isArabic ? "الحوكمة" : "Governance", color: "hsl(var(--chart-4))" },
                      privacy: { label: isArabic ? "الخصوصية" : "Privacy", color: "hsl(var(--chart-5))" },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={complianceTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[70, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="overall" stroke="var(--color-overall)" strokeWidth={3} />
                        <Line type="monotone" dataKey="auditing" stroke="var(--color-auditing)" strokeWidth={2} />
                        <Line type="monotone" dataKey="tax" stroke="var(--color-tax)" strokeWidth={2} />
                        <Line type="monotone" dataKey="governance" stroke="var(--color-governance)" strokeWidth={2} />
                        <Line type="monotone" dataKey="privacy" stroke="var(--color-privacy)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="updates" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? "التحديثات الأخيرة" : "Recent Updates"}</CardTitle>
                  <CardDescription>
                    {isArabic ? "آخر التحديثات في المعايير والقوانين" : "Latest updates in standards and regulations"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUpdates.map((update) => (
                      <Card key={update.id} className="border-l-4 border-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-2">
                                {isArabic ? update.titleAr : update.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-3">
                                {isArabic ? update.descriptionAr : update.description}
                              </p>
                              <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                  <Calendar className="h-4 w-4" />
                                  <span>{update.date}</span>
                                </div>
                                <Badge variant="outline">{isArabic ? update.typeAr : update.type}</Badge>
                                <Badge className={getPriorityColor(update.impact)}>
                                  {isArabic ? "التأثير" : "Impact"}: {isArabic ? update.impactAr : update.impact}
                                </Badge>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                              {isArabic ? "عرض" : "View"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? "إجراءات الامتثال" : "Compliance Actions"}</CardTitle>
                  <CardDescription>
                    {isArabic ? "الإجراءات المطلوبة لضمان الامتثال" : "Required actions to ensure compliance"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complianceActions.map((action) => (
                      <Card key={action.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-2">
                                {isArabic ? action.actionAr : action.action}
                              </h4>
                              <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 mb-3">
                                <span>
                                  {isArabic ? "المعيار" : "Standard"}: {action.standard}
                                </span>
                                <span>•</span>
                                <span>
                                  {isArabic ? "المسؤول" : "Assignee"}: {action.assignee}
                                </span>
                                <span>•</span>
                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    {isArabic ? "الاستحقاق" : "Due"}: {action.dueDate}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <Badge className={getPriorityColor(action.priority)}>
                                  {isArabic ? "الأولوية" : "Priority"}: {isArabic ? action.priorityAr : action.priority}
                                </Badge>
                                <Badge className={getActionStatusColor(action.status)}>
                                  {isArabic ? action.statusAr : action.status}
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

export default function Compliance() {
  return (
    <LanguageProvider>
      <ComplianceContent />
    </LanguageProvider>
  )
}
