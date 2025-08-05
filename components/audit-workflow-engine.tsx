"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Users,
  Target,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Plus,
  Edit,
  Eye,
  ArrowRight,
} from "lucide-react"

interface AuditWorkflow {
  id: string
  title: string
  titleAr: string
  auditee: string
  auditor: string
  reviewer: string
  type: "financial" | "it" | "operational" | "compliance" | "quality" | "environmental"
  riskLevel: "low" | "medium" | "high" | "critical"
  status: "initiation" | "planning" | "execution" | "review" | "reporting" | "follow_up" | "completed"
  progress: number
  startDate: string
  dueDate: string
  completionDate?: string
  objectives: string[]
  objectivesAr: string[]
  findings: AuditFinding[]
  issues: AuditIssue[]
  evidence: string[]
  team: string[]
  estimatedHours: number
  actualHours: number
}

interface AuditFinding {
  id: string
  description: string
  descriptionAr: string
  severity: "low" | "medium" | "high" | "critical"
  category: string
  categoryAr: string
  evidence: string[]
  recommendation: string
  recommendationAr: string
  status: "open" | "in_progress" | "resolved"
  assignee: string
  dueDate: string
}

interface AuditIssue {
  id: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  severity: "low" | "medium" | "high" | "critical"
  rootCause: string
  rootCauseAr: string
  recommendation: string
  recommendationAr: string
  owner: string
  status: "open" | "in_progress" | "resolved"
  dueDate: string
  createdDate: string
}

interface AuditWorkflowEngineProps {
  isArabic: boolean
}

const mockAuditWorkflows: AuditWorkflow[] = [
  {
    id: "AUD-2024-001",
    title: "Network Security Audit - XYZ Bank",
    titleAr: "مراجعة أمان الشبكة - بنك XYZ",
    auditee: "XYZ Bank IT Department",
    auditor: "Ahmed Hassan",
    reviewer: "Senior Manager",
    type: "it",
    riskLevel: "high",
    status: "reporting",
    progress: 85,
    startDate: "2024-01-15",
    dueDate: "2024-02-15",
    objectives: [
      "Assess network security controls",
      "Evaluate firewall configurations",
      "Review access management procedures",
      "Test incident response capabilities",
    ],
    objectivesAr: [
      "تقييم ضوابط أمان الشبكة",
      "تقييم تكوينات الجدار الناري",
      "مراجعة إجراءات إدارة الوصول",
      "اختبار قدرات الاستجابة للحوادث",
    ],
    findings: [
      {
        id: "F001",
        description: "Critical firewall misconfiguration allowing unauthorized access",
        descriptionAr: "خطأ حرج في تكوين الجدار الناري يسمح بالوصول غير المصرح",
        severity: "critical",
        category: "Security",
        categoryAr: "الأمان",
        evidence: ["Firewall logs", "Configuration files", "Penetration test results"],
        recommendation: "Immediately reconfigure firewall rules and implement proper access controls",
        recommendationAr: "إعادة تكوين قواعد الجدار الناري فوراً وتطبيق ضوابط الوصول المناسبة",
        status: "open",
        assignee: "IT Security Team",
        dueDate: "2024-02-01",
      },
      {
        id: "F002",
        description: "Missing multi-factor authentication for external admin access",
        descriptionAr: "عدم وجود المصادقة متعددة العوامل للوصول الإداري الخارجي",
        severity: "high",
        category: "Access Control",
        categoryAr: "التحكم في الوصول",
        evidence: ["Access logs", "Authentication policies", "User accounts review"],
        recommendation: "Implement MFA for all external administrative access",
        recommendationAr: "تطبيق المصادقة متعددة العوامل لجميع الوصول الإداري الخارجي",
        status: "in_progress",
        assignee: "System Administrator",
        dueDate: "2024-02-10",
      },
    ],
    issues: [
      {
        id: "I001",
        title: "Inadequate Network Monitoring",
        titleAr: "مراقبة الشبكة غير الكافية",
        description: "Current network monitoring tools lack comprehensive coverage",
        descriptionAr: "أدوات مراقبة الشبكة الحالية تفتقر للتغطية الشاملة",
        severity: "medium",
        rootCause: "Outdated monitoring infrastructure and insufficient tool integration",
        rootCauseAr: "البنية التحتية للمراقبة قديمة وعدم كفاية تكامل الأدوات",
        recommendation: "Upgrade monitoring tools and implement centralized SIEM solution",
        recommendationAr: "ترقية أدوات المراقبة وتطبيق حل SIEM مركزي",
        owner: "IT Operations Manager",
        status: "open",
        dueDate: "2024-03-01",
        createdDate: "2024-01-20",
      },
    ],
    evidence: ["Network diagrams", "Security policies", "Log files", "Interview notes"],
    team: ["Ahmed Hassan", "Fatima Ali", "Mohamed Ibrahim"],
    estimatedHours: 120,
    actualHours: 102,
  },
  {
    id: "AUD-2024-002",
    title: "Financial Controls Review - ABC Manufacturing",
    titleAr: "مراجعة الضوابط المالية - شركة ABC للتصنيع",
    auditee: "ABC Manufacturing Finance Department",
    auditor: "Sara Ibrahim",
    reviewer: "Partner",
    type: "financial",
    riskLevel: "medium",
    status: "execution",
    progress: 60,
    startDate: "2024-01-20",
    dueDate: "2024-02-20",
    objectives: [
      "Review revenue recognition processes",
      "Test accounts payable controls",
      "Evaluate cash management procedures",
      "Assess financial reporting accuracy",
    ],
    objectivesAr: [
      "مراجعة عمليات إقرار الإيرادات",
      "اختبار ضوابط الحسابات الدائنة",
      "تقييم إجراءات إدارة النقدية",
      "تقييم دقة التقارير المالية",
    ],
    findings: [],
    issues: [],
    evidence: ["Financial statements", "Transaction samples", "Control documentation"],
    team: ["Sara Ibrahim", "Omar Khalil"],
    estimatedHours: 80,
    actualHours: 48,
  },
]

const workflowSteps = [
  {
    id: "initiation",
    name: "Initiation",
    nameAr: "البدء",
    description: "Define audit scope, objectives, and team",
    descriptionAr: "تحديد نطاق المراجعة والأهداف والفريق",
    activities: [
      "Create audit charter",
      "Assign audit team",
      "Define scope and objectives",
      "Identify key stakeholders",
    ],
    activitiesAr: [
      "إنشاء ميثاق المراجعة",
      "تعيين فريق المراجعة",
      "تحديد النطاق والأهداف",
      "تحديد أصحاب المصلحة الرئيسيين",
    ],
    deliverables: ["Audit Charter", "Team Assignment", "Stakeholder Matrix"],
    deliverablesAr: ["ميثاق المراجعة", "تعيين الفريق", "مصفوفة أصحاب المصلحة"],
  },
  {
    id: "planning",
    name: "Planning",
    nameAr: "التخطيط",
    description: "Risk assessment, resource allocation, and audit program development",
    descriptionAr: "تقييم المخاطر وتخصيص الموارد وتطوير برنامج المراجعة",
    activities: ["Conduct risk assessment", "Develop audit program", "Allocate resources", "Create timeline"],
    activitiesAr: ["إجراء تقييم المخاطر", "تطوير برنامج المراجعة", "تخصيص الموارد", "إنشاء الجدول الزمني"],
    deliverables: ["Risk Assessment", "Audit Program", "Resource Plan", "Timeline"],
    deliverablesAr: ["تقييم المخاطر", "برنامج المراجعة", "خطة الموارد", "الجدول الزمني"],
  },
  {
    id: "execution",
    name: "Execution",
    nameAr: "التنفيذ",
    description: "Perform fieldwork, gather evidence, and test controls",
    descriptionAr: "تنفيذ العمل الميداني وجمع الأدلة واختبار الضوابط",
    activities: ["Conduct fieldwork", "Gather audit evidence", "Test internal controls", "Document findings"],
    activitiesAr: ["إجراء العمل الميداني", "جمع أدلة المراجعة", "اختبار الضوابط الداخلية", "توثيق النتائج"],
    deliverables: ["Evidence Files", "Test Results", "Findings Log", "Working Papers"],
    deliverablesAr: ["ملفات الأدلة", "نتائج الاختبارات", "سجل النتائج", "أوراق العمل"],
  },
  {
    id: "review",
    name: "Review",
    nameAr: "المراجعة",
    description: "Internal QA, issue validation, and management responses",
    descriptionAr: "ضمان الجودة الداخلي والتحقق من القضايا وردود الإدارة",
    activities: ["Review findings", "Validate issues", "Obtain management responses", "Quality assurance check"],
    activitiesAr: ["مراجعة النتائج", "التحقق من القضايا", "الحصول على ردود الإدارة", "فحص ضمان الجودة"],
    deliverables: ["Review Notes", "Management Responses", "QA Checklist", "Issue Register"],
    deliverablesAr: ["ملاحظات المراجعة", "ردود الإدارة", "قائمة ضمان الجودة", "سجل القضايا"],
  },
  {
    id: "reporting",
    name: "Reporting",
    nameAr: "التقرير",
    description: "Draft, finalize, and submit audit reports",
    descriptionAr: "صياغة وإنهاء وتقديم تقارير المراجعة",
    activities: ["Draft audit report", "Review and finalize", "Submit to stakeholders", "Present findings"],
    activitiesAr: ["صياغة تقرير المراجعة", "المراجعة والإنهاء", "التقديم لأصحاب المصلحة", "عرض النتائج"],
    deliverables: ["Draft Report", "Final Report", "Executive Summary", "Presentation"],
    deliverablesAr: ["مسودة التقرير", "التقرير النهائي", "الملخص التنفيذي", "العرض التقديمي"],
  },
  {
    id: "follow_up",
    name: "Follow-Up",
    nameAr: "المتابعة",
    description: "Track implementation of corrective actions",
    descriptionAr: "تتبع تنفيذ الإجراءات التصحيحية",
    activities: ["Track action plans", "Monitor implementation", "Verify completion", "Update status"],
    activitiesAr: ["تتبع خطط العمل", "مراقبة التنفيذ", "التحقق من الإنجاز", "تحديث الحالة"],
    deliverables: ["Action Tracker", "Status Reports", "Completion Certificates", "Closure Report"],
    deliverablesAr: ["متتبع الإجراءات", "تقارير الحالة", "شهادات الإنجاز", "تقرير الإغلاق"],
  },
]

export function AuditWorkflowEngine({ isArabic }: AuditWorkflowEngineProps) {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterRisk, setFilterRisk] = useState<string>("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "reporting":
        return "bg-blue-100 text-blue-800"
      case "execution":
        return "bg-purple-100 text-purple-800"
      case "review":
        return "bg-orange-100 text-orange-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
      case "initiation":
        return "bg-gray-100 text-gray-800"
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

  const getStatusText = (status: string) => {
    const statusMap: Record<string, { en: string; ar: string }> = {
      initiation: { en: "Initiation", ar: "البدء" },
      planning: { en: "Planning", ar: "التخطيط" },
      execution: { en: "Execution", ar: "التنفيذ" },
      review: { en: "Review", ar: "المراجعة" },
      reporting: { en: "Reporting", ar: "التقرير" },
      follow_up: { en: "Follow-Up", ar: "المتابعة" },
      completed: { en: "Completed", ar: "مكتمل" },
    }
    return isArabic ? statusMap[status]?.ar || status : statusMap[status]?.en || status
  }

  const getRiskText = (risk: string) => {
    const riskMap: Record<string, { en: string; ar: string }> = {
      low: { en: "Low", ar: "منخفض" },
      medium: { en: "Medium", ar: "متوسط" },
      high: { en: "High", ar: "عالي" },
      critical: { en: "Critical", ar: "حرج" },
    }
    return isArabic ? riskMap[risk]?.ar || risk : riskMap[risk]?.en || risk
  }

  const getTypeText = (type: string) => {
    const typeMap: Record<string, { en: string; ar: string }> = {
      financial: { en: "Financial", ar: "مالي" },
      it: { en: "IT", ar: "تقنية المعلومات" },
      operational: { en: "Operational", ar: "تشغيلي" },
      compliance: { en: "Compliance", ar: "امتثال" },
      quality: { en: "Quality", ar: "جودة" },
      environmental: { en: "Environmental", ar: "بيئي" },
    }
    return isArabic ? typeMap[type]?.ar || type : typeMap[type]?.en || type
  }

  const filteredWorkflows = mockAuditWorkflows.filter((workflow) => {
    if (filterStatus !== "all" && workflow.status !== filterStatus) return false
    if (filterType !== "all" && workflow.type !== filterType) return false
    if (filterRisk !== "all" && workflow.riskLevel !== filterRisk) return false
    return true
  })

  // Dashboard statistics
  const totalAudits = mockAuditWorkflows.length
  const completedAudits = mockAuditWorkflows.filter((w) => w.status === "completed").length
  const overdueAudits = mockAuditWorkflows.filter(
    (w) => new Date(w.dueDate) < new Date() && w.status !== "completed",
  ).length
  const highRiskIssues = mockAuditWorkflows.reduce(
    (acc, w) => acc + w.findings.filter((f) => f.severity === "critical" || f.severity === "high").length,
    0,
  )

  // Chart data
  const statusData = [
    {
      name: isArabic ? "البدء" : "Initiation",
      value: mockAuditWorkflows.filter((w) => w.status === "initiation").length,
    },
    {
      name: isArabic ? "التخطيط" : "Planning",
      value: mockAuditWorkflows.filter((w) => w.status === "planning").length,
    },
    {
      name: isArabic ? "التنفيذ" : "Execution",
      value: mockAuditWorkflows.filter((w) => w.status === "execution").length,
    },
    { name: isArabic ? "المراجعة" : "Review", value: mockAuditWorkflows.filter((w) => w.status === "review").length },
    {
      name: isArabic ? "التقرير" : "Reporting",
      value: mockAuditWorkflows.filter((w) => w.status === "reporting").length,
    },
    {
      name: isArabic ? "المتابعة" : "Follow-Up",
      value: mockAuditWorkflows.filter((w) => w.status === "follow_up").length,
    },
    { name: isArabic ? "مكتمل" : "Completed", value: completedAudits },
  ]

  const riskData = [
    {
      name: isArabic ? "منخفض" : "Low",
      value: mockAuditWorkflows.filter((w) => w.riskLevel === "low").length,
      color: "#10B981",
    },
    {
      name: isArabic ? "متوسط" : "Medium",
      value: mockAuditWorkflows.filter((w) => w.riskLevel === "medium").length,
      color: "#F59E0B",
    },
    {
      name: isArabic ? "عالي" : "High",
      value: mockAuditWorkflows.filter((w) => w.riskLevel === "high").length,
      color: "#EF4444",
    },
    {
      name: isArabic ? "حرج" : "Critical",
      value: mockAuditWorkflows.filter((w) => w.riskLevel === "critical").length,
      color: "#DC2626",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isArabic ? "محرك سير عمل المراجعة" : "Audit Workflow Engine"}
          </h2>
          <p className="text-gray-600">
            {isArabic ? "إدارة وتتبع جميع عمليات المراجعة" : "Manage and track all audit processes"}
          </p>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {isArabic ? "تصدير" : "Export"}
          </Button>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isArabic ? "مراجعة جديدة" : "New Audit"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{isArabic ? "إنشاء مراجعة جديدة" : "Create New Audit"}</DialogTitle>
                <DialogDescription>
                  {isArabic
                    ? "املأ التفاصيل لبدء عملية مراجعة جديدة"
                    : "Fill in the details to start a new audit process"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">{isArabic ? "العنوان" : "Title"}</Label>
                  <Input id="title" placeholder={isArabic ? "عنوان المراجعة" : "Audit title"} />
                </div>
                <div>
                  <Label htmlFor="type">{isArabic ? "النوع" : "Type"}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={isArabic ? "اختر النوع" : "Select type"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">{isArabic ? "مالي" : "Financial"}</SelectItem>
                      <SelectItem value="it">{isArabic ? "تقنية المعلومات" : "IT"}</SelectItem>
                      <SelectItem value="operational">{isArabic ? "تشغيلي" : "Operational"}</SelectItem>
                      <SelectItem value="compliance">{isArabic ? "امتثال" : "Compliance"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="auditee">{isArabic ? "الجهة المراجعة" : "Auditee"}</Label>
                  <Input id="auditee" placeholder={isArabic ? "اسم الجهة" : "Entity name"} />
                </div>
                <div>
                  <Label htmlFor="risk">{isArabic ? "مستوى المخاطر" : "Risk Level"}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={isArabic ? "اختر المستوى" : "Select level"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">{isArabic ? "منخفض" : "Low"}</SelectItem>
                      <SelectItem value="medium">{isArabic ? "متوسط" : "Medium"}</SelectItem>
                      <SelectItem value="high">{isArabic ? "عالي" : "High"}</SelectItem>
                      <SelectItem value="critical">{isArabic ? "حرج" : "Critical"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="objectives">{isArabic ? "الأهداف" : "Objectives"}</Label>
                  <Textarea id="objectives" placeholder={isArabic ? "أهداف المراجعة" : "Audit objectives"} />
                </div>
              </div>
              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  {isArabic ? "إلغاء" : "Cancel"}
                </Button>
                <Button onClick={() => setShowCreateDialog(false)}>{isArabic ? "إنشاء" : "Create"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Dashboard KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{isArabic ? "إجمالي المراجعات" : "Total Audits"}</p>
                <p className="text-3xl font-bold text-gray-900">{totalAudits}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12%</span>
                </div>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{isArabic ? "مكتملة" : "Completed"}</p>
                <p className="text-3xl font-bold text-gray-900">{completedAudits}</p>
                <p className="text-sm text-gray-500">
                  {Math.round((completedAudits / totalAudits) * 100)}% {isArabic ? "من الإجمالي" : "of total"}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{isArabic ? "متأخرة" : "Overdue"}</p>
                <p className="text-3xl font-bold text-gray-900">{overdueAudits}</p>
                <div className="flex items-center mt-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">{isArabic ? "تحتاج انتباه" : "Need attention"}</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {isArabic ? "قضايا عالية المخاطر" : "High Risk Issues"}
                </p>
                <p className="text-3xl font-bold text-gray-900">{highRiskIssues}</p>
                <p className="text-sm text-gray-500">{isArabic ? "تتطلب إجراء" : "Require action"}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{isArabic ? "توزيع حالات المراجعة" : "Audit Status Distribution"}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: isArabic ? "العدد" : "Count", color: "hsl(var(--chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isArabic ? "توزيع المخاطر" : "Risk Distribution"}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: isArabic ? "العدد" : "Count", color: "hsl(var(--chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{isArabic ? "المراجعات النشطة" : "Active Audits"}</span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Filter className="h-4 w-4" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isArabic ? "كل الحالات" : "All Status"}</SelectItem>
                  <SelectItem value="initiation">{isArabic ? "البدء" : "Initiation"}</SelectItem>
                  <SelectItem value="planning">{isArabic ? "التخطيط" : "Planning"}</SelectItem>
                  <SelectItem value="execution">{isArabic ? "التنفيذ" : "Execution"}</SelectItem>
                  <SelectItem value="review">{isArabic ? "المراجعة" : "Review"}</SelectItem>
                  <SelectItem value="reporting">{isArabic ? "التقرير" : "Reporting"}</SelectItem>
                  <SelectItem value="follow_up">{isArabic ? "المتابعة" : "Follow-Up"}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isArabic ? "كل الأنواع" : "All Types"}</SelectItem>
                  <SelectItem value="financial">{isArabic ? "مالي" : "Financial"}</SelectItem>
                  <SelectItem value="it">{isArabic ? "تقنية المعلومات" : "IT"}</SelectItem>
                  <SelectItem value="operational">{isArabic ? "تشغيلي" : "Operational"}</SelectItem>
                  <SelectItem value="compliance">{isArabic ? "امتثال" : "Compliance"}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isArabic ? "كل المخاطر" : "All Risks"}</SelectItem>
                  <SelectItem value="low">{isArabic ? "منخفض" : "Low"}</SelectItem>
                  <SelectItem value="medium">{isArabic ? "متوسط" : "Medium"}</SelectItem>
                  <SelectItem value="high">{isArabic ? "عالي" : "High"}</SelectItem>
                  <SelectItem value="critical">{isArabic ? "حرج" : "Critical"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredWorkflows.map((workflow) => (
              <Card key={workflow.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {isArabic ? workflow.titleAr : workflow.title}
                        </h4>
                        <Badge className={getStatusColor(workflow.status)}>{getStatusText(workflow.status)}</Badge>
                        <Badge className={getRiskColor(workflow.riskLevel)}>{getRiskText(workflow.riskLevel)}</Badge>
                        <Badge variant="outline">{getTypeText(workflow.type)}</Badge>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{workflow.auditor}</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{workflow.dueDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>
                            {workflow.actualHours}h / {workflow.estimatedHours}h
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                          <Target className="h-4 w-4" />
                          <span>
                            {workflow.findings.length} {isArabic ? "نتائج" : "findings"}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>{isArabic ? "التقدم" : "Progress"}</span>
                          <span>{workflow.progress}%</span>
                        </div>
                        <Progress value={workflow.progress} className="h-2" />
                      </div>

                      {workflow.findings.length > 0 && (
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <h5 className="font-medium text-orange-900 mb-2 flex items-center space-x-1 rtl:space-x-reverse">
                            <AlertTriangle className="h-4 w-4" />
                            <span>{isArabic ? "النتائج الرئيسية:" : "Key Findings:"}</span>
                          </h5>
                          <ul className="text-sm text-orange-800 space-y-1">
                            {workflow.findings.slice(0, 2).map((finding) => (
                              <li key={finding.id} className="flex items-start space-x-2 rtl:space-x-reverse">
                                <span className="text-orange-600">•</span>
                                <span>{isArabic ? finding.descriptionAr : finding.description}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button variant="outline" size="sm" onClick={() => setSelectedWorkflow(workflow.id)}>
                        <Eye className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {isArabic ? "عرض" : "View"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {isArabic ? "تعديل" : "Edit"}
                      </Button>
                      {workflow.status !== "completed" && (
                        <Button size="sm">
                          <ArrowRight className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          {isArabic ? "التالي" : "Next"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Steps */}
      <Card>
        <CardHeader>
          <CardTitle>{isArabic ? "خطوات سير العمل" : "Workflow Steps"}</CardTitle>
          <CardDescription>
            {isArabic ? "المراحل الأساسية لعملية المراجعة" : "Key stages of the audit process"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step, index) => (
              <Card key={step.id} className="border-l-4 border-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">{isArabic ? step.nameAr : step.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{isArabic ? step.descriptionAr : step.description}</p>
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium text-gray-700 uppercase">
                      {isArabic ? "الأنشطة:" : "Activities:"}
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {(isArabic ? step.activitiesAr : step.activities).map((activity, actIndex) => (
                        <li key={actIndex} className="flex items-start space-x-1 rtl:space-x-reverse">
                          <span className="text-blue-500">•</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <h5 className="text-xs font-medium text-gray-700 uppercase mb-1">
                      {isArabic ? "المخرجات:" : "Deliverables:"}
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {(isArabic ? step.deliverablesAr : step.deliverables).map((deliverable, delIndex) => (
                        <Badge key={delIndex} variant="secondary" className="text-xs">
                          {deliverable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
