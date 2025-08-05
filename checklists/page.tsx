"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckSquare,
  Plus,
  Calendar,
  User,
  CheckCircle,
  Edit,
  Copy,
  Download,
  Brain,
  AlertTriangle,
  TrendingUp,
  FileText,
  Shield,
  Target,
  Zap,
  BarChart3,
} from "lucide-react"
import { AITrialBalanceAnalyzer } from "@/components/ai-trial-balance-analyzer"
import { RiskAssessmentMatrix } from "@/components/risk-assessment-matrix"

const comprehensiveChecklistTemplates = [
  {
    id: 1,
    name: "Comprehensive Financial Statement Audit",
    nameAr: "مراجعة القوائم المالية الشاملة",
    category: "Financial",
    categoryAr: "مالية",
    items: 156,
    estimatedHours: 320,
    riskLevel: "high",
    compliance: ["EAS 1-41", "IFRS", "SOX 404", "Egyptian Companies Law"],
    description: "Complete financial statement audit with AI-powered analytics",
    descriptionAr: "مراجعة شاملة للقوائم المالية مع التحليل المدعوم بالذكاء الاصطناعي",
    procedures: [
      {
        section: "Cash and Cash Equivalents",
        sectionAr: "النقد وما في حكمه",
        procedures: [
          "Bank confirmation procedures",
          "Cash count verification",
          "Bank reconciliation testing",
          "Cutoff testing",
          "Restricted cash identification",
        ],
      },
      {
        section: "Accounts Receivable",
        sectionAr: "الذمم المدينة",
        procedures: [
          "Aging analysis and collectibility assessment",
          "Confirmation procedures",
          "Bad debt provision adequacy",
          "Credit policy compliance",
          "Subsequent collections testing",
        ],
      },
    ],
    aiFeatures: ["Anomaly detection", "Trend analysis", "Predictive analytics", "Risk scoring"],
    industrySpecific: false,
  },
  {
    id: 2,
    name: "Advanced Tax Compliance & Transfer Pricing Review",
    nameAr: "مراجعة الامتثال الضريبي المتقدم وتسعير التحويل",
    category: "Tax",
    categoryAr: "ضرائب",
    items: 89,
    estimatedHours: 180,
    riskLevel: "critical",
    compliance: ["Egyptian Tax Law", "OECD Guidelines", "Transfer Pricing Regulations"],
    description: "Advanced tax compliance review with transfer pricing analysis",
    descriptionAr: "مراجعة متقدمة للامتثال الضريبي مع تحليل تسعير التحويل",
    procedures: [
      {
        section: "Corporate Income Tax",
        sectionAr: "ضريبة الدخل على الشركات",
        procedures: [
          "Tax provision adequacy testing",
          "Deferred tax calculation verification",
          "Tax planning strategy review",
          "Uncertain tax positions assessment",
        ],
      },
    ],
    aiFeatures: ["Tax optimization analysis", "Compliance gap detection", "Risk assessment"],
    industrySpecific: false,
  },
  {
    id: 3,
    name: "SOX 404 Internal Controls Assessment",
    nameAr: "تقييم الضوابط الداخلية SOX 404",
    category: "Risk",
    categoryAr: "مخاطر",
    items: 234,
    estimatedHours: 450,
    riskLevel: "critical",
    compliance: ["SOX 404", "COSO Framework", "PCAOB Standards"],
    description: "Comprehensive internal controls evaluation and testing",
    descriptionAr: "تقييم واختبار شامل للضوابط الداخلية",
    procedures: [
      {
        section: "Entity Level Controls",
        sectionAr: "ضوابط مستوى المنشأة",
        procedures: [
          "Control environment assessment",
          "Risk assessment process evaluation",
          "Information and communication testing",
          "Monitoring activities review",
        ],
      },
    ],
    aiFeatures: ["Control deficiency prediction", "Process mining", "Automated testing"],
    industrySpecific: false,
  },
  {
    id: 4,
    name: "Banking & Financial Services Audit",
    nameAr: "مراجعة البنوك والخدمات المالية",
    category: "Industry",
    categoryAr: "قطاعي",
    items: 312,
    estimatedHours: 680,
    riskLevel: "critical",
    compliance: ["Basel III", "CBE Regulations", "IFRS 9", "Anti-Money Laundering"],
    description: "Specialized banking and financial services audit procedures",
    descriptionAr: "إجراءات مراجعة متخصصة للبنوك والخدمات المالية",
    procedures: [
      {
        section: "Credit Risk Management",
        sectionAr: "إدارة مخاطر الائتمان",
        procedures: [
          "Loan portfolio quality assessment",
          "Provision adequacy testing",
          "Credit concentration analysis",
          "Stress testing validation",
        ],
      },
    ],
    aiFeatures: ["Credit risk modeling", "Fraud detection", "Regulatory compliance monitoring"],
    industrySpecific: true,
  },
  {
    id: 5,
    name: "ESG & Sustainability Reporting Audit",
    nameAr: "مراجعة تقارير الاستدامة والحوكمة البيئية",
    category: "ESG",
    categoryAr: "الاستدامة",
    items: 127,
    estimatedHours: 240,
    riskLevel: "medium",
    compliance: ["GRI Standards", "SASB", "TCFD", "Egyptian Green Guidelines"],
    description: "Environmental, Social, and Governance reporting audit",
    descriptionAr: "مراجعة تقارير الحوكمة البيئية والاجتماعية",
    procedures: [
      {
        section: "Environmental Impact",
        sectionAr: "التأثير البيئي",
        procedures: [
          "Carbon footprint verification",
          "Waste management assessment",
          "Energy efficiency evaluation",
          "Environmental compliance testing",
        ],
      },
    ],
    aiFeatures: ["Sustainability metrics analysis", "Impact measurement", "Trend forecasting"],
    industrySpecific: false,
  },
]

const activeAdvancedChecklists = [
  {
    id: 1,
    name: "Orascom Construction - Comprehensive Audit 2024",
    nameAr: "أوراسكوم للإنشاءات - المراجعة الشاملة 2024",
    template: "Comprehensive Financial Statement Audit",
    templateAr: "مراجعة القوائم المالية الشاملة",
    assignee: "Ahmed Hassan",
    teamSize: 8,
    dueDate: "2024-03-15",
    progress: 45,
    totalItems: 156,
    completedItems: 70,
    status: "In Progress",
    statusAr: "قيد التنفيذ",
    priority: "Critical",
    priorityAr: "حرج",
    riskScore: 78,
    aiInsights: {
      anomaliesDetected: 12,
      riskAreas: ["Revenue Recognition", "Related Party Transactions"],
      confidence: 0.89,
    },
    lastAIAnalysis: "2024-01-20T14:30:00Z",
  },
  {
    id: 2,
    name: "Commercial International Bank - SOX Assessment",
    nameAr: "البنك التجاري الدولي - تقييم SOX",
    template: "SOX 404 Internal Controls Assessment",
    templateAr: "تقييم الضوابط الداخلية SOX 404",
    assignee: "Fatima Al-Zahra",
    teamSize: 12,
    dueDate: "2024-02-28",
    progress: 72,
    totalItems: 234,
    completedItems: 168,
    status: "Near Completion",
    statusAr: "قريب من الإنجاز",
    priority: "Critical",
    priorityAr: "حرج",
    riskScore: 65,
    aiInsights: {
      anomaliesDetected: 8,
      riskAreas: ["IT General Controls", "Segregation of Duties"],
      confidence: 0.94,
    },
    lastAIAnalysis: "2024-01-21T09:15:00Z",
  },
  {
    id: 3,
    name: "Talaat Moustafa Group - ESG Audit",
    nameAr: "مجموعة طلعت مصطفى - مراجعة الاستدامة",
    template: "ESG & Sustainability Reporting Audit",
    templateAr: "مراجعة تقارير الاستدامة والحوكمة البيئية",
    assignee: "Mohamed Saeed",
    teamSize: 6,
    dueDate: "2024-04-10",
    progress: 28,
    totalItems: 127,
    completedItems: 36,
    status: "In Progress",
    statusAr: "قيد التنفيذ",
    priority: "High",
    priorityAr: "عالية",
    riskScore: 52,
    aiInsights: {
      anomaliesDetected: 5,
      riskAreas: ["Carbon Emissions Data", "Social Impact Metrics"],
      confidence: 0.87,
    },
    lastAIAnalysis: "2024-01-19T16:45:00Z",
  },
]

const advancedChecklistItems = [
  {
    id: 1,
    text: "Perform comprehensive revenue recognition testing using AI-powered transaction analysis",
    textAr: "إجراء اختبار شامل لإقرار الإيرادات باستخدام تحليل المعاملات المدعوم بالذكاء الاصطناعي",
    category: "Revenue",
    categoryAr: "الإيرادات",
    riskLevel: "high",
    completed: true,
    aiAnalysis: {
      confidence: 0.92,
      anomaliesFound: 3,
      riskScore: 25,
    },
    procedures: [
      "Extract all revenue transactions for the period",
      "Apply AI algorithms to detect unusual patterns",
      "Validate revenue recognition criteria compliance",
      "Test cutoff procedures with statistical sampling",
    ],
    evidence: ["Revenue register", "AI analysis report", "Sample testing results"],
    notes: "AI detected 3 potential revenue recognition issues requiring further investigation",
    notesAr: "اكتشف الذكاء الاصطناعي 3 مشاكل محتملة في إقرار الإيرادات تتطلب مزيد من التحقيق",
    assignee: "Ahmed Hassan",
    reviewer: "Senior Manager",
    dueDate: "2024-01-25",
    completedDate: "2024-01-23",
    hoursSpent: 12,
    budgetedHours: 15,
  },
  {
    id: 2,
    text: "Execute AI-driven accounts receivable aging and collectibility assessment",
    textAr: "تنفيذ تقييم تقادم وقابلية تحصيل الذمم المدينة المدعوم بالذكاء الاصطناعي",
    category: "Assets",
    categoryAr: "الأصول",
    riskLevel: "medium",
    completed: true,
    aiAnalysis: {
      confidence: 0.88,
      anomaliesFound: 1,
      riskScore: 15,
    },
    procedures: [
      "Generate AI-powered aging analysis",
      "Assess collectibility using predictive models",
      "Validate bad debt provisions adequacy",
      "Perform confirmation procedures on high-risk accounts",
    ],
    evidence: ["Aging report", "AI collectibility assessment", "Confirmations"],
    notes: "AI model suggests provision increase of 2.3% based on historical patterns",
    notesAr: "يقترح نموذج الذكاء الاصطناعي زيادة المخصص بنسبة 2.3% بناءً على الأنماط التاريخية",
    assignee: "Fatima Ali",
    reviewer: "Senior Manager",
    dueDate: "2024-01-28",
    completedDate: "2024-01-26",
    hoursSpent: 8,
    budgetedHours: 10,
  },
  {
    id: 3,
    text: "Conduct advanced inventory valuation testing with AI anomaly detection",
    textAr: "إجراء اختبار متقدم لتقييم المخزون مع كشف الشذوذ بالذكاء الاصطناعي",
    category: "Assets",
    categoryAr: "الأصول",
    riskLevel: "high",
    completed: false,
    aiAnalysis: null,
    procedures: [
      "Perform AI-powered inventory count analysis",
      "Test inventory valuation methods and calculations",
      "Identify slow-moving and obsolete inventory using ML",
      "Validate inventory provisions and write-downs",
    ],
    evidence: ["Inventory count sheets", "Valuation calculations", "AI analysis report"],
    notes: "",
    notesAr: "",
    assignee: "Mohamed Saeed",
    reviewer: "Manager",
    dueDate: "2024-02-05",
    completedDate: null,
    hoursSpent: 0,
    budgetedHours: 20,
  },
  {
    id: 4,
    text: "Perform sophisticated related party transaction analysis with network mapping",
    textAr: "إجراء تحليل متطور لمعاملات الأطراف ذات العلاقة مع رسم الشبكات",
    category: "Related Parties",
    categoryAr: "الأطراف ذات العلاقة",
    riskLevel: "critical",
    completed: false,
    aiAnalysis: null,
    procedures: [
      "Map related party networks using AI algorithms",
      "Identify undisclosed related party relationships",
      "Test pricing mechanisms and arm's length principle",
      "Validate disclosure completeness and accuracy",
    ],
    evidence: ["Related party register", "Network analysis", "Pricing studies"],
    notes: "",
    notesAr: "",
    assignee: "Sara Ibrahim",
    reviewer: "Partner",
    dueDate: "2024-02-10",
    completedDate: null,
    hoursSpent: 0,
    budgetedHours: 25,
  },
  {
    id: 5,
    text: "Execute comprehensive internal controls testing with process mining",
    textAr: "تنفيذ اختبار شامل للضوابط الداخلية مع تعدين العمليات",
    category: "Internal Controls",
    categoryAr: "الضوابط الداخلية",
    riskLevel: "high",
    completed: false,
    aiAnalysis: null,
    procedures: [
      "Apply process mining to identify control gaps",
      "Test design and operating effectiveness",
      "Perform walkthrough procedures with AI assistance",
      "Evaluate management override risks",
    ],
    evidence: ["Process maps", "Control testing results", "Management interviews"],
    notes: "",
    notesAr: "",
    assignee: "Omar Mahmoud",
    reviewer: "Senior Manager",
    dueDate: "2024-02-15",
    completedDate: null,
    hoursSpent: 0,
    budgetedHours: 30,
  },
]

function ChecklistsContent() {
  const { isArabic, toggleLanguage } = useLanguage()
  const [selectedChecklist, setSelectedChecklist] = useState<number | null>(null)
  const [newChecklistOpen, setNewChecklistOpen] = useState(false)
  const [checklistItems, setChecklistItems] = useState(advancedChecklistItems)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [showAIAnalysis, setShowAIAnalysis] = useState(false)
  const [showRiskMatrix, setShowRiskMatrix] = useState(false)
  const [filterRisk, setFilterRisk] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Near Completion":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-orange-100 text-orange-800"
      case "Not Started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const toggleChecklistItem = (itemId: number) => {
    setChecklistItems((items) =>
      items.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)),
    )
  }

  const filteredChecklists = activeAdvancedChecklists.filter((checklist) => {
    if (filterRisk !== "all" && checklist.priority.toLowerCase() !== filterRisk) return false
    if (filterStatus !== "all" && checklist.status.toLowerCase().replace(" ", "_") !== filterStatus) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isArabic={isArabic} toggleLanguage={toggleLanguage} />

      <main className={`p-6 ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {isArabic ? "قوائم المراجعة المتقدمة" : "Advanced Audit Checklists"}
                </h1>
                <p className="text-gray-600">
                  {isArabic
                    ? "إدارة وتتبع قوائم المراجعة المدعومة بالذكاء الاصطناعي مع تقييم المخاطر المتقدم"
                    : "AI-powered audit checklists with advanced risk assessment and analytics"}
                </p>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button variant="outline" onClick={() => setShowRiskMatrix(true)}>
                  <Target className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {isArabic ? "مصفوفة المخاطر" : "Risk Matrix"}
                </Button>
                <Button variant="outline" onClick={() => setShowAIAnalysis(true)}>
                  <Brain className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {isArabic ? "تحليل الذكاء الاصطناعي" : "AI Analysis"}
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="active">{isArabic ? "القوائم النشطة" : "Active Checklists"}</TabsTrigger>
                <TabsTrigger value="templates">{isArabic ? "القوالب المتقدمة" : "Advanced Templates"}</TabsTrigger>
                <TabsTrigger value="analytics">{isArabic ? "التحليلات" : "Analytics"}</TabsTrigger>
                <TabsTrigger value="completed">{isArabic ? "المكتملة" : "Completed"}</TabsTrigger>
              </TabsList>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Select value={filterRisk} onValueChange={setFilterRisk}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{isArabic ? "كل المخاطر" : "All Risks"}</SelectItem>
                    <SelectItem value="critical">{isArabic ? "حرج" : "Critical"}</SelectItem>
                    <SelectItem value="high">{isArabic ? "عالي" : "High"}</SelectItem>
                    <SelectItem value="medium">{isArabic ? "متوسط" : "Medium"}</SelectItem>
                  </SelectContent>
                </Select>

                <Dialog open={newChecklistOpen} onOpenChange={setNewChecklistOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {isArabic ? "قائمة جديدة" : "New Checklist"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {isArabic ? "إنشاء قائمة مراجعة متقدمة" : "Create Advanced Audit Checklist"}
                      </DialogTitle>
                      <DialogDescription>
                        {isArabic
                          ? "اختر القالب المتقدم وحدد معايير المخاطر"
                          : "Select advanced template and define risk criteria"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">{isArabic ? "اسم القائمة" : "Checklist Name"}</Label>
                          <Input id="name" placeholder={isArabic ? "أدخل اسم القائمة" : "Enter checklist name"} />
                        </div>
                        <div>
                          <Label htmlFor="client">{isArabic ? "العميل" : "Client"}</Label>
                          <Input id="client" placeholder={isArabic ? "اسم العميل" : "Client name"} />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="template">{isArabic ? "القالب المتقدم" : "Advanced Template"}</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={isArabic ? "اختر القالب" : "Select template"} />
                          </SelectTrigger>
                          <SelectContent>
                            {comprehensiveChecklistTemplates.map((template) => (
                              <SelectItem key={template.id} value={template.id.toString()}>
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                  <Badge className={getRiskColor(template.riskLevel)} variant="outline">
                                    {template.riskLevel}
                                  </Badge>
                                  <span>{isArabic ? template.nameAr : template.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="assignee">{isArabic ? "المسؤول الرئيسي" : "Lead Auditor"}</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder={isArabic ? "اختر المسؤول" : "Select lead auditor"} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ahmed">Ahmed Hassan (Partner)</SelectItem>
                              <SelectItem value="fatima">Fatima Al-Zahra (Senior Manager)</SelectItem>
                              <SelectItem value="mohamed">Mohamed Saeed (Manager)</SelectItem>
                              <SelectItem value="sara">Sara Ibrahim (Senior)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="teamSize">{isArabic ? "حجم الفريق" : "Team Size"}</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder={isArabic ? "عدد أعضاء الفريق" : "Number of team members"} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3-5 {isArabic ? "أعضاء" : "members"}</SelectItem>
                              <SelectItem value="6">6-8 {isArabic ? "أعضاء" : "members"}</SelectItem>
                              <SelectItem value="9">9-12 {isArabic ? "عضو" : "members"}</SelectItem>
                              <SelectItem value="13">13+ {isArabic ? "عضو" : "members"}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="dueDate">{isArabic ? "تاريخ الاستحقاق" : "Due Date"}</Label>
                          <Input id="dueDate" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="priority">{isArabic ? "الأولوية" : "Priority"}</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder={isArabic ? "مستوى الأولوية" : "Priority level"} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="critical">
                                <Badge className="bg-red-100 text-red-800">{isArabic ? "حرج" : "Critical"}</Badge>
                              </SelectItem>
                              <SelectItem value="high">
                                <Badge className="bg-orange-100 text-orange-800">{isArabic ? "عالي" : "High"}</Badge>
                              </SelectItem>
                              <SelectItem value="medium">
                                <Badge className="bg-yellow-100 text-yellow-800">{isArabic ? "متوسط" : "Medium"}</Badge>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="riskFactors">
                          {isArabic ? "عوامل المخاطر الخاصة" : "Specific Risk Factors"}
                        </Label>
                        <Textarea
                          id="riskFactors"
                          placeholder={
                            isArabic
                              ? "حدد عوامل المخاطر الخاصة بالعميل..."
                              : "Identify client-specific risk factors..."
                          }
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                        <Button variant="outline" onClick={() => setNewChecklistOpen(false)}>
                          {isArabic ? "إلغاء" : "Cancel"}
                        </Button>
                        <Button onClick={() => setNewChecklistOpen(false)}>
                          <Zap className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          {isArabic ? "إنشاء مع الذكاء الاصطناعي" : "Create with AI"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <TabsContent value="active" className="space-y-6">
              <div className="grid gap-6">
                {filteredChecklists.map((checklist) => (
                  <Card key={checklist.id} className="hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {isArabic ? checklist.nameAr : checklist.name}
                            </h3>
                            <Badge className={getPriorityColor(checklist.priority)}>
                              {isArabic ? checklist.priorityAr : checklist.priority}
                            </Badge>
                            <Badge variant="outline" className="flex items-center space-x-1 rtl:space-x-reverse">
                              <Brain className="h-3 w-3" />
                              <span>{isArabic ? "ذكاء اصطناعي" : "AI-Powered"}</span>
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                              <User className="h-4 w-4" />
                              <span>{checklist.assignee}</span>
                              <Badge variant="secondary">
                                {checklist.teamSize} {isArabic ? "أعضاء" : "members"}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{checklist.dueDate}</span>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                              <Target className="h-4 w-4" />
                              <span>
                                {isArabic ? "نقاط المخاطر" : "Risk Score"}: {checklist.riskScore}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                              <AlertTriangle className="h-4 w-4" />
                              <span>
                                {checklist.aiInsights.anomaliesDetected} {isArabic ? "شذوذات" : "anomalies"}
                              </span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span>{isArabic ? "التقدم الإجمالي" : "Overall Progress"}</span>
                              <span>
                                {checklist.completedItems}/{checklist.totalItems} ({checklist.progress}%)
                              </span>
                            </div>
                            <Progress value={checklist.progress} className="h-3" />
                          </div>

                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <Badge className={getStatusColor(checklist.status)}>
                              {isArabic ? checklist.statusAr : checklist.status}
                            </Badge>
                            <div className="text-sm text-gray-500">
                              {isArabic ? "آخر تحليل ذكي" : "Last AI Analysis"}:{" "}
                              {new Date(checklist.lastAIAnalysis).toLocaleDateString()}
                            </div>
                            <Badge variant="outline" className="flex items-center space-x-1 rtl:space-x-reverse">
                              <TrendingUp className="h-3 w-3" />
                              <span>
                                {Math.round(checklist.aiInsights.confidence * 100)}% {isArabic ? "ثقة" : "confidence"}
                              </span>
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Button variant="outline" size="sm">
                            <Brain className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                            {isArabic ? "تحليل ذكي" : "AI Analysis"}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setSelectedChecklist(checklist.id)}>
                            <FileText className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                            {isArabic ? "عرض" : "View"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {comprehensiveChecklistTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <CheckSquare className="h-5 w-5 text-blue-600" />
                          <span>{isArabic ? template.nameAr : template.name}</span>
                        </div>
                        <Badge className={getRiskColor(template.riskLevel)}>{template.riskLevel}</Badge>
                      </CardTitle>
                      <CardDescription>{isArabic ? template.descriptionAr : template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">{isArabic ? "عدد الإجراءات" : "Procedures"}</span>
                            <span className="font-medium">{template.items}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">{isArabic ? "الساعات المقدرة" : "Est. Hours"}</span>
                            <span className="font-medium">{template.estimatedHours}h</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-2">
                            {isArabic ? "ميزات الذكاء الاصطناعي" : "AI Features"}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {template.aiFeatures.map((feature, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs flex items-center space-x-1 rtl:space-x-reverse"
                              >
                                <Brain className="h-3 w-3" />
                                <span>{feature}</span>
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-2">
                            {isArabic ? "معايير الامتثال" : "Compliance Standards"}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {template.compliance.map((standard, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {standard}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2 rtl:space-x-reverse pt-4">
                          <Button size="sm" className="flex-1" onClick={() => setSelectedTemplate(template.id)}>
                            <Zap className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                            {isArabic ? "استخدام مع الذكاء الاصطناعي" : "Use with AI"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <BarChart3 className="h-5 w-5" />
                      <span>{isArabic ? "إحصائيات الأداء" : "Performance Analytics"}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">94%</p>
                          <p className="text-sm text-gray-600">{isArabic ? "دقة الذكاء الاصطناعي" : "AI Accuracy"}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">67%</p>
                          <p className="text-sm text-gray-600">{isArabic ? "توفير الوقت" : "Time Saved"}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">156</p>
                          <p className="text-sm text-gray-600">{isArabic ? "شذوذات مكتشفة" : "Anomalies Detected"}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">89%</p>
                          <p className="text-sm text-gray-600">{isArabic ? "معدل الإنجاز" : "Completion Rate"}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Shield className="h-5 w-5" />
                      <span>{isArabic ? "تحليل المخاطر" : "Risk Analysis"}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{isArabic ? "مخاطر عالية" : "High Risk"}</span>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                          </div>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{isArabic ? "مخاطر متوسطة" : "Medium Risk"}</span>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{isArabic ? "مخاطر منخفضة" : "Low Risk"}</span>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                          </div>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? "القوائم المكتملة" : "Completed Checklists"}</CardTitle>
                  <CardDescription>
                    {isArabic
                      ? "قوائم المراجعة المكتملة والمؤرشفة مع تحليل الأداء"
                      : "Completed and archived checklists with performance analysis"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {isArabic ? "لا توجد قوائم مكتملة حالياً" : "No completed checklists yet"}
                    </h3>
                    <p className="text-gray-500">
                      {isArabic
                        ? "ستظهر القوائم المكتملة هنا مع تحليل الأداء والإحصائيات"
                        : "Completed checklists will appear here with performance analytics"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Advanced Checklist Detail Modal */}
          {selectedChecklist && (
            <Dialog open={!!selectedChecklist} onOpenChange={() => setSelectedChecklist(null)}>
              <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span>{isArabic ? "تفاصيل قائمة المراجعة المتقدمة" : "Advanced Checklist Details"}</span>
                  </DialogTitle>
                  <DialogDescription>
                    {activeAdvancedChecklists.find((c) => c.id === selectedChecklist)?.name}
                  </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="procedures" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="procedures">{isArabic ? "الإجراءات" : "Procedures"}</TabsTrigger>
                    <TabsTrigger value="ai-analysis">{isArabic ? "التحليل الذكي" : "AI Analysis"}</TabsTrigger>
                    <TabsTrigger value="risk-assessment">{isArabic ? "تقييم المخاطر" : "Risk Assessment"}</TabsTrigger>
                    <TabsTrigger value="evidence">{isArabic ? "الأدلة" : "Evidence"}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="procedures" className="space-y-4">
                    {checklistItems.map((item) => (
                      <Card
                        key={item.id}
                        className={`border-l-4 ${
                          item.completed
                            ? "border-green-500 bg-green-50"
                            : item.riskLevel === "critical"
                              ? "border-red-500"
                              : item.riskLevel === "high"
                                ? "border-orange-500"
                                : "border-gray-300"
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4 rtl:space-x-reverse">
                            <Checkbox
                              checked={item.completed}
                              onCheckedChange={() => toggleChecklistItem(item.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <p
                                  className={`font-medium text-lg ${item.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                                >
                                  {isArabic ? item.textAr : item.text}
                                </p>
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                  <Badge className={getRiskColor(item.riskLevel)}>{item.riskLevel}</Badge>
                                  {item.aiAnalysis && (
                                    <Badge
                                      variant="outline"
                                      className="flex items-center space-x-1 rtl:space-x-reverse"
                                    >
                                      <Brain className="h-3 w-3" />
                                      <span>{Math.round(item.aiAnalysis.confidence * 100)}%</span>
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <Badge variant="outline" className="mb-2">
                                    {isArabic ? item.categoryAr : item.category}
                                  </Badge>
                                  <div className="text-sm text-gray-600 space-y-1">
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                      <User className="h-3 w-3" />
                                      <span>{item.assignee}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                      <Calendar className="h-3 w-3" />
                                      <span>{item.dueDate}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                      <span>
                                        {isArabic ? "الساعات" : "Hours"}: {item.hoursSpent}/{item.budgetedHours}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {item.aiAnalysis && (
                                  <div className="bg-purple-50 p-3 rounded-lg">
                                    <h4 className="font-medium text-purple-900 mb-2 flex items-center space-x-1 rtl:space-x-reverse">
                                      <Brain className="h-4 w-4" />
                                      <span>{isArabic ? "تحليل الذكاء الاصطناعي" : "AI Analysis"}</span>
                                    </h4>
                                    <div className="text-sm text-purple-800 space-y-1">
                                      <div>
                                        {isArabic ? "الثقة" : "Confidence"}:{" "}
                                        {Math.round(item.aiAnalysis.confidence * 100)}%
                                      </div>
                                      <div>
                                        {isArabic ? "الشذوذات" : "Anomalies"}: {item.aiAnalysis.anomaliesFound}
                                      </div>
                                      <div>
                                        {isArabic ? "نقاط المخاطر" : "Risk Score"}: {item.aiAnalysis.riskScore}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">
                                  {isArabic ? "الإجراءات التفصيلية:" : "Detailed Procedures:"}
                                </h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                  {item.procedures.map((procedure, index) => (
                                    <li key={index}>{procedure}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">
                                  {isArabic ? "الأدلة المطلوبة:" : "Required Evidence:"}
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {item.evidence.map((evidence, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {evidence}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {(item.notes || item.notesAr) && (
                                <div className="bg-gray-100 p-3 rounded-lg">
                                  <p className="font-medium text-gray-700 mb-1">{isArabic ? "ملاحظات:" : "Notes:"}</p>
                                  <p className="text-sm text-gray-600">{isArabic ? item.notesAr : item.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="ai-analysis">
                    <AITrialBalanceAnalyzer isArabic={isArabic} />
                  </TabsContent>

                  <TabsContent value="risk-assessment">
                    <RiskAssessmentMatrix isArabic={isArabic} />
                  </TabsContent>

                  <TabsContent value="evidence">
                    <Card>
                      <CardHeader>
                        <CardTitle>{isArabic ? "إدارة الأدلة" : "Evidence Management"}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">
                            {isArabic ? "سيتم عرض الأدلة المرفقة هنا" : "Attached evidence will be displayed here"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}

          {/* AI Analysis Modal */}
          {showAIAnalysis && (
            <Dialog open={showAIAnalysis} onOpenChange={setShowAIAnalysis}>
              <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span>{isArabic ? "تحليل الذكاء الاصطناعي المتقدم" : "Advanced AI Analysis"}</span>
                  </DialogTitle>
                </DialogHeader>
                <AITrialBalanceAnalyzer isArabic={isArabic} />
              </DialogContent>
            </Dialog>
          )}

          {/* Risk Matrix Modal */}
          {showRiskMatrix && (
            <Dialog open={showRiskMatrix} onOpenChange={setShowRiskMatrix}>
              <DialogContent className="sm:max-w-5xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Target className="h-5 w-5 text-red-600" />
                    <span>{isArabic ? "مصفوفة تقييم المخاطر" : "Risk Assessment Matrix"}</span>
                  </DialogTitle>
                </DialogHeader>
                <RiskAssessmentMatrix isArabic={isArabic} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </main>
    </div>
  )
}

export default function Checklists() {
  return (
    <LanguageProvider>
      <ChecklistsContent />
    </LanguageProvider>
  )
}
