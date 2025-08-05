"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/components/language-provider"
import { LanguageProvider } from "@/components/language-provider" // Import LanguageProvider
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { User, Bell } from "lucide-react"
import { APIIntegrationManager } from "@/components/api-integration-manager"
import { APIAlertManager as AlertManager } from "@/components/api-alert-manager"

function SettingsContent() {
  const { isArabic, toggleLanguage } = useLanguage()
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
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isArabic={isArabic} toggleLanguage={toggleLanguage} />

      <main className={`p-6 ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{isArabic ? "الإعدادات" : "Settings"}</h1>
            <p className="text-gray-600">
              {isArabic ? "إدارة إعدادات النظام والحساب الشخصي" : "Manage system and personal account settings"}
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="profile">{isArabic ? "الملف الشخصي" : "Profile"}</TabsTrigger>
              <TabsTrigger value="notifications">{isArabic ? "الإشعارات" : "Notifications"}</TabsTrigger>
              <TabsTrigger value="security">{isArabic ? "الأمان" : "Security"}</TabsTrigger>
              <TabsTrigger value="system">{isArabic ? "النظام" : "System"}</TabsTrigger>
              <TabsTrigger value="integrations">{isArabic ? "التكاملات" : "Integrations"}</TabsTrigger>
              <TabsTrigger value="apis">{isArabic ? "واجهات API" : "APIs"}</TabsTrigger>
              <TabsTrigger value="alerts">{isArabic ? "التنبيهات" : "Alerts"}</TabsTrigger>
              <TabsTrigger value="backup">{isArabic ? "النسخ الاحتياطي" : "Backup"}</TabsTrigger>
            </TabsList>

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
                      <Input id="firstName" defaultValue="Ahmed" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">{isArabic ? "اسم العائلة" : "Last Name"}</Label>
                      <Input id="lastName" defaultValue="Hassan" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">{isArabic ? "البريد الإلكتروني" : "Email Address"}</Label>
                    <Input id="email" type="email" defaultValue="ahmed.hassan@company.com" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">{isArabic ? "رقم الهاتف" : "Phone Number"}</Label>
                      <Input id="phone" defaultValue="+20 100 123 4567" />
                    </div>
                    <div>
                      <Label htmlFor="position">{isArabic ? "المنصب" : "Position"}</Label>
                      <Input id="position" defaultValue="Senior Auditor" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="department">{isArabic ? "القسم" : "Department"}</Label>
                    <Select defaultValue="financial">
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
                      defaultValue="Senior auditor with 8+ years of experience in financial auditing and compliance."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button>{isArabic ? "حفظ التغييرات" : "Save Changes"}</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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
                    <Button>{isArabic ? "حفظ الإعدادات" : "Save Settings"}</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? "إعدادات الأمان" : "Security Settings"}</CardTitle>
                  <CardDescription>
                    {isArabic ? "إدارة إعدادات الأمان والخصوصية" : "Manage security and privacy settings"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                    <Button>{isArabic ? "حفظ إعدادات الأمان" : "Save Security Settings"}</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? "إعدادات النظام" : "System Settings"}</CardTitle>
                  <CardDescription>
                    {isArabic ? "تخصيص إعدادات النظام العامة" : "Customize general system settings"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="language">{isArabic ? "اللغة" : "Language"}</Label>
                    <Select defaultValue={isArabic ? "ar" : "en"}>
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
                    <Select defaultValue="africa/cairo">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="africa/cairo">{isArabic ? "القاهرة (GMT+2)" : "Cairo (GMT+2)"}</SelectItem>
                        <SelectItem value="asia/riyadh">{isArabic ? "الرياض (GMT+3)" : "Riyadh (GMT+3)"}</SelectItem>
                        <SelectItem value="europe/london">{isArabic ? "لندن (GMT+0)" : "London (GMT+0)"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="date-format">{isArabic ? "تنسيق التاريخ" : "Date Format"}</Label>
                    <Select defaultValue="dd/mm/yyyy">
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

                  <div className="flex justify-end">
                    <Button>{isArabic ? "حفظ إعدادات النظام" : "Save System Settings"}</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? "التكاملات" : "Integrations"}</CardTitle>
                  <CardDescription>
                    {isArabic ? "إدارة التكاملات مع الأنظمة الخارجية" : "Manage integrations with external systems"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{isArabic ? "مصلحة الضرائب المصرية" : "Egyptian Tax Authority"}</h4>
                        <p className="text-sm text-gray-500">{isArabic ? "متصل" : "Connected"}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {isArabic ? "إعدادات" : "Configure"}
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{isArabic ? "السجل التجاري" : "Commercial Registry"}</h4>
                        <p className="text-sm text-gray-500">{isArabic ? "غير متصل" : "Not Connected"}</p>
                      </div>
                      <Button size="sm">{isArabic ? "ربط" : "Connect"}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="apis" className="space-y-6">
              <APIIntegrationManager isArabic={isArabic} />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <AlertManager isArabic={isArabic} />
            </TabsContent>

            <TabsContent value="backup" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? "النسخ الاحتياطي" : "Backup & Recovery"}</CardTitle>
                  <CardDescription>
                    {isArabic ? "إدارة النسخ الاحتياطي واستعادة البيانات" : "Manage data backup and recovery"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{isArabic ? "النسخ الاحتياطي التلقائي" : "Automatic Backup"}</Label>
                      <p className="text-sm text-gray-500">
                        {isArabic ? "نسخ احتياطي يومي في الساعة 2:00 صباحاً" : "Daily backup at 2:00 AM"}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <Label>{isArabic ? "آخر نسخة احتياطية" : "Last Backup"}</Label>
                    <p className="text-sm text-gray-600">2024-01-22 02:00:00</p>
                  </div>

                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button>{isArabic ? "إنشاء نسخة احتياطية الآن" : "Create Backup Now"}</Button>
                    <Button variant="outline">{isArabic ? "استعادة من نسخة احتياطية" : "Restore from Backup"}</Button>
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

export default function Settings() {
  return (
    <LanguageProvider>
      <SettingsContent />
    </LanguageProvider>
  )
}
