"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Shield,
  BarChart3,
  Users,
  CheckCircle,
  Target,
  TrendingUp,
  Database,
  Settings,
  Zap,
  Brain,
  Search,
  Globe,
  Award,
  Lightbulb,
  ArrowRight,
  RotateCcw,
} from "lucide-react"

interface SystemAuditFrameworkProps {
  isArabic: boolean
}

const auditTypes = [
  {
    id: "financial",
    title: "Financial System Audit",
    titleAr: "مراجعة النظام المالي",
    description: "Comprehensive review of financial systems, controls, and reporting processes",
    descriptionAr: "مراجعة شاملة للأنظمة المالية والضوابط وعمليات التقارير",
    icon: <BarChart3 className="h-6 w-6" />,
    complexity: "high",
    duration: "8-12 weeks",
    durationAr: "8-12 أسبوع",
    standards: ["EAS", "IFRS", "SOX", "COSO"],
    keyAreas: [
      { en: "Revenue Recognition", ar: "إقرار الإيرادات" },
      { en: "Accounts Payable", ar: "الحسابات الدائنة" },
      { en: "Cash Management", ar: "إدارة النقدية" },
      { en: "Financial Reporting", ar: "التقارير المالية" },
    ],
    riskLevel: "high",
    estimatedCost: "$25,000 - $50,000",
  },
  {
    id: "it",
    title: "IT System Audit",
    titleAr: "مراجعة نظام تقنية المعلومات",
    description: "Evaluation of IT infrastructure, security controls, and data management",
    descriptionAr: "تقييم البنية التحتية لتقنية المعلومات وضوابط الأمان وإدارة البيانات",
    icon: <Database className="h-6 w-6" />,
    complexity: "high",
    duration: "6-10 weeks",
    durationAr: "6-10 أسبوع",
    standards: ["ISO 27001", "NIST", "COBIT", "ITIL"],
    keyAreas: [
      { en: "Network Security", ar: "أمان الشبكة" },
      { en: "Access Controls", ar: "ضوابط الوصول" },
      { en: "Data Backup", ar: "نسخ البيانات الاحتياطية" },
      { en: "System Monitoring", ar: "مراقبة النظام" },
    ],
    riskLevel: "critical",
    estimatedCost: "$30,000 - $60,000",
  },
  {
    id: "operational",
    title: "Operational System Audit",
    titleAr: "مراجعة النظام التشغيلي",
    description: "Assessment of operational processes, efficiency, and resource utilization",
    descriptionAr: "تقييم العمليات التشغيلية والكفاءة واستخدام الموارد",
    icon: <Settings className="h-6 w-6" />,
    complexity: "medium",
    duration: "4-8 weeks",
    durationAr: "4-8 أسبوع",
    standards: ["ISO 9001", "Lean", "Six Sigma", "PMBOK"],
    keyAreas: [
      { en: "Process Efficiency", ar: "كفاءة العمليات" },
      { en: "Resource Management", ar: "إدارة الموارد" },
      { en: "Quality Control", ar: "مراقبة الجودة" },
      { en: "Performance Metrics", ar: "مقاييس الأداء" },
    ],
    riskLevel: "medium",
    estimatedCost: "$15,000 - $35,000",
  },
  {
    id: "compliance",
    title: "Compliance System Audit",
    titleAr: "مراجعة نظام الامتثال",
    description: "Review of regulatory compliance and adherence to industry standards",
    descriptionAr: "مراجعة الامتثال التنظيمي والالتزام بمعايير الصناعة",
    icon: <Shield className="h-6 w-6" />,
    complexity: "medium",
    duration: "3-6 weeks",
    durationAr: "3-6 أسبوع",
    standards: ["GDPR", "HIPAA", "PCI DSS", "Egyptian Law"],
    keyAreas: [
      { en: "Regulatory Compliance", ar: "الامتثال التنظيمي" },
      { en: "Policy Adherence", ar: "الالتزام بالسياسات" },
      { en: "Documentation", ar: "التوثيق" },
      { en: "Training Programs", ar: "برامج التدريب" },
    ],
    riskLevel: "high",
    estimatedCost: "$20,000 - $40,000",
  },
  {
    id: "quality",
    title: "Quality System Audit",
    titleAr: "مراجعة نظام الجودة",
    description: "Evaluation of quality management systems and continuous improvement processes",
    descriptionAr: "تقييم أنظمة إدارة الجودة وعمليات التحسين المستمر",
    icon: <Award className="h-6 w-6" />,
    complexity: "medium",
    duration: "3-5 weeks",
    durationAr: "3-5 أسبوع",
    standards: ["ISO 9001", "TQM", "Kaizen", "5S"],
    keyAreas: [
      { en: "Quality Standards", ar: "معايير الجودة" },
      { en: "Customer Satisfaction", ar: "رضا العملاء" },
      { en: "Continuous Improvement", ar: "التحسين المستمر" },
      { en: "Defect Management", ar: "إدارة العيوب" },
    ],
    riskLevel: "low",
    estimatedCost: "$10,000 - $25,000",
  },
  {
    id: "environmental",
    title: "Environmental System Audit",
    titleAr: "مراجعة النظام البيئي",
    description: "Assessment of environmental management systems and sustainability practices",
    descriptionAr: "تقييم أنظمة الإدارة البيئية وممارسات الاستدامة",
    icon: <Globe className="h-6 w-6" />,
    complexity: "low",
    duration: "2-4 weeks",
    durationAr: "2-4 أسبوع",
    standards: ["ISO 14001", "EMAS", "GRI", "CDP"],
    keyAreas: [
      { en: "Environmental Impact", ar: "التأثير البيئي" },
      { en: "Waste Management", ar: "إدارة النفايات" },
      { en: "Energy Efficiency", ar: "كفاءة الطاقة" },
      { en: "Sustainability Reporting", ar: "تقارير الاستدامة" },
    ],
    riskLevel: "low",
    estimatedCost: "$8,000 - $20,000",
  },
]

const auditBenefits = [
  {
    id: "risk-mitigation",
    title: "Risk Mitigation",
    titleAr: "تخفيف المخاطر",
    description: "Identify and address potential risks before they impact operations",
    descriptionAr: "تحديد ومعالجة المخاطر المحتملة قبل تأثيرها على العمليات",
    icon: <Shield className="h-5 w-5" />,
    impact: 95,
    examples: [
      { en: "Financial fraud prevention", ar: "منع الاحتيال المالي" },
      { en: "Cybersecurity threat detection", ar: "اكتشاف التهديدات السيبرانية" },
      { en: "Operational risk assessment", ar: "تقييم المخاطر التشغيلية" },
    ],
  },
  {
    id: "efficiency-improvement",
    title: "Efficiency Improvement",
    titleAr: "تحسين الكفاءة",
    description: "Streamline processes and eliminate operational bottlenecks",
    descriptionAr: "تبسيط العمليات والقضاء على الاختناقات التشغيلية",
    icon: <TrendingUp className="h-5 w-5" />,
    impact: 87,
    examples: [
      { en: "Process automation opportunities", ar: "فرص أتمتة العمليات" },
      { en: "Resource optimization", ar: "تحسين الموارد" },
      { en: "Workflow enhancement", ar: "تحسين سير العمل" },
    ],
  },
  {
    id: "compliance-assurance",
    title: "Compliance Assurance",
    titleAr: "ضمان الامتثال",
    description: "Ensure adherence to regulations and industry standards",
    descriptionAr: "ضمان الالتزام باللوائح ومعايير الصناعة",
    icon: <CheckCircle className="h-5 w-5" />,
    impact: 92,
    examples: [
      { en: "Regulatory requirement compliance", ar: "الامتثال للمتطلبات التنظيمية" },
      { en: "Industry standard adherence", ar: "الالتزام بمعايير الصناعة" },
      { en: "Internal policy compliance", ar: "الامتثال للسياسات الداخلية" },
    ],
  },
  {
    id: "control-enhancement",
    title: "Enhanced Control Environment",
    titleAr: "تعزيز بيئة الرقابة",
    description: "Strengthen internal controls and governance frameworks",
    descriptionAr: "تقوية الضوابط الداخلية وأطر الحوكمة",
    icon: <Target className="h-5 w-5" />,
    impact: 89,
    examples: [
      { en: "Internal control strengthening", ar: "تقوية الضوابط الداخلية" },
      { en: "Governance improvement", ar: "تحسين الحوكمة" },
      { en: "Accountability enhancement", ar: "تعزيز المساءلة" },
    ],
  },
]

export function SystemAuditFramework({ isArabic }: SystemAuditFrameworkProps) {
  const [selectedAuditType, setSelectedAuditType] = useState(auditTypes[0])
  const [activePhase, setActivePhase] = useState(0)

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getComplexityText = (complexity: string) => {
    const complexityMap: Record<string, { en: string; ar: string }> = {
      high: { en: "High", ar: "عالية" },
      medium: { en: "Medium", ar: "متوسطة" },
      low: { en: "Low", ar: "منخفضة" },
    }
    return isArabic ? complexityMap[complexity]?.ar || complexity : complexityMap[complexity]?.en || complexity
  }

  const getRiskText = (risk: string) => {
    const riskMap: Record<string, { en: string; ar: string }> = {
      critical: { en: "Critical", ar: "حرج" },
      high: { en: "High", ar: "عالي" },
      medium: { en: "Medium", ar: "متوسط" },
      low: { en: "Low", ar: "منخفض" },
    }
    return isArabic ? riskMap[risk]?.ar || risk : riskMap[risk]?.en || risk
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isArabic ? "إطار مراجعة الأنظمة" : "System Audit Framework"}
            </h2>
            <p className="text-gray-600">
              {isArabic
                ? "إطار شامل لمراجعة الأنظمة وفقاً للمعايير المصرية والدولية"
                : "Comprehensive framework for system audits following Egyptian and international standards"}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="types" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="types">{isArabic ? "أنواع المراجعة" : "Audit Types"}</TabsTrigger>
          <TabsTrigger value="benefits">{isArabic ? "الفوائد" : "Benefits"}</TabsTrigger>
          <TabsTrigger value="process">{isArabic ? "العملية" : "Process"}</TabsTrigger>
          <TabsTrigger value="tools">{isArabic ? "الأدوات" : "Tools"}</TabsTrigger>
        </TabsList>

        <TabsContent value="types" className="space-y-6">
          {/* Audit Types Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {auditTypes.map((auditType) => (
              <Card
                key={auditType.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedAuditType.id === auditType.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setSelectedAuditType(auditType)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{auditType.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{isArabic ? auditType.titleAr : auditType.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      {isArabic ? auditType.descriptionAr : auditType.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Badge className={getComplexityColor(auditType.complexity)}>
                        {getComplexityText(auditType.complexity)} {isArabic ? "التعقيد" : "Complexity"}
                      </Badge>
                      <Badge className={getRiskColor(auditType.riskLevel)}>
                        {getRiskText(auditType.riskLevel)} {isArabic ? "المخاطر" : "Risk"}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{isArabic ? "المدة:" : "Duration:"}</span>
                        <span className="font-medium">{isArabic ? auditType.durationAr : auditType.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{isArabic ? "التكلفة المقدرة:" : "Est. Cost:"}</span>
                        <span className="font-medium">{auditType.estimatedCost}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        {isArabic ? "المعايير المطبقة:" : "Applied Standards:"}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {auditType.standards.map((standard, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {standard}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">{isArabic ? "المجالات الرئيسية:" : "Key Areas:"}</h4>
                      <div className="space-y-1">
                        {auditType.keyAreas.slice(0, 3).map((area, index) => (
                          <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-gray-600">{isArabic ? area.ar : area.en}</span>
                          </div>
                        ))}
                        {auditType.keyAreas.length > 3 && (
                          <span className="text-xs text-blue-600">
                            +{auditType.keyAreas.length - 3} {isArabic ? "المزيد" : "more"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Audit Type Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                {selectedAuditType.icon}
                <span>{isArabic ? selectedAuditType.titleAr : selectedAuditType.title}</span>
              </CardTitle>
              <CardDescription>
                {isArabic ? "تفاصيل شاملة لنوع المراجعة المحدد" : "Comprehensive details for the selected audit type"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">{isArabic ? "جميع المجالات الرئيسية:" : "All Key Areas:"}</h4>
                  <div className="space-y-2">
                    {selectedAuditType.keyAreas.map((area, index) => (
                      <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{isArabic ? area.ar : area.en}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">{isArabic ? "المعايير والأطر:" : "Standards & Frameworks:"}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedAuditType.standards.map((standard, index) => (
                      <Badge key={index} variant="outline" className="justify-center">
                        {standard}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          {/* Benefits Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditBenefits.map((benefit) => (
              <Card key={benefit.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{benefit.icon}</div>
                    <span>{isArabic ? benefit.titleAr : benefit.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">{isArabic ? benefit.descriptionAr : benefit.description}</p>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{isArabic ? "التأثير المتوقع" : "Expected Impact"}</span>
                        <span className="text-sm font-bold">{benefit.impact}%</span>
                      </div>
                      <Progress value={benefit.impact} className="h-2" />
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">{isArabic ? "أمثلة:" : "Examples:"}</h4>
                      <div className="space-y-1">
                        {benefit.examples.map((example, index) => (
                          <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                            <ArrowRight className="h-3 w-3 text-blue-500" />
                            <span className="text-xs text-gray-600">{isArabic ? example.ar : example.en}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ROI Calculator */}
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "حاسبة العائد على الاستثمار" : "ROI Calculator"}</CardTitle>
              <CardDescription>
                {isArabic
                  ? "احسب العائد المتوقع على الاستثمار من مراجعة الأنظمة"
                  : "Calculate expected return on investment from system audits"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">$150K</div>
                  <div className="text-sm text-gray-600">
                    {isArabic ? "التوفير السنوي المتوقع" : "Expected Annual Savings"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">3.2x</div>
                  <div className="text-sm text-gray-600">
                    {isArabic ? "العائد على الاستثمار" : "Return on Investment"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">6 {isArabic ? "أشهر" : "months"}</div>
                  <div className="text-sm text-gray-600">{isArabic ? "فترة الاسترداد" : "Payback Period"}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="space-y-6">
          {/* Audit Process Steps */}
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "مراحل عملية المراجعة" : "Audit Process Phases"}</CardTitle>
              <CardDescription>
                {isArabic ? "المراحل الأساسية لعملية مراجعة الأنظمة" : "Key phases of the system audit process"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    phase: 1,
                    title: isArabic ? "التخطيط والإعداد" : "Planning & Preparation",
                    duration: isArabic ? "1-2 أسبوع" : "1-2 weeks",
                    activities: isArabic
                      ? [
                          "تحديد النطاق والأهداف",
                          "تشكيل فريق المراجعة",
                          "تقييم المخاطر الأولي",
                          "إعداد برنامج المراجعة",
                        ]
                      : [
                          "Define scope and objectives",
                          "Form audit team",
                          "Initial risk assessment",
                          "Prepare audit program",
                        ],
                    deliverables: isArabic
                      ? ["ميثاق المراجعة", "خطة المراجعة", "تقييم المخاطر"]
                      : ["Audit charter", "Audit plan", "Risk assessment"],
                  },
                  {
                    phase: 2,
                    title: isArabic ? "جمع المعلومات" : "Information Gathering",
                    duration: isArabic ? "2-3 أسبوع" : "2-3 weeks",
                    activities: isArabic
                      ? ["مراجعة الوثائق", "إجراء المقابلات", "فهم العمليات", "تحليل البيانات"]
                      : ["Document review", "Conduct interviews", "Process understanding", "Data analysis"],
                    deliverables: isArabic
                      ? ["ملفات الوثائق", "ملاحظات المقابلات", "خرائط العمليات"]
                      : ["Document files", "Interview notes", "Process maps"],
                  },
                  {
                    phase: 3,
                    title: isArabic ? "التنفيذ والاختبار" : "Execution & Testing",
                    duration: isArabic ? "3-5 أسبوع" : "3-5 weeks",
                    activities: isArabic
                      ? ["اختبار الضوابط", "تحليل العينات", "تقييم الفعالية", "توثيق النتائج"]
                      : ["Control testing", "Sample analysis", "Effectiveness evaluation", "Document findings"],
                    deliverables: isArabic
                      ? ["نتائج الاختبارات", "أوراق العمل", "سجل النتائج"]
                      : ["Test results", "Working papers", "Findings log"],
                  },
                  {
                    phase: 4,
                    title: isArabic ? "المراجعة والتقييم" : "Review & Evaluation",
                    duration: isArabic ? "1-2 أسبوع" : "1-2 weeks",
                    activities: isArabic
                      ? ["مراجعة النتائج", "تقييم الأهمية", "الحصول على ردود الإدارة", "ضمان الجودة"]
                      : ["Review findings", "Assess significance", "Obtain management responses", "Quality assurance"],
                    deliverables: isArabic
                      ? ["تقرير المراجعة", "ردود الإدارة", "خطة العمل"]
                      : ["Review report", "Management responses", "Action plan"],
                  },
                  {
                    phase: 5,
                    title: isArabic ? "التقرير والمتابعة" : "Reporting & Follow-up",
                    duration: isArabic ? "1-2 أسبوع" : "1-2 weeks",
                    activities: isArabic
                      ? ["إعداد التقرير النهائي", "عرض النتائج", "متابعة التنفيذ", "إغلاق المراجعة"]
                      : ["Prepare final report", "Present findings", "Follow-up implementation", "Close audit"],
                    deliverables: isArabic
                      ? ["التقرير النهائي", "العرض التقديمي", "تقرير المتابعة"]
                      : ["Final report", "Presentation", "Follow-up report"],
                  },
                ].map((step, index) => (
                  <div key={step.phase} className="relative">
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                          activePhase === index
                            ? "bg-blue-500 border-blue-500 text-white"
                            : activePhase > index
                              ? "bg-green-500 border-green-500 text-white"
                              : "bg-white border-gray-300 text-gray-500"
                        }`}
                      >
                        {activePhase > index ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="font-bold">{step.phase}</span>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold">{step.title}</h4>
                          <Badge variant="outline">{step.duration}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium mb-2">{isArabic ? "الأنشطة:" : "Activities:"}</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {step.activities.map((activity, actIndex) => (
                                <li key={actIndex} className="flex items-start space-x-2 rtl:space-x-reverse">
                                  <ArrowRight className="h-3 w-3 mt-0.5 text-blue-500" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium mb-2">{isArabic ? "المخرجات:" : "Deliverables:"}</h5>
                            <div className="flex flex-wrap gap-1">
                              {step.deliverables.map((deliverable, delIndex) => (
                                <Badge key={delIndex} variant="secondary" className="text-xs">
                                  {deliverable}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < 4 && (
                      <div className="absolute left-5 rtl:right-5 rtl:left-auto top-10 bottom-0 w-0.5 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActivePhase(Math.max(0, activePhase - 1))}
                  disabled={activePhase === 0}
                >
                  {isArabic ? "السابق" : "Previous"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActivePhase(Math.min(4, activePhase + 1))}
                  disabled={activePhase === 4}
                >
                  {isArabic ? "التالي" : "Next"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setActivePhase(0)}>
                  <RotateCcw className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                  {isArabic ? "إعادة تعيين" : "Reset"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          {/* Tools and Techniques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                category: isArabic ? "أدوات جمع المعلومات" : "Information Gathering Tools",
                tools: [
                  { name: isArabic ? "المقابلات المنظمة" : "Structured Interviews", effectiveness: 90 },
                  { name: isArabic ? "الاستبيانات" : "Questionnaires", effectiveness: 75 },
                  { name: isArabic ? "مراجعة الوثائق" : "Document Review", effectiveness: 85 },
                  { name: isArabic ? "الملاحظة المباشرة" : "Direct Observation", effectiveness: 80 },
                ],
                icon: <Search className="h-5 w-5" />,
              },
              {
                category: isArabic ? "أدوات التحليل" : "Analysis Tools",
                tools: [
                  { name: isArabic ? "تحليل البيانات" : "Data Analytics", effectiveness: 95 },
                  { name: isArabic ? "تحليل الاتجاهات" : "Trend Analysis", effectiveness: 85 },
                  { name: isArabic ? "تحليل الفجوات" : "Gap Analysis", effectiveness: 80 },
                  { name: isArabic ? "تحليل السبب الجذري" : "Root Cause Analysis", effectiveness: 90 },
                ],
                icon: <BarChart3 className="h-5 w-5" />,
              },
              {
                category: isArabic ? "أدوات الاختبار" : "Testing Tools",
                tools: [
                  { name: isArabic ? "اختبار العينات" : "Sample Testing", effectiveness: 85 },
                  { name: isArabic ? "اختبار الضوابط" : "Control Testing", effectiveness: 90 },
                  { name: isArabic ? "اختبار الأداء" : "Performance Testing", effectiveness: 80 },
                  { name: isArabic ? "اختبار الامتثال" : "Compliance Testing", effectiveness: 95 },
                ],
                icon: <Target className="h-5 w-5" />,
              },
            ].map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{category.icon}</div>
                    <span className="text-lg">{category.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{tool.name}</span>
                          <span className="text-sm text-gray-600">{tool.effectiveness}%</span>
                        </div>
                        <Progress value={tool.effectiveness} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technology Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Zap className="h-5 w-5" />
                <span>{isArabic ? "التكامل التقني" : "Technology Integration"}</span>
              </CardTitle>
              <CardDescription>
                {isArabic
                  ? "الأدوات التقنية المتقدمة لتحسين كفاءة المراجعة"
                  : "Advanced technology tools to enhance audit efficiency"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    name: isArabic ? "الذكاء الاصطناعي" : "AI Analytics",
                    description: isArabic ? "تحليل البيانات الذكي" : "Intelligent data analysis",
                    icon: <Brain className="h-6 w-6" />,
                    adoption: 85,
                  },
                  {
                    name: isArabic ? "أتمتة العمليات" : "Process Automation",
                    description: isArabic ? "أتمتة المهام المتكررة" : "Automate repetitive tasks",
                    icon: <Zap className="h-6 w-6" />,
                    adoption: 78,
                  },
                  {
                    name: isArabic ? "تصور البيانات" : "Data Visualization",
                    description: isArabic ? "عرض البيانات التفاعلي" : "Interactive data presentation",
                    icon: <BarChart3 className="h-6 w-6" />,
                    adoption: 92,
                  },
                  {
                    name: isArabic ? "التعاون السحابي" : "Cloud Collaboration",
                    description: isArabic ? "العمل الجماعي المتزامن" : "Real-time team collaboration",
                    icon: <Users className="h-6 w-6" />,
                    adoption: 88,
                  },
                ].map((tech, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600">{tech.icon}</div>
                        <div>
                          <h4 className="font-medium">{tech.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{tech.description}</p>
                        </div>
                        <div className="w-full">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>{isArabic ? "معدل التبني" : "Adoption"}</span>
                            <span>{tech.adoption}%</span>
                          </div>
                          <Progress value={tech.adoption} className="h-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Lightbulb className="h-5 w-5" />
                <span>{isArabic ? "أفضل الممارسات" : "Best Practices"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    id: "risk-based",
                    title: isArabic ? "النهج القائم على المخاطر" : "Risk-Based Approach",
                    content: isArabic
                      ? "ركز على المجالات عالية المخاطر لتحقيق أقصى قيمة من المراجعة. استخدم تقييم المخاطر لتحديد أولويات العمل وتخصيص الموارد بكفاءة."
                      : "Focus on high-risk areas to maximize audit value. Use risk assessment to prioritize work and allocate resources efficiently.",
                  },
                  {
                    id: "continuous-monitoring",
                    title: isArabic ? "المراقبة المستمرة" : "Continuous Monitoring",
                    content: isArabic
                      ? "تطبيق أدوات المراقبة المستمرة لاكتشاف المشاكل في الوقت الفعلي. استخدم التحليلات التلقائية لتحديد الانحرافات والمخاطر الناشئة."
                      : "Implement continuous monitoring tools to detect issues in real-time. Use automated analytics to identify deviations and emerging risks.",
                  },
                  {
                    id: "stakeholder-engagement",
                    title: isArabic ? "إشراك أصحاب المصلحة" : "Stakeholder Engagement",
                    content: isArabic
                      ? "حافظ على التواصل المستمر مع أصحاب المصلحة طوال عملية المراجعة. اطلب ردود الفعل بانتظام وتأكد من فهم التوقعات."
                      : "Maintain continuous communication with stakeholders throughout the audit process. Seek regular feedback and ensure expectations are understood.",
                  },
                  {
                    id: "documentation",
                    title: isArabic ? "التوثيق الشامل" : "Comprehensive Documentation",
                    content: isArabic
                      ? "احتفظ بوثائق مفصلة لجميع إجراءات المراجعة والنتائج. استخدم أدوات إدارة الوثائق الرقمية لضمان سهولة الوصول والتتبع."
                      : "Maintain detailed documentation of all audit procedures and findings. Use digital document management tools to ensure accessibility and traceability.",
                  },
                ].map((practice) => (
                  <AccordionItem key={practice.id} value={practice.id}>
                    <AccordionTrigger className="text-left">{practice.title}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-600">{practice.content}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
