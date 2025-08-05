"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, Clock, TrendingUp, Activity, Bell, RefreshCw } from "lucide-react"
import { alertService } from "@/lib/alert-service"

interface AlertDashboardProps {
  isArabic: boolean
}

export function AlertDashboard({ isArabic }: AlertDashboardProps) {
  const [activeAlerts, setActiveAlerts] = useState<any[]>([])
  const [alertStats, setAlertStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    loadDashboardData()
    const interval = setInterval(loadDashboardData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      const alerts = alertService.getActiveAlerts()
      const stats = alertService.getAlertStatistics("24h")

      setActiveAlerts(alerts)
      setAlertStats(stats)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "low":
        return <Activity className="h-4 w-4 text-blue-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">{isArabic ? "جاري التحميل..." : "Loading..."}</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{isArabic ? "لوحة تحكم التنبيهات" : "Alert Dashboard"}</h2>
          <p className="text-gray-600">
            {isArabic ? "مراقبة التنبيهات في الوقت الفعلي" : "Real-time alert monitoring"}
          </p>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm text-gray-500">
            {isArabic ? "آخر تحديث" : "Last updated"}: {lastUpdate.toLocaleTimeString()}
          </span>
          <Button variant="outline" size="sm" onClick={loadDashboardData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {activeAlerts.some((alert) => alert.severity === "critical") && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">{isArabic ? "تنبيهات حرجة" : "Critical Alerts"}</AlertTitle>
          <AlertDescription className="text-red-700">
            {isArabic
              ? `يوجد ${activeAlerts.filter((a) => a.severity === "critical").length} تنبيه حرج يتطلب انتباهك الفوري`
              : `You have ${activeAlerts.filter((a) => a.severity === "critical").length} critical alert(s) requiring immediate attention`}
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Overview */}
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
                <p className="text-sm font-medium text-gray-600">{isArabic ? "التنبيهات الحرجة" : "Critical Alerts"}</p>
                <p className="text-3xl font-bold text-red-800">
                  {activeAlerts.filter((a) => a.severity === "critical").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-800" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{isArabic ? "إجمالي اليوم" : "Today's Total"}</p>
                <p className="text-3xl font-bold text-blue-600">{alertStats?.totalAlerts || 0}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{isArabic ? "معدل الحل" : "Resolution Rate"}</p>
                <p className="text-3xl font-bold text-green-600">94%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Bell className="h-5 w-5" />
            <span>{isArabic ? "التنبيهات النشطة" : "Active Alerts"}</span>
          </CardTitle>
          <CardDescription>
            {isArabic ? "التنبيهات التي تتطلب انتباهك" : "Alerts requiring your attention"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeAlerts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <p className="text-gray-600">{isArabic ? "لا توجد تنبيهات نشطة" : "No active alerts"}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      {getSeverityIcon(alert.severity)}
                      <div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                          <h4 className="font-medium text-gray-900">{alert.ruleName}</h4>
                          <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{isArabic ? alert.messageAr : alert.message}</p>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs text-gray-500">
                          <span>
                            {isArabic ? "API" : "API"}: {alert.apiName}
                          </span>
                          <span>•</span>
                          <span>
                            {isArabic ? "وقت التفعيل" : "Triggered"}: {new Date(alert.triggeredAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button variant="outline" size="sm">
                        {isArabic ? "إقرار" : "Acknowledge"}
                      </Button>
                      <Button variant="outline" size="sm">
                        {isArabic ? "حل" : "Resolve"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alert Statistics */}
      {alertStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "التوزيع حسب الشدة" : "Distribution by Severity"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(alertStats.severityBreakdown || {}).map(([severity, count]) => {
                  const percentage = alertStats.totalAlerts > 0 ? ((count as number) / alertStats.totalAlerts) * 100 : 0
                  return (
                    <div key={severity} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Badge className={getSeverityColor(severity)}>{severity}</Badge>
                        <span className="text-sm text-gray-600">{count as number}</span>
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
              <CardTitle>{isArabic ? "التوزيع حسب API" : "Distribution by API"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(alertStats.apiBreakdown || {}).map(([apiId, count]) => {
                  const percentage = alertStats.totalAlerts > 0 ? ((count as number) / alertStats.totalAlerts) * 100 : 0
                  return (
                    <div key={apiId} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-medium">{apiId}</span>
                        <span className="text-sm text-gray-600">{count as number}</span>
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
        </div>
      )}
    </div>
  )
}
