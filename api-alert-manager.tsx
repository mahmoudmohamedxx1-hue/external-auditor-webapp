"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Settings,
  Shield,
  Zap,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Activity,
} from "lucide-react"

interface AlertRule {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  apiId: string
  apiName: string
  apiNameAr: string
  metric: "response_time" | "error_rate" | "availability" | "health_score" | "request_count"
  condition: "greater_than" | "less_than" | "equals" | "not_equals"
  threshold: number
  severity: "critical" | "high" | "medium" | "low"
  enabled: boolean
  channels: string[]
  cooldown: number // minutes
  lastTriggered?: string
  triggerCount: number
  createdAt: string
  updatedAt: string
}

interface AlertChannel {
  id: string
  name: string
  nameAr: string
  type: "email" | "sms" | "webhook" | "slack" | "teams"
  config: Record<string, any>
  enabled: boolean
  testStatus?: "success" | "failed" | "pending"
}

interface AlertHistory {
  id: string
  ruleId: string
  ruleName: string
  apiId: string
  apiName: string
  severity: string
  message: string
  messageAr: string
  triggeredAt: string
  resolvedAt?: string
  status: "active" | "resolved" | "acknowledged"
  acknowledgedBy?: string
  channels: string[]
  metadata: Record<string, any>
}

const defaultAlertRules: AlertRule[] = [
  {
    id: "rule-1",
    name: "High Response Time - Tax Authority",
    nameAr: "وقت استجابة عالي - مصلحة الضرائب",
    description: "Alert when Tax Authority API response time exceeds 2 seconds",
    descriptionAr: "تنبيه عندما يتجاوز وقت استجابة API مصلحة الضرائب ثانيتين",
    apiId: "tax-authority",
    apiName: "Egyptian Tax Authority",
    apiNameAr: "مصلحة الضرائب المصرية",
    metric: "response_time",
    condition: "greater_than",
    threshold: 2000,
    severity: "high",
    enabled: true,
    channels: ["email-1", "sms-1"],
    cooldown: 15,
    triggerCount: 3,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-22T14:30:00Z",
    lastTriggered: "2024-01-22T14:30:00Z",
  },
  {
    id: "rule-2",
    name: "API Availability Drop",
    nameAr: "انخفاض توفر API",
    description: "Alert when any API availability drops below 95%",
    descriptionAr: "تنبيه عندما ينخفض توفر أي API تحت 95%",
    apiId: "all",
    apiName: "All APIs",
    apiNameAr: "جميع واجهات API",
    metric: "availability",
    condition: "less_than",
    threshold: 95,
    severity: "critical",
    enabled: true,
    channels: ["email-1", "webhook-1"],
    cooldown: 5,
    triggerCount: 1,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-22T14:30:00Z",
  },
  {
    id: "rule-3",
    name: "High Error Rate - Commercial Registry",
    nameAr: "معدل خطأ عالي - السجل التجاري",
    description: "Alert when Commercial Registry error rate exceeds 5%",
    descriptionAr: "تنبيه عندما يتجاوز معدل خطأ السجل التجاري 5%",
    apiId: "commercial-registry",
    apiName: "Commercial Registry",
    apiNameAr: "السجل التجاري",
    metric: "error_rate",
    condition: "greater_than",
    threshold: 5,
    severity: "medium",
    enabled: true,
    channels: ["email-1"],
    cooldown: 30,
    triggerCount: 0,
    createdAt: "2024-01-21T09:00:00Z",
    updatedAt: "2024-01-21T09:00:00Z",
  },
]

const defaultAlertChannels: AlertChannel[] = [
  {
    id: "email-1",
    name: "Primary Email",
    nameAr: "البريد الإلكتروني الأساسي",
    type: "email",
    config: {
      recipients: ["admin@company.com", "audit-team@company.com"],
      subject: "API Alert - Egyptian Audit System",
      subjectAr: "تنبيه API - نظام المراجعة المصري",
    },
    enabled: true,
    testStatus: "success",
  },
  {
    id: "sms-1",
    name: "Emergency SMS",
    nameAr: "رسائل الطوارئ النصية",
    type: "sms",
    config: {
      numbers: ["+20100123456", "+20101234567"],
      provider: "twilio",
    },
    enabled: true,
    testStatus: "success",
  },
  {
    id: "webhook-1",
    name: "Slack Integration",
    nameAr: "تكامل سلاك",
    type: "webhook",
    config: {
      url: "https://hooks.slack.com/services/...",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    enabled: false,
    testStatus: "pending",
  },
]

const alertHistory: AlertHistory[] = [
  {
    id: "alert-1",
    ruleId: "rule-1",
    ruleName: "High Response Time - Tax Authority",
    apiId: "tax-authority",
    apiName: "Egyptian Tax Authority",
    severity: "high",
    message: "Tax Authority API response time exceeded 2000ms (actual: 2450ms)",
    messageAr: "تجاوز وقت استجابة API مصلحة الضرائب 2000 مللي ثانية (الفعلي: 2450 مللي ثانية)",
    triggeredAt: "2024-01-22T14:30:00Z",
    resolvedAt: "2024-01-22T14:35:00Z",
    status: "resolved",
    channels: ["email-1", "sms-1"],
    metadata: {
      responseTime: 2450,
      endpoint: "/integrations/tax-authority/verify",
      requestId: "req-123456",
    },
  },
  {
    id: "alert-2",
    ruleId: "rule-2",
    ruleName: "API Availability Drop",
    apiId: "esia",
    apiName: "Egyptian Social Insurance Authority",
    severity: "critical",
    message: "ESIA API availability dropped to 89%",
    messageAr: "انخفض توفر API الهيئة القومية للتأمين الاجتماعي إلى 89%",
    triggeredAt: "2024-01-22T12:15:00Z",
    status: "active",
    channels: ["email-1", "webhook-1"],
    metadata: {
      availability: 89,
      downtime: "45 minutes",
      affectedRequests: 23,
    },
  },
]

interface APIAlertManagerProps {
  isArabic: boolean
}

export function APIAlertManager({ isArabic }: APIAlertManagerProps) {
  const [alertRules, setAlertRules] = useState<AlertRule[]>(defaultAlertRules)
  const [alertChannels, setAlertChannels] = useState<AlertChannel[]>(defaultAlertChannels)
  const [alerts, setAlerts] = useState<AlertHistory[]>(alertHistory)
  const [selectedRule, setSelectedRule] = useState<AlertRule | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<AlertChannel | null>(null)
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false)
  const [channelDialogOpen, setChannelDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // New rule form state
  const [newRule, setNewRule] = useState<Partial<AlertRule>>({
    name: "",
    nameAr: "",
    description: "",
    descriptionAr: "",
    apiId: "",
    metric: "response_time",
    condition: "greater_than",
    threshold: 1000,
    severity: "medium",
    enabled: true,
    channels: [],
    cooldown: 15,
  })

  // New channel form state
  const [newChannel, setNewChannel] = useState<Partial<AlertChannel>>({
    name: "",
    nameAr: "",
    type: "email",
    config: {},
    enabled: true,
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "acknowledged":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "response_time":
        return <Clock className="h-4 w-4" />
      case "error_rate":
        return <AlertTriangle className="h-4 w-4" />
      case "availability":
        return <Shield className="h-4 w-4" />
      case "health_score":
        return <Activity className="h-4 w-4" />
      case "request_count":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <Phone className="h-4 w-4" />
      case "webhook":
        return <Zap className="h-4 w-4" />
      case "slack":
        return <MessageSquare className="h-4 w-4" />
      case "teams":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const handleCreateRule = () => {
    const rule: AlertRule = {
      ...newRule,
      id: `rule-${Date.now()}`,
      triggerCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as AlertRule

    setAlertRules([...alertRules, rule])
    setRuleDialogOpen(false)
    setNewRule({
      name: "",
      nameAr: "",
      description: "",
      descriptionAr: "",
      apiId: "",
      metric: "response_time",
      condition: "greater_than",
      threshold: 1000,
      severity: "medium",
      enabled: true,
      channels: [],
      cooldown: 15,
    })
  }

  const handleCreateChannel = () => {
    const channel: AlertChannel = {
      ...newChannel,
      id: `channel-${Date.now()}`,
    } as AlertChannel

    setAlertChannels([...alertChannels, channel])
    setChannelDialogOpen(false)
    setNewChannel({
      name: "",
      nameAr: "",
      type: "email",
      config: {},
      enabled: true,
    })
  }

  const handleTestChannel = async (channelId: string) => {
    setIsLoading(true)
    try {
      // Simulate channel test
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setAlertChannels((prev) =>
        prev.map((channel) => (channel.id === channelId ? { ...channel, testStatus: "success" } : channel)),
      )
    } catch (error) {
      setAlertChannels((prev) =>
        prev.map((channel) => (channel.id === channelId ? { ...channel, testStatus: "failed" } : channel)),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleRule = (ruleId: string) => {
    setAlertRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: "acknowledged", acknowledgedBy: "Current User" } : alert,
      ),
    )
  }

  const activeAlerts = alerts.filter((alert) => alert.status === "active")
  const enabledRules = alertRules.filter((rule) => rule.enabled)
  const enabledChannels = alertChannels.filter((channel) => channel.enabled)

  return (
    <div className="space-y-6">
      {/* Alert Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{isArabic ? "التنبيهات النشطة" : "Active Alerts"}</p>
                <p className="text-3xl font-bold text-red-600">{activeAlerts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{isArabic ? "القواعد المفعلة" : "Enabled Rules"}</p>
                <p className="text-3xl font-bold text-blue-600">{enabledRules.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{isArabic ? "قنوات التنبيه" : "Alert Channels"}</p>
                <p className="text-3xl font-bold text-green-600">{enabledChannels.length}</p>
              </div>
              <Bell className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{isArabic ? "إجمالي التنبيهات" : "Total Alerts"}</p>
                <p className="text-3xl font-bold text-purple-600">{alerts.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts Banner */}
      {activeAlerts.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">{isArabic ? "تنبيهات نشطة" : "Active Alerts"}</AlertTitle>
          <AlertDescription className="text-red-700">
            {isArabic
              ? `يوجد ${activeAlerts.length} تنبيه نشط يتطلب انتباهك`
              : `You have ${activeAlerts.length} active alert${activeAlerts.length > 1 ? "s" : ""} requiring attention`}
          </AlertDescription>
        </Alert>
      )}

      {/* Main Tabs */}
      <Tabs defaultValue="rules" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="rules">{isArabic ? "قواعد التنبيه" : "Alert Rules"}</TabsTrigger>
            <TabsTrigger value="channels">{isArabic ? "قنوات التنبيه" : "Channels"}</TabsTrigger>
            <TabsTrigger value="history">{isArabic ? "سجل التنبيهات" : "Alert History"}</TabsTrigger>
            <TabsTrigger value="analytics">{isArabic ? "التحليلات" : "Analytics"}</TabsTrigger>
          </TabsList>

          <div className="flex space-x-2 rtl:space-x-reverse">
            <Dialog open={channelDialogOpen} onOpenChange={setChannelDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {isArabic ? "قناة جديدة" : "New Channel"}
                </Button>
              </DialogTrigger>
            </Dialog>

            <Dialog open={ruleDialogOpen} onOpenChange={setRuleDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {isArabic ? "قاعدة جديدة" : "New Rule"}
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        {/* Alert Rules Tab */}
        <TabsContent value="rules" className="space-y-4">
          <div className="grid gap-4">
            {alertRules.map((rule) => (
              <Card key={rule.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="p-2 bg-blue-100 rounded-lg">{getMetricIcon(rule.metric)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                          <h3 className="font-semibold text-gray-900">{isArabic ? rule.nameAr : rule.name}</h3>
                          <Badge className={getSeverityColor(rule.severity)}>{rule.severity}</Badge>
                          {!rule.enabled && <Badge variant="secondary">{isArabic ? "معطل" : "Disabled"}</Badge>}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{isArabic ? rule.descriptionAr : rule.description}</p>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                          <span>
                            {isArabic ? "API" : "API"}: {isArabic ? rule.apiNameAr : rule.apiName}
                          </span>
                          <span>•</span>
                          <span>
                            {isArabic ? "العتبة" : "Threshold"}: {rule.threshold}
                            {rule.metric === "response_time" ? "ms" : rule.metric === "error_rate" ? "%" : ""}
                          </span>
                          <span>•</span>
                          <span>
                            {isArabic ? "مرات التفعيل" : "Triggered"}: {rule.triggerCount}
                          </span>
                          {rule.lastTriggered && (
                            <>
                              <span>•</span>
                              <span>
                                {isArabic ? "آخر تفعيل" : "Last"}: {new Date(rule.lastTriggered).toLocaleString()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch checked={rule.enabled} onCheckedChange={() => handleToggleRule(rule.id)} />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Alert Channels Tab */}
        <TabsContent value="channels" className="space-y-4">
          <div className="grid gap-4">
            {alertChannels.map((channel) => (
              <Card key={channel.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="p-2 bg-green-100 rounded-lg">{getChannelIcon(channel.type)}</div>
                      <div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                          <h3 className="font-semibold text-gray-900">{isArabic ? channel.nameAr : channel.name}</h3>
                          <Badge variant="outline">{channel.type}</Badge>
                          {channel.testStatus && (
                            <Badge
                              className={
                                channel.testStatus === "success"
                                  ? "bg-green-100 text-green-800"
                                  : channel.testStatus === "failed"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {channel.testStatus}
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {channel.type === "email" && (
                            <span>
                              {isArabic ? "المستلمون" : "Recipients"}: {channel.config.recipients?.join(", ")}
                            </span>
                          )}
                          {channel.type === "sms" && (
                            <span>
                              {isArabic ? "الأرقام" : "Numbers"}: {channel.config.numbers?.join(", ")}
                            </span>
                          )}
                          {channel.type === "webhook" && (
                            <span>
                              {isArabic ? "الرابط" : "URL"}: {channel.config.url}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch checked={channel.enabled} />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTestChannel(channel.id)}
                        disabled={isLoading}
                      >
                        <Zap className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Alert History Tab */}
        <TabsContent value="history" className="space-y-4">
          <div className="grid gap-4">
            {alerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                          <h3 className="font-semibold text-gray-900">{alert.ruleName}</h3>
                          <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                          <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{isArabic ? alert.messageAr : alert.message}</p>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                          <span>
                            {isArabic ? "API" : "API"}: {alert.apiName}
                          </span>
                          <span>•</span>
                          <span>
                            {isArabic ? "وقت التفعيل" : "Triggered"}: {new Date(alert.triggeredAt).toLocaleString()}
                          </span>
                          {alert.resolvedAt && (
                            <>
                              <span>•</span>
                              <span>
                                {isArabic ? "وقت الحل" : "Resolved"}: {new Date(alert.resolvedAt).toLocaleString()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      {alert.status === "active" && (
                        <Button variant="outline" size="sm" onClick={() => handleAcknowledgeAlert(alert.id)}>
                          {isArabic ? "إقرار" : "Acknowledge"}
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? "التنبيهات حسب الشدة" : "Alerts by Severity"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["critical", "high", "medium", "low"].map((severity) => {
                    const count = alerts.filter((alert) => alert.severity === severity).length
                    const percentage = alerts.length > 0 ? (count / alerts.length) * 100 : 0
                    return (
                      <div key={severity} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Badge className={getSeverityColor(severity)}>{severity}</Badge>
                          <span className="text-sm text-gray-600">{count}</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse w-32">
                          <Progress value={percentage} className="flex-1" />
                          <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? "أداء القنوات" : "Channel Performance"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertChannels.map((channel) => (
                    <div key={channel.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {getChannelIcon(channel.type)}
                        <span className="text-sm font-medium">{isArabic ? channel.nameAr : channel.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {channel.testStatus === "success" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : channel.testStatus === "failed" ? (
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-600" />
                        )}
                        <span className="text-sm text-gray-500">{channel.testStatus || "untested"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Rule Dialog */}
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isArabic ? "إنشاء قاعدة تنبيه جديدة" : "Create New Alert Rule"}</DialogTitle>
          <DialogDescription>
            {isArabic
              ? "تكوين قاعدة تنبيه جديدة لمراقبة أداء API"
              : "Configure a new alert rule to monitor API performance"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rule-name">{isArabic ? "اسم القاعدة" : "Rule Name"}</Label>
              <Input
                id="rule-name"
                value={newRule.name}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                placeholder={isArabic ? "أدخل اسم القاعدة" : "Enter rule name"}
              />
            </div>
            <div>
              <Label htmlFor="rule-name-ar">{isArabic ? "اسم القاعدة بالعربية" : "Rule Name (Arabic)"}</Label>
              <Input
                id="rule-name-ar"
                value={newRule.nameAr}
                onChange={(e) => setNewRule({ ...newRule, nameAr: e.target.value })}
                placeholder={isArabic ? "أدخل اسم القاعدة بالعربية" : "Enter rule name in Arabic"}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="rule-description">{isArabic ? "الوصف" : "Description"}</Label>
            <Textarea
              id="rule-description"
              value={newRule.description}
              onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
              placeholder={isArabic ? "وصف القاعدة" : "Rule description"}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="api-select">{isArabic ? "API" : "API"}</Label>
              <Select value={newRule.apiId} onValueChange={(value) => setNewRule({ ...newRule, apiId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={isArabic ? "اختر API" : "Select API"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isArabic ? "جميع واجهات API" : "All APIs"}</SelectItem>
                  <SelectItem value="tax-authority">{isArabic ? "مصلحة الضرائب" : "Tax Authority"}</SelectItem>
                  <SelectItem value="commercial-registry">
                    {isArabic ? "السجل التجاري" : "Commercial Registry"}
                  </SelectItem>
                  <SelectItem value="cbe">{isArabic ? "البنك المركزي" : "Central Bank"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="metric-select">{isArabic ? "المقياس" : "Metric"}</Label>
              <Select value={newRule.metric} onValueChange={(value: any) => setNewRule({ ...newRule, metric: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="response_time">{isArabic ? "وقت الاستجابة" : "Response Time"}</SelectItem>
                  <SelectItem value="error_rate">{isArabic ? "معدل الخطأ" : "Error Rate"}</SelectItem>
                  <SelectItem value="availability">{isArabic ? "التوفر" : "Availability"}</SelectItem>
                  <SelectItem value="health_score">{isArabic ? "نقاط الصحة" : "Health Score"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="condition-select">{isArabic ? "الشرط" : "Condition"}</Label>
              <Select
                value={newRule.condition}
                onValueChange={(value: any) => setNewRule({ ...newRule, condition: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greater_than">{isArabic ? "أكبر من" : "Greater than"}</SelectItem>
                  <SelectItem value="less_than">{isArabic ? "أقل من" : "Less than"}</SelectItem>
                  <SelectItem value="equals">{isArabic ? "يساوي" : "Equals"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="threshold">{isArabic ? "العتبة" : "Threshold"}</Label>
              <Input
                id="threshold"
                type="number"
                value={newRule.threshold}
                onChange={(e) => setNewRule({ ...newRule, threshold: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="severity-select">{isArabic ? "الشدة" : "Severity"}</Label>
              <Select
                value={newRule.severity}
                onValueChange={(value: any) => setNewRule({ ...newRule, severity: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">{isArabic ? "حرج" : "Critical"}</SelectItem>
                  <SelectItem value="high">{isArabic ? "عالي" : "High"}</SelectItem>
                  <SelectItem value="medium">{isArabic ? "متوسط" : "Medium"}</SelectItem>
                  <SelectItem value="low">{isArabic ? "منخفض" : "Low"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="cooldown">{isArabic ? "فترة التهدئة (دقائق)" : "Cooldown (minutes)"}</Label>
            <Input
              id="cooldown"
              type="number"
              value={newRule.cooldown}
              onChange={(e) => setNewRule({ ...newRule, cooldown: Number(e.target.value) })}
            />
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Switch
              checked={newRule.enabled}
              onCheckedChange={(checked) => setNewRule({ ...newRule, enabled: checked })}
            />
            <Label>{isArabic ? "تفعيل القاعدة" : "Enable Rule"}</Label>
          </div>
        </div>
        <div className="flex justify-end space-x-2 rtl:space-x-reverse">
          <Button variant="outline" onClick={() => setRuleDialogOpen(false)}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={handleCreateRule}>{isArabic ? "إنشاء" : "Create"}</Button>
        </div>
      </DialogContent>

      {/* Create Channel Dialog */}
      <Dialog open={channelDialogOpen} onOpenChange={setChannelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isArabic ? "إنشاء قناة تنبيه جديدة" : "Create New Alert Channel"}</DialogTitle>
            <DialogDescription>
              {isArabic ? "تكوين قناة جديدة لإرسال التنبيهات" : "Configure a new channel for sending alerts"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="channel-name">{isArabic ? "اسم القناة" : "Channel Name"}</Label>
              <Input
                id="channel-name"
                value={newChannel.name}
                onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                placeholder={isArabic ? "أدخل اسم القناة" : "Enter channel name"}
              />
            </div>

            <div>
              <Label htmlFor="channel-type">{isArabic ? "نوع القناة" : "Channel Type"}</Label>
              <Select
                value={newChannel.type}
                onValueChange={(value: any) => setNewChannel({ ...newChannel, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">{isArabic ? "بريد إلكتروني" : "Email"}</SelectItem>
                  <SelectItem value="sms">{isArabic ? "رسائل نصية" : "SMS"}</SelectItem>
                  <SelectItem value="webhook">{isArabic ? "ويب هوك" : "Webhook"}</SelectItem>
                  <SelectItem value="slack">{isArabic ? "سلاك" : "Slack"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newChannel.type === "email" && (
              <div>
                <Label htmlFor="email-recipients">{isArabic ? "المستلمون" : "Recipients"}</Label>
                <Textarea
                  id="email-recipients"
                  placeholder="email1@company.com, email2@company.com"
                  onChange={(e) =>
                    setNewChannel({
                      ...newChannel,
                      config: { ...newChannel.config, recipients: e.target.value.split(",").map((s) => s.trim()) },
                    })
                  }
                />
              </div>
            )}

            {newChannel.type === "sms" && (
              <div>
                <Label htmlFor="sms-numbers">{isArabic ? "أرقام الهواتف" : "Phone Numbers"}</Label>
                <Textarea
                  id="sms-numbers"
                  placeholder="+20100123456, +20101234567"
                  onChange={(e) =>
                    setNewChannel({
                      ...newChannel,
                      config: { ...newChannel.config, numbers: e.target.value.split(",").map((s) => s.trim()) },
                    })
                  }
                />
              </div>
            )}

            {newChannel.type === "webhook" && (
              <div>
                <Label htmlFor="webhook-url">{isArabic ? "رابط الويب هوك" : "Webhook URL"}</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://hooks.slack.com/services/..."
                  onChange={(e) =>
                    setNewChannel({
                      ...newChannel,
                      config: { ...newChannel.config, url: e.target.value },
                    })
                  }
                />
              </div>
            )}

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Switch
                checked={newChannel.enabled}
                onCheckedChange={(checked) => setNewChannel({ ...newChannel, enabled: checked })}
              />
              <Label>{isArabic ? "تفعيل القناة" : "Enable Channel"}</Label>
            </div>
          </div>
          <div className="flex justify-end space-x-2 rtl:space-x-reverse">
            <Button variant="outline" onClick={() => setChannelDialogOpen(false)}>
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleCreateChannel}>{isArabic ? "إنشاء" : "Create"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
