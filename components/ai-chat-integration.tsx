"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
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
  MessageSquare,
  Settings,
  TrendingUp,
  Users,
  Clock,
  Database,
  Shield,
  FileText,
  Target,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Play,
  Star,
  ThumbsUp,
  Zap,
} from "lucide-react"

interface AIChatIntegrationProps {
  isArabic: boolean
}

export function AIChatIntegration({ isArabic }: AIChatIntegrationProps) {
  const [selectedModel, setSelectedModel] = useState("grok-3")
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const startTraining = () => {
    setIsTraining(true)
    setTrainingProgress(0)

    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTraining(false)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 500)
  }

  const chatAnalytics = {
    totalConversations: 1247,
    avgSessionDuration: 8.5,
    userSatisfaction: 94.2,
    responseAccuracy: 96.8,
    dailyActiveUsers: 156,
    weeklyGrowth: 12.3,
  }

  const usageData = [
    { day: isArabic ? "الأحد" : "Sun", conversations: 45, satisfaction: 94 },
    { day: isArabic ? "الاثنين" : "Mon", conversations: 67, satisfaction: 96 },
    { day: isArabic ? "الثلاثاء" : "Tue", conversations: 89, satisfaction: 95 },
    { day: isArabic ? "الأربعاء" : "Wed", conversations: 123, satisfaction: 97 },
    { day: isArabic ? "الخميس" : "Thu", conversations: 156, satisfaction: 94 },
    { day: isArabic ? "الجمعة" : "Fri", conversations: 134, satisfaction: 93 },
    { day: isArabic ? "السبت" : "Sat", conversations: 98, satisfaction: 95 },
  ]

  const queryCategories = [
    { name: isArabic ? "إنشاء المراجعة" : "Audit Creation", value: 35, color: "#3B82F6" },
    { name: isArabic ? "تحليل المخاطر" : "Risk Analysis", value: 28, color: "#EF4444" },
    { name: isArabic ? "التقارير" : "Reports", value: 20, color: "#10B981" },
    { name: isArabic ? "إدارة الفريق" : "Team Management", value: 12, color: "#F59E0B" },
    { name: isArabic ? "أخرى" : "Others", value: 5, color: "#8B5CF6" },
  ]

  const xaiModels = [
    {
      id: "grok-3",
      name: "Grok-3 Audit Specialist",
      nameAr: "متخصص المراجعة Grok-3",
      description: "Advanced xAI model optimized for Egyptian audit standards and regulations",
      descriptionAr: "نموذج xAI متقدم محسن لمعايير ولوائح المراجعة المصرية",
      accuracy: 98.2,
      speed: 0.8,
      cost: "Premium",
      status: "active",
      capabilities: ["Audit Planning", "Risk Assessment", "Report Generation", "Compliance Check", "Arabic Processing"],
      capabilitiesAr: ["تخطيط المراجعة", "تقييم المخاطر", "إنشاء التقارير", "فحص الامتثال", "معالجة العربية"],
      provider: "xAI",
    },
    {
      id: "grok-2",
      name: "Grok-2 Risk Analyzer",
      nameAr: "محلل المخاطر Grok-2",
      description: "Specialized xAI model for risk analysis and predictive modeling",
      descriptionAr: "نموذج xAI متخصص في تحليل المخاطر والنمذجة التنبؤية",
      accuracy: 96.5,
      speed: 1.2,
      cost: "Standard",
      status: "active",
      capabilities: ["Risk Analysis", "Trend Prediction", "Anomaly Detection", "Financial Modeling"],
      capabilitiesAr: ["تحليل المخاطر", "التنبؤ بالاتجاهات", "اكتشاف الشذوذ", "النمذجة المالية"],
      provider: "xAI",
    },
    {
      id: "grok-1",
      name: "Grok-1 Document Processor",
      nameAr: "معالج الوثائق Grok-1",
      description: "xAI model expert in document analysis and compliance verification",
      descriptionAr: "نموذج xAI خبير في تحليل الوثائق والتحقق من الامتثال",
      accuracy: 94.8,
      speed: 1.5,
      cost: "Basic",
      status: "active",
      capabilities: ["Document Analysis", "OCR Processing", "Compliance Verification", "Data Extraction"],
      capabilitiesAr: ["تحليل الوثائق", "معالجة OCR", "التحقق من الامتثال", "استخراج البيانات"],
      provider: "xAI",
    },
  ]

  const conversationTemplates = [
    {
      id: "audit-creation",
      name: "Audit Creation Workflow",
      nameAr: "سير عمل إنشاء المراجعة",
      description: "Guided conversation for creating new audits with Grok-3",
      descriptionAr: "محادثة موجهة لإنشاء مراجعات جديدة مع Grok-3",
      steps: [
        { en: "Define audit scope and objectives", ar: "تحديد نطاق وأهداف المراجعة" },
        { en: "Select audit team and resources", ar: "اختيار فريق المراجعة والموارد" },
        { en: "Set timeline and milestones", ar: "تحديد الجدول الزمني والمعالم" },
        { en: "Configure risk parameters", ar: "تكوين معاملات المخاطر" },
      ],
      usage: 342,
      rating: 4.8,
    },
    {
      id: "risk-analysis",
      name: "Risk Analysis Assistant",
      nameAr: "مساعد تحليل المخاطر",
      description: "Interactive risk assessment powered by Grok-2",
      descriptionAr: "تقييم المخاطر التفاعلي مدعوم بـ Grok-2",
      steps: [
        { en: "Identify potential risks", ar: "تحديد المخاطر المحتملة" },
        { en: "Assess risk probability and impact", ar: "تقييم احتمالية وتأثير المخاطر" },
        { en: "Develop mitigation strategies", ar: "تطوير استراتيجيات التخفيف" },
        { en: "Create monitoring plan", ar: "إنشاء خطة المراقبة" },
      ],
      usage: 289,
      rating: 4.7,
    },
    {
      id: "report-generation",
      name: "Report Generation Guide",
      nameAr: "دليل إنشاء التقارير",
      description: "Step-by-step report creation with xAI assistance",
      descriptionAr: "إنشاء التقارير خطوة بخطوة مع مساعدة xAI",
      steps: [
        { en: "Select report type and format", ar: "اختيار نوع وتنسيق التقرير" },
        { en: "Configure data sources", ar: "تكوين مصادر البيانات" },
        { en: "Apply filters and parameters", ar: "تطبيق المرشحات والمعاملات" },
        { en: "Review and export report", ar: "مراجعة وتصدير التقرير" },
      ],
      usage: 198,
      rating: 4.6,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header with xAI Branding */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
          <div className="p-3 bg-gradient-to-r from-gray-900 to-black rounded-full">
            <div className="text-white font-bold text-2xl">Z</div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isArabic ? "تكامل الذكاء الاصطناعي مع xAI" : "xAI Integration"}
            </h2>
            <p className="text-gray-600">
              {isArabic
                ? "مدعوم بنماذج Grok المتقدمة من xAI للمراجعة المهنية"
                : "Powered by advanced Grok models from xAI for professional auditing"}
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-r from-gray-900 to-black text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">{isArabic ? "إجمالي المحادثات" : "Total Conversations"}</p>
                <p className="text-2xl font-bold">{chatAnalytics.totalConversations.toLocaleString()}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">{isArabic ? "متوسط مدة الجلسة" : "Avg Session Duration"}</p>
                <p className="text-2xl font-bold">{chatAnalytics.avgSessionDuration}m</p>
              </div>
              <Clock className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">{isArabic ? "رضا المستخدمين" : "User Satisfaction"}</p>
                <p className="text-2xl font-bold">{chatAnalytics.userSatisfaction}%</p>
              </div>
              <Star className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">{isArabic ? "دقة الاستجابة" : "Response Accuracy"}</p>
                <p className="text-2xl font-bold">{chatAnalytics.responseAccuracy}%</p>
              </div>
              <Target className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm">{isArabic ? "المستخدمون النشطون" : "Daily Active Users"}</p>
                <p className="text-2xl font-bold">{chatAnalytics.dailyActiveUsers}</p>
              </div>
              <Users className="h-8 w-8 text-teal-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm">{isArabic ? "النمو الأسبوعي" : "Weekly Growth"}</p>
                <p className="text-2xl font-bold">+{chatAnalytics.weeklyGrowth}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-indigo-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models">{isArabic ? "نماذج Grok" : "Grok Models"}</TabsTrigger>
          <TabsTrigger value="templates">{isArabic ? "القوالب" : "Templates"}</TabsTrigger>
          <TabsTrigger value="training">{isArabic ? "التدريب" : "Training"}</TabsTrigger>
          <TabsTrigger value="settings">{isArabic ? "الإعدادات" : "Settings"}</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          {/* xAI Models Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {xaiModels.map((model) => (
              <Card key={model.id} className={`${selectedModel === model.id ? "ring-2 ring-gray-900" : ""}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Z</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{isArabic ? model.nameAr : model.name}</CardTitle>
                        <p className="text-xs text-gray-500">{model.provider}</p>
                      </div>
                    </div>
                    <Badge variant={model.status === "active" ? "default" : "secondary"}>
                      {model.status === "active" ? (isArabic ? "نشط" : "Active") : isArabic ? "غير نشط" : "Inactive"}
                    </Badge>
                  </div>
                  <CardDescription>{isArabic ? model.descriptionAr : model.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Model Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{model.accuracy}%</div>
                        <div className="text-xs text-gray-500">{isArabic ? "الدقة" : "Accuracy"}</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{model.speed}s</div>
                        <div className="text-xs text-gray-500">{isArabic ? "السرعة" : "Speed"}</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-orange-600">{model.cost}</div>
                        <div className="text-xs text-gray-500">{isArabic ? "التكلفة" : "Cost"}</div>
                      </div>
                    </div>

                    <Separator />

                    {/* Capabilities */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">{isArabic ? "القدرات:" : "Capabilities:"}</h4>
                      <div className="flex flex-wrap gap-1">
                        {(isArabic ? model.capabilitiesAr : model.capabilities).map((capability, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button
                        variant={selectedModel === model.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedModel(model.id)}
                        className="flex-1"
                      >
                        {selectedModel === model.id ? (isArabic ? "محدد" : "Selected") : isArabic ? "اختيار" : "Select"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* xAI Model Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Z</span>
                </div>
                <span>{isArabic ? "تكوين نموذج xAI المحدد" : "Selected xAI Model Configuration"}</span>
              </CardTitle>
              <CardDescription>
                {isArabic
                  ? "تخصيص إعدادات ومعاملات نموذج Grok المحدد"
                  : "Customize settings and parameters for the selected Grok model"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="temperature">{isArabic ? "درجة الحرارة" : "Temperature"}</Label>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                      <Input
                        id="temperature"
                        type="number"
                        min="0"
                        max="2"
                        step="0.1"
                        defaultValue="0.7"
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-500">0.7</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="max-tokens">{isArabic ? "الحد الأقصى للرموز" : "Max Tokens"}</Label>
                    <Input id="max-tokens" type="number" min="1" max="8000" defaultValue="4000" />
                  </div>
                  <div>
                    <Label htmlFor="top-p">{isArabic ? "Top P" : "Top P"}</Label>
                    <Input id="top-p" type="number" min="0" max="1" step="0.1" defaultValue="0.9" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="frequency-penalty">{isArabic ? "عقوبة التكرار" : "Frequency Penalty"}</Label>
                    <Input id="frequency-penalty" type="number" min="0" max="2" step="0.1" defaultValue="0.0" />
                  </div>
                  <div>
                    <Label htmlFor="presence-penalty">{isArabic ? "عقوبة الحضور" : "Presence Penalty"}</Label>
                    <Input id="presence-penalty" type="number" min="0" max="2" step="0.1" defaultValue="0.0" />
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Switch id="stream-response" defaultChecked />
                    <Label htmlFor="stream-response">{isArabic ? "استجابة متدفقة" : "Stream Response"}</Label>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Switch id="arabic-optimization" defaultChecked />
                    <Label htmlFor="arabic-optimization">{isArabic ? "تحسين العربية" : "Arabic Optimization"}</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2 rtl:space-x-reverse mt-6">
                <Button variant="outline">{isArabic ? "إعادة تعيين" : "Reset"}</Button>
                <Button>{isArabic ? "حفظ التغييرات" : "Save Changes"}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          {/* Conversation Templates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {conversationTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{isArabic ? template.nameAr : template.name}</CardTitle>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">Z</span>
                      </div>
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{isArabic ? template.descriptionAr : template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">{isArabic ? "خطوات السير:" : "Workflow Steps:"}</h4>
                      <div className="space-y-2">
                        {template.steps.map((step, index) => (
                          <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                            <div className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                              {index + 1}
                            </div>
                            <span className="text-sm text-gray-600">{isArabic ? step.ar : step.en}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          {template.usage} {isArabic ? "استخدام" : "uses"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span className="text-gray-600">{Math.round(template.rating * 20)}%</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                            {isArabic ? "معاينة" : "Preview"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                              <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">Z</span>
                              </div>
                              <span>{isArabic ? template.nameAr : template.name}</span>
                            </DialogTitle>
                            <DialogDescription>
                              {isArabic ? template.descriptionAr : template.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium mb-3">
                                {isArabic ? "مثال على المحادثة مع Grok:" : "Sample Conversation with Grok:"}
                              </h4>
                              <div className="space-y-3">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                  <p className="text-sm">
                                    <strong>{isArabic ? "المستخدم:" : "User:"}</strong>{" "}
                                    {isArabic
                                      ? "أريد إنشاء مراجعة مالية جديدة"
                                      : "I want to create a new financial audit"}
                                  </p>
                                </div>
                                <div className="bg-gray-900 text-white p-3 rounded-lg">
                                  <p className="text-sm">
                                    <strong>{isArabic ? "Grok:" : "Grok:"}</strong>{" "}
                                    {isArabic
                                      ? "ممتاز! سأساعدك في إنشاء مراجعة مالية شاملة. دعنا نبدأ بتحديد نطاق المراجعة وفقاً لمعايير المراجعة المصرية..."
                                      : "Excellent! I'll help you create a comprehensive financial audit. Let's start by defining the audit scope according to Egyptian audit standards..."}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        onClick={() => setSelectedTemplate(template.id)}
                        className="bg-gray-900 hover:bg-gray-800"
                      >
                        <Play className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {isArabic ? "استخدام" : "Use"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          {/* xAI Model Training */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Z</span>
                </div>
                <span>{isArabic ? "تدريب نماذج xAI" : "xAI Model Training"}</span>
              </CardTitle>
              <CardDescription>
                {isArabic
                  ? "تدريب وتحسين نماذج Grok للمراجعة المصرية"
                  : "Train and improve Grok models for Egyptian auditing"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Training Progress */}
                {isTraining && (
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-900">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center animate-pulse">
                          <span className="text-white font-bold text-xs">Z</span>
                        </div>
                        <span className="font-medium">{isArabic ? "جاري تدريب Grok..." : "Training Grok..."}</span>
                      </div>
                      <span className="text-sm text-gray-600">{Math.round(trainingProgress)}%</span>
                    </div>
                    <Progress value={trainingProgress} className="h-2" />
                    <p className="text-sm text-gray-600 mt-2">
                      {isArabic ? "تدريب النموذج على بيانات المراجعة المصرية" : "Training model on Egyptian audit data"}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">{isArabic ? "مصادر البيانات" : "Data Sources"}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">
                            {isArabic ? "معايير المراجعة المصرية" : "Egyptian Audit Standards"}
                          </span>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Database className="h-4 w-4 text-green-600" />
                          <span className="text-sm">
                            {isArabic ? "بيانات المراجعة التاريخية" : "Historical Audit Data"}
                          </span>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Shield className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">{isArabic ? "لوائح الامتثال" : "Compliance Regulations"}</span>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">{isArabic ? "إعدادات تدريب xAI" : "xAI Training Settings"}</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="learning-rate">{isArabic ? "معدل التعلم" : "Learning Rate"}</Label>
                        <Input id="learning-rate" type="number" step="0.0001" defaultValue="0.0005" />
                      </div>
                      <div>
                        <Label htmlFor="batch-size">{isArabic ? "حجم الدفعة" : "Batch Size"}</Label>
                        <Input id="batch-size" type="number" defaultValue="64" />
                      </div>
                      <div>
                        <Label htmlFor="epochs">{isArabic ? "العصور" : "Epochs"}</Label>
                        <Input id="epochs" type="number" defaultValue="15" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                      {isArabic ? "رفع البيانات" : "Upload Data"}
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                      {isArabic ? "تصدير النموذج" : "Export Model"}
                    </Button>
                  </div>
                  <Button onClick={startTraining} disabled={isTraining} className="bg-gray-900 hover:bg-gray-800">
                    {isTraining ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0 animate-spin" />
                        {isArabic ? "جاري التدريب..." : "Training..."}
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {isArabic ? "بدء تدريب Grok" : "Start Grok Training"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* xAI Integration Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Z</span>
                </div>
                <span>{isArabic ? "إعدادات تكامل xAI" : "xAI Integration Settings"}</span>
              </CardTitle>
              <CardDescription>
                {isArabic ? "تكوين الاتصال والإعدادات مع xAI" : "Configure connection and settings with xAI"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="xai-api-key">{isArabic ? "مفتاح API لـ xAI" : "xAI API Key"}</Label>
                      <Input id="xai-api-key" type="password" placeholder="xai-..." defaultValue="••••••••••••••••" />
                      <p className="text-xs text-gray-500 mt-1">
                        {isArabic ? "مفتاح API الخاص بك من xAI" : "Your API key from xAI"}
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="default-model">{isArabic ? "النموذج الافتراضي" : "Default Model"}</Label>
                      <Select defaultValue="grok-3">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grok-3">Grok-3</SelectItem>
                          <SelectItem value="grok-2">Grok-2</SelectItem>
                          <SelectItem value="grok-1">Grok-1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-fallback">{isArabic ? "التبديل التلقائي" : "Auto Fallback"}</Label>
                        <p className="text-sm text-gray-600">
                          {isArabic
                            ? "التبديل تلقائياً إلى نموذج آخر عند الفشل"
                            : "Automatically switch to another model on failure"}
                        </p>
                      </div>
                      <Switch id="auto-fallback" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="request-timeout">{isArabic ? "مهلة الطلب" : "Request Timeout"}</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 {isArabic ? "ثانية" : "seconds"}</SelectItem>
                          <SelectItem value="30">30 {isArabic ? "ثانية" : "seconds"}</SelectItem>
                          <SelectItem value="60">60 {isArabic ? "ثانية" : "seconds"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="rate-limit">{isArabic ? "حد المعدل" : "Rate Limit"}</Label>
                      <Select defaultValue="100">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">50 {isArabic ? "طلب/دقيقة" : "requests/min"}</SelectItem>
                          <SelectItem value="100">100 {isArabic ? "طلب/دقيقة" : "requests/min"}</SelectItem>
                          <SelectItem value="200">200 {isArabic ? "طلب/دقيقة" : "requests/min"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="arabic-priority">{isArabic ? "أولوية العربية" : "Arabic Priority"}</Label>
                        <p className="text-sm text-gray-600">
                          {isArabic ? "إعطاء أولوية للاستجابات باللغة العربية" : "Prioritize Arabic language responses"}
                        </p>
                      </div>
                      <Switch id="arabic-priority" defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{isArabic ? "حالة الاتصال" : "Connection Status"}</h4>
                    <p className="text-sm text-gray-600">
                      {isArabic ? "متصل بخدمات xAI" : "Connected to xAI services"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">{isArabic ? "متصل" : "Connected"}</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                  <Button variant="outline">{isArabic ? "اختبار الاتصال" : "Test Connection"}</Button>
                  <Button className="bg-gray-900 hover:bg-gray-800">
                    {isArabic ? "حفظ الإعدادات" : "Save Settings"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
