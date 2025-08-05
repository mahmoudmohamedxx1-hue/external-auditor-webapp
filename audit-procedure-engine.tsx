"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Zap,
  CheckCircle,
  Clock,
  User,
  FileText,
  AlertTriangle,
  Target,
  Brain,
  Settings,
  Play,
  Pause,
} from "lucide-react"

interface AuditProcedure {
  id: string
  name: string
  nameAr: string
  category: string
  categoryAr: string
  description: string
  descriptionAr: string
  steps: AuditStep[]
  estimatedHours: number
  actualHours: number
  riskLevel: "low" | "medium" | "high" | "critical"
  status: "not_started" | "in_progress" | "completed" | "on_hold"
  assignee: string
  reviewer: string
  dueDate: string
  completionDate?: string
  aiRecommendations: string[]
  aiRecommendationsAr: string[]
  evidence: string[]
  findings: string[]
  findingsAr: string[]
}

interface AuditStep {
  id: string
  description: string
  descriptionAr: string
  completed: boolean
  aiAssisted: boolean
  estimatedMinutes: number
  actualMinutes: number
  notes: string
  notesAr: string
  evidence: string[]
}

interface AuditProcedureEngineProps {
  isArabic: boolean
}

const mockAuditProcedures: AuditProcedure[] = [
  {
    id: "AP001",
    name: "Revenue Recognition Testing",
    nameAr: "اختبار إقرار الإيرادات",
    category: "Revenue",
    categoryAr: "الإيرادات",
    description: "Comprehensive testing of revenue recognition policies and procedures",
    descriptionAr: "اختبار شامل لسياسات وإجراءات إقرار الإيرادات",
    steps: [
      {
        id: "S001",
        description: "Review revenue recognition policy documentation",
        descriptionAr: "مراجعة وثائق سياسة إقرار الإيرادات",
        completed: true,
        aiAssisted: false,
        estimatedMinutes: 60,
        actualMinutes: 45,
        notes: "Policy aligns with EAS standards",
        notesAr: "السياسة متوافقة مع معايير المحاسبة المصرية",
        evidence: ["Policy document", "Board resolution"],
      },
      {
        id: "S002",
        description: "Perform AI-powered transaction analysis",
        descriptionAr: "إجراء تحليل المعاملات بالذكاء الاصطناعي",
        completed: true,
        aiAssisted: true,
        estimatedMinutes: 120,
        actualMinutes: 90,
        notes: "AI detected 3 potential anomalies requiring investigation",
        notesAr: "اكتشف الذكاء الاصطناعي 3 شذوذات محتملة تتطلب التحقيق",
        evidence: ["AI analysis report", "Transaction sample"],
      },
      {
        id: "S003",
        description: "Test contract milestone recognition",
        descriptionAr: "اختبار إقرار معالم العقد",
        completed: false,
        aiAssisted: true,
        estimatedMinutes: 180,
        actualMinutes: 0,
        notes: "",
        notesAr: "",
        evidence: [],
      },
    ],
    estimatedHours: 8,
    actualHours: 2.25,
    riskLevel: "high",
    status: "in_progress",
    assignee: "Ahmed Hassan",
    reviewer: "Senior Manager",
    dueDate: "2024-02-15",
    aiRecommendations: [
      "Focus on Q4 transactions with unusual patterns",
      "Validate percentage-of-completion calculations",
      "Review related party revenue transactions",
    ],
    aiRecommendationsAr: [
      "التركيز على معاملات الربع الرابع ذات الأنماط غير العادية",
      "التحقق من حسابات نسبة الإنجاز",
      "مراجعة معاملات الإيرادات مع الأطراف ذات العلاقة",
    ],
    evidence: ["Revenue register", "Contract files", "AI analysis"],
    findings: ["Potential revenue recognition timing issue in Q4"],
    findingsAr: ["مشكلة محتملة في توقيت إقرار الإيرادات في الربع الرابع"],
  },
  {
    id: "AP002",
    name: "Accounts Receivable Confirmation",
    nameAr: "تأكيد الذمم المدينة",
    category: "Assets",
    categoryAr: "الأصول",
    description: "External confirmation of accounts receivable balances",
    descriptionAr: "التأكيد الخارجي لأرصدة الذمم المدينة",
    steps: [
      {
        id: "S004",
        description: "Select confirmation sample using AI stratification",
        descriptionAr: "اختيار عينة التأكيد باستخدام التقسيم الطبقي بالذكاء الاصطناعي",
        completed: true,
        aiAssisted: true,
        estimatedMinutes: 45,
        actualMinutes: 30,
        notes: "AI recommended stratified sample of 50 accounts",
        notesAr: "أوصى الذكاء الاصطناعي بعينة طبقية من 50 حساب",
        evidence: ["Sample selection report"],
      },
      {
        id: "S005",
        description: "Send confirmation requests",
        descriptionAr: "إرسال طلبات التأكيد",
        completed: true,
        aiAssisted: false,
        estimatedMinutes: 90,
        actualMinutes: 75,
        notes: "Sent 50 confirmations via secure email",
        notesAr: "تم إرسال 50 تأكيد عبر البريد الإلكتروني الآمن",
        evidence: ["Confirmation letters", "Delivery receipts"],
      },
      {
        id: "S006",
        description: "Follow up on non-responses",
        descriptionAr: "متابعة عدم الردود",
        completed: false,
        aiAssisted: false,
        estimatedMinutes: 60,
        actualMinutes: 0,
        notes: "",
        notesAr: "",
        evidence: [],
      },
    ],
    estimatedHours: 4,
    actualHours: 1.75,
    riskLevel: "medium",
    status: "in_progress",
    assignee: "Fatima Ali",
    reviewer: "Manager",
    dueDate: "2024-02-10",
    aiRecommendations: [
      "Focus follow-up on high-value accounts",
      "Use alternative procedures for non-responses",
      "Analyze aging patterns for collection risk",
    ],
    aiRecommendationsAr: [
      "التركيز على متابعة الحسابات عالية القيمة",
      "استخدام إجراءات بديلة لعدم الردود",
      "تحليل أنماط التقادم لمخاطر التحصيل",
    ],
    evidence: ["Confirmations", "Follow-up correspondence"],
    findings: [],
    findingsAr: [],
  },
]

export function AuditProcedureEngine({ isArabic }: AuditProcedureEngineProps) {
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterRisk, setFilterRisk] = useState<string>("all")

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

  const getRiskText = (risk: string) => {
    switch (risk) {
      case "critical":
        return isArabic ? "حرج" : "Critical"
      case "high":
        return isArabic ? "عالي" : "High"
      case "medium":
        return isArabic ? "متوسط" : "Medium"
      case "low":
        return isArabic ? "منخفض" : "Low"
      default:
        return risk
    }
  }

  const calculateProgress = (procedure: AuditProcedure) => {
    const completedSteps = procedure.steps.filter((step) => step.completed).length
    return Math.round((completedSteps / procedure.steps.length) * 100)
  }

  const filteredProcedures = mockAuditProcedures.filter((procedure) => {
    if (filterStatus !== "all" && procedure.status !== filterStatus) return false
    if (filterRisk !== "all" && procedure.riskLevel !== filterRisk) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Engine Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Zap className="h-6 w-6 text-blue-600" />
              <span>{isArabic ? "محرك إجراءات المراجعة الذكي" : "Smart Audit Procedure Engine"}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isArabic ? "إعدادات" : "Settings"}
              </Button>
              <Button size="sm">
                <Play className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isArabic ? "تشغيل تلقائي" : "Auto-Run"}
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            {isArabic
              ? "تنفيذ ومراقبة إجراءات المراجعة مع التوجيه بالذكاء الاصطناعي"
              : "Execute and monitor audit procedures with AI-powered guidance"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">
                {mockAuditProcedures.filter((p) => p.status === "completed").length}
              </p>
              <p className="text-sm text-gray-600">{isArabic ? "مكتملة" : "Completed"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {mockAuditProcedures.filter((p) => p.status === "in_progress").length}
              </p>
              <p className="text-sm text-gray-600">{isArabic ? "قيد التنفيذ" : "In Progress"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {mockAuditProcedures.reduce((acc, p) => acc + p.steps.filter((s) => s.aiAssisted).length, 0)}
              </p>
              <p className="text-sm text-gray-600">{isArabic ? "خطوات ذكية" : "AI Steps"}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(
                  mockAuditProcedures.reduce((acc, p) => acc + calculateProgress(p), 0) / mockAuditProcedures.length,
                )}
                %
              </p>
              <p className="text-sm text-gray-600">{isArabic ? "التقدم الإجمالي" : "Overall Progress"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{isArabic ? "إجراءات المراجعة النشطة" : "Active Audit Procedures"}</h3>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <select
            className="px-3 py-1 border rounded-md text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">{isArabic ? "كل الحالات" : "All Status"}</option>
            <option value="not_started">{isArabic ? "لم يبدأ" : "Not Started"}</option>
            <option value="in_progress">{isArabic ? "قيد التنفيذ" : "In Progress"}</option>
            <option value="completed">{isArabic ? "مكتمل" : "Completed"}</option>
            <option value="on_hold">{isArabic ? "معلق" : "On Hold"}</option>
          </select>
          <select
            className="px-3 py-1 border rounded-md text-sm"
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
          >
            <option value="all">{isArabic ? "كل المخاطر" : "All Risks"}</option>
            <option value="critical">{isArabic ? "حرج" : "Critical"}</option>
            <option value="high">{isArabic ? "عالي" : "High"}</option>
            <option value="medium">{isArabic ? "متوسط" : "Medium"}</option>
            <option value="low">{isArabic ? "منخفض" : "Low"}</option>
          </select>
        </div>
      </div>

      {/* Procedures List */}
      <div className="space-y-4">
        {filteredProcedures.map((procedure) => (
          <Card key={procedure.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {isArabic ? procedure.nameAr : procedure.name}
                    </h4>
                    <Badge className={getStatusColor(procedure.status)}>{getStatusText(procedure.status)}</Badge>
                    <Badge className={getRiskColor(procedure.riskLevel)}>{getRiskText(procedure.riskLevel)}</Badge>
                    <Badge variant="outline">{isArabic ? procedure.categoryAr : procedure.category}</Badge>
                  </div>

                  <p className="text-gray-600 mb-4">{isArabic ? procedure.descriptionAr : procedure.description}</p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{procedure.assignee}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>
                        {procedure.actualHours}h / {procedure.estimatedHours}h
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                      <FileText className="h-4 w-4" />
                      <span>
                        {procedure.steps.length} {isArabic ? "خطوات" : "steps"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                      <Brain className="h-4 w-4" />
                      <span>
                        {procedure.steps.filter((s) => s.aiAssisted).length} {isArabic ? "ذكية" : "AI-assisted"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>{isArabic ? "التقدم" : "Progress"}</span>
                      <span>{calculateProgress(procedure)}%</span>
                    </div>
                    <Progress value={calculateProgress(procedure)} className="h-2" />
                  </div>

                  {procedure.aiRecommendations.length > 0 && (
                    <div className="bg-purple-50 p-3 rounded-lg mb-4">
                      <h5 className="font-medium text-purple-900 mb-2 flex items-center space-x-1 rtl:space-x-reverse">
                        <Brain className="h-4 w-4" />
                        <span>{isArabic ? "توصيات الذكاء الاصطناعي:" : "AI Recommendations:"}</span>
                      </h5>
                      <ul className="text-sm text-purple-800 space-y-1">
                        {(isArabic ? procedure.aiRecommendationsAr : procedure.aiRecommendations).map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                            <span className="text-purple-600">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {procedure.findings.length > 0 && (
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <h5 className="font-medium text-orange-900 mb-2 flex items-center space-x-1 rtl:space-x-reverse">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{isArabic ? "النتائج:" : "Findings:"}</span>
                      </h5>
                      <ul className="text-sm text-orange-800 space-y-1">
                        {(isArabic ? procedure.findingsAr : procedure.findings).map((finding, index) => (
                          <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                            <span className="text-orange-600">•</span>
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" size="sm" onClick={() => setSelectedProcedure(procedure.id)}>
                    <FileText className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                    {isArabic ? "التفاصيل" : "Details"}
                  </Button>
                  {procedure.status === "in_progress" && (
                    <Button variant="outline" size="sm">
                      <Pause className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                      {isArabic ? "إيقاف" : "Pause"}
                    </Button>
                  )}
                  {procedure.status === "not_started" && (
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                      {isArabic ? "بدء" : "Start"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
