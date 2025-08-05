"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  FileText,
  Shield,
  Zap,
  Activity,
  BarChart3,
  PieChartIcon,
  Target,
} from "lucide-react"

interface AdvancedDashboardProps {
  isArabic?: boolean
}

export function AdvancedDashboard({ isArabic = false }: AdvancedDashboardProps) {
  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 24,
    processingFiles: 7,
    completedAnalyses: 156,
    systemLoad: 68,
    apiResponseTime: 1.2,
    errorRate: 0.3,
  })

  const [auditMetrics, setAuditMetrics] = useState({
    totalAudits: 89,
    completedAudits: 67,
    pendingReviews: 15,
    highRiskFindings: 23,
    complianceScore: 94.5,
    avgProcessingTime: 4.2,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3) - 1,
        systemLoad: Math.max(30, Math.min(95, prev.systemLoad + Math.floor(Math.random() * 10) - 5)),
        apiResponseTime: Math.max(0.5, Math.min(3.0, prev.apiResponseTime + (Math.random() - 0.5) * 0.2)),
        errorRate: Math.max(0, Math.min(2, prev.errorRate + (Math.random() - 0.5) * 0.1)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Sample data for charts
  const monthlyAnalysisData = [
    { month: isArabic ? "يناير" : "Jan", analyses: 45, findings: 12, compliance: 92 },
    { month: isArabic ? "فبراير" : "Feb", analyses: 52, findings: 18, compliance: 89 },
    { month: isArabic ? "مارس" : "Mar", analyses: 48, findings: 15, compliance: 94 },
    { month: isArabic ? "أبريل" : "Apr", analyses: 61, findings: 22, compliance: 91 },
    { month: isArabic ? "مايو" : "May", analyses: 58, findings: 19, compliance: 96 },
    { month: isArabic ? "يونيو" : "Jun", analyses: 67, findings: 25, compliance: 93 },
  ]

  const riskDistributionData = [
    { name: isArabic ? "منخفض" : "Low", value: 45, color: "#10B981" },
    { name: isArabic ? "متوسط" : "Medium", value: 32, color: "#F59E0B" },
    { name: isArabic ? "عالي" : "High", value: 18, color: "#EF4444" },
    { name: isArabic ? "حرج" : "Critical", value: 5, color: "#7C2D12" },
  ]

  const complianceData = [
    { standard: "EAS", score: 94, target: 95 },
    { standard: "IFRS", score: 91, target: 90 },
    { standard: "Tax Law", score: 97, target: 95 },
    { standard: "CBE Regs", score: 89, target: 90 },
    { standard: "EFRA", score: 92, target: 85 },
  ]

  const performanceMetrics = [
    {
      title: isArabic ? "المستخدمون النشطون" : "Active Users",
      value: realTimeData.activeUsers,
      change: "+12%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-600",
    },
    {
      title: isArabic ? "الملفات قيد المعالجة" : "Files Processing",
      value: realTimeData.processingFiles,
      change: "+5%",
      trend: "up",
      icon: <FileText className="h-5 w-5" />,
      color: "text-orange-600",
    },
    {
      title: isArabic ? "التحليلات المكتملة" : "Completed Analyses",
      value: realTimeData.completedAnalyses,
      change: "+18%",
      trend: "up",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-600",
    },
    {
      title: isArabic ? "حمولة النظام" : "System Load",
      value: `${realTimeData.systemLoad}%`,
      change: realTimeData.systemLoad > 80 ? "High" : "Normal",
      trend: realTimeData.systemLoad > 80 ? "down" : "up",
      icon: <Activity className="h-5 w-5" />,
      color: realTimeData.systemLoad > 80 ? "text-red-600" : "text-green-600",
    },
  ]

  const auditKPIs = [
    {
      title: isArabic ? "إجمالي المراجعات" : "Total Audits",
      value: auditMetrics.totalAudits,
      subtitle: isArabic ? "هذا الشهر" : "This month",
      icon: <Shield className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      title: isArabic ? "المراجعات المكتملة" : "Completed Audits",
      value: auditMetrics.completedAudits,
      subtitle: `${Math.round((auditMetrics.completedAudits / auditMetrics.totalAudits) * 100)}% ${isArabic ? "مكتمل" : "complete"}`,
      icon: <CheckCircle className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: isArabic ? "المراجعات المعلقة" : "Pending Reviews",
      value: auditMetrics.pendingReviews,
      subtitle: isArabic ? "تحتاج مراجعة" : "Need review",
      icon: <Clock className="h-6 w-6" />,
      color: "bg-orange-500",
    },
    {
      title: isArabic ? "النتائج عالية المخاطر" : "High Risk Findings",
      value: auditMetrics.highRiskFindings,
      subtitle: isArabic ? "تحتاج اهتمام" : "Need attention",
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "bg-red-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Real-time Status Bar */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">{isArabic ? "النظام نشط" : "System Active"}</span>
            </div>
            <div className="text-sm opacity-90">
              {isArabic ? "آخر تحديث:" : "Last updated:"} {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="text-center">
              <div className="text-lg font-bold">{realTimeData.apiResponseTime.toFixed(1)}s</div>
              <div className="text-xs opacity-75">{isArabic ? "وقت الاستجابة" : "Response Time"}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{realTimeData.errorRate.toFixed(1)}%</div>
              <div className="text-xs opacity-75">{isArabic ? "معدل الخطأ" : "Error Rate"}</div>
            </div>
            <Badge variant="outline" className="bg-white/20 text-white border-white/30">
              <Zap className="h-3 w-3 mr-1" />
              xAI {isArabic ? "متصل" : "Connected"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                    <p className="text-3xl font-bold">{metric.value}</p>
                    <Badge
                      variant={metric.trend === "up" ? "default" : "destructive"}
                      className={metric.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {metric.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${metric.color}`}>{metric.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Audit KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {auditKPIs.map((kpi, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <div className={`${kpi.color} p-4 flex items-center justify-center`}>
                  <div className="text-white">{kpi.icon}</div>
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-medium text-gray-900">{kpi.title}</h3>
                  <div className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</div>
                  <p className="text-sm text-gray-500 mt-1">{kpi.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Analytics Tabs */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends" className="flex items-center space-x-2 rtl:space-x-reverse">
            <TrendingUp className="h-4 w-4" />
            <span>{isArabic ? "الاتجاهات" : "Trends"}</span>
          </TabsTrigger>
          <TabsTrigger value="risks" className="flex items-center space-x-2 rtl:space-x-reverse">
            <AlertTriangle className="h-4 w-4" />
            <span>{isArabic ? "المخاطر" : "Risks"}</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Shield className="h-4 w-4" />
            <span>{isArabic ? "الامتثال" : "Compliance"}</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center space-x-2 rtl:space-x-reverse">
            <BarChart3 className="h-4 w-4" />
            <span>{isArabic ? "الأداء" : "Performance"}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <BarChart3 className="h-5 w-5" />
                  <span>{isArabic ? "تحليل الاتجاهات الشهرية" : "Monthly Analysis Trends"}</span>
                </CardTitle>
                <CardDescription>
                  {isArabic ? "عدد التحليلات والنتائج على مدار الأشهر" : "Analysis count and findings over months"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="analyses"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name={isArabic ? "التحليلات" : "Analyses"}
                    />
                    <Line
                      type="monotone"
                      dataKey="findings"
                      stroke="#EF4444"
                      strokeWidth={2}
                      name={isArabic ? "النتائج" : "Findings"}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Target className="h-5 w-5" />
                  <span>{isArabic ? "معدل الامتثال" : "Compliance Rate"}</span>
                </CardTitle>
                <CardDescription>
                  {isArabic ? "تطور معدل الامتثال عبر الوقت" : "Compliance rate evolution over time"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="compliance" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "الرؤى الذكية" : "AI Insights"}</CardTitle>
              <CardDescription>
                {isArabic ? "تحليلات مدعومة بالذكاء الاصطناعي من xAI Grok" : "AI-powered insights from xAI Grok"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{isArabic ? "اتجاه إيجابي:" : "Positive Trend:"}</strong>
                    <br />
                    {isArabic ? "تحسن في جودة البيانات بنسبة 15% هذا الشهر" : "Data quality improved by 15% this month"}
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{isArabic ? "تحذير:" : "Warning:"}</strong>
                    <br />
                    {isArabic ? "زيادة في المعاملات عالية المخاطر" : "Increase in high-risk transactions detected"}
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{isArabic ? "توصية:" : "Recommendation:"}</strong>
                    <br />
                    {isArabic ? "تحديث إجراءات التحقق من البيانات" : "Update data validation procedures"}
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <PieChartIcon className="h-5 w-5" />
                  <span>{isArabic ? "توزيع المخاطر" : "Risk Distribution"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? "المخاطر عالية الأولوية" : "High Priority Risks"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: isArabic ? "مخاطر البيانات" : "Data Integrity Risk",
                      level: "high",
                      description: isArabic
                        ? "اكتشاف تناقضات في البيانات المالية"
                        : "Inconsistencies detected in financial data",
                      impact: 85,
                    },
                    {
                      title: isArabic ? "مخاطر الامتثال" : "Compliance Risk",
                      level: "medium",
                      description: isArabic
                        ? "بعض المتطلبات التنظيمية تحتاج مراجعة"
                        : "Some regulatory requirements need review",
                      impact: 65,
                    },
                    {
                      title: isArabic ? "مخاطر التشغيل" : "Operational Risk",
                      level: "low",
                      description: isArabic ? "عمليات يدوية قد تؤدي لأخطاء" : "Manual processes may lead to errors",
                      impact: 35,
                    },
                  ].map((risk, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{risk.title}</h4>
                        <Badge
                          variant={
                            risk.level === "high" ? "destructive" : risk.level === "medium" ? "default" : "secondary"
                          }
                        >
                          {risk.level === "high"
                            ? isArabic
                              ? "عالي"
                              : "High"
                            : risk.level === "medium"
                              ? isArabic
                                ? "متوسط"
                                : "Medium"
                              : isArabic
                                ? "منخفض"
                                : "Low"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-xs text-gray-500">{isArabic ? "التأثير:" : "Impact:"}</span>
                        <Progress value={risk.impact} className="flex-1 h-2" />
                        <span className="text-xs font-medium">{risk.impact}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Shield className="h-5 w-5" />
                <span>{isArabic ? "حالة الامتثال للمعايير" : "Standards Compliance Status"}</span>
              </CardTitle>
              <CardDescription>
                {isArabic
                  ? "مستوى الامتثال للمعايير المصرية والدولية"
                  : "Compliance level with Egyptian and international standards"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {complianceData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.standard}</span>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm text-gray-500">
                          {isArabic ? "الهدف:" : "Target:"} {item.target}%
                        </span>
                        <Badge variant={item.score >= item.target ? "default" : "destructive"}>{item.score}%</Badge>
                      </div>
                    </div>
                    <Progress value={item.score} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{isArabic ? "غير ملتزم" : "Non-compliant"}</span>
                      <span>{isArabic ? "ملتزم بالكامل" : "Fully compliant"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? "أداء النظام" : "System Performance"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{isArabic ? "استخدام المعالج" : "CPU Usage"}</span>
                    <span className="text-sm text-gray-500">{realTimeData.systemLoad}%</span>
                  </div>
                  <Progress value={realTimeData.systemLoad} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{isArabic ? "استخدام الذاكرة" : "Memory Usage"}</span>
                    <span className="text-sm text-gray-500">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{isArabic ? "استخدام القرص" : "Disk Usage"}</span>
                    <span className="text-sm text-gray-500">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{isArabic ? "حركة الشبكة" : "Network Traffic"}</span>
                    <span className="text-sm text-gray-500">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? "إحصائيات xAI" : "xAI Statistics"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">{isArabic ? "حالة الاتصال" : "Connection Status"}</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {isArabic ? "متصل" : "Connected"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">1,247</div>
                      <div className="text-xs text-gray-600">{isArabic ? "طلبات اليوم" : "Requests Today"}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">99.8%</div>
                      <div className="text-xs text-gray-600">{isArabic ? "معدل النجاح" : "Success Rate"}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{isArabic ? "متوسط وقت الاستجابة" : "Avg Response Time"}</span>
                      <span className="font-medium">{realTimeData.apiResponseTime.toFixed(1)}s</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{isArabic ? "الطلبات المتبقية" : "Remaining Requests"}</span>
                      <span className="font-medium">8,753</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{isArabic ? "إعادة التعيين في" : "Reset in"}</span>
                      <span className="font-medium">23h 45m</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Zap className="h-5 w-5" />
            <span>{isArabic ? "إجراءات سريعة" : "Quick Actions"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-blue-600 hover:bg-blue-700">
              <FileText className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">{isArabic ? "تحليل جديد" : "New Analysis"}</div>
                <div className="text-xs opacity-90">{isArabic ? "ابدأ تحليل ملف" : "Start file analysis"}</div>
              </div>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-green-600 hover:bg-green-700">
              <Shield className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">{isArabic ? "فحص المخاطر" : "Risk Check"}</div>
                <div className="text-xs opacity-90">{isArabic ? "تقييم المخاطر" : "Assess risks"}</div>
              </div>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-purple-600 hover:bg-purple-700">
              <BarChart3 className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">{isArabic ? "تقرير شامل" : "Full Report"}</div>
                <div className="text-xs opacity-90">{isArabic ? "إنشاء تقرير" : "Generate report"}</div>
              </div>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-orange-600 hover:bg-orange-700">
              <Target className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">{isArabic ? "فحص الامتثال" : "Compliance Check"}</div>
                <div className="text-xs opacity-90">{isArabic ? "تحقق من المعايير" : "Check standards"}</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
