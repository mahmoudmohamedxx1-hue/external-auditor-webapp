"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  MessageSquare,
  Eye,
  BarChart3,
  Cpu,
  FileText,
  Search,
  Download,
  Upload,
  Settings,
  Zap,
  Target,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Filter,
} from "lucide-react"

interface AuditTool {
  id: string
  name: string
  nameAr: string
  category: string
  categoryAr: string
  description: string
  descriptionAr: string
  icon: React.ReactNode
  type: "manual" | "automated" | "hybrid"
  complexity: "low" | "medium" | "high"
  effectiveness: number
  timeRequired: string
  skillLevel: "beginner" | "intermediate" | "advanced"
  applications: string[]
  applicationsAr: string[]
  benefits: string[]
  benefitsAr: string[]
  limitations: string[]
  limitationsAr: string[]
}

interface AuditTechnique {
  id: string
  name: string
  nameAr: string
  category: string
  categoryAr: string
  description: string
  descriptionAr: string
  steps: string[]
  stepsAr: string[]
  bestPractices: string[]
  bestPracticesAr: string[]
  commonChallenges: string[]
  commonChallengesAr: string[]
  successFactors: string[]
  successFactorsAr: string[]
}

interface AuditToolsTechniquesProps {
  isArabic: boolean
}

const auditTools: AuditTool[] = [
  {
    id: "interviews",
    name: "Interviews and Questionnaires",
    nameAr: "المقابلات والاستبيانات",
    category: "Data Collection",
    categoryAr: "جمع البيانات",
    description: "Interactive methods to gather information, opinions, and feedback from stakeholders",
    descriptionAr: "طرق تفاعلية لجمع المعلومات والآراء والتعليقات من أصحاب المصلحة",
    icon: <MessageSquare className="h-6 w-6" />,
    type: "manual",
    complexity: "low",
    effectiveness: 85,
    timeRequired: "2-4 hours per session",
    skillLevel: "beginner",
    applications: [
      "Stakeholder feedback collection",
      "Process understanding",
      "Control environment assessment",
      "Risk identification",
    ],
    applicationsAr: ["جمع تعليقات أصحاب المصلحة", "فهم العمليات", "تقييم بيئة الضوابط", "تحديد المخاطر"],
    benefits: ["Direct stakeholder engagement", "Qualitative insights", "Flexible and adaptable", "Cost-effective"],
    benefitsAr: ["مشاركة مباشرة لأصحاب المصلحة", "رؤى نوعية", "مرن وقابل للتكيف", "فعال من حيث التكلفة"],
    limitations: ["Subjective responses", "Time-intensive", "Potential bias", "Limited scalability"],
    limitationsAr: ["استجابات ذاتية", "كثيف الوقت", "تحيز محتمل", "قابلية محدودة للتوسع"],
  },
  {
    id: "observations",
    name: "Observations and Inspections",
    nameAr: "المراقبة والفحص",
    category: "Evidence Gathering",
    categoryAr: "جمع الأدلة",
    description: "Direct observation of system operations, processes, and controls in action",
    descriptionAr: "المراقبة المباشرة لعمليات النظام والعمليات والضوابط أثناء العمل",
    icon: <Eye className="h-6 w-6" />,
    type: "manual",
    complexity: "medium",
    effectiveness: 90,
    timeRequired: "1-3 hours per observation",
    skillLevel: "intermediate",
    applications: ["Process verification", "Control testing", "Compliance assessment", "Physical security evaluation"],
    applicationsAr: ["التحقق من العمليات", "اختبار الضوابط", "تقييم الامتثال", "تقييم الأمن المادي"],
    benefits: [
      "Real-time evidence",
      "Objective assessment",
      "Identifies actual practices",
      "Validates documented procedures",
    ],
    benefitsAr: ["أدلة في الوقت الفعلي", "تقييم موضوعي", "يحدد الممارسات الفعلية", "يتحقق من الإجراءات الموثقة"],
    limitations: ["Observer effect", "Limited time coverage", "Requires physical presence", "May miss exceptions"],
    limitationsAr: ["تأثير المراقب", "تغطية زمنية محدودة", "يتطلب حضور مادي", "قد يفوت الاستثناءات"],
  },
  {
    id: "data_analytics",
    name: "Data Analysis and Analytics",
    nameAr: "تحليل البيانات والتحليلات",
    category: "Analysis",
    categoryAr: "تحليل",
    description: "Statistical analysis and data visualization to identify patterns, trends, and anomalies",
    descriptionAr: "التحليل الإحصائي وتصور البيانات لتحديد الأنماط والاتجاهات والشذوذ",
    icon: <BarChart3 className="h-6 w-6" />,
    type: "automated",
    complexity: "high",
    effectiveness: 95,
    timeRequired: "4-8 hours setup, minutes for analysis",
    skillLevel: "advanced",
    applications: ["Anomaly detection", "Trend analysis", "Risk assessment", "Performance measurement"],
    applicationsAr: ["كشف الشذوذ", "تحليل الاتجاهات", "تقييم المخاطر", "قياس الأداء"],
    benefits: ["High accuracy", "Large data processing", "Objective results", "Repeatable analysis"],
    benefitsAr: ["دقة عالية", "معالجة بيانات كبيرة", "نتائج موضوعية", "تحليل قابل للتكرار"],
    limitations: [
      "Requires data quality",
      "Technical expertise needed",
      "Initial setup complexity",
      "May miss context",
    ],
    limitationsAr: ["يتطلب جودة البيانات", "يحتاج خبرة تقنية", "تعقيد الإعداد الأولي", "قد يفوت السياق"],
  },
  {
    id: "sampling",
    name: "Sample Testing and Selection",
    nameAr: "اختبار العينات والاختيار",
    category: "Testing",
    categoryAr: "اختبار",
    description: "Statistical sampling techniques to select representative elements for detailed examination",
    descriptionAr: "تقنيات أخذ العينات الإحصائية لاختيار عناصر تمثيلية للفحص التفصيلي",
    icon: <Target className="h-6 w-6" />,
    type: "hybrid",
    complexity: "medium",
    effectiveness: 80,
    timeRequired: "1-2 hours for selection, varies for testing",
    skillLevel: "intermediate",
    applications: ["Transaction testing", "Control testing", "Compliance verification", "Population analysis"],
    applicationsAr: ["اختبار المعاملات", "اختبار الضوابط", "التحقق من الامتثال", "تحليل المجتمع"],
    benefits: ["Efficient resource use", "Statistical validity", "Risk-based approach", "Scalable methodology"],
    benefitsAr: ["استخدام فعال للموارد", "صحة إحصائية", "نهج قائم على المخاطر", "منهجية قابلة للتوسع"],
    limitations: [
      "Sampling risk",
      "May not capture all issues",
      "Requires statistical knowledge",
      "Population assumptions",
    ],
    limitationsAr: ["مخاطر أخذ العينات", "قد لا يلتقط كل المشاكل", "يتطلب معرفة إحصائية", "افتراضات المجتمع"],
  },
  {
    id: "automated_tools",
    name: "Technology-Based Audit Tools",
    nameAr: "أدوات المراجعة القائمة على التكنولوجيا",
    category: "Technology",
    categoryAr: "تكنولوجيا",
    description: "Specialized software and automated tools for enhanced audit efficiency and accuracy",
    descriptionAr: "برامج متخصصة وأدوات آلية لتعزيز كفاءة ودقة المراجعة",
    icon: <Cpu className="h-6 w-6" />,
    type: "automated",
    complexity: "high",
    effectiveness: 92,
    timeRequired: "Setup varies, execution is fast",
    skillLevel: "advanced",
    applications: ["Continuous monitoring", "Data extraction", "Automated testing", "Report generation"],
    applicationsAr: ["المراقبة المستمرة", "استخراج البيانات", "الاختبار الآلي", "إنتاج التقارير"],
    benefits: ["High speed and accuracy", "Consistent results", "Comprehensive coverage", "Real-time monitoring"],
    benefitsAr: ["سرعة ودقة عالية", "نتائج متسقة", "تغطية شاملة", "مراقبة في الوقت الفعلي"],
    limitations: ["High initial cost", "Technical complexity", "Requires training", "System dependencies"],
    limitationsAr: ["تكلفة أولية عالية", "تعقيد تقني", "يتطلب تدريب", "تبعيات النظام"],
  },
  {
    id: "documentation_review",
    name: "Documentation Review and Analysis",
    nameAr: "مراجعة وتحليل الوثائق",
    category: "Review",
    categoryAr: "مراجعة",
    description: "Systematic examination of policies, procedures, and documentation for completeness and accuracy",
    descriptionAr: "الفحص المنهجي للسياسات والإجراءات والوثائق للاكتمال والدقة",
    icon: <FileText className="h-6 w-6" />,
    type: "manual",
    complexity: "low",
    effectiveness: 75,
    timeRequired: "2-6 hours per document set",
    skillLevel: "beginner",
    applications: ["Policy compliance", "Procedure adequacy", "Documentation completeness", "Regulatory alignment"],
    applicationsAr: ["امتثال السياسات", "كفاية الإجراءات", "اكتمال الوثائق", "التوافق التنظيمي"],
    benefits: ["Thorough examination", "Historical perspective", "Identifies gaps", "Cost-effective"],
    benefitsAr: ["فحص شامل", "منظور تاريخي", "يحدد الثغرات", "فعال من حيث التكلفة"],
    limitations: ["Static information", "May not reflect practice", "Time-consuming", "Document availability"],
    limitationsAr: ["معلومات ثابتة", "قد لا تعكس الممارسة", "يستغرق وقتاً طويلاً", "توفر الوثائق"],
  },
]

const auditTechniques: AuditTechnique[] = [
  {
    id: "risk_based_approach",
    name: "Risk-Based Audit Approach",
    nameAr: "نهج المراجعة القائم على المخاطر",
    category: "Methodology",
    categoryAr: "منهجية",
    description: "Prioritizing audit areas based on risk assessment to focus on critical systems and processes",
    descriptionAr: "ترتيب أولويات مجالات المراجعة بناءً على تقييم المخاطر للتركيز على الأنظمة والعمليات الحرجة",
    steps: [
      "Conduct comprehensive risk assessment",
      "Identify and prioritize high-risk areas",
      "Allocate audit resources accordingly",
      "Design targeted audit procedures",
      "Monitor and adjust based on findings",
    ],
    stepsAr: [
      "إجراء تقييم شامل للمخاطر",
      "تحديد وترتيب أولويات المناطق عالية المخاطر",
      "تخصيص موارد المراجعة وفقاً لذلك",
      "تصميم إجراءات مراجعة مستهدفة",
      "المراقبة والتعديل بناءً على النتائج",
    ],
    bestPractices: [
      "Use quantitative and qualitative risk factors",
      "Involve management in risk identification",
      "Regular risk assessment updates",
      "Document risk rationale clearly",
    ],
    bestPracticesAr: [
      "استخدام عوامل المخاطر الكمية والنوعية",
      "إشراك الإدارة في تحديد المخاطر",
      "تحديثات منتظمة لتقييم المخاطر",
      "توثيق منطق المخاطر بوضوح",
    ],
    commonChallenges: [
      "Incomplete risk identification",
      "Changing risk landscape",
      "Resource allocation conflicts",
      "Stakeholder resistance",
    ],
    commonChallengesAr: [
      "تحديد غير مكتمل للمخاطر",
      "تغيير مشهد المخاطر",
      "تضارب تخصيص الموارد",
      "مقاومة أصحاب المصلحة",
    ],
    successFactors: [
      "Strong risk assessment framework",
      "Management support",
      "Clear communication",
      "Continuous monitoring",
    ],
    successFactorsAr: ["إطار قوي لتقييم المخاطر", "دعم الإدارة", "تواصل واضح", "مراقبة مستمرة"],
  },
  {
    id: "continuous_monitoring",
    name: "Continuous Monitoring Technique",
    nameAr: "تقنية المراقبة المستمرة",
    category: "Monitoring",
    categoryAr: "مراقبة",
    description: "Implementing automated monitoring tools to proactively identify risks and compliance gaps",
    descriptionAr: "تطبيق أدوات المراقبة الآلية لتحديد المخاطر وثغرات الامتثال بشكل استباقي",
    steps: [
      "Define monitoring objectives and metrics",
      "Select appropriate monitoring tools",
      "Configure automated alerts and thresholds",
      "Establish response procedures",
      "Regular review and optimization",
    ],
    stepsAr: [
      "تحديد أهداف ومقاييس المراقبة",
      "اختيار أدوات المراقبة المناسبة",
      "تكوين التنبيهات والحدود الآلية",
      "وضع إجراءات الاستجابة",
      "المراجعة والتحسين المنتظم",
    ],
    bestPractices: [
      "Focus on key risk indicators",
      "Balance automation with human oversight",
      "Regular calibration of thresholds",
      "Integration with existing systems",
    ],
    bestPracticesAr: [
      "التركيز على مؤشرات المخاطر الرئيسية",
      "توازن الأتمتة مع الإشراف البشري",
      "معايرة منتظمة للحدود",
      "التكامل مع الأنظمة الموجودة",
    ],
    commonChallenges: ["Alert fatigue", "False positives", "System integration complexity", "Data quality issues"],
    commonChallengesAr: ["إرهاق التنبيهات", "إيجابيات كاذبة", "تعقيد تكامل النظام", "مشاكل جودة البيانات"],
    successFactors: [
      "Clear monitoring strategy",
      "Appropriate technology selection",
      "Skilled personnel",
      "Management commitment",
    ],
    successFactorsAr: ["استراتيجية مراقبة واضحة", "اختيار التكنولوجيا المناسبة", "موظفون مهرة", "التزام الإدارة"],
  },
  {
    id: "cross_functional_collaboration",
    name: "Cross-Functional Collaboration",
    nameAr: "التعاون متعدد الوظائف",
    category: "Collaboration",
    categoryAr: "تعاون",
    description: "Fostering collaboration between auditors and stakeholders for holistic system understanding",
    descriptionAr: "تعزيز التعاون بين المراجعين وأصحاب المصلحة لفهم شامل للنظام",
    steps: [
      "Identify key stakeholders",
      "Establish communication channels",
      "Define roles and responsibilities",
      "Create collaborative workflows",
      "Regular feedback and adjustment",
    ],
    stepsAr: [
      "تحديد أصحاب المصلحة الرئيسيين",
      "إنشاء قنوات التواصل",
      "تحديد الأدوار والمسؤوليات",
      "إنشاء سير عمل تعاوني",
      "التعليقات والتعديل المنتظم",
    ],
    bestPractices: [
      "Regular stakeholder meetings",
      "Clear communication protocols",
      "Shared documentation platforms",
      "Joint problem-solving sessions",
    ],
    bestPracticesAr: [
      "اجتماعات منتظمة لأصحاب المصلحة",
      "بروتوكولات تواصل واضحة",
      "منصات وثائق مشتركة",
      "جلسات حل المشاكل المشتركة",
    ],
    commonChallenges: [
      "Conflicting priorities",
      "Communication barriers",
      "Resource constraints",
      "Cultural differences",
    ],
    commonChallengesAr: ["أولويات متضاربة", "حواجز التواصل", "قيود الموارد", "اختلافات ثقافية"],
    successFactors: [
      "Strong leadership support",
      "Clear value proposition",
      "Effective communication",
      "Mutual respect and trust",
    ],
    successFactorsAr: ["دعم قيادي قوي", "عرض قيمة واضح", "تواصل فعال", "احترام وثقة متبادلة"],
  },
]

export function AuditToolsTechniques({ isArabic }: AuditToolsTechniquesProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getTypeColor = (type: string) => {
    switch (type) {
      case "automated":
        return "bg-blue-100 text-blue-800"
      case "manual":
        return "bg-green-100 text-green-800"
      case "hybrid":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "automated":
        return isArabic ? "آلي" : "Automated"
      case "manual":
        return isArabic ? "يدوي" : "Manual"
      case "hybrid":
        return isArabic ? "مختلط" : "Hybrid"
      default:
        return type
    }
  }

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

  const getComplexityText = (complexity: string) => {
    switch (complexity) {
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

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "advanced":
        return "bg-red-100 text-red-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "beginner":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSkillLevelText = (level: string) => {
    switch (level) {
      case "advanced":
        return isArabic ? "متقدم" : "Advanced"
      case "intermediate":
        return isArabic ? "متوسط" : "Intermediate"
      case "beginner":
        return isArabic ? "مبتدئ" : "Beginner"
      default:
        return level
    }
  }

  const filteredTools = auditTools.filter((tool) => {
    if (filterCategory !== "all" && tool.category !== filterCategory) return false
    if (filterType !== "all" && tool.type !== filterType) return false
    if (searchTerm && !tool.name.toLowerCase().includes(searchTerm.toLowerCase()) && !tool.nameAr.includes(searchTerm))
      return false
    return true
  })

  const averageEffectiveness = Math.round(
    auditTools.reduce((sum, tool) => sum + tool.effectiveness, 0) / auditTools.length,
  )
  const automatedTools = auditTools.filter((tool) => tool.type === "automated").length
  const manualTools = auditTools.filter((tool) => tool.type === "manual").length
  const hybridTools = auditTools.filter((tool) => tool.type === "hybrid").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Settings className="h-6 w-6 text-blue-600" />
              <span>{isArabic ? "أدوات وتقنيات المراجعة" : "Audit Tools and Techniques"}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isArabic ? "تصدير الأدوات" : "Export Tools"}
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isArabic ? "استيراد" : "Import"}
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            {isArabic
              ? "مجموعة شاملة من أدوات وتقنيات المراجعة لتعزيز فعالية وكفاءة عمليات المراجعة"
              : "Comprehensive collection of audit tools and techniques to enhance audit effectiveness and efficiency"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{auditTools.length}</p>
              <p className="text-sm text-gray-600">{isArabic ? "أدوات متاحة" : "Available Tools"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Cpu className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">{automatedTools}</p>
              <p className="text-sm text-gray-600">{isArabic ? "أدوات آلية" : "Automated Tools"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{averageEffectiveness}%</p>
              <p className="text-sm text-gray-600">{isArabic ? "متوسط الفعالية" : "Avg Effectiveness"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-600">{auditTechniques.length}</p>
              <p className="text-sm text-gray-600">{isArabic ? "تقنيات متقدمة" : "Advanced Techniques"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="tools" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tools">{isArabic ? "الأدوات" : "Tools"}</TabsTrigger>
          <TabsTrigger value="techniques">{isArabic ? "التقنيات" : "Techniques"}</TabsTrigger>
          <TabsTrigger value="best_practices">{isArabic ? "أفضل الممارسات" : "Best Practices"}</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={isArabic ? "البحث في الأدوات..." : "Search tools..."}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rtl:pr-10 rtl:pl-3"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    className="px-3 py-2 border rounded-md text-sm"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">{isArabic ? "كل الفئات" : "All Categories"}</option>
                    <option value="Data Collection">{isArabic ? "جمع البيانات" : "Data Collection"}</option>
                    <option value="Evidence Gathering">{isArabic ? "جمع الأدلة" : "Evidence Gathering"}</option>
                    <option value="Analysis">{isArabic ? "تحليل" : "Analysis"}</option>
                    <option value="Testing">{isArabic ? "اختبار" : "Testing"}</option>
                    <option value="Technology">{isArabic ? "تكنولوجيا" : "Technology"}</option>
                    <option value="Review">{isArabic ? "مراجعة" : "Review"}</option>
                  </select>
                  <select
                    className="px-3 py-2 border rounded-md text-sm"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">{isArabic ? "كل الأنواع" : "All Types"}</option>
                    <option value="manual">{isArabic ? "يدوي" : "Manual"}</option>
                    <option value="automated">{isArabic ? "آلي" : "Automated"}</option>
                    <option value="hybrid">{isArabic ? "مختلط" : "Hybrid"}</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{tool.icon}</div>
                      <div>
                        <h3 className="font-semibold">{isArabic ? tool.nameAr : tool.name}</h3>
                        <p className="text-sm text-gray-500">{tool.timeRequired}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={getTypeColor(tool.type)}>{getTypeText(tool.type)}</Badge>
                      <Badge className={getComplexityColor(tool.complexity)} variant="outline">
                        {getComplexityText(tool.complexity)}
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>{isArabic ? tool.descriptionAr : tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{isArabic ? "الفعالية" : "Effectiveness"}</span>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Progress value={tool.effectiveness} className="w-20 h-2" />
                        <span className="text-sm font-medium">{tool.effectiveness}%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{isArabic ? "مستوى المهارة" : "Skill Level"}</span>
                      <Badge className={getSkillLevelColor(tool.skillLevel)} variant="outline">
                        {getSkillLevelText(tool.skillLevel)}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">{isArabic ? "التطبيقات:" : "Applications:"}</h4>
                      <div className="flex flex-wrap gap-1">
                        {(isArabic ? tool.applicationsAr : tool.applications).slice(0, 3).map((app, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {app}
                          </Badge>
                        ))}
                        {tool.applications.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{tool.applications.length - 3} {isArabic ? "المزيد" : "more"}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 rtl:space-x-reverse pt-4">
                      <Button size="sm" className="flex-1" onClick={() => setSelectedTool(tool.id)}>
                        <Zap className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {isArabic ? "استخدام الأداة" : "Use Tool"}
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

        <TabsContent value="techniques" className="space-y-6">
          <div className="grid gap-6">
            {auditTechniques.map((technique) => (
              <Card key={technique.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{isArabic ? technique.nameAr : technique.name}</h3>
                      <Badge variant="outline" className="mt-1">
                        {isArabic ? technique.categoryAr : technique.category}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSelectedTechnique(technique.id)}>
                      <Eye className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                      {isArabic ? "عرض التفاصيل" : "View Details"}
                    </Button>
                  </CardTitle>
                  <CardDescription>{isArabic ? technique.descriptionAr : technique.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-sm mb-3">{isArabic ? "الخطوات الرئيسية:" : "Key Steps:"}</h4>
                      <ul className="space-y-2">
                        {(isArabic ? technique.stepsAr : technique.steps).slice(0, 3).map((step, index) => (
                          <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse text-sm">
                            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mt-0.5">
                              {index + 1}
                            </div>
                            <span>{step}</span>
                          </li>
                        ))}
                        {technique.steps.length > 3 && (
                          <li className="text-sm text-gray-500 ml-7 rtl:mr-7 rtl:ml-0">
                            +{technique.steps.length - 3} {isArabic ? "خطوات إضافية" : "more steps"}
                          </li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-3">{isArabic ? "أفضل الممارسات:" : "Best Practices:"}</h4>
                      <ul className="space-y-2">
                        {(isArabic ? technique.bestPracticesAr : technique.bestPractices)
                          .slice(0, 3)
                          .map((practice, index) => (
                            <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{practice}</span>
                            </li>
                          ))}
                        {technique.bestPractices.length > 3 && (
                          <li className="text-sm text-gray-500 ml-6 rtl:mr-6 rtl:ml-0">
                            +{technique.bestPractices.length - 3} {isArabic ? "ممارسات إضافية" : "more practices"}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="best_practices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>{isArabic ? "أفضل الممارسات العامة" : "General Best Practices"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">
                      {isArabic ? "التخطيط والإعداد" : "Planning and Preparation"}
                    </h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• {isArabic ? "تحديد أهداف واضحة ومحددة" : "Define clear and specific objectives"}</li>
                      <li>• {isArabic ? "إجراء تقييم شامل للمخاطر" : "Conduct comprehensive risk assessment"}</li>
                      <li>• {isArabic ? "تخصيص الموارد المناسبة" : "Allocate appropriate resources"}</li>
                      <li>• {isArabic ? "إنشاء فريق متنوع ومؤهل" : "Establish diverse and qualified team"}</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {isArabic ? "التنفيذ والمراقبة" : "Execution and Monitoring"}
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• {isArabic ? "اتباع منهجية منظمة" : "Follow systematic methodology"}</li>
                      <li>• {isArabic ? "توثيق جميع الإجراءات والنتائج" : "Document all procedures and findings"}</li>
                      <li>• {isArabic ? "المراقبة المستمرة للتقدم" : "Continuous progress monitoring"}</li>
                      <li>• {isArabic ? "التكيف مع التغييرات" : "Adapt to changes"}</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">
                      {isArabic ? "التقرير والمتابعة" : "Reporting and Follow-up"}
                    </h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• {isArabic ? "إعداد تقارير واضحة ومفصلة" : "Prepare clear and detailed reports"}</li>
                      <li>• {isArabic ? "تقديم توصيات قابلة للتنفيذ" : "Provide actionable recommendations"}</li>
                      <li>• {isArabic ? "متابعة تنفيذ الإجراءات التصحيحية" : "Follow up on corrective actions"}</li>
                      <li>• {isArabic ? "التحسين المستمر للعمليات" : "Continuous process improvement"}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span>{isArabic ? "التحديات الشائعة والحلول" : "Common Challenges and Solutions"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-red-500 bg-red-50">
                    <h4 className="font-semibold text-red-900 mb-2">
                      {isArabic ? "تعقيد الأنظمة" : "System Complexity"}
                    </h4>
                    <p className="text-sm text-red-800 mb-2">
                      {isArabic ? "الأنظمة الحديثة معقدة ومترابطة" : "Modern systems are complex and interconnected"}
                    </p>
                    <p className="text-xs text-red-700">
                      <strong>{isArabic ? "الحل:" : "Solution:"}</strong>{" "}
                      {isArabic ? "استخدام نهج مرحلي وأدوات التصور" : "Use phased approach and visualization tools"}
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                    <h4 className="font-semibold text-yellow-900 mb-2">
                      {isArabic ? "صعوبة الوصول للبيانات" : "Data Access Difficulties"}
                    </h4>
                    <p className="text-sm text-yellow-800 mb-2">
                      {isArabic
                        ? "البيانات مبعثرة أو غير موثقة بشكل صحيح"
                        : "Data is scattered or not properly documented"}
                    </p>
                    <p className="text-xs text-yellow-700">
                      <strong>{isArabic ? "الحل:" : "Solution:"}</strong>{" "}
                      {isArabic ? "التخطيط المسبق وإشراك أصحاب المصلحة" : "Early planning and stakeholder engagement"}
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {isArabic ? "مقاومة التغيير" : "Resistance to Change"}
                    </h4>
                    <p className="text-sm text-blue-800 mb-2">
                      {isArabic
                        ? "المقاومة لتنفيذ التوصيات أو التغييرات"
                        : "Resistance to implementing recommendations or changes"}
                    </p>
                    <p className="text-xs text-blue-700">
                      <strong>{isArabic ? "الحل:" : "Solution:"}</strong>{" "}
                      {isArabic
                        ? "التواصل الفعال وإظهار القيمة المضافة"
                        : "Effective communication and demonstrating added value"}
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold text-green-900 mb-2">
                      {isArabic ? "قيود الموارد" : "Resource Constraints"}
                    </h4>
                    <p className="text-sm text-green-800 mb-2">
                      {isArabic
                        ? "محدودية الوقت والميزانية والموظفين المهرة"
                        : "Limited time, budget, and skilled personnel"}
                    </p>
                    <p className="text-xs text-green-700">
                      <strong>{isArabic ? "الحل:" : "Solution:"}</strong>{" "}
                      {isArabic ? "ترتيب الأولويات واستخدام الأتمتة" : "Prioritization and automation utilization"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span>{isArabic ? "مؤشرات الأداء الرئيسية" : "Key Performance Indicators"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
                  <div className="text-sm text-blue-800">{isArabic ? "دقة النتائج" : "Result Accuracy"}</div>
                  <div className="text-xs text-blue-600 mt-1">
                    {isArabic ? "مقارنة بالمعيار 90%" : "vs 90% benchmark"}
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">78%</div>
                  <div className="text-sm text-green-800">{isArabic ? "كفاءة الوقت" : "Time Efficiency"}</div>
                  <div className="text-xs text-green-600 mt-1">
                    {isArabic ? "توفير 22% من الوقت" : "22% time savings"}
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">92%</div>
                  <div className="text-sm text-purple-800">{isArabic ? "رضا العملاء" : "Client Satisfaction"}</div>
                  <div className="text-xs text-purple-600 mt-1">
                    {isArabic ? "تحسن 8% عن العام الماضي" : "8% improvement YoY"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tool Detail Dialog */}
      {selectedTool && (
        <Dialog open={!!selectedTool} onOpenChange={() => setSelectedTool(null)}>
          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                {auditTools.find((t) => t.id === selectedTool)?.icon}
                <span>
                  {isArabic
                    ? auditTools.find((t) => t.id === selectedTool)?.nameAr
                    : auditTools.find((t) => t.id === selectedTool)?.name}
                </span>
              </DialogTitle>
            </DialogHeader>
            {auditTools
              .filter((tool) => tool.id === selectedTool)
              .map((tool) => (
                <div key={tool.id} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">{isArabic ? "الفوائد:" : "Benefits:"}</h3>
                      <ul className="space-y-2">
                        {(isArabic ? tool.benefitsAr : tool.benefits).map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">{isArabic ? "القيود:" : "Limitations:"}</h3>
                      <ul className="space-y-2">
                        {(isArabic ? tool.limitationsAr : tool.limitations).map((limitation, index) => (
                          <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">{isArabic ? "التطبيقات:" : "Applications:"}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {(isArabic ? tool.applicationsAr : tool.applications).map((app, index) => (
                        <Badge key={index} variant="secondary" className="justify-start">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" onClick={() => setSelectedTool(null)}>
                      {isArabic ? "إغلاق" : "Close"}
                    </Button>
                    <Button>
                      <Zap className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {isArabic ? "استخدام الأداة" : "Use Tool"}
                    </Button>
                  </div>
                </div>
              ))}
          </DialogContent>
        </Dialog>
      )}

      {/* Technique Detail Dialog */}
      {selectedTechnique && (
        <Dialog open={!!selectedTechnique} onOpenChange={() => setSelectedTechnique(null)}>
          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isArabic
                  ? auditTechniques.find((t) => t.id === selectedTechnique)?.nameAr
                  : auditTechniques.find((t) => t.id === selectedTechnique)?.name}
              </DialogTitle>
            </DialogHeader>
            {auditTechniques
              .filter((technique) => technique.id === selectedTechnique)
              .map((technique) => (
                <div key={technique.id} className="space-y-6">
                  <Tabs defaultValue="steps" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="steps">{isArabic ? "الخطوات" : "Steps"}</TabsTrigger>
                      <TabsTrigger value="practices">{isArabic ? "أفضل الممارسات" : "Best Practices"}</TabsTrigger>
                      <TabsTrigger value="challenges">{isArabic ? "التحديات" : "Challenges"}</TabsTrigger>
                      <TabsTrigger value="success">{isArabic ? "عوامل النجاح" : "Success Factors"}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="steps">
                      <div className="space-y-3">
                        {(isArabic ? technique.stepsAr : technique.steps).map((step, index) => (
                          <div key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1 pt-1">
                              <p className="text-sm">{step}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="practices">
                      <div className="space-y-2">
                        {(isArabic ? technique.bestPracticesAr : technique.bestPractices).map((practice, index) => (
                          <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{practice}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="challenges">
                      <div className="space-y-2">
                        {(isArabic ? technique.commonChallengesAr : technique.commonChallenges).map(
                          (challenge, index) => (
                            <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                              <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{challenge}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="success">
                      <div className="space-y-2">
                        {(isArabic ? technique.successFactorsAr : technique.successFactors).map((factor, index) => (
                          <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                            <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" onClick={() => setSelectedTechnique(null)}>
                      {isArabic ? "إغلاق" : "Close"}
                    </Button>
                    <Button>
                      <Zap className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {isArabic ? "تطبيق التقنية" : "Apply Technique"}
                    </Button>
                  </div>
                </div>
              ))}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
