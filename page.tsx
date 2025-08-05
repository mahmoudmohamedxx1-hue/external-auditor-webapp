"use client"
import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, FileText, Shield } from "lucide-react"

const auditData = [
  { month: "Jan", audits: 12, completed: 10 },
  { month: "Feb", audits: 15, completed: 13 },
  { month: "Mar", audits: 18, completed: 16 },
  { month: "Apr", audits: 22, completed: 20 },
  { month: "May", audits: 25, completed: 23 },
  { month: "Jun", audits: 28, completed: 26 },
]

const riskData = [
  { name: "Low Risk", value: 45, color: "#10B981" },
  { name: "Medium Risk", value: 35, color: "#F59E0B" },
  { name: "High Risk", value: 20, color: "#EF4444" },
]

const complianceData = [
  { standard: "EAS 1", compliance: 95 },
  { standard: "EAS 2", compliance: 88 },
  { standard: "EAS 3", compliance: 92 },
  { standard: "Tax Law", compliance: 97 },
  { standard: "Corporate Gov", compliance: 85 },
]

function DashboardContent() {
  const { isArabic, toggleLanguage, t } = useLanguage()

  const stats = [
    {
      title: isArabic ? "المراجعات النشطة" : "Active Audits",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: isArabic ? "المراجعات المعلقة" : "Pending Reviews",
      value: "8",
      change: "-5%",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: isArabic ? "المراجعات المكتملة" : "Completed Audits",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: isArabic ? "العناصر عالية المخاطر" : "High Risk Items",
      value: "12",
      change: "-15%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isArabic={isArabic} toggleLanguage={toggleLanguage} />

      <main className={`p-6 ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{isArabic ? "لوحة المراجعة" : "Audit Dashboard"}</h1>
            <p className="text-gray-600">
              {isArabic
                ? "نظرة عامة على أنشطة المراجعة والامتثال"
                : "Overview of audit activities and compliance status"}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Audit Trends */}
            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? "اتجاهات المراجعة" : "Audit Trends"}</CardTitle>
                <CardDescription>
                  {isArabic ? "المراجعات الشهرية والمكتملة" : "Monthly audits and completions"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    audits: { label: isArabic ? "المراجعات" : "Audits", color: "hsl(var(--chart-1))" },
                    completed: { label: isArabic ? "مكتملة" : "Completed", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={auditData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="audits" fill="var(--color-audits)" />
                      <Bar dataKey="completed" fill="var(--color-completed)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Risk Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? "توزيع المخاطر" : "Risk Distribution"}</CardTitle>
                <CardDescription>{isArabic ? "تصنيف المخاطر الحالية" : "Current risk categorization"}</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    low: { label: isArabic ? "منخفضة" : "Low Risk", color: "#10B981" },
                    medium: { label: isArabic ? "متوسطة" : "Medium Risk", color: "#F59E0B" },
                    high: { label: isArabic ? "عالية" : "High Risk", color: "#EF4444" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {riskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Status */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{isArabic ? "حالة الامتثال" : "Compliance Status"}</CardTitle>
              <CardDescription>
                {isArabic ? "الامتثال للمعايير المصرية" : "Compliance with Egyptian standards"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{item.standard}</span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Progress value={item.compliance} className="w-32" />
                      <span className="text-sm font-medium w-12">{item.compliance}%</span>
                      <Badge variant={item.compliance >= 90 ? "default" : "secondary"}>
                        {item.compliance >= 90 ? (isArabic ? "ممتاز" : "Excellent") : isArabic ? "جيد" : "Good"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "الأنشطة الأخيرة" : "Recent Activities"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: isArabic
                      ? "تم إكمال مراجعة الشركة المصرية للاتصالات"
                      : "Completed audit for Egyptian Telecom Company",
                    time: isArabic ? "منذ ساعتين" : "2 hours ago",
                    type: "success",
                  },
                  {
                    action: isArabic
                      ? "تم رفع مستندات جديدة لمراجعة البنك الأهلي"
                      : "New documents uploaded for National Bank audit",
                    time: isArabic ? "منذ 4 ساعات" : "4 hours ago",
                    type: "info",
                  },
                  {
                    action: isArabic ? "تحديث في معايير المراجعة المصرية" : "Update in Egyptian Auditing Standards",
                    time: isArabic ? "منذ يوم واحد" : "1 day ago",
                    type: "warning",
                  },
                  {
                    action: isArabic ? "تم إنشاء تقرير مخاطر جديد" : "New risk assessment report generated",
                    time: isArabic ? "منذ يومين" : "2 days ago",
                    type: "info",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg bg-gray-50"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "success"
                          ? "bg-green-500"
                          : activity.type === "warning"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default function Dashboard() {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  )
}
