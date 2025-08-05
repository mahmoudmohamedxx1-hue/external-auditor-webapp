"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  FileText,
  Users,
  Shield,
  Bell,
  Search,
  Menu,
  X,
  Home,
  Settings,
  HelpCircle,
  ChevronRight,
  Activity,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react"

interface DeloitteInterfaceProps {
  children: React.ReactNode
  isArabic?: boolean
}

export function DeloitteInterface({ children, isArabic = false }: DeloitteInterfaceProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigationItems = [
    { id: "dashboard", label: isArabic ? "الرئيسية" : "Dashboard", icon: Home, href: "/", active: true },
    {
      id: "excel-analyzer",
      label: isArabic ? "محلل Excel" : "Excel Analyzer",
      icon: FileText,
      href: "/excel-analyzer",
    },
    {
      id: "risk-assessment",
      label: isArabic ? "تقييم المخاطر" : "Risk Assessment",
      icon: Shield,
      href: "/risk-assessment",
    },
    { id: "reports", label: isArabic ? "التقارير" : "Reports", icon: BarChart3, href: "/reports" },
    { id: "team", label: isArabic ? "الفريق" : "Team", icon: Users, href: "/team" },
    { id: "settings", label: isArabic ? "الإعدادات" : "Settings", icon: Settings, href: "/settings" },
  ]

  const quickStats = [
    { label: isArabic ? "الملفات المحللة" : "Files Analyzed", value: "247", change: "+12%", trend: "up" },
    { label: isArabic ? "المخاطر المكتشفة" : "Risks Detected", value: "18", change: "-5%", trend: "down" },
    { label: isArabic ? "التقارير المُنشأة" : "Reports Generated", value: "89", change: "+8%", trend: "up" },
    { label: isArabic ? "معدل الدقة" : "Accuracy Rate", value: "94.5%", change: "+2.1%", trend: "up" },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "analysis",
      title: isArabic ? "تحليل ملف Excel جديد" : "New Excel file analyzed",
      description: isArabic
        ? "Financial_Report_Q4.xlsx - اكتمل التحليل"
        : "Financial_Report_Q4.xlsx - Analysis completed",
      time: "5 min ago",
      status: "completed",
    },
    {
      id: 2,
      type: "risk",
      title: isArabic ? "تم اكتشاف مخاطر متوسطة" : "Medium risk detected",
      description: isArabic ? "مشاكل في جودة البيانات تتطلب انتباه" : "Data quality issues require attention",
      time: "12 min ago",
      status: "warning",
    },
    {
      id: 3,
      type: "report",
      title: isArabic ? "تقرير المراجعة جاهز" : "Audit report ready",
      description: isArabic ? "تقرير شامل للمراجعة الشهرية" : "Comprehensive monthly audit report",
      time: "1 hour ago",
      status: "completed",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-16"} bg-white border-r border-gray-200 transition-all duration-300 hidden lg:block`}
      >
        <div className="p-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {isArabic ? "حل المراجعة المصري" : "Egyptian Audit"}
                </h1>
                <p className="text-xs text-gray-500">{isArabic ? "مدعوم بـ xAI" : "Powered by xAI"}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? "bg-green-50 text-green-700 border-r-2 border-green-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </a>
            ))}
          </nav>

          {/* Quick Stats */}
          {sidebarOpen && (
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 px-3">
                {isArabic ? "إحصائيات سريعة" : "Quick Stats"}
              </h3>
              <div className="space-y-3">
                {quickStats.map((stat, index) => (
                  <div key={index} className="px-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">{stat.label}</span>
                        <span className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* xAI Status */}
          {sidebarOpen && (
            <div className="mt-8 px-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-800">xAI Grok</span>
                </div>
                <p className="text-xs text-green-700">{isArabic ? "متصل ونشط" : "Connected & Active"}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-green-700 mb-1">
                    <span>{isArabic ? "الأداء" : "Performance"}</span>
                    <span>98%</span>
                  </div>
                  <Progress value={98} className="h-1" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 -right-3 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:shadow-md transition-shadow"
        >
          <ChevronRight className={`h-4 w-4 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="p-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {isArabic ? "حل المراجعة المصري" : "Egyptian Audit"}
                  </h1>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-lg transition-colors ${
                      item.active ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>

              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                <a href="/" className="text-gray-500 hover:text-gray-700">
                  {isArabic ? "الرئيسية" : "Home"}
                </a>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900 font-medium">{isArabic ? "محلل Excel" : "Excel Analyzer"}</span>
              </nav>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={isArabic ? "البحث..." : "Search..."}
                  className="pl-10 rtl:pr-10 rtl:pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* User Menu */}
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>AH</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{isArabic ? "أحمد حسن" : "Ahmed Hassan"}</p>
                  <p className="text-xs text-gray-500">{isArabic ? "مراجع أول" : "Senior Auditor"}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {isArabic ? "محلل Excel الذكي" : "Intelligent Excel Analyzer"}
                  </h1>
                  <p className="text-gray-600">
                    {isArabic
                      ? "تحليل شامل لملفات Excel باستخدام الذكاء الاصطناعي من xAI Grok"
                      : "Comprehensive Excel file analysis powered by xAI Grok AI"}
                  </p>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Badge variant="outline" className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Zap className="h-3 w-3" />
                    <span>{isArabic ? "مدعوم بـ xAI" : "Powered by xAI"}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Activity className="h-3 w-3 text-green-500" />
                    <span>{isArabic ? "نشط" : "Active"}</span>
                  </Badge>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Main Content Area */}
              <div className="xl:col-span-3">{children}</div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{isArabic ? "النشاط الأخير" : "Recent Activity"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            activity.status === "completed"
                              ? "bg-green-500"
                              : activity.status === "warning"
                                ? "bg-orange-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{isArabic ? "حالة النظام" : "System Status"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">xAI Grok API</span>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        {isArabic ? "متصل" : "Connected"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{isArabic ? "قاعدة البيانات" : "Database"}</span>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        {isArabic ? "نشط" : "Active"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">{isArabic ? "التخزين" : "Storage"}</span>
                      </div>
                      <Badge variant="outline" className="text-orange-600">
                        85% {isArabic ? "مستخدم" : "Used"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Help & Support */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{isArabic ? "المساعدة والدعم" : "Help & Support"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                      <HelpCircle className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {isArabic ? "دليل المستخدم" : "User Guide"}
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                      <FileText className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {isArabic ? "الوثائق" : "Documentation"}
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                      <Users className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {isArabic ? "اتصل بالدعم" : "Contact Support"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
