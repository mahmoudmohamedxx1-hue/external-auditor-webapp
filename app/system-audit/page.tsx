"use client"
import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { AuditWorkflowEngine } from "@/components/audit-workflow-engine"
import { SystemAuditFramework } from "@/components/system-audit-framework"
import { AuditToolsTechniques } from "@/components/audit-tools-techniques"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Workflow,
  Settings,
  Wrench,
  BookOpen,
  Target,
  Shield,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
} from "lucide-react"

function SystemAuditContent() {
  const { isArabic, toggleLanguage } = useLanguage()

  const auditStats = [
    {
      title: isArabic ? "المراجعات النشطة" : "Active Audits",
      value: "12",
      change: "+3",
      trend: "up",
      icon: Workflow,
      color: "text-blue-600",
    },
    {
      title: isArabic ? "الأنواع المدعومة" : "Supported Types",
      value: "6",
      change: "Financial, IT, Operational, Compliance, Quality, Environmental",
      trend: "stable",
      icon: Settings,
      color: "text-green-600",
    },
    {
      title: isArabic ? "الأدوات المتاحة" : "Available Tools",
      value: "15+",
      change: "Interviews, Analysis, Testing, Monitoring",
      trend: "up",
      icon: Wrench,
      color: "text-purple-600",
    },
    {
      title: isArabic ? "معدل الإنجاز" : "Completion Rate",
      value: "94%",
      change: "+5%",
      trend: "up",
      icon: Target,
      color: "text-orange-600",
    },
  ]

  const systemAuditBenefits = [
    {
      title: isArabic ? "تحديد نقاط الضعف" : "Identify Weaknesses",
      titleAr: "تحديد نقاط الضعف",
      description: isArabic
        ? "اكتشاف نقاط الضعف والثغرات في أنظمة وعمليات المؤسسة"
        : "Discover weaknesses and vulnerabilities in organizational systems and processes",
      icon: Shield,
      color: "text-red-600",
    },
    {
      title: isArabic ? "تخفيف المخاطر" : "Risk Mitigation",
      titleAr: "تخفيف المخاطر",
      description: isArabic
        ? "تقليل احتمالية الخسائر المالية وانتهاكات البيانات والاضطرابات التشغيلية"
        : "Reduce likelihood of financial losses, data breaches, and operational disruptions",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: isArabic ? "تحسين الكفاءة" : "Improved Efficiency",
      titleAr: "تحسين الكفاءة",
      description: isArabic
        ? "تبسيط العمليات وإزالة الاختناقات وتحسين الإنتاجية"
        : "Streamline processes, eliminate bottlenecks, and improve productivity",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: isArabic ? "تعزيز بيئة الرقابة" : "Enhanced Control Environment",
      titleAr: "تعزيز بيئة الرقابة",
      description: isArabic
        ? "تقوية بيئة الرقابة في المؤسسة وتقليل مخاطر الاحتيال والأخطاء"
        : "Strengthen organizational control environment and reduce fraud and error risks",
      icon: CheckCircle,
      color: "text-blue-600",
    },
    {
      title: isArabic ? "ضمان الامتثال" : "Compliance Assurance",
      titleAr: "ضمان الامتثال",
      description: isArabic
        ? "ضمان الالتزام باللوائح ومعايير الصناعة والسياسات الداخلية"
        : "Ensure adherence to regulations, industry standards, and internal policies",
      icon: FileText,
      color: "text-purple-600",
    },
  ]

  const auditChallenges = [
    {
      challenge: isArabic ? "تعقيد الأنظمة" : "System Complexity",
      challengeAr: "تعقيد الأنظمة",
      description: isArabic
        ? "الأنظمة الحديثة معقدة وتتضمن عمليات وتقنيات ومكونات متعددة مترابطة"
        : "Modern systems are complex with intricate processes, technologies, and interconnected components",
      mitigation: isArabic
        ? "استخدام أدوات التحليل المتقدمة والخبرة المتخصصة"
        : "Use advanced analysis tools and specialized expertise",
      mitigationAr: "استخدام أدوات التحليل المتقدمة والخبرة المتخصصة",
    },
    {
      challenge: isArabic ? "صعوبة الوصول للبيانات" : "Data Accessibility Issues",
      challengeAr: "صعوبة الوصول للبيانات",
      description: isArabic
        ? "صعوبة في الوصول للبيانات ذات الصلة خاصة عندما تكون الأنظمة غير موثقة بشكل صحيح"
        : "Difficulties accessing relevant data, especially when systems are not properly documented",
      mitigation: isArabic
        ? "تحسين توثيق الأنظمة وتطبيق معايير إدارة البيانات"
        : "Improve system documentation and implement data management standards",
      mitigationAr: "تحسين توثيق الأنظمة وتطبيق معايير إدارة البيانات",
    },
    {
      challenge: isArabic ? "تغير البيئة التنظيمية" : "Changing Regulatory Landscape",
      challengeAr: "تغير البيئة التنظيمية",
      description: isArabic
        ? "اللوائح ومتطلبات الامتثال تتطور باستمرار مما يتطلب تحديث إجراءات المراجعة"
        : "Regulations and compliance requirements continually evolve, requiring audit procedure updates",
      mitigation: isArabic
        ? "التدريب المستمر ومراقبة التغييرات التنظيمية"
        : "Continuous training and regulatory change monitoring",
      mitigationAr: "التدريب المستمر ومراقبة التغييرات التنظيمية",
    },
    {
      challenge: isArabic ? "مقاومة التغيير" : "Resistance to Change",
      challengeAr: "مقاومة التغيير",
      description: isArabic
        ? "قد تقاوم المؤسسات تنفيذ توصيات المراجعة أو إجراء التغييرات اللازمة"
        : "Organizations may resist implementing audit recommendations or making necessary changes",
      mitigation: isArabic
        ? "استراتيجيات إدارة التغيير الفعالة والتواصل الواضح"
        : "Effective change management strategies and clear communication",
      mitigationAr: "استراتيجيات إدارة التغيير الفعالة والتواصل الواضح",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isArabic={isArabic} toggleLanguage={toggleLanguage} />

      <main className={`p-6 ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isArabic ? "إطار مراجعة الأنظمة الشامل" : "Comprehensive System Audit Framework"}
            </h1>
            <p className="text-gray-600">
              {isArabic
                ? "نظام متكامل لإدارة وتنفيذ جميع أنواع مراجعات الأنظمة وفقاً للمعايير المصرية والدولية"
                : "Integrated system for managing and executing all types of system audits according to Egyptian and international standards"}
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {auditStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                      </div>
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* System Audit Benefits */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{isArabic ? "فوائد مراجعة الأنظمة" : "System Audit Benefits"}</CardTitle>
              <CardDescription>
                {isArabic
                  ? "الفوائد الرئيسية التي تحققها مراجعات الأنظمة للمؤسسات"
                  : "Key benefits that system audits provide to organizations"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systemAuditBenefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-3 rtl:space-x-reverse p-4 rounded-lg bg-gray-50"
                    >
                      <Icon className={`h-6 w-6 ${benefit.color} mt-1`} />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Common Challenges */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{isArabic ? "التحديات الشائعة وحلولها" : "Common Challenges & Solutions"}</CardTitle>
              <CardDescription>
                {isArabic
                  ? "التحديات التي تواجه مراجعات الأنظمة واستراتيجيات التخفيف"
                  : "Challenges facing system audits and mitigation strategies"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditChallenges.map((item, index) => (
                  <Card key={index} className="border-l-4 border-orange-500">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2 rtl:space-x-reverse">
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            <span>
                              {isArabic ? "التحدي:" : "Challenge:"} {item.challenge}
                            </span>
                          </h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2 rtl:space-x-reverse">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{isArabic ? "الحل:" : "Solution:"}</span>
                          </h4>
                          <p className="text-sm text-gray-600">{isArabic ? item.mitigationAr : item.mitigation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Tabs */}
          <Tabs defaultValue="workflow" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="workflow" className="flex items-center space-x-2 rtl:space-x-reverse">
                <Workflow className="h-4 w-4" />
                <span>{isArabic ? "محرك سير العمل" : "Workflow Engine"}</span>
              </TabsTrigger>
              <TabsTrigger value="framework" className="flex items-center space-x-2 rtl:space-x-reverse">
                <BookOpen className="h-4 w-4" />
                <span>{isArabic ? "إطار العمل" : "Framework"}</span>
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center space-x-2 rtl:space-x-reverse">
                <Wrench className="h-4 w-4" />
                <span>{isArabic ? "الأدوات والتقنيات" : "Tools & Techniques"}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workflow" className="space-y-6">
              <AuditWorkflowEngine isArabic={isArabic} />
            </TabsContent>

            <TabsContent value="framework" className="space-y-6">
              <SystemAuditFramework isArabic={isArabic} />
            </TabsContent>

            <TabsContent value="tools" className="space-y-6">
              <AuditToolsTechniques isArabic={isArabic} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default function SystemAudit() {
  return (
    <LanguageProvider>
      <SystemAuditContent />
    </LanguageProvider>
  )
}
