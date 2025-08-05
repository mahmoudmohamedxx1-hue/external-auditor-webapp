"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Settings,
  Shield,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  FileText,
  Calendar,
  Target,
  Zap,
  Eye,
  Plus,
  Download,
  Search,
  Filter,
  Globe,
  Cpu,
  DollarSign,
} from "lucide-react"

interface SystemAuditType {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  icon: React.ReactNode
  category: string
  categoryAr: string
  estimatedDuration: string
  complexity: "low" | "medium" | "high" | "critical"
  regulations: string[]
  keyAreas: string[]
  keyAreasAr: string[]
  benefits: string[]
  benefitsAr: string[]
}

interface AuditPhase {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  status: "not_started" | "in_progress" | "completed" | "on_hold"
  progress: number
  estimatedHours: number
  actualHours: number
  deliverables: string[]
  deliverablesAr: string[]
  risks: string[]
  risksAr: string[]
}

interface SystemAuditFrameworkProps {
  isArabic: boolean
}

const systemAuditTypes: SystemAuditType[] = [
  {
    id: "financial",
    name: "Financial System Audit",
    nameAr: "مراجعة النظام المالي",
    description: "Comprehensive assessment of financial systems and controls for accuracy, reliability, and compliance",
    descriptionAr: "تقييم شامل للأنظمة والضوابط المالية للدقة والموثوقية والامتثال",
    icon: <DollarSign className="h-6 w-6" />,
    category: "Financial",
    categoryAr: "مالي",
    estimatedDuration: "8-12 weeks",
    complexity: "high",
    regulations: ["EAS", "IFRS", "SOX", "Egyptian Companies Law"],
    keyAreas: [
      "Financial reporting accuracy",
      "Internal controls effectiveness",
      "Compliance with accounting standards",
      "Risk management processes",
    ],
    keyAreasAr: [
      "دقة التقارير المالية",
      "فعالية الضوابط الداخلية",
      "الامتثال لمعايير المحاسبة",
      "عمليات إدارة المخاطر",
    ],
    benefits: [
      "Enhanced financial reporting reliability",
      "Improved regulatory compliance",
      "Reduced financial risks",
      "Strengthened investor confidence",
    ],
    benefitsAr: [
      "تعزيز موثوقية التقارير المالية",
      "تحسين الامتثال التنظيمي",
      "تقليل المخاطر المالية",
      "تقوية ثقة المستثمرين",
    ],
  },
  {
    id: "it",
    name: "IT System Audit",
    nameAr: "مراجعة نظام تكنولوجيا المعلومات",
    description: "Evaluation of IT infrastructure, cybersecurity protocols, and data management systems",
    descriptionAr: "تقييم البنية التحتية لتكنولوجيا المعلومات وبروتوكولات الأمن السيبراني وأنظمة إدارة البيانات",
    icon: <Cpu className="h-6 w-6" />,
    category: "Technology",
    categoryAr: "تكنولوجيا",
    estimatedDuration: "6-10 weeks",
    complexity: "high",
    regulations: ["ISO 27001", "GDPR", "Egyptian Data Protection Law"],
    keyAreas: [
      "Cybersecurity effectiveness",
      "Data integrity and availability",
      "System performance and reliability",
      "Access controls and authentication",
    ],
    keyAreasAr: [
      "فعالية الأمن السيبراني",
      "سلامة البيانات وتوفرها",
      "أداء النظام والموثوقية",
      "ضوابط الوصول والمصادقة",
    ],
    benefits: [
      "Enhanced cybersecurity posture",
      "Improved data protection",
      "Optimized system performance",
      "Reduced IT risks",
    ],
    benefitsAr: [
      "تعزيز وضعية الأمن السيبراني",
      "تحسين حماية البيانات",
      "تحسين أداء النظام",
      "تقليل مخاطر تكنولوجيا المعلومات",
    ],
  },
  {
    id: "operational",
    name: "Operational System Audit",
    nameAr: "مراجعة النظام التشغيلي",
    description: "Assessment of operational processes to identify inefficiencies and optimization opportunities",
    descriptionAr: "تقييم العمليات التشغيلية لتحديد أوجه عدم الكفاءة وفرص التحسين",
    icon: <Settings className="h-6 w-6" />,
    category: "Operations",
    categoryAr: "عمليات",
    estimatedDuration: "4-8 weeks",
    complexity: "medium",
    regulations: ["ISO 9001", "Egyptian Quality Standards"],
    keyAreas: [
      "Process efficiency analysis",
      "Resource utilization optimization",
      "Workflow effectiveness",
      "Performance metrics evaluation",
    ],
    keyAreasAr: ["تحليل كفاءة العمليات", "تحسين استخدام الموارد", "فعالية سير العمل", "تقييم مقاييس الأداء"],
    benefits: [
      "Improved operational efficiency",
      "Cost reduction opportunities",
      "Enhanced productivity",
      "Streamlined processes",
    ],
    benefitsAr: ["تحسين الكفاءة التشغيلية", "فرص تقليل التكاليف", "تعزيز الإنتاجية", "تبسيط العمليات"],
  },
  {
    id: "compliance",
    name: "Compliance Audit",
    nameAr: "مراجعة الامتثال",
    description: "Verification of adherence to laws, regulations, and industry standards",
    descriptionAr: "التحقق من الالتزام بالقوانين واللوائح ومعايير الصناعة",
    icon: <Shield className="h-6 w-6" />,
    category: "Compliance",
    categoryAr: "امتثال",
    estimatedDuration: "3-6 weeks",
    complexity: "medium",
    regulations: ["Egyptian Law", "Industry Standards", "International Regulations"],
    keyAreas: [
      "Regulatory compliance assessment",
      "Policy adherence verification",
      "Legal requirement fulfillment",
      "Industry standard compliance",
    ],
    keyAreasAr: [
      "تقييم الامتثال التنظيمي",
      "التحقق من الالتزام بالسياسات",
      "الوفاء بالمتطلبات القانونية",
      "الامتثال لمعايير الصناعة",
    ],
    benefits: [
      "Reduced regulatory risks",
      "Avoided penalties and fines",
      "Enhanced reputation",
      "Improved stakeholder confidence",
    ],
    benefitsAr: ["تقليل المخاطر التنظيمية", "تجنب العقوبات والغرامات", "تعزيز السمعة", "تحسين ثقة أصحاب المصلحة"],
  },
  {
    id: "quality",
    name: "Quality System Audit",
    nameAr: "مراجعة نظام الجودة",
    description: "Evaluation of quality management systems and processes for continuous improvement",
    descriptionAr: "تقييم أنظمة وعمليات إدارة الجودة للتحسين المستمر",
    icon: <Target className="h-6 w-6" />,
    category: "Quality",
    categoryAr: "جودة",
    estimatedDuration: "4-7 weeks",
    complexity: "medium",
    regulations: ["ISO 9001", "Egyptian Quality Standards", "Industry QMS"],
    keyAreas: [
      "Quality management effectiveness",
      "Customer satisfaction metrics",
      "Process improvement opportunities",
      "Quality control mechanisms",
    ],
    keyAreasAr: ["فعالية إدارة الجودة", "مقاييس رضا العملاء", "فرص تحسين العمليات", "آليات مراقبة الجودة"],
    benefits: [
      "Enhanced product/service quality",
      "Increased customer satisfaction",
      "Improved process efficiency",
      "Competitive advantage",
    ],
    benefitsAr: ["تعزيز جودة المنتج/الخدمة", "زيادة رضا العملاء", "تحسين كفاءة العمليات", "ميزة تنافسية"],
  },
  {
    id: "environmental",
    name: "Environmental System Audit",
    nameAr: "مراجعة النظام البيئي",
    description: "Assessment of environmental performance and compliance with environmental regulations",
    descriptionAr: "تقييم الأداء البيئي والامتثال للوائح البيئية",
    icon: <Globe className="h-6 w-6" />,
    category: "Environmental",
    categoryAr: "بيئي",
    estimatedDuration: "3-5 weeks",
    complexity: "medium",
    regulations: ["ISO 14001", "Egyptian Environmental Law", "International Environmental Standards"],
    keyAreas: [
      "Environmental impact assessment",
      "Waste management evaluation",
      "Energy efficiency analysis",
      "Sustainability practices review",
    ],
    keyAreasAr: ["تقييم التأثير البيئي", "تقييم إدارة النفايات", "تحليل كفاءة الطاقة", "مراجعة ممارسات الاستدامة"],
    benefits: [
      "Reduced environmental impact",
      "Cost savings through efficiency",
      "Enhanced corporate reputation",
      "Regulatory compliance assurance",
    ],
    benefitsAr: [
      "تقليل التأثير البيئي",
      "توفير التكاليف من خلال الكفاءة",
      "تعزيز سمعة الشركة",
      "ضمان الامتثال التنظيمي",
    ],
  },
]

const auditPhases: AuditPhase[] = [
  {
    id: "planning",
    name: "Planning and Preparation",
    nameAr: "التخطيط والإعداد",
    description: "Define scope, objectives, and establish project team with necessary resources",
    descriptionAr: "تحديد النطاق والأهداف وإنشاء فريق المشروع بالموارد اللازمة",
    status: "completed",
    progress: 100,
    estimatedHours: 40,
    actualHours: 38,
    deliverables: [
      "Audit charter and scope document",
      "Risk assessment matrix",
      "Resource allocation plan",
      "Timeline and milestones",
    ],
    deliverablesAr: [
      "ميثاق المراجعة ووثيقة النطاق",
      "مصفوفة تقييم المخاطر",
      "خطة تخصيص الموارد",
      "الجدول الزمني والمعالم",
    ],
    risks: ["Inadequate resource allocation", "Unclear scope definition"],
    risksAr: ["تخصيص غير كافي للموارد", "تعريف غير واضح للنطاق"],
  },
  {
    id: "data_collection",
    name: "Data Collection",
    nameAr: "جمع البيانات",
    description: "Gather relevant data, documents, and information about the system",
    descriptionAr: "جمع البيانات والوثائق والمعلومات ذات الصلة بالنظام",
    status: "in_progress",
    progress: 65,
    estimatedHours: 60,
    actualHours: 42,
    deliverables: [
      "System documentation inventory",
      "Process flow diagrams",
      "Policy and procedure manuals",
      "Historical audit reports",
    ],
    deliverablesAr: [
      "جرد وثائق النظام",
      "مخططات تدفق العمليات",
      "أدلة السياسات والإجراءات",
      "تقارير المراجعة التاريخية",
    ],
    risks: ["Data accessibility issues", "Incomplete documentation"],
    risksAr: ["مشاكل الوصول للبيانات", "وثائق غير مكتملة"],
  },
  {
    id: "process_understanding",
    name: "Process Understanding",
    nameAr: "فهم العمليات",
    description: "Gain thorough understanding of processes, systems, and stakeholders",
    descriptionAr: "اكتساب فهم شامل للعمليات والأنظمة وأصحاب المصلحة",
    status: "in_progress",
    progress: 45,
    estimatedHours: 50,
    actualHours: 28,
    deliverables: [
      "Process mapping documentation",
      "Stakeholder analysis",
      "Risk identification matrix",
      "Control environment assessment",
    ],
    deliverablesAr: ["وثائق رسم العمليات", "تحليل أصحاب المصلحة", "مصفوفة تحديد المخاطر", "تقييم بيئة الضوابط"],
    risks: ["Complex system interactions", "Stakeholder availability"],
    risksAr: ["تفاعلات النظام المعقدة", "توفر أصحاب المصلحة"],
  },
  {
    id: "evaluation_testing",
    name: "Evaluation and Testing",
    nameAr: "التقييم والاختبار",
    description: "Conduct tests, reviews, and assessments to evaluate system effectiveness",
    descriptionAr: "إجراء الاختبارات والمراجعات والتقييمات لتقييم فعالية النظام",
    status: "not_started",
    progress: 0,
    estimatedHours: 80,
    actualHours: 0,
    deliverables: [
      "Test results documentation",
      "Control effectiveness assessment",
      "Performance evaluation report",
      "Compliance verification results",
    ],
    deliverablesAr: ["وثائق نتائج الاختبار", "تقييم فعالية الضوابط", "تقرير تقييم الأداء", "نتائج التحقق من الامتثال"],
    risks: ["Testing limitations", "System disruptions"],
    risksAr: ["قيود الاختبار", "اضطرابات النظام"],
  },
  {
    id: "findings_identification",
    name: "Findings Identification",
    nameAr: "تحديد النتائج",
    description: "Identify and document findings, deficiencies, and improvement areas",
    descriptionAr: "تحديد وتوثيق النتائج والنواقص ومجالات التحسين",
    status: "not_started",
    progress: 0,
    estimatedHours: 30,
    actualHours: 0,
    deliverables: ["Findings register", "Risk-based prioritization", "Root cause analysis", "Impact assessment"],
    deliverablesAr: ["سجل النتائج", "ترتيب الأولويات القائم على المخاطر", "تحليل السبب الجذري", "تقييم التأثير"],
    risks: ["Incomplete findings identification", "Bias in assessment"],
    risksAr: ["تحديد غير مكتمل للنتائج", "تحيز في التقييم"],
  },
  {
    id: "reporting",
    name: "Reporting and Communication",
    nameAr: "التقرير والتواصل",
    description: "Prepare detailed audit report and communicate findings to stakeholders",
    descriptionAr: "إعداد تقرير مراجعة مفصل وإبلاغ النتائج لأصحاب المصلحة",
    status: "not_started",
    progress: 0,
    estimatedHours: 25,
    actualHours: 0,
    deliverables: ["Executive summary", "Detailed audit report", "Management letter", "Presentation materials"],
    deliverablesAr: ["الملخص التنفيذي", "تقرير المراجعة المفصل", "خطاب الإدارة", "مواد العرض"],
    risks: ["Communication gaps", "Stakeholder resistance"],
    risksAr: ["فجوات التواصل", "مقاومة أصحاب المصلحة"],
  },
  {
    id: "follow_up",
    name: "Follow-up and Monitoring",
    nameAr: "المتابعة والمراقبة",
    description: "Monitor implementation of corrective actions and ensure effectiveness",
    descriptionAr: "مراقبة تنفيذ الإجراءات التصحيحية وضمان الفعالية",
    status: "not_started",
    progress: 0,
    estimatedHours: 35,
    actualHours: 0,
    deliverables: [
      "Action plan tracking",
      "Progress monitoring reports",
      "Effectiveness assessment",
      "Continuous improvement recommendations",
    ],
    deliverablesAr: ["تتبع خطة العمل", "تقارير مراقبة التقدم", "تقييم الفعالية", "توصيات التحسين المستمر"],
    risks: ["Implementation delays", "Inadequate monitoring"],
    risksAr: ["تأخير التنفيذ", "مراقبة غير كافية"],
  },
]

export function SystemAuditFramework({ isArabic }: SystemAuditFrameworkProps) {
  const [selectedAuditType, setSelectedAuditType] = useState<string | null>(null)
  const [showNewAudit, setShowNewAudit] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
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
    switch (complexity) {
      case "critical":
        return isArabic ? "حرج" : "Critical"
      case "high":
        return isArabic ? "عالي" : "High"
      case "medium":
        return isArabic ? "متوسط" : "Medium"
      case "low":
        return isArabic ? "منخفض" : "Low"
      default:
        return complexity
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "on_hold":
        return "bg-yellow-100 text-yellow-800"
      case "not_started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return isArabic ? "مكتمل" : "Completed"
      case "in_progress":
        return isArabic ? "قيد التنفيذ" : "In Progress"
      case "on_hold":
        return isArabic ? "معلق" : "On Hold"
      case "not_started":
        return isArabic ? "لم يبدأ" : "Not Started"
      default:
        return status
    }
  }

  const filteredAuditTypes = systemAuditTypes.filter((type) => {
    if (filterCategory !== "all" && type.category !== filterCategory) return false
    if (searchTerm && !type.name.toLowerCase().includes(searchTerm.toLowerCase()) && !type.nameAr.includes(searchTerm))
      return false
    return true
  })

  const totalEstimatedHours = auditPhases.reduce((sum, phase) => sum + phase.estimatedHours, 0)
  const totalActualHours = auditPhases.reduce((sum, phase) => sum + phase.actualHours, 0)
  const overallProgress = Math.round(auditPhases.reduce((sum, phase) => sum + phase.progress, 0) / auditPhases.length)
  const completedPhases = auditPhases.filter((phase) => phase.status === "completed").length

  return (
    <div className="space-y-6">
      {/* Framework Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Settings className="h-6 w-6 text-blue-600" />
              <span>{isArabic ? "إطار عمل مراجعة الأنظمة" : "System Audit Framework"}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isArabic ? "تصدير الإطار" : "Export Framework"}
              </Button>
              <Button size="sm" onClick={() => setShowNewAudit(true)}>
                <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isArabic ? "مراجعة جديدة" : "New Audit"}
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            {isArabic
              ? "إطار عمل شامل لإجراء مراجعات الأنظمة المختلفة مع أفضل الممارسات والمعايير الدولية"
              : "Comprehensive framework for conducting various system audits with best practices and international standards"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{systemAuditTypes.length}</p>
              <p className="text-sm text-gray-600">{isArabic ? "أنواع المراجعة" : "Audit Types"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{completedPhases}</p>
              <p className="text-sm text-gray-600">{isArabic ? "مراحل مكتملة" : "Completed Phases"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">{overallProgress}%</p>
              <p className="text-sm text-gray-600">{isArabic ? "التقدم الإجمالي" : "Overall Progress"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-600">{totalActualHours}h</p>
              <p className="text-sm text-gray-600">{isArabic ? "الساعات المنجزة" : "Hours Completed"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="audit_types" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="audit_types">{isArabic ? "أنواع المراجعة" : "Audit Types"}</TabsTrigger>
          <TabsTrigger value="methodology">{isArabic ? "المنهجية" : "Methodology"}</TabsTrigger>
          <TabsTrigger value="progress">{isArabic ? "التقدم" : "Progress"}</TabsTrigger>
          <TabsTrigger value="compliance">{isArabic ? "الامتثال" : "Compliance"}</TabsTrigger>
        </TabsList>

        <TabsContent value="audit_types" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={isArabic ? "البحث في أنواع المراجعة..." : "Search audit types..."}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rtl:pr-10 rtl:pl-3"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{isArabic ? "كل الفئات" : "All Categories"}</SelectItem>
                      <SelectItem value="Financial">{isArabic ? "مالي" : "Financial"}</SelectItem>
                      <SelectItem value="Technology">{isArabic ? "تكنولوجيا" : "Technology"}</SelectItem>
                      <SelectItem value="Operations">{isArabic ? "عمليات" : "Operations"}</SelectItem>
                      <SelectItem value="Compliance">{isArabic ? "امتثال" : "Compliance"}</SelectItem>
                      <SelectItem value="Quality">{isArabic ? "جودة" : "Quality"}</SelectItem>
                      <SelectItem value="Environmental">{isArabic ? "بيئي" : "Environmental"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit Types Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAuditTypes.map((auditType) => (
              <Card key={auditType.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{auditType.icon}</div>
                      <div>
                        <h3 className="font-semibold">{isArabic ? auditType.nameAr : auditType.name}</h3>
                        <p className="text-sm text-gray-500">{auditType.estimatedDuration}</p>
                      </div>
                    </div>
                    <Badge className={getComplexityColor(auditType.complexity)}>
                      {getComplexityText(auditType.complexity)}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{isArabic ? auditType.descriptionAr : auditType.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">{isArabic ? "المجالات الرئيسية:" : "Key Areas:"}</h4>
                      <div className="flex flex-wrap gap-1">
                        {(isArabic ? auditType.keyAreasAr : auditType.keyAreas).map((area, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">{isArabic ? "اللوائح المطبقة:" : "Regulations:"}</h4>
                      <div className="flex flex-wrap gap-1">
                        {auditType.regulations.map((regulation, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {regulation}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">
                        {isArabic ? "الفوائد المتوقعة:" : "Expected Benefits:"}
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {(isArabic ? auditType.benefitsAr : auditType.benefits).slice(0, 2).map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex space-x-2 rtl:space-x-reverse pt-4">
                      <Button size="sm" className="flex-1" onClick={() => setSelectedAuditType(auditType.id)}>
                        <Zap className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {isArabic ? "بدء المراجعة" : "Start Audit"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="methodology" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Target className="h-5 w-5" />
                <span>{isArabic ? "منهجية مراجعة الأنظمة" : "System Audit Methodology"}</span>
              </CardTitle>
              <CardDescription>
                {isArabic
                  ? "منهجية شاملة لإجراء مراجعات الأنظمة وفقاً لأفضل الممارسات الدولية"
                  : "Comprehensive methodology for conducting system audits following international best practices"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {auditPhases.map((phase, index) => (
                  <div key={phase.id} className="relative">
                    {index < auditPhases.length - 1 && (
                      <div className="absolute left-6 rtl:right-6 rtl:left-auto top-12 w-0.5 h-16 bg-gray-200" />
                    )}
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                          phase.status === "completed"
                            ? "bg-green-500"
                            : phase.status === "in_progress"
                              ? "bg-blue-500"
                              : "bg-gray-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{isArabic ? phase.nameAr : phase.name}</h3>
                          <Badge className={getStatusColor(phase.status)}>{getStatusText(phase.status)}</Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{isArabic ? phase.descriptionAr : phase.description}</p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>{isArabic ? "التقدم" : "Progress"}</span>
                              <span>{phase.progress}%</span>
                            </div>
                            <Progress value={phase.progress} className="h-2" />
                          </div>
                          <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {phase.actualHours}h / {phase.estimatedHours}h
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              {isArabic ? "المخرجات المتوقعة:" : "Expected Deliverables:"}
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {(isArabic ? phase.deliverablesAr : phase.deliverables).map((deliverable, idx) => (
                                <li key={idx} className="flex items-start space-x-2 rtl:space-x-reverse">
                                  <FileText className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <span>{deliverable}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">
                              {isArabic ? "المخاطر المحتملة:" : "Potential Risks:"}
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {(isArabic ? phase.risksAr : phase.risks).map((risk, idx) => (
                                <li key={idx} className="flex items-start space-x-2 rtl:space-x-reverse">
                                  <AlertTriangle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                                  <span>{risk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? "تقدم المراجعة الإجمالي" : "Overall Audit Progress"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{overallProgress}%</div>
                    <Progress value={overallProgress} className="h-4" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">{completedPhases}</p>
                      <p className="text-sm text-gray-600">{isArabic ? "مراحل مكتملة" : "Completed Phases"}</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{auditPhases.length - completedPhases}</p>
                      <p className="text-sm text-gray-600">{isArabic ? "مراحل متبقية" : "Remaining Phases"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isArabic ? "إحصائيات الوقت" : "Time Statistics"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{isArabic ? "الساعات المقدرة" : "Estimated Hours"}</span>
                    <span className="font-medium">{totalEstimatedHours}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{isArabic ? "الساعات الفعلية" : "Actual Hours"}</span>
                    <span className="font-medium">{totalActualHours}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{isArabic ? "الساعات المتبقية" : "Remaining Hours"}</span>
                    <span className="font-medium">{totalEstimatedHours - totalActualHours}h</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{isArabic ? "كفاءة الوقت" : "Time Efficiency"}</span>
                      <span>
                        {totalEstimatedHours > 0 ? Math.round((totalActualHours / totalEstimatedHours) * 100) : 0}%
                      </span>
                    </div>
                    <Progress
                      value={totalEstimatedHours > 0 ? Math.round((totalActualHours / totalEstimatedHours) * 100) : 0}
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "تفاصيل تقدم المراحل" : "Phase Progress Details"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditPhases.map((phase) => (
                  <div key={phase.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                        <h4 className="font-medium">{isArabic ? phase.nameAr : phase.name}</h4>
                        <Badge className={getStatusColor(phase.status)}>{getStatusText(phase.status)}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>{isArabic ? "التقدم" : "Progress"}</span>
                        <span>{phase.progress}%</span>
                      </div>
                      <Progress value={phase.progress} className="h-2" />
                    </div>
                    <div className="ml-4 rtl:mr-4 rtl:ml-0 text-right rtl:text-left">
                      <p className="text-sm text-gray-600">
                        {phase.actualHours}h / {phase.estimatedHours}h
                      </p>
                      <p className="text-xs text-gray-500">
                        {phase.estimatedHours > 0 ? Math.round((phase.actualHours / phase.estimatedHours) * 100) : 0}%{" "}
                        {isArabic ? "كفاءة" : "efficiency"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Shield className="h-5 w-5" />
                <span>{isArabic ? "متطلبات الامتثال والتنظيم" : "Compliance and Regulatory Requirements"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">{isArabic ? "المعايير الدولية" : "International Standards"}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">ISO 27001</span>
                      </div>
                      <Badge variant="outline">{isArabic ? "أمان المعلومات" : "Information Security"}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">ISO 9001</span>
                      </div>
                      <Badge variant="outline">{isArabic ? "إدارة الجودة" : "Quality Management"}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">ISO 14001</span>
                      </div>
                      <Badge variant="outline">{isArabic ? "الإدارة البيئية" : "Environmental Management"}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">SOX 404</span>
                      </div>
                      <Badge variant="outline">{isArabic ? "الضوابط الداخلية" : "Internal Controls"}</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">{isArabic ? "اللوائح المصرية" : "Egyptian Regulations"}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">
                          {isArabic ? "قانون الشركات المصري" : "Egyptian Companies Law"}
                        </span>
                      </div>
                      <Badge variant="outline">{isArabic ? "حوكمة" : "Governance"}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">
                          {isArabic ? "معايير المحاسبة المصرية" : "Egyptian Accounting Standards"}
                        </span>
                      </div>
                      <Badge variant="outline">{isArabic ? "محاسبة" : "Accounting"}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{isArabic ? "قانون حماية البيانات" : "Data Protection Law"}</span>
                      </div>
                      <Badge variant="outline">{isArabic ? "خصوصية" : "Privacy"}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">
                          {isArabic ? "لوائح البنك المركزي" : "Central Bank Regulations"}
                        </span>
                      </div>
                      <Badge variant="outline">{isArabic ? "مصرفي" : "Banking"}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">{isArabic ? "حالة الامتثال" : "Compliance Status"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">94%</div>
                    <div className="text-sm text-green-800">{isArabic ? "امتثال كامل" : "Fully Compliant"}</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">5%</div>
                    <div className="text-sm text-yellow-800">{isArabic ? "امتثال جزئي" : "Partially Compliant"}</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">1%</div>
                    <div className="text-sm text-red-800">{isArabic ? "غير ممتثل" : "Non-Compliant"}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Audit Dialog */}
      <Dialog open={showNewAudit} onOpenChange={setShowNewAudit}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isArabic ? "إنشاء مراجعة نظام جديدة" : "Create New System Audit"}</DialogTitle>
            <DialogDescription>
              {isArabic
                ? "اختر نوع المراجعة وحدد المعايير لبدء مراجعة نظام جديدة"
                : "Select audit type and define criteria to start a new system audit"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="auditName">{isArabic ? "اسم المراجعة" : "Audit Name"}</Label>
                <Input id="auditName" placeholder={isArabic ? "أدخل اسم المراجعة" : "Enter audit name"} />
              </div>
              <div>
                <Label htmlFor="auditType">{isArabic ? "نوع المراجعة" : "Audit Type"}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={isArabic ? "اختر نوع المراجعة" : "Select audit type"} />
                  </SelectTrigger>
                  <SelectContent>
                    {systemAuditTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {isArabic ? type.nameAr : type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="leadAuditor">{isArabic ? "المراجع الرئيسي" : "Lead Auditor"}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={isArabic ? "اختر المراجع الرئيسي" : "Select lead auditor"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ahmed">Ahmed Hassan (Senior Partner)</SelectItem>
                    <SelectItem value="fatima">Fatima Al-Zahra (Manager)</SelectItem>
                    <SelectItem value="mohamed">Mohamed Saeed (Senior)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startDate">{isArabic ? "تاريخ البدء" : "Start Date"}</Label>
                <Input id="startDate" type="date" />
              </div>
            </div>

            <div>
              <Label htmlFor="scope">{isArabic ? "نطاق المراجعة" : "Audit Scope"}</Label>
              <Textarea id="scope" placeholder={isArabic ? "حدد نطاق المراجعة..." : "Define audit scope..."} rows={3} />
            </div>

            <div>
              <Label htmlFor="objectives">{isArabic ? "أهداف المراجعة" : "Audit Objectives"}</Label>
              <Textarea
                id="objectives"
                placeholder={isArabic ? "حدد أهداف المراجعة..." : "Define audit objectives..."}
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2 rtl:space-x-reverse">
              <Button variant="outline" onClick={() => setShowNewAudit(false)}>
                {isArabic ? "إلغاء" : "Cancel"}
              </Button>
              <Button onClick={() => setShowNewAudit(false)}>
                <Zap className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isArabic ? "إنشاء المراجعة" : "Create Audit"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
