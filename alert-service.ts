// Egyptian Audit Tool - Alert Service
// Handles API monitoring, alert triggering, and notification delivery

interface AlertMetrics {
  apiId: string
  responseTime: number
  errorRate: number
  availability: number
  healthScore: number
  requestCount: number
  timestamp: string
}

interface AlertRule {
  id: string
  name: string
  nameAr: string
  apiId: string
  metric: "response_time" | "error_rate" | "availability" | "health_score" | "request_count"
  condition: "greater_than" | "less_than" | "equals" | "not_equals"
  threshold: number
  severity: "critical" | "high" | "medium" | "low"
  enabled: boolean
  channels: string[]
  cooldown: number
  lastTriggered?: string
}

interface AlertChannel {
  id: string
  name: string
  type: "email" | "sms" | "webhook" | "slack" | "teams"
  config: Record<string, any>
  enabled: boolean
}

interface AlertNotification {
  id: string
  ruleId: string
  ruleName: string
  apiId: string
  apiName: string
  severity: string
  message: string
  messageAr: string
  triggeredAt: string
  channels: string[]
  metadata: Record<string, any>
}

class EgyptianAuditAlertService {
  private rules: Map<string, AlertRule> = new Map()
  private channels: Map<string, AlertChannel> = new Map()
  private metrics: Map<string, AlertMetrics[]> = new Map()
  private activeAlerts: Map<string, AlertNotification> = new Map()
  private monitoringInterval: NodeJS.Timeout | null = null

  constructor() {
    this.initializeDefaultRules()
    this.initializeDefaultChannels()
    this.startMonitoring()
  }

  private initializeDefaultRules() {
    const defaultRules: AlertRule[] = [
      {
        id: "rule-response-time-tax",
        name: "High Response Time - Tax Authority",
        nameAr: "وقت استجابة عالي - مصلحة الضرائب",
        apiId: "tax-authority",
        metric: "response_time",
        condition: "greater_than",
        threshold: 2000,
        severity: "high",
        enabled: true,
        channels: ["email-primary", "sms-emergency"],
        cooldown: 15,
      },
      {
        id: "rule-availability-all",
        name: "API Availability Drop",
        nameAr: "انخفاض توفر API",
        apiId: "all",
        metric: "availability",
        condition: "less_than",
        threshold: 95,
        severity: "critical",
        enabled: true,
        channels: ["email-primary", "webhook-slack"],
        cooldown: 5,
      },
      {
        id: "rule-error-rate-registry",
        name: "High Error Rate - Commercial Registry",
        nameAr: "معدل خطأ عالي - السجل التجاري",
        apiId: "commercial-registry",
        metric: "error_rate",
        condition: "greater_than",
        threshold: 5,
        severity: "medium",
        enabled: true,
        channels: ["email-primary"],
        cooldown: 30,
      },
    ]

    defaultRules.forEach((rule) => this.rules.set(rule.id, rule))
  }

  private initializeDefaultChannels() {
    const defaultChannels: AlertChannel[] = [
      {
        id: "email-primary",
        name: "Primary Email",
        type: "email",
        config: {
          recipients: ["admin@company.com", "audit-team@company.com"],
          smtpHost: "smtp.company.com",
          smtpPort: 587,
          username: "alerts@company.com",
          password: process.env.SMTP_PASSWORD,
          subject: "API Alert - Egyptian Audit System",
          subjectAr: "تنبيه API - نظام المراجعة المصري",
        },
        enabled: true,
      },
      {
        id: "sms-emergency",
        name: "Emergency SMS",
        type: "sms",
        config: {
          numbers: ["+20100123456", "+20101234567"],
          provider: "twilio",
          accountSid: process.env.TWILIO_ACCOUNT_SID,
          authToken: process.env.TWILIO_AUTH_TOKEN,
          fromNumber: "+1234567890",
        },
        enabled: true,
      },
      {
        id: "webhook-slack",
        name: "Slack Integration",
        type: "webhook",
        config: {
          url: process.env.SLACK_WEBHOOK_URL,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          template: {
            text: "🚨 API Alert: {{message}}",
            channel: "#api-alerts",
            username: "Egyptian Audit Bot",
          },
        },
        enabled: true,
      },
    ]

    defaultChannels.forEach((channel) => this.channels.set(channel.id, channel))
  }

  // Metric Collection
  async collectMetrics(apiId: string): Promise<AlertMetrics> {
    try {
      // In a real implementation, this would collect actual metrics from monitoring systems
      const metrics: AlertMetrics = {
        apiId,
        responseTime: Math.random() * 3000 + 200, // 200-3200ms
        errorRate: Math.random() * 10, // 0-10%
        availability: Math.random() * 20 + 80, // 80-100%
        healthScore: Math.random() * 30 + 70, // 70-100
        requestCount: Math.floor(Math.random() * 1000 + 100), // 100-1100
        timestamp: new Date().toISOString(),
      }

      // Store metrics for historical analysis
      if (!this.metrics.has(apiId)) {
        this.metrics.set(apiId, [])
      }
      const apiMetrics = this.metrics.get(apiId)!
      apiMetrics.push(metrics)

      // Keep only last 100 metrics per API
      if (apiMetrics.length > 100) {
        apiMetrics.splice(0, apiMetrics.length - 100)
      }

      return metrics
    } catch (error) {
      console.error(`Error collecting metrics for ${apiId}:`, error)
      throw error
    }
  }

  // Alert Evaluation
  private evaluateRule(rule: AlertRule, metrics: AlertMetrics): boolean {
    if (!rule.enabled) return false

    const metricValue = metrics[rule.metric]

    switch (rule.condition) {
      case "greater_than":
        return metricValue > rule.threshold
      case "less_than":
        return metricValue < rule.threshold
      case "equals":
        return metricValue === rule.threshold
      case "not_equals":
        return metricValue !== rule.threshold
      default:
        return false
    }
  }

  private isInCooldown(rule: AlertRule): boolean {
    if (!rule.lastTriggered) return false

    const lastTriggered = new Date(rule.lastTriggered)
    const cooldownEnd = new Date(lastTriggered.getTime() + rule.cooldown * 60 * 1000)

    return new Date() < cooldownEnd
  }

  // Alert Triggering
  async triggerAlert(rule: AlertRule, metrics: AlertMetrics): Promise<void> {
    if (this.isInCooldown(rule)) {
      console.log(`Rule ${rule.id} is in cooldown, skipping alert`)
      return
    }

    const alertId = `alert-${Date.now()}-${rule.id}`
    const notification: AlertNotification = {
      id: alertId,
      ruleId: rule.id,
      ruleName: rule.name,
      apiId: metrics.apiId,
      apiName: this.getApiName(metrics.apiId),
      severity: rule.severity,
      message: this.generateAlertMessage(rule, metrics, false),
      messageAr: this.generateAlertMessage(rule, metrics, true),
      triggeredAt: new Date().toISOString(),
      channels: rule.channels,
      metadata: {
        metricValue: metrics[rule.metric],
        threshold: rule.threshold,
        condition: rule.condition,
        metrics: metrics,
      },
    }

    // Store active alert
    this.activeAlerts.set(alertId, notification)

    // Update rule last triggered time
    rule.lastTriggered = notification.triggeredAt
    this.rules.set(rule.id, rule)

    // Send notifications
    await this.sendNotifications(notification)

    console.log(`Alert triggered: ${rule.name} for API ${metrics.apiId}`)
  }

  private generateAlertMessage(rule: AlertRule, metrics: AlertMetrics, isArabic: boolean): string {
    const apiName = isArabic ? this.getApiNameAr(metrics.apiId) : this.getApiName(metrics.apiId)
    const metricName = isArabic ? this.getMetricNameAr(rule.metric) : this.getMetricName(rule.metric)
    const metricValue = metrics[rule.metric]
    const threshold = rule.threshold
    const unit = this.getMetricUnit(rule.metric)

    if (isArabic) {
      return `تنبيه: ${apiName} - ${metricName} ${this.getConditionAr(rule.condition)} ${threshold}${unit} (القيمة الحالية: ${metricValue}${unit})`
    } else {
      return `Alert: ${apiName} - ${metricName} ${this.getConditionText(rule.condition)} ${threshold}${unit} (current: ${metricValue}${unit})`
    }
  }

  private getApiName(apiId: string): string {
    const apiNames: Record<string, string> = {
      "tax-authority": "Egyptian Tax Authority",
      "commercial-registry": "Commercial Registry",
      cbe: "Central Bank of Egypt",
      efra: "Egyptian Financial Regulatory Authority",
      egx: "Egyptian Stock Exchange",
      esia: "Egyptian Social Insurance Authority",
      eeaa: "Egyptian Environmental Affairs Agency",
    }
    return apiNames[apiId] || apiId
  }

  private getApiNameAr(apiId: string): string {
    const apiNames: Record<string, string> = {
      "tax-authority": "مصلحة الضرائب المصرية",
      "commercial-registry": "السجل التجاري",
      cbe: "البنك المركزي المصري",
      efra: "الهيئة العامة للرقابة المالية",
      egx: "البورصة المصرية",
      esia: "الهيئة القومية للتأمين الاجتماعي",
      eeaa: "جهاز شؤون البيئة المصري",
    }
    return apiNames[apiId] || apiId
  }

  private getMetricName(metric: string): string {
    const metricNames: Record<string, string> = {
      response_time: "Response Time",
      error_rate: "Error Rate",
      availability: "Availability",
      health_score: "Health Score",
      request_count: "Request Count",
    }
    return metricNames[metric] || metric
  }

  private getMetricNameAr(metric: string): string {
    const metricNames: Record<string, string> = {
      response_time: "وقت الاستجابة",
      error_rate: "معدل الخطأ",
      availability: "التوفر",
      health_score: "نقاط الصحة",
      request_count: "عدد الطلبات",
    }
    return metricNames[metric] || metric
  }

  private getMetricUnit(metric: string): string {
    const units: Record<string, string> = {
      response_time: "ms",
      error_rate: "%",
      availability: "%",
      health_score: "",
      request_count: "",
    }
    return units[metric] || ""
  }

  private getConditionText(condition: string): string {
    const conditions: Record<string, string> = {
      greater_than: "exceeds",
      less_than: "below",
      equals: "equals",
      not_equals: "not equals",
    }
    return conditions[condition] || condition
  }

  private getConditionAr(condition: string): string {
    const conditions: Record<string, string> = {
      greater_than: "يتجاوز",
      less_than: "أقل من",
      equals: "يساوي",
      not_equals: "لا يساوي",
    }
    return conditions[condition] || condition
  }

  // Notification Delivery
  async sendNotifications(notification: AlertNotification): Promise<void> {
    const promises = notification.channels.map(async (channelId) => {
      const channel = this.channels.get(channelId)
      if (!channel || !channel.enabled) {
        console.warn(`Channel ${channelId} not found or disabled`)
        return
      }

      try {
        await this.sendNotification(channel, notification)
      } catch (error) {
        console.error(`Failed to send notification via ${channel.name}:`, error)
      }
    })

    await Promise.allSettled(promises)
  }

  private async sendNotification(channel: AlertChannel, notification: AlertNotification): Promise<void> {
    switch (channel.type) {
      case "email":
        await this.sendEmailNotification(channel, notification)
        break
      case "sms":
        await this.sendSMSNotification(channel, notification)
        break
      case "webhook":
        await this.sendWebhookNotification(channel, notification)
        break
      case "slack":
        await this.sendSlackNotification(channel, notification)
        break
      default:
        console.warn(`Unsupported channel type: ${channel.type}`)
    }
  }

  private async sendEmailNotification(channel: AlertChannel, notification: AlertNotification): Promise<void> {
    // In a real implementation, this would use a proper email service like SendGrid, SES, or SMTP
    console.log(`Sending email notification to ${channel.config.recipients.join(", ")}`)
    console.log(`Subject: ${channel.config.subject}`)
    console.log(`Message: ${notification.message}`)

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  private async sendSMSNotification(channel: AlertChannel, notification: AlertNotification): Promise<void> {
    // In a real implementation, this would use Twilio, AWS SNS, or similar service
    console.log(`Sending SMS to ${channel.config.numbers.join(", ")}`)
    console.log(`Message: ${notification.message}`)

    // Simulate SMS sending
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  private async sendWebhookNotification(channel: AlertChannel, notification: AlertNotification): Promise<void> {
    try {
      const payload = {
        alert_id: notification.id,
        rule_name: notification.ruleName,
        api_name: notification.apiName,
        severity: notification.severity,
        message: notification.message,
        triggered_at: notification.triggeredAt,
        metadata: notification.metadata,
      }

      const response = await fetch(channel.config.url, {
        method: channel.config.method || "POST",
        headers: channel.config.headers || { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Webhook request failed: ${response.status} ${response.statusText}`)
      }

      console.log(`Webhook notification sent successfully to ${channel.config.url}`)
    } catch (error) {
      console.error(`Failed to send webhook notification:`, error)
      throw error
    }
  }

  private async sendSlackNotification(channel: AlertChannel, notification: AlertNotification): Promise<void> {
    const severityEmoji = {
      critical: "🔴",
      high: "🟠",
      medium: "🟡",
      low: "🔵",
    }

    const payload = {
      text: `${severityEmoji[notification.severity as keyof typeof severityEmoji]} ${notification.message}`,
      channel: channel.config.channel || "#api-alerts",
      username: channel.config.username || "Egyptian Audit Bot",
      attachments: [
        {
          color:
            notification.severity === "critical" ? "danger" : notification.severity === "high" ? "warning" : "good",
          fields: [
            {
              title: "API",
              value: notification.apiName,
              short: true,
            },
            {
              title: "Severity",
              value: notification.severity.toUpperCase(),
              short: true,
            },
            {
              title: "Triggered At",
              value: new Date(notification.triggeredAt).toLocaleString(),
              short: true,
            },
          ],
        },
      ],
    }

    await this.sendWebhookNotification(
      { ...channel, config: { ...channel.config, url: channel.config.url } },
      {
        ...notification,
        message: JSON.stringify(payload),
      },
    )
  }

  // Monitoring Loop
  private startMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
    }

    this.monitoringInterval = setInterval(async () => {
      await this.runMonitoringCycle()
    }, 60000) // Run every minute

    console.log("Alert monitoring started")
  }

  private async runMonitoringCycle(): Promise<void> {
    try {
      const apiIds = ["tax-authority", "commercial-registry", "cbe", "efra", "egx", "esia", "eeaa"]

      for (const apiId of apiIds) {
        try {
          const metrics = await this.collectMetrics(apiId)
          await this.evaluateRules(apiId, metrics)
        } catch (error) {
          console.error(`Error monitoring API ${apiId}:`, error)
        }
      }
    } catch (error) {
      console.error("Error in monitoring cycle:", error)
    }
  }

  private async evaluateRules(apiId: string, metrics: AlertMetrics): Promise<void> {
    const applicableRules = Array.from(this.rules.values()).filter(
      (rule) => rule.apiId === apiId || rule.apiId === "all",
    )

    for (const rule of applicableRules) {
      if (this.evaluateRule(rule, metrics)) {
        await this.triggerAlert(rule, metrics)
      }
    }
  }

  // Public API Methods
  addRule(rule: AlertRule): void {
    this.rules.set(rule.id, rule)
    console.log(`Alert rule added: ${rule.name}`)
  }

  updateRule(ruleId: string, updates: Partial<AlertRule>): void {
    const rule = this.rules.get(ruleId)
    if (rule) {
      const updatedRule = { ...rule, ...updates }
      this.rules.set(ruleId, updatedRule)
      console.log(`Alert rule updated: ${rule.name}`)
    }
  }

  deleteRule(ruleId: string): void {
    const rule = this.rules.get(ruleId)
    if (rule) {
      this.rules.delete(ruleId)
      console.log(`Alert rule deleted: ${rule.name}`)
    }
  }

  addChannel(channel: AlertChannel): void {
    this.channels.set(channel.id, channel)
    console.log(`Alert channel added: ${channel.name}`)
  }

  updateChannel(channelId: string, updates: Partial<AlertChannel>): void {
    const channel = this.channels.get(channelId)
    if (channel) {
      const updatedChannel = { ...channel, ...updates }
      this.channels.set(channelId, updatedChannel)
      console.log(`Alert channel updated: ${channel.name}`)
    }
  }

  deleteChannel(channelId: string): void {
    const channel = this.channels.get(channelId)
    if (channel) {
      this.channels.delete(channelId)
      console.log(`Alert channel deleted: ${channel.name}`)
    }
  }

  async testChannel(channelId: string): Promise<boolean> {
    const channel = this.channels.get(channelId)
    if (!channel) {
      throw new Error(`Channel ${channelId} not found`)
    }

    try {
      const testNotification: AlertNotification = {
        id: `test-${Date.now()}`,
        ruleId: "test-rule",
        ruleName: "Test Alert",
        apiId: "test-api",
        apiName: "Test API",
        severity: "low",
        message: "This is a test alert notification",
        messageAr: "هذا تنبيه اختبار",
        triggeredAt: new Date().toISOString(),
        channels: [channelId],
        metadata: { test: true },
      }

      await this.sendNotification(channel, testNotification)
      return true
    } catch (error) {
      console.error(`Channel test failed for ${channel.name}:`, error)
      return false
    }
  }

  getRules(): AlertRule[] {
    return Array.from(this.rules.values())
  }

  getChannels(): AlertChannel[] {
    return Array.from(this.channels.values())
  }

  getActiveAlerts(): AlertNotification[] {
    return Array.from(this.activeAlerts.values())
  }

  getMetrics(apiId: string): AlertMetrics[] {
    return this.metrics.get(apiId) || []
  }

  acknowledgeAlert(alertId: string, userId: string): void {
    const alert = this.activeAlerts.get(alertId)
    if (alert) {
      // In a real implementation, this would update the alert status in the database
      console.log(`Alert ${alertId} acknowledged by ${userId}`)
    }
  }

  resolveAlert(alertId: string, userId: string): void {
    const alert = this.activeAlerts.get(alertId)
    if (alert) {
      this.activeAlerts.delete(alertId)
      console.log(`Alert ${alertId} resolved by ${userId}`)
    }
  }

  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
      this.monitoringInterval = null
      console.log("Alert monitoring stopped")
    }
  }

  // Analytics Methods
  getAlertStatistics(timeRange = "24h"): any {
    const alerts = Array.from(this.activeAlerts.values())
    const now = new Date()
    const timeRangeMs = this.parseTimeRange(timeRange)
    const cutoffTime = new Date(now.getTime() - timeRangeMs)

    const recentAlerts = alerts.filter((alert) => new Date(alert.triggeredAt) >= cutoffTime)

    const severityCount = recentAlerts.reduce(
      (acc, alert) => {
        acc[alert.severity] = (acc[alert.severity] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const apiCount = recentAlerts.reduce(
      (acc, alert) => {
        acc[alert.apiId] = (acc[alert.apiId] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      totalAlerts: recentAlerts.length,
      severityBreakdown: severityCount,
      apiBreakdown: apiCount,
      timeRange,
      generatedAt: now.toISOString(),
    }
  }

  private parseTimeRange(timeRange: string): number {
    const unit = timeRange.slice(-1)
    const value = Number.parseInt(timeRange.slice(0, -1))

    switch (unit) {
      case "h":
        return value * 60 * 60 * 1000
      case "d":
        return value * 24 * 60 * 60 * 1000
      case "w":
        return value * 7 * 24 * 60 * 60 * 1000
      default:
        return 24 * 60 * 60 * 1000 // Default to 24 hours
    }
  }
}

// Export singleton instance
export const alertService = new EgyptianAuditAlertService()

// Export types
export type { AlertRule, AlertChannel, AlertNotification, AlertMetrics }
