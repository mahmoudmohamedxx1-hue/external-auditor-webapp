"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { FileText, Download, Eye, Plus, Calendar, User, BarChart3, TrendingUp, FileBarChart } from "lucide-react"

const reportTemplates = [
  {
    id: 1,
    name: "Audit Summary Report",
    nameAr: "تقرير ملخص المراجعة",
    type: "Summary",
    typeAr: "ملخص",
    description: "Executive summary of audit findings and recommendations",
    descriptionAr: "ملخص تنفيذي لنتائج المراجعة والتوصيات",
    format: ["PDF", "Word"],
    estimatedTime: "30 min",
  },
  {
    id: 2,
    name: "Financial Statement Analysis",
    nameAr: "تحليل القوائم المالية",
    type: "Financial",
    typeAr: "مالي",
    description: "Detailed analysis of financial statements and ratios",
    descriptionAr: "تحليل مفصل للقوائم المالية والنسب",
    format: ["PDF", "Excel"],
    estimatedTime: "45 min",
  },
  {
    id: 3,
    name: "Risk Assessment Report",
    nameAr: "تقرير تقييم المخاطر",
    type: "Risk",
    typeAr: "مخاطر",
    description: "Comprehensive risk evaluation and mitigation strategies",
    descriptionAr: "تقييم شامل للمخاطر واستراتيجيات التخفيف",
    format: ["PDF", "PowerPoint"],
    estimatedTime: "60 min",
  },
  {
    id: 4,
    name: "Compliance Status Report",
    nameAr: "تقرير حالة الامتثال",
    type: "Compliance",
    typeAr: "امتثال",
    description: "Status of regulatory compliance and recommendations",
    descriptionAr: "حالة الامتثال التنظيمي والتوصيات",
    format: ["PDF", "Word"],
    estimatedTime: "40 min",
  },
]

const generatedReports = [
  {
    id: 1,
    name: "ABC Company Audit Report 2024",
    nameAr: "تقرير مراجعة شركة ABC 2024",
    template: "Audit Summary Report",
    templateAr: "تقرير ملخص المراجعة",
    generatedBy: "Ahmed Hassan",
    generatedDate: "2024-01-20",
    status: "Final",
    statusAr: "نهائي",
    format: "PDF",
    size: "2.4 MB",
    client: "ABC Company",
    clientAr: "شركة ABC",
  },
  {
    id: 2,
    name: "XYZ Corp Risk Assessment Q4 2023",
    nameAr: "تقييم مخاطر شركة XYZ الربع الرابع 2023",
    template: "Risk Assessment Report",
    templateAr: "تقرير تقييم المخاطر",
    generatedBy: "Fatima Ali",
    generatedDate: "2024-01-18",
    status: "Draft",
    statusAr: "مسودة",
    format: "PDF",
    size: "3.1 MB",
    client: "XYZ Corporation",
    clientAr: "شركة XYZ",
  },
  {
    id: 3,
    name: "DEF Ltd Financial Analysis 2023",
    nameAr: "التحليل المالي لشركة DEF 2023",
    template: "Financial Statement Analysis",
    templateAr: "تحليل القوائم المالية",
    generatedBy: "Mohamed Saeed",
    generatedDate: "2024-01-15",
    status: "Under Review",
    statusAr: "قيد المراجعة",
    format: "Excel",
    size: "1.8 MB",
    client: "DEF Limited",
    clientAr: "شركة DEF المحدودة",
  },
]

const reportMetrics = [
  { month: "Jan", reports: 15, reviews: 12 },
  { month: "Feb", reports: 18, reviews: 16 },
  { month: "Mar", reports: 22, reviews: 20 },
  { month: "Apr", reports: 25, reviews: 23 },
  { month: "May", reports: 28, reviews: 26 },
  { month: "Jun", reports: 32, reviews: 30 },
]

const reportTypes = [
  { name: "Audit Reports", nameAr: "تقارير المراجعة", value: 45, color: "#3B82F6" },
  { name: "Risk Reports", nameAr: "تقارير المخاطر", value: 25, color: "#EF4444" },
  { name: "Financial Reports", nameAr: "التقارير المالية", value: 20, color: "#10B981" },
  { name: "Compliance Reports", nameAr: "تقارير الامتثال", value: 10, color: "#F59E0B" },
]

function ReportsContent() {
  const { isArabic, toggleLanguage } = useLanguage()
  const [newReportOpen, setNewReportOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Final":
        return "bg-green-100 text-green-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Pending":
        return "bg-orange-100 text-orange-800"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{isArabic ? "التقارير" : "Reports"}</h1>
            <p className="text-gray-600">
              {isArabic ? "إنشاء وإدارة تقارير المراجعة والامتثال" : "Generate and manage audit and compliance reports"}
            </p>
          </div>

          {/* Report Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {isArabic ? "التقارير هذا الشهر" : "Reports This Month"}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">32</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+12%</span>
                    </div>
                  </div>
                  <FileBarChart className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{isArabic ? "قيد المراجعة" : "Under Review"}</p>
                    <p className="text-3xl font-bold text-gray-900">8</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-orange-500 mr-1" />
                      <span className="text-sm text-orange-600">+3</span>
                    </div>
                  </div>
                  <Eye className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {isArabic ? "التقارير النهائية" : "Final Reports"}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">156</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+18%</span>
                    </div>
                  </div>
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {isArabic ? "القوالب المتاحة" : "Available Templates"}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm text-blue-600">+2</span>
                    </div>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="generated" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="generated">{isArabic ? "التقارير المُنشأة" : "Generated Reports"}</TabsTrigger>
                <TabsTrigger value="templates">{isArabic ? "القوالب" : "Templates"}</TabsTrigger>
                <TabsTrigger value="analytics">{isArabic ? "التحليلات" : "Analytics"}</TabsTrigger>
              </TabsList>

              <Dialog open={newReportOpen} onOpenChange={setNewReportOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {isArabic ? "تقرير جديد" : "New Report"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{isArabic ? "إنشاء تقرير جديد" : "Generate New Report"}</DialogTitle>
                    <DialogDescription>
                      {isArabic ? "اختر القالب وأدخل التفاصيل" : "Select template and enter details"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reportName">{isArabic ? "اسم التقرير" : "Report Name"}</Label>
                      <Input id="reportName" placeholder={isArabic ? "أدخل اسم التقرير" : "Enter report name"} />
                    </div>
                    <div>
                      <Label htmlFor="template">{isArabic ? "القالب" : "Template"}</Label>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger>
                          <SelectValue placeholder={isArabic ? "اختر القالب" : "Select template"} />
                        </SelectTrigger>
                        <SelectContent>
                          {reportTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id.toString()}>
                              {isArabic ? template.nameAr : template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="client">{isArabic ? "العميل" : "Client"}</Label>
                      <Input id="client" placeholder={isArabic ? "اسم العميل" : "Client name"} />
                    </div>
                    <div>
                      <Label htmlFor="format">{isArabic ? "التنسيق" : "Format"}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={isArabic ? "اختر التنسيق" : "Select format"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="word">Word</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="powerpoint">PowerPoint</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="notes">{isArabic ? "ملاحظات" : "Notes"}</Label>
                      <Textarea id="notes" placeholder={isArabic ? "ملاحظات إضافية..." : "Additional notes..."} />
                    </div>
                    <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                      <Button variant="outline" onClick={() => setNewReportOpen(false)}>
                        {isArabic ? "إلغاء" : "Cancel"}
                      </Button>
                      <Button onClick={() => setNewReportOpen(false)}>{isArabic ? "إنشاء" : "Generate"}</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <TabsContent value="generated" className="space-y-6">
              <div className="grid gap-4">
                {generatedReports.map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{isArabic ? report.nameAr : report.name}</h3>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 mt-1">
                              <span>
                                {isArabic ? "القالب" : "Template"}: {isArabic ? report.templateAr : report.template}
                              </span>
                              <span>•</span>
                              <span>
                                {isArabic ? "العميل" : "Client"}: {isArabic ? report.clientAr : report.client}
                              </span>
                              <span>•</span>
                              <span>{report.size}</span>
                              <span>•</span>
                              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <Calendar className="h-3 w-3" />
                                <span>{report.generatedDate}</span>
                              </div>
                              <span>•</span>
                              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <User className="h-3 w-3" />
                                <span>{report.generatedBy}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Badge className={getStatusColor(report.status)}>
                              {isArabic ? report.statusAr : report.status}
                            </Badge>
                            <Badge variant="outline">{report.format}</Badge>
                          </div>

                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <span>{isArabic ? template.nameAr : template.name}</span>
                      </CardTitle>
                      <CardDescription>{isArabic ? template.descriptionAr : template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{isArabic ? "النوع" : "Type"}</span>
                          <Badge variant="outline">{isArabic ? template.typeAr : template.type}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{isArabic ? "الوقت المقدر" : "Est. Time"}</span>
                          <span className="font-medium">{template.estimatedTime}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{isArabic ? "التنسيقات" : "Formats"}</span>
                          <div className="flex space-x-1 rtl:space-x-reverse">
                            {template.format.map((fmt, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {fmt}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2 rtl:space-x-reverse pt-4">
                          <Button size="sm" className="flex-1">
                            {isArabic ? "استخدام القالب" : "Use Template"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Report Generation Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>{isArabic ? "اتجاهات إنشاء التقارير" : "Report Generation Trends"}</CardTitle>
                    <CardDescription>
                      {isArabic ? "التقارير المُنشأة والمراجعة شهرياً" : "Monthly report generation and reviews"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        reports: { label: isArabic ? "التقارير" : "Reports", color: "hsl(var(--chart-1))" },
                        reviews: { label: isArabic ? "المراجعات" : "Reviews", color: "hsl(var(--chart-2))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={reportMetrics}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="reports" fill="var(--color-reports)" />
                          <Bar dataKey="reviews" fill="var(--color-reviews)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Report Types Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>{isArabic ? "توزيع أنواع التقارير" : "Report Types Distribution"}</CardTitle>
                    <CardDescription>
                      {isArabic ? "توزيع التقارير حسب النوع" : "Distribution of reports by type"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        audit: { label: isArabic ? "مراجعة" : "Audit", color: "#3B82F6" },
                        risk: { label: isArabic ? "مخاطر" : "Risk", color: "#EF4444" },
                        financial: { label: isArabic ? "مالية" : "Financial", color: "#10B981" },
                        compliance: { label: isArabic ? "امتثال" : "Compliance", color: "#F59E0B" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={reportTypes}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {reportTypes.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload
                                return (
                                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                                    <p className="font-medium">{isArabic ? data.nameAr : data.name}</p>
                                    <p className="text-sm text-gray-600">{data.value}%</p>
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default function Reports() {
  return (
    <LanguageProvider>
      <ReportsContent />
    </LanguageProvider>
  )
}
