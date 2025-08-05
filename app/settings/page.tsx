"use client"

import { Progress } from "@/components/ui/progress"

import { useState } from "react"
import { DeloitteInterface } from "@/components/deloitte-interface"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  Bell,
  Shield,
  SettingsIcon,
  Database,
  Zap,
  AlertTriangle,
  CheckCircle,
  Save,
  RefreshCw,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

function SettingsContent() {
  const { isArabic, toggleLanguage } = useLanguage()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "Ahmed",
    lastName: "Hassan",
    email: "ahmed.hassan@company.com",
    phone: "+20 100 123 4567",
    position: "Senior Auditor",
    department: "financial",
    bio: "Senior auditor with 8+ years of experience in financial auditing and compliance.",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    auditReminders: true,
    complianceAlerts: true,
    reportGeneration: false,
  })

  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginNotifications: true,
    apiKeyRotation: true,
  })

  const [system, setSystem] = useState({
    language: isArabic ? "ar" : "en",
    timezone: "africa/cairo",
    dateFormat: "dd/mm/yyyy",
    theme: "light",
    autoSave: true,
    debugMode: false,
  })

  const [xaiSettings, setXaiSettings] = useState({
    model: "grok-3",
    temperature: 0.3,
    maxTokens: 4000,
    enableStreaming: true,
    enableCache: true,
    rateLimitPerHour: 1000,
  })

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: isArabic ? "تم حفظ الملف الشخصي" : "Profile saved",
        description: isArabic ? "تم تحديث معلوماتك بنجاح" : "Your information has been updated successfully",
      })
    } catch (error) {
      toast({
        title: isArabic ? "خطأ في الحفظ" : "Save error",
        description: isArabic ? "فشل في حفظ التغييرات" : "Failed to save changes",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNotifications = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: isArabic ? "تم حفظ إعدادات الإشعارات" : "Notification settings saved",
        description: isArabic ? "تم تحديث تفضيلات الإشعارات" : "Notification preferences updated",
      })
    } catch (error) {
      toast({
        title: isArabic ? "خطأ في الحفظ" : "Save error",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSecurity = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: isArabic ? "تم حفظ إعدادات الأمان" : "Security settings saved",
        description: isArabic ? "تم تحديث إعدادات الأمان بنجاح" : "Security settings updated successfully",
      })
    } catch (error) {
      toast({
        title: isArabic ? "خطأ في الحفظ" : "Save error",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTestXAI = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-xai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: xaiSettings.model }),
      })

      if (response.ok) {
        toast({
          title: isArabic ? "اختبار xAI نجح" : "xAI test successful",
          description: isArabic ? "الاتصال بـ xAI يعمل بشكل صحيح" : "xAI connection is working properly",
        })
      } else {
        throw new Error("Test failed")
      }
    } catch (error) {
      toast({
        title: isArabic ? "فشل اختبار xAI" : "xAI test failed",
        description: isArabic ? "تحقق من إعدادات API" : "Please check your API settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DeloitteInterface isArabic={isArabic}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{isArabic ? "الإعدادات" : "Settings"}</h1>
            <p className="text-gray-600 mt-1">
              {isArabic ? "إدارة إعدادات النظام والحساب الشخصي" : "Manage system and personal account settings"}
            </p>
          </div>
          <Badge variant="outline" className="flex items-center space-x-1 rtl:space-x-reverse">
            <Zap className="h-3 w-3" />
            <span>{isArabic ? "مدعوم بـ xAI" : "xAI Powered"}</span>
          </Badge>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile" className="flex items-center space-x-2 rtl:space-x-reverse">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{isArabic ? "الملف الشخصي" : "Profile"}</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">{isArabic ? "الإشعارات" : "Notifications"}</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">{isArabic ? "الأمان" : "Security"}</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2 rtl:space-x-reverse">
              <SettingsIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{isArabic ? "النظام" : "System"}</span>
            </TabsTrigger>
            <TabsTrigger value="xai" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">xAI</span>
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">{isArabic ? "النسخ الاحتياطي" : "Backup"}</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <User className="h-5 w-5" />
                  <span>{isArabic ? "معلومات الملف الشخصي" : "Profile Information"}</span>
                </CardTitle>
                <CardDescription>
                  {isArabic ? "تحديث معلومات حسابك الشخصي" : "Update your personal account information"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">{isArabic ? "الاسم الأول" : "First Name"}</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{isArabic ? "اسم العائلة" : "Last Name"}</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">{isArabic ? "البريد الإلكتروني" : "Email Address"}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">{isArabic ? "رقم الهاتف" : "Phone Number"}</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">{isArabic ? "المنصب" : "Position"}</Label>
                    <Input
                      id="position"
                      value={profile.position}
                      onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="department">{isArabic ? "القسم" : "Department"}</Label>
                  <Select
                    value={profile.department}
                    onValueChange={(value) => setProfile({ ...profile, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">{isArabic ? "المراجعة المالية" : "Financial Audit"}</SelectItem>
                      <SelectItem value="tax">{isArabic ? "الاستشارات الضريبية" : "Tax Advisory"}</SelectItem>
                      <SelectItem value="risk">{isArabic ? "إدارة المخاطر" : "Risk Management"}</SelectItem>
                      <SelectItem value="compliance">{isArabic ? "الامتثال" : "Compliance"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bio">{isArabic ? "نبذة شخصية" : "Bio"}</Label>
                  <Textarea
                    id="bio"
                    placeholder={isArabic ? "اكتب نبذة عن نفسك..." : "Write a brief bio about yourself..."}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={loading}>
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        {isArabic ? "جاري الحفظ..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {isArabic ? "حفظ التغييرات" : "Save Changes"}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Bell className="h-5 w-5" />
                  <span>{isArabic ? "إعدادات الإشعارات" : "Notification Settings"}</span>
                </CardTitle>
                <CardDescription>
                  {isArabic ? "تخصيص كيفية تلقي الإشعارات" : "Customize how you receive notifications"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">
                        {isArabic ? "إشعارات البريد الإلكتروني" : "Email Notifications"}
                      </Label>
                      <p className="text-sm text-gray-500">
                        {isArabic ? "تلقي الإشعارات عبر البريد الإلكتروني" : "Receive notifications via email"}
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">
                        {isArabic ? "الإشعارات الفورية" : "Push Notifications"}
                      </Label>
                      <p className="text-sm text-gray-500">
                        {isArabic ? "تلقي الإشعارات الفورية في المتصفح" : "Receive push notifications in browser"}
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">{isArabic ? "رسائل SMS" : "SMS Notifications"}</Label>
                      <p className="text-sm text-gray-500">
                        {isArabic ? "تلقي الإشعارات عبر الرسائل النصية" : "Receive notifications via SMS"}
                      </p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>
                </div>

                <hr />

                <div className="space-y-4">
                  <h4 className="font-medium">{isArabic ? "أنواع الإشعارات" : "Notification Types"}</h4>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="audit-reminders">{isArabic ? "تذكيرات المراجعة" : "Audit Reminders"}</Label>
                      <p className="text-sm text-gray-500">
                        {isArabic ? "تذكيرات بمواعيد المراجعة والمهام" : "Reminders for audit deadlines and tasks"}
                      </p>
                    </div>
                    <Switch
                      id="audit-reminders"
                      checked={notifications.auditReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, auditReminders: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compliance-alerts">{isArabic ? "تنبيهات الامتثال" : "Compliance Alerts"}</Label>
                      <p className="text-sm text-gray-500">
                        {isArabic
                          ? "تنبيهات حول التغييرات في قوانين ولوائح الامتثال"
                          : "Alerts about changes in compliance laws and regulations"}
                      </p>
                    </div>
                    <Switch
                      id="compliance-alerts"
                      checked={notifications.complianceAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, complianceAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="report-generation">{isArabic ? "إشعارات التقارير" : "Report Generation"}</Label>
                      <p className="text-sm text-gray-500">
                        {isArabic ? "إشعارات عند اكتمال إنشاء التقارير" : "Notifications when reports are generated"}
                      </p>
                    </div>
                    <Switch
                      id="report-generation"
                      checked={notifications.reportGeneration}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, reportGeneration: checked })}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications} disabled={loading}>
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        {isArabic ? "جاري الحفظ..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {isArabic ? "حفظ الإعدادات" : "Save Settings"}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Shield className="h-5 w-5" />
                  <span>{isArabic ? "إعدادات الأمان" : "Security Settings"}</span>
                </CardTitle>
                <CardDescription>
                  {isArabic ? "إدارة إعدادات الأمان والخصوصية" : "Manage security and privacy settings"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    {isArabic
                      ? "إعدادات الأمان هذه تحمي حسابك وبياناتك. تأكد من تفعيل المصادقة الثنائية."
                      : "These security settings protect your account and data. Make sure to enable two-factor authentication."}
                  </AlertDescription>
                </Alert>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">{isArabic ? "المصادقة الثنائية" : "Two-Factor Authentication"}</Label>
                    <p className="text-sm text-gray-500">
                      {isArabic ? "تفعيل المصادقة الثنائية لحماية إضافية" : "Enable 2FA for additional security"}
                    </p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={security.twoFactor}
                    onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="login-notifications">
                      {isArabic ? "إشعارات تسجيل الدخول" : "Login Notifications"}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {isArabic
                        ? "تلقي إشعارات عند تسجيل الدخول من أجهزة جديدة"
                        : "Receive notifications for new device logins"}
                    </p>
                  </div>
                  <Switch
                    id="login-notifications"
                    checked={security.loginNotifications}
                    onCheckedChange={(checked) => setSecurity({ ...security, loginNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="api-rotation">{isArabic ? "تدوير مفاتيح API" : "API Key Rotation"}</Label>
                    <p className="text-sm text-gray-500">
                      {isArabic ? "تدوير مفاتيح API تلقائياً كل 30 يوم" : "Automatically rotate API keys every 30 days"}
                    </p>
                  </div>
                  <Switch
                    id="api-rotation"
                    checked={security.apiKeyRotation}
                    onCheckedChange={(checked) => setSecurity({ ...security, apiKeyRotation: checked })}
                  />
                </div>

                <div>
                  <Label htmlFor="session-timeout">
                    {isArabic ? "انتهاء الجلسة (دقائق)" : "Session Timeout (minutes)"}
                  </Label>
                  <Select
                    value={security.sessionTimeout}
                    onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 {isArabic ? "دقيقة" : "minutes"}</SelectItem>
                      <SelectItem value="30">30 {isArabic ? "دقيقة" : "minutes"}</SelectItem>
                      <SelectItem value="60">60 {isArabic ? "دقيقة" : "minutes"}</SelectItem>
                      <SelectItem value="120">120 {isArabic ? "دقيقة" : "minutes"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="password-expiry">
                    {isArabic ? "انتهاء كلمة المرور (أيام)" : "Password Expiry (days)"}
                  </Label>
                  <Select
                    value={security.passwordExpiry}
                    onValueChange={(value) => setSecurity({ ...security, passwordExpiry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 {isArabic ? "يوم" : "days"}</SelectItem>
                      <SelectItem value="60">60 {isArabic ? "يوم" : "days"}</SelectItem>
                      <SelectItem value="90">90 {isArabic ? "يوم" : "days"}</SelectItem>
                      <SelectItem value="180">180 {isArabic ? "يوم" : "days"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSecurity} disabled={loading}>
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        {isArabic ? "جاري الحفظ..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {isArabic ? "حفظ إعدادات الأمان" : "Save Security Settings"}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <SettingsIcon className="h-5 w-5" />
                  <span>{isArabic ? "إعدادات النظام" : "System Settings"}</span>
                </CardTitle>
                <CardDescription>
                  {isArabic ? "تخصيص إعدادات النظام العامة" : "Customize general system settings"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="language">{isArabic ? "اللغة" : "Language"}</Label>
                  <Select
                    value={system.language}
                    onValueChange={(value) => {
                      setSystem({ ...system, language: value })
                      if (value !== (isArabic ? "ar" : "en")) {
                        toggleLanguage()
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timezone">{isArabic ? "المنطقة الزمنية" : "Timezone"}</Label>
                  <Select value={system.timezone} onValueChange={(value) => setSystem({ ...system, timezone: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="africa/cairo">{isArabic ? "القاهرة (GMT+2)" : "Cairo (GMT+2)"}</SelectItem>
                      <SelectItem value="asia/riyadh">{isArabic ? "الرياض (GMT+3)" : "Riyadh (GMT+3)"}</SelectItem>
                      <SelectItem value="europe/london">{isArabic ? "لندن (GMT+0)" : "London (GMT+0)"}</SelectItem>
                      <SelectItem value="america/new_york">
                        {isArabic ? "نيويورك (GMT-5)" : "New York (GMT-5)"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date-format">{isArabic ? "تنسيق التاريخ" : "Date Format"}</Label>
                  <Select
                    value={system.dateFormat}
                    onValueChange={(value) => setSystem({ ...system, dateFormat: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="theme">{isArabic ? "المظهر" : "Theme"}</Label>
                  <Select value={system.theme} onValueChange={(value) => setSystem({ ...system, theme: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">{isArabic ? "فاتح" : "Light"}</SelectItem>
                      <SelectItem value="dark">{isArabic ? "داكن" : "Dark"}</SelectItem>
                      <SelectItem value="system">{isArabic ? "تلقائي" : "System"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-save">{isArabic ? "الحفظ التلقائي" : "Auto Save"}</Label>
                    <p className="text-sm text-gray-500">
                      {isArabic ? "حفظ التغييرات تلقائياً كل 30 ثانية" : "Automatically save changes every 30 seconds"}
                    </p>
                  </div>
                  <Switch
                    id="auto-save"
                    checked={system.autoSave}
                    onCheckedChange={(checked) => setSystem({ ...system, autoSave: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="debug-mode">{isArabic ? "وضع التطوير" : "Debug Mode"}</Label>
                    <p className="text-sm text-gray-500">
                      {isArabic ? "تفعيل معلومات التطوير المتقدمة" : "Enable advanced debugging information"}
                    </p>
                  </div>
                  <Switch
                    id="debug-mode"
                    checked={system.debugMode}
                    onCheckedChange={(checked) => setSystem({ ...system, debugMode: checked })}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={loading}>
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        {isArabic ? "جاري الحفظ..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {isArabic ? "حفظ إعدادات النظام" : "Save System Settings"}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* xAI Settings */}
          <TabsContent value="xai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Zap className="h-5 w-5" />
                  <span>{isArabic ? "إعدادات xAI Grok" : "xAI Grok Settings"}</span>
                </CardTitle>
                <CardDescription>
                  {isArabic
                    ? "تكوين إعدادات الذكاء الاصطناعي من xAI"
                    : "Configure xAI artificial intelligence settings"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    {isArabic
                      ? "xAI Grok متصل ويعمل بشكل طبيعي. آخر اختبار: منذ 5 دقائق"
                      : "xAI Grok is connected and functioning normally. Last test: 5 minutes ago"}
                  </AlertDescription>
                </Alert>

                <div>
                  <Label htmlFor="xai-model">{isArabic ? "نموذج xAI" : "xAI Model"}</Label>
                  <Select
                    value={xaiSettings.model}
                    onValueChange={(value) => setXaiSettings({ ...xaiSettings, model: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grok-1">Grok-1 {isArabic ? "(أساسي)" : "(Basic)"}</SelectItem>
                      <SelectItem value="grok-2">Grok-2 {isArabic ? "(متقدم)" : "(Advanced)"}</SelectItem>
                      <SelectItem value="grok-3">Grok-3 {isArabic ? "(احترافي)" : "(Professional)"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">
                    {isArabic
                      ? "Grok-3 يوفر أفضل دقة للتحليل المالي"
                      : "Grok-3 provides the best accuracy for financial analysis"}
                  </p>
                </div>

                <div>
                  <Label htmlFor="temperature">
                    {isArabic ? "درجة الإبداع (Temperature)" : "Creativity Level (Temperature)"}
                  </Label>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse mt-2">
                    <span className="text-sm text-gray-500">0.0</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={xaiSettings.temperature}
                      onChange={(e) =>
                        setXaiSettings({ ...xaiSettings, temperature: Number.parseFloat(e.target.value) })
                      }
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500">1.0</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{isArabic ? "دقيق" : "Precise"}</span>
                    <span className="font-medium">{xaiSettings.temperature}</span>
                    <span>{isArabic ? "إبداعي" : "Creative"}</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="max-tokens">{isArabic ? "الحد الأقصى للرموز" : "Max Tokens"}</Label>
                  <Select
                    value={xaiSettings.maxTokens.toString()}
                    onValueChange={(value) => setXaiSettings({ ...xaiSettings, maxTokens: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1000">1,000 {isArabic ? "رمز" : "tokens"}</SelectItem>
                      <SelectItem value="2000">2,000 {isArabic ? "رمز" : "tokens"}</SelectItem>
                      <SelectItem value="4000">4,000 {isArabic ? "رمز" : "tokens"}</SelectItem>
                      <SelectItem value="8000">8,000 {isArabic ? "رمز" : "tokens"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rate-limit">{isArabic ? "حد الطلبات في الساعة" : "Rate Limit per Hour"}</Label>
                  <Input
                    id="rate-limit"
                    type="number"
                    value={xaiSettings.rateLimitPerHour}
                    onChange={(e) =>
                      setXaiSettings({ ...xaiSettings, rateLimitPerHour: Number.parseInt(e.target.value) })
                    }
                    min="100"
                    max="10000"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {isArabic ? "الحد الأقصى: 10,000 طلب في الساعة" : "Maximum: 10,000 requests per hour"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-streaming">{isArabic ? "تفعيل البث المباشر" : "Enable Streaming"}</Label>
                    <p className="text-sm text-gray-500">
                      {isArabic ? "عرض النتائج أثناء المعالجة" : "Show results as they are processed"}
                    </p>
                  </div>
                  <Switch
                    id="enable-streaming"
                    checked={xaiSettings.enableStreaming}
                    onCheckedChange={(checked) => setXaiSettings({ ...xaiSettings, enableStreaming: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-cache">{isArabic ? "تفعيل التخزين المؤقت" : "Enable Caching"}</Label>
                    <p className="text-sm text-gray-500">
                      {isArabic
                        ? "حفظ النتائج لتسريع الاستعلامات المتكررة"
                        : "Cache results to speed up repeated queries"}
                    </p>
                  </div>
                  <Switch
                    id="enable-cache"
                    checked={xaiSettings.enableCache}
                    onCheckedChange={(checked) => setXaiSettings({ ...xaiSettings, enableCache: checked })}
                  />
                </div>

                <div className="flex space-x-3 rtl:space-x-reverse">
                  <Button onClick={handleTestXAI} disabled={loading} variant="outline">
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        {isArabic ? "جاري الاختبار..." : "Testing..."}
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        {isArabic ? "اختبار الاتصال" : "Test Connection"}
                      </>
                    )}
                  </Button>
                  <Button onClick={handleSaveProfile} disabled={loading}>
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        {isArabic ? "جاري الحفظ..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {isArabic ? "حفظ إعدادات xAI" : "Save xAI Settings"}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup Settings */}
          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Database className="h-5 w-5" />
                  <span>{isArabic ? "النسخ الاحتياطي والاستعادة" : "Backup & Recovery"}</span>
                </CardTitle>
                <CardDescription>
                  {isArabic ? "إدارة النسخ الاحتياطي واستعادة البيانات" : "Manage data backup and recovery"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    {isArabic
                      ? "آخر نسخة احتياطية: اليوم الساعة 2:00 صباحاً - تمت بنجاح"
                      : "Last backup: Today at 2:00 AM - Completed successfully"}
                  </AlertDescription>
                </Alert>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{isArabic ? "النسخ الاحتياطي التلقائي" : "Automatic Backup"}</Label>
                    <p className="text-sm text-gray-500">
                      {isArabic ? "نسخ احتياطي يومي في الساعة 2:00 صباحاً" : "Daily backup at 2:00 AM"}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{isArabic ? "تكرار النسخ الاحتياطي" : "Backup Frequency"}</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">{isArabic ? "كل ساعة" : "Hourly"}</SelectItem>
                        <SelectItem value="daily">{isArabic ? "يومي" : "Daily"}</SelectItem>
                        <SelectItem value="weekly">{isArabic ? "أسبوعي" : "Weekly"}</SelectItem>
                        <SelectItem value="monthly">{isArabic ? "شهري" : "Monthly"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{isArabic ? "الاحتفاظ بالنسخ" : "Retention Period"}</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 {isArabic ? "أيام" : "days"}</SelectItem>
                        <SelectItem value="30">30 {isArabic ? "يوم" : "days"}</SelectItem>
                        <SelectItem value="90">90 {isArabic ? "يوم" : "days"}</SelectItem>
                        <SelectItem value="365">365 {isArabic ? "يوم" : "days"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>{isArabic ? "حالة التخزين" : "Storage Status"}</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{isArabic ? "المستخدم" : "Used"}</span>
                      <span>2.4 GB / 10 GB</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Database className="h-4 w-4 mr-2" />
                    {isArabic ? "إنشاء نسخة احتياطية" : "Create Backup"}
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {isArabic ? "استعادة من نسخة احتياطية" : "Restore Backup"}
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    {isArabic ? "تحميل النسخ الاحتياطية" : "Download Backups"}
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-3">{isArabic ? "النسخ الاحتياطية الأخيرة" : "Recent Backups"}</h4>
                  <div className="space-y-2">
                    {[
                      { date: "2024-01-22 02:00", size: "1.2 GB", status: "success" },
                      { date: "2024-01-21 02:00", size: "1.1 GB", status: "success" },
                      { date: "2024-01-20 02:00", size: "1.0 GB", status: "success" },
                    ].map((backup, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">{backup.date}</p>
                            <p className="text-xs text-gray-500">{backup.size}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          {isArabic ? "استعادة" : "Restore"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DeloitteInterface>
  )
}

export default function SettingsPage() {
  return (
    <LanguageProvider>
      <SettingsContent />
    </LanguageProvider>
  )
}
