"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  Plus,
  RefreshCw,
  Database,
  Shield,
  TrendingUp,
  Building,
  Banknote,
  FileText,
  Users,
  Leaf,
} from "lucide-react"
import { apiService } from "@/lib/api-service"

interface APIIntegration {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  status: "connected" | "disconnected" | "error" | "pending"
  lastSync: string
  nextSync: string
  icon: any
  category: string
  categoryAr: string
  endpoint: string
  healthScore: number
  requestCount: number
  errorRate: number
  avgResponseTime: number
}

const availableIntegrations: APIIntegration[] = [
  {
    id: "tax-authority",
    name: "Egyptian Tax Authority",
    nameAr: "مصلحة الضرائب المصرية",
    description: "Tax compliance verification and status checking",
    descriptionAr: "التحقق من الامتثال الضريبي وفحص الحالة",
    status: "connected",
    lastSync: "2024-01-22 14:30:00",
    nextSync: "2024-01-22 18:30:00",
    icon: Banknote,
    category: "Government",
    categoryAr: "حكومي",
    endpoint: "/integrations/tax-authority",
    healthScore: 98,
    requestCount: 1250,
    errorRate: 0.2,
    avgResponseTime: 450,
  },
  {
    id: "commercial-registry",
    name: "Commercial Registry",
    nameAr: "السجل التجاري",
    description: "Company registration verification and data",
    descriptionAr: "التحقق من تسجيل الشركة والبيانات",
    status: "connected",
    lastSync: "2024-01-22 13:45:00",
    nextSync: "2024-01-23 13:45:00",
    icon: Building,
    category: "Government",
    categoryAr: "حكومي",
    endpoint: "/integrations/commercial-registry",
    healthScore: 95,
    requestCount: 890,
    errorRate: 0.5,
    avgResponseTime: 680,
  },
  {
    id: "efra",
    name: "Egyptian Financial Regulatory Authority",
    nameAr: "الهيئة العامة للرقابة المالية",
    description: "Financial regulatory compliance monitoring",
    descriptionAr: "مراقبة الامتثال للوائح المالية",
    status: "connected",
    lastSync: "2024-01-22 15:20:00",
    nextSync: "2024-01-22 21:20:00",
    icon: Shield,
    category: "Financial",
    categoryAr: "مالي",
    endpoint: "/integrations/efra",
    healthScore: 92,
    requestCount: 567,
    errorRate: 1.2,
    avgResponseTime: 720,
  },
  {
    id: "cbe",
    name: "Central Bank of Egypt",
    nameAr: "البنك المركزي المصري",
    description: "Exchange rates and banking regulations",
    descriptionAr: "أسعار الصرف واللوائح المصرفية",
    status: "connected",
    lastSync: "2024-01-22 16:00:00",
    nextSync: "2024-01-22 17:00:00",
    icon: Database,
    category: "Financial",
    categoryAr: "مالي",
    endpoint: "/integrations/cbe",
    healthScore: 99,
    requestCount: 2340,
    errorRate: 0.1,
    avgResponseTime: 320,
  },
  {
    id: "egx",
    name: "Egyptian Stock Exchange",
    nameAr: "البورصة المصرية",
    description: "Listed company data and disclosures",
    descriptionAr: "بيانات الشركات المدرجة والإفصاحات",
    status: "disconnected",
    lastSync: "2024-01-20 10:30:00",
    nextSync: "N/A",
    icon: TrendingUp,
    category: "Financial",
    categoryAr: "مالي",
    endpoint: "/integrations/egx",
    healthScore: 0,
    requestCount: 0,
    errorRate: 0,
    avgResponseTime: 0,
  },
  {
    id: "esia",
    name: "Egyptian Social Insurance Authority",
    nameAr: "الهيئة القومية للتأمين الاجتماعي",
    description: "Employee social insurance verification",
    descriptionAr: "التحقق من التأمين الاجتماعي للموظفين",
    status: "error",
    lastSync: "2024-01-22 12:15:00",
    nextSync: "2024-01-22 18:15:00",
    icon: Users,
    category: "Government",
    categoryAr: "حكومي",
    endpoint: "/integrations/esia",
    healthScore: 45,
    requestCount: 234,
    errorRate: 15.2,
    avgResponseTime: 1200,
  },
  {
    id: "eeaa",
    name: "Egyptian Environmental Affairs Agency",
    nameAr: "جهاز شؤون البيئة المصري",
    description: "Environmental compliance monitoring",
    descriptionAr: "مراقبة الامتثال البيئي",
    status: "pending",
    lastSync: "N/A",
    nextSync: "N/A",
    icon: Leaf,
    category: "Environmental",
    categoryAr: "بيئي",
    endpoint: "/integrations/eeaa",
    healthScore: 0,
    requestCount: 0,
    errorRate: 0,
    avgResponseTime: 0,
  },
  {
    id: "easb",
    name: "Egyptian Accounting Standards Board",
    nameAr: "مجلس معايير المحاسبة المصرية",
    description: "Latest accounting standards and updates",
    descriptionAr: "أحدث معايير المحاسبة والتحديثات",
    status: "connected",
    lastSync: "2024-01-22 09:00:00",
    nextSync: "2024-01-23 09:00:00",
    icon: FileText,
    category: "Standards",
    categoryAr: "معايير",
    endpoint: "/integrations/easb",
    healthScore: 88,
    requestCount: 445,
    errorRate: 2.1,
    avgResponseTime: 890,
  },
]

interface APIIntegrationManagerProps {
  isArabic: boolean
}

export function APIIntegrationManager({ isArabic }: APIIntegrationManagerProps) {
  const [integrations, setIntegrations] = useState<APIIntegration[]>(availableIntegrations)
  const [selectedIntegration, setSelectedIntegration] = useState<APIIntegration | null>(null)
  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [testDialogOpen, setTestDialogOpen] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "disconnected":
        return "bg-gray-100 text-gray-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const handleTestConnection = async (integration: APIIntegration) => {
    setIsLoading(true)
    setTestResults(null)

    try {
      // Simulate API test based on integration type
      let result
      switch (integration.id) {
        case "tax-authority":
          result = await apiService.verifyTaxNumber("123456789")
          break
        case "commercial-registry":
          result = await apiService.verifyCommercialRegistration("12345")
          break
        case "cbe":
          result = await apiService.getCBEExchangeRates()
          break
        default:
          result = { status: "success", message: "Connection test successful" }
      }

      setTestResults({
        success: true,
        data: result,
        responseTime: Math.random() * 1000 + 200,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      setTestResults({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSyncNow = async (integrationId: string) => {
    setIsLoading(true)
    try {
      // Update last sync time
      setIntegrations((prev) =>
        prev.map((int) => (int.id === integrationId ? { ...int, lastSync: new Date().toISOString() } : int)),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const connectedIntegrations = integrations.filter((i) => i.status === "connected")
  const totalRequests = integrations.reduce((sum, i) => sum + i.requestCount, 0)
  const avgHealthScore = Math.round(integrations.reduce((sum, i) => sum + i.healthScore, 0) / integrations.length)

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{isArabic ? "التكاملات المتصلة" : "Connected APIs"}</p>
                <p className="text-3xl font-bold text-green-600">{connectedIntegrations.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{isArabic ? "إجمالي الطلبات" : "Total Requests"}</p>
                <p className="text-3xl font-bold text-blue-600">{totalRequests.toLocaleString()}</p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{isArabic ? "متوسط الصحة" : "Avg Health Score"}</p>
                <p className={`text-3xl font-bold ${getHealthScoreColor(avgHealthScore)}`}>{avgHealthScore}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{isArabic ? "المتاحة" : "Available APIs"}</p>
                <p className="text-3xl font-bold text-gray-900">{integrations.length}</p>
              </div>
              <Database className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Management */}
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">{isArabic ? "نظرة عامة" : "Overview"}</TabsTrigger>
            <TabsTrigger value="government">{isArabic ? "حكومي" : "Government"}</TabsTrigger>
            <TabsTrigger value="financial">{isArabic ? "مالي" : "Financial"}</TabsTrigger>
            <TabsTrigger value="monitoring">{isArabic ? "المراقبة" : "Monitoring"}</TabsTrigger>
          </TabsList>

          <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isArabic ? "إضافة تكامل" : "Add Integration"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{isArabic ? "إضافة تكامل جديد" : "Add New Integration"}</DialogTitle>
                <DialogDescription>
                  {isArabic ? "تكوين تكامل API جديد" : "Configure a new API integration"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="api-name">{isArabic ? "اسم API" : "API Name"}</Label>
                  <Input id="api-name" placeholder={isArabic ? "أدخل اسم API" : "Enter API name"} />
                </div>
                <div>
                  <Label htmlFor="api-endpoint">{isArabic ? "نقطة النهاية" : "Endpoint"}</Label>
                  <Input id="api-endpoint" placeholder="https://api.example.com" />
                </div>
                <div>
                  <Label htmlFor="api-key">{isArabic ? "مفتاح API" : "API Key"}</Label>
                  <Input id="api-key" type="password" placeholder={isArabic ? "أدخل مفتاح API" : "Enter API key"} />
                </div>
                <div>
                  <Label htmlFor="category">{isArabic ? "الفئة" : "Category"}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={isArabic ? "اختر الفئة" : "Select category"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">{isArabic ? "حكومي" : "Government"}</SelectItem>
                      <SelectItem value="financial">{isArabic ? "مالي" : "Financial"}</SelectItem>
                      <SelectItem value="standards">{isArabic ? "معايير" : "Standards"}</SelectItem>
                      <SelectItem value="environmental">{isArabic ? "بيئي" : "Environmental"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" onClick={() => setConfigDialogOpen(false)}>
                    {isArabic ? "إلغاء" : "Cancel"}
                  </Button>
                  <Button onClick={() => setConfigDialogOpen(false)}>{isArabic ? "إضافة" : "Add"}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {integrations.map((integration) => {
              const Icon = integration.icon
              return (
                <Card key={integration.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {isArabic ? integration.nameAr : integration.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {isArabic ? integration.descriptionAr : integration.description}
                          </p>
                          <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 mt-2">
                            <span>
                              {isArabic ? "آخر مزامنة" : "Last Sync"}: {integration.lastSync}
                            </span>
                            <span>•</span>
                            <span>
                              {isArabic ? "الطلبات" : "Requests"}: {integration.requestCount}
                            </span>
                            <span>•</span>
                            <span>
                              {isArabic ? "معدل الخطأ" : "Error Rate"}: {integration.errorRate}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="text-right rtl:text-left">
                          <Badge className={getStatusColor(integration.status)}>
                            {isArabic
                              ? integration.status === "connected"
                                ? "متصل"
                                : integration.status === "disconnected"
                                  ? "منقطع"
                                  : integration.status === "error"
                                    ? "خطأ"
                                    : "معلق"
                              : integration.status}
                          </Badge>
                          <p className={`text-sm font-medium mt-1 ${getHealthScoreColor(integration.healthScore)}`}>
                            {isArabic ? "الصحة" : "Health"}: {integration.healthScore}%
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSyncNow(integration.id)}
                            disabled={isLoading}
                          >
                            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedIntegration(integration)
                              setTestDialogOpen(true)
                            }}
                          >
                            <Zap className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="government" className="space-y-4">
          <div className="grid gap-4">
            {integrations
              .filter((i) => i.category === "Government")
              .map((integration) => {
                const Icon = integration.icon
                return (
                  <Card key={integration.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <Icon className="h-8 w-8 text-blue-600" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{isArabic ? integration.nameAr : integration.name}</h3>
                          <p className="text-sm text-gray-600">
                            {isArabic ? integration.descriptionAr : integration.description}
                          </p>
                          <div className="mt-2">
                            <Progress value={integration.healthScore} className="h-2" />
                          </div>
                        </div>
                        <Badge className={getStatusColor(integration.status)}>{integration.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4">
            {integrations
              .filter((i) => i.category === "Financial")
              .map((integration) => {
                const Icon = integration.icon
                return (
                  <Card key={integration.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <Icon className="h-8 w-8 text-green-600" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{isArabic ? integration.nameAr : integration.name}</h3>
                          <p className="text-sm text-gray-600">
                            {isArabic ? integration.descriptionAr : integration.description}
                          </p>
                          <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 mt-2">
                            <span>
                              {isArabic ? "متوسط الاستجابة" : "Avg Response"}: {integration.avgResponseTime}ms
                            </span>
                            <span>
                              {isArabic ? "الطلبات" : "Requests"}: {integration.requestCount}
                            </span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(integration.status)}>{integration.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "مراقبة الأداء" : "Performance Monitoring"}</CardTitle>
              <CardDescription>
                {isArabic ? "مراقبة أداء التكاملات في الوقت الفعلي" : "Real-time integration performance monitoring"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {integrations
                  .filter((i) => i.status === "connected")
                  .map((integration) => (
                    <div key={integration.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">{isArabic ? integration.nameAr : integration.name}</h4>
                        <Badge className={getStatusColor(integration.status)}>{isArabic ? "متصل" : "Connected"}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">{isArabic ? "الصحة" : "Health Score"}</p>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Progress value={integration.healthScore} className="flex-1 h-2" />
                            <span className={`font-medium ${getHealthScoreColor(integration.healthScore)}`}>
                              {integration.healthScore}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600">{isArabic ? "معدل الخطأ" : "Error Rate"}</p>
                          <p className="font-medium">{integration.errorRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">{isArabic ? "متوسط الاستجابة" : "Avg Response"}</p>
                          <p className="font-medium">{integration.avgResponseTime}ms</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Test Connection Dialog */}
      <Dialog open={testDialogOpen} onOpenChange={setTestDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isArabic ? "اختبار الاتصال" : "Test Connection"}</DialogTitle>
            <DialogDescription>
              {selectedIntegration && (isArabic ? selectedIntegration.nameAr : selectedIntegration.name)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {testResults ? (
              <div className={`p-4 rounded-lg ${testResults.success ? "bg-green-50" : "bg-red-50"}`}>
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                  {testResults.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={`font-medium ${testResults.success ? "text-green-800" : "text-red-800"}`}>
                    {testResults.success
                      ? isArabic
                        ? "نجح الاتصال"
                        : "Connection Successful"
                      : isArabic
                        ? "فشل الاتصال"
                        : "Connection Failed"}
                  </span>
                </div>
                {testResults.responseTime && (
                  <p className="text-sm text-gray-600">
                    {isArabic ? "وقت الاستجابة" : "Response Time"}: {Math.round(testResults.responseTime)}ms
                  </p>
                )}
                {testResults.error && <p className="text-sm text-red-600 mt-2">{testResults.error}</p>}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">{isArabic ? "جاهز لاختبار الاتصال" : "Ready to test connection"}</p>
              </div>
            )}
            <div className="flex justify-end space-x-2 rtl:space-x-reverse">
              <Button variant="outline" onClick={() => setTestDialogOpen(false)}>
                {isArabic ? "إغلاق" : "Close"}
              </Button>
              <Button
                onClick={() => selectedIntegration && handleTestConnection(selectedIntegration)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2 rtl:ml-2 rtl:mr-0" />
                ) : (
                  <Zap className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                )}
                {isArabic ? "اختبار" : "Test"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
