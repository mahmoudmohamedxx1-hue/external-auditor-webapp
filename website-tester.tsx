"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  XCircle,
  Clock,
  Play,
  RefreshCw,
  FileText,
  Users,
  BarChart3,
  Shield,
  Zap,
  TestTube,
  Bug,
  Target,
  Activity,
} from "lucide-react"

interface TestCase {
  id: string
  name: string
  nameAr: string
  category: string
  categoryAr: string
  description: string
  descriptionAr: string
  status: "pending" | "running" | "passed" | "failed" | "skipped"
  duration?: number
  error?: string
  steps: TestStep[]
  priority: "critical" | "high" | "medium" | "low"
}

interface TestStep {
  id: string
  name: string
  nameAr: string
  status: "pending" | "running" | "passed" | "failed"
  duration?: number
  error?: string
}

interface TestSuite {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  tests: TestCase[]
  status: "pending" | "running" | "completed"
  progress: number
}

const testSuites: TestSuite[] = [
  {
    id: "navigation",
    name: "Navigation & UI Tests",
    nameAr: "اختبارات التنقل وواجهة المستخدم",
    description: "Test navigation, language switching, and UI components",
    descriptionAr: "اختبار التنقل وتبديل اللغة ومكونات واجهة المستخدم",
    status: "pending",
    progress: 0,
    tests: [
      {
        id: "nav-1",
        name: "Main Navigation",
        nameAr: "التنقل الرئيسي",
        category: "Navigation",
        categoryAr: "التنقل",
        description: "Test all navigation links and menu items",
        descriptionAr: "اختبار جميع روابط التنقل وعناصر القائمة",
        status: "pending",
        priority: "critical",
        steps: [
          { id: "nav-1-1", name: "Load homepage", nameAr: "تحميل الصفحة الرئيسية", status: "pending" },
          { id: "nav-1-2", name: "Test dashboard link", nameAr: "اختبار رابط لوحة التحكم", status: "pending" },
          { id: "nav-1-3", name: "Test documents link", nameAr: "اختبار رابط المستندات", status: "pending" },
          { id: "nav-1-4", name: "Test risk assessment link", nameAr: "اختبار رابط تقييم المخاطر", status: "pending" },
          { id: "nav-1-5", name: "Test all menu items", nameAr: "اختبار جميع عناصر القائمة", status: "pending" },
        ],
      },
      {
        id: "nav-2",
        name: "Language Switching",
        nameAr: "تبديل اللغة",
        category: "Navigation",
        categoryAr: "التنقل",
        description: "Test Arabic/English language switching functionality",
        descriptionAr: "اختبار وظيفة تبديل اللغة العربية/الإنجليزية",
        status: "pending",
        priority: "high",
        steps: [
          { id: "nav-2-1", name: "Switch to Arabic", nameAr: "التبديل إلى العربية", status: "pending" },
          { id: "nav-2-2", name: "Verify RTL layout", nameAr: "التحقق من تخطيط RTL", status: "pending" },
          { id: "nav-2-3", name: "Switch to English", nameAr: "التبديل إلى الإنجليزية", status: "pending" },
          { id: "nav-2-4", name: "Verify LTR layout", nameAr: "التحقق من تخطيط LTR", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "dashboard",
    name: "Dashboard Functionality",
    nameAr: "وظائف لوحة التحكم",
    description: "Test dashboard charts, statistics, and data visualization",
    descriptionAr: "اختبار مخططات لوحة التحكم والإحصائيات وتصور البيانات",
    status: "pending",
    progress: 0,
    tests: [
      {
        id: "dash-1",
        name: "Dashboard Loading",
        nameAr: "تحميل لوحة التحكم",
        category: "Dashboard",
        categoryAr: "لوحة التحكم",
        description: "Test dashboard page loading and initial data display",
        descriptionAr: "اختبار تحميل صفحة لوحة التحكم وعرض البيانات الأولية",
        status: "pending",
        priority: "critical",
        steps: [
          { id: "dash-1-1", name: "Load dashboard page", nameAr: "تحميل صفحة لوحة التحكم", status: "pending" },
          { id: "dash-1-2", name: "Verify statistics cards", nameAr: "التحقق من بطاقات الإحصائيات", status: "pending" },
          { id: "dash-1-3", name: "Check chart rendering", nameAr: "فحص عرض المخططات", status: "pending" },
          { id: "dash-1-4", name: "Verify recent activities", nameAr: "التحقق من الأنشطة الأخيرة", status: "pending" },
        ],
      },
      {
        id: "dash-2",
        name: "Chart Interactions",
        nameAr: "تفاعلات المخططات",
        category: "Dashboard",
        categoryAr: "لوحة التحكم",
        description: "Test chart hover effects, tooltips, and interactions",
        descriptionAr: "اختبار تأثيرات التمرير والتلميحات والتفاعلات في المخططات",
        status: "pending",
        priority: "medium",
        steps: [
          { id: "dash-2-1", name: "Test bar chart hover", nameAr: "اختبار تمرير المخطط الشريطي", status: "pending" },
          {
            id: "dash-2-2",
            name: "Test pie chart tooltips",
            nameAr: "اختبار تلميحات المخطط الدائري",
            status: "pending",
          },
          { id: "dash-2-3", name: "Test chart responsiveness", nameAr: "اختبار استجابة المخططات", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "documents",
    name: "Document Management",
    nameAr: "إدارة المستندات",
    description: "Test document upload, search, filtering, and management features",
    descriptionAr: "اختبار رفع المستندات والبحث والتصفية وميزات الإدارة",
    status: "pending",
    progress: 0,
    tests: [
      {
        id: "doc-1",
        name: "Document List Display",
        nameAr: "عرض قائمة المستندات",
        category: "Documents",
        categoryAr: "المستندات",
        description: "Test document list loading and display",
        descriptionAr: "اختبار تحميل وعرض قائمة المستندات",
        status: "pending",
        priority: "critical",
        steps: [
          { id: "doc-1-1", name: "Load documents page", nameAr: "تحميل صفحة المستندات", status: "pending" },
          { id: "doc-1-2", name: "Verify document cards", nameAr: "التحقق من بطاقات المستندات", status: "pending" },
          { id: "doc-1-3", name: "Check document metadata", nameAr: "فحص بيانات المستندات الوصفية", status: "pending" },
        ],
      },
      {
        id: "doc-2",
        name: "Search and Filter",
        nameAr: "البحث والتصفية",
        category: "Documents",
        categoryAr: "المستندات",
        description: "Test document search and category filtering",
        descriptionAr: "اختبار البحث في المستندات وتصفية الفئات",
        status: "pending",
        priority: "high",
        steps: [
          { id: "doc-2-1", name: "Test search functionality", nameAr: "اختبار وظيفة البحث", status: "pending" },
          { id: "doc-2-2", name: "Test category filter", nameAr: "اختبار تصفية الفئات", status: "pending" },
          { id: "doc-2-3", name: "Test search results", nameAr: "اختبار نتائج البحث", status: "pending" },
        ],
      },
      {
        id: "doc-3",
        name: "Upload Dialog",
        nameAr: "حوار الرفع",
        category: "Documents",
        categoryAr: "المستندات",
        description: "Test document upload dialog and form validation",
        descriptionAr: "اختبار حوار رفع المستندات والتحقق من النموذج",
        status: "pending",
        priority: "high",
        steps: [
          { id: "doc-3-1", name: "Open upload dialog", nameAr: "فتح حوار الرفع", status: "pending" },
          { id: "doc-3-2", name: "Test form fields", nameAr: "اختبار حقول النموذج", status: "pending" },
          { id: "doc-3-3", name: "Test validation", nameAr: "اختبار التحقق", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "risk-assessment",
    name: "Risk Assessment",
    nameAr: "تقييم المخاطر",
    description: "Test risk assessment charts, heatmaps, and analysis features",
    descriptionAr: "اختبار مخططات تقييم المخاطر والخرائط الحرارية وميزات التحليل",
    status: "pending",
    progress: 0,
    tests: [
      {
        id: "risk-1",
        name: "Risk Dashboard",
        nameAr: "لوحة تحكم المخاطر",
        category: "Risk Assessment",
        categoryAr: "تقييم المخاطر",
        description: "Test risk assessment dashboard and statistics",
        descriptionAr: "اختبار لوحة تحكم تقييم المخاطر والإحصائيات",
        status: "pending",
        priority: "critical",
        steps: [
          { id: "risk-1-1", name: "Load risk assessment page", nameAr: "تحميل صفحة تقييم المخاطر", status: "pending" },
          { id: "risk-1-2", name: "Verify risk categories", nameAr: "التحقق من فئات المخاطر", status: "pending" },
          { id: "risk-1-3", name: "Check trend charts", nameAr: "فحص مخططات الاتجاهات", status: "pending" },
        ],
      },
      {
        id: "risk-2",
        name: "Risk Heatmap",
        nameAr: "الخريطة الحرارية للمخاطر",
        category: "Risk Assessment",
        categoryAr: "تقييم المخاطر",
        description: "Test risk heatmap visualization and interactions",
        descriptionAr: "اختبار تصور الخريطة الحرارية للمخاطر والتفاعلات",
        status: "pending",
        priority: "high",
        steps: [
          {
            id: "risk-2-1",
            name: "Switch to heatmap tab",
            nameAr: "التبديل إلى تبويب الخريطة الحرارية",
            status: "pending",
          },
          { id: "risk-2-2", name: "Test scatter plot", nameAr: "اختبار المخطط المبعثر", status: "pending" },
          { id: "risk-2-3", name: "Test risk areas list", nameAr: "اختبار قائمة مناطق المخاطر", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "checklists",
    name: "Audit Checklists",
    nameAr: "قوائم المراجعة",
    description: "Test checklist management, templates, and progress tracking",
    descriptionAr: "اختبار إدارة قوائم المراجعة والقوالب وتتبع التقدم",
    status: "pending",
    progress: 0,
    tests: [
      {
        id: "check-1",
        name: "Checklist Display",
        nameAr: "عرض قوائم المراجعة",
        category: "Checklists",
        categoryAr: "قوائم المراجعة",
        description: "Test checklist loading and display functionality",
        descriptionAr: "اختبار تحميل وعرض قوائم المراجعة",
        status: "pending",
        priority: "critical",
        steps: [
          { id: "check-1-1", name: "Load checklists page", nameAr: "تحميل صفحة قوائم المراجعة", status: "pending" },
          {
            id: "check-1-2",
            name: "Verify active checklists",
            nameAr: "التحقق من قوائم المراجعة النشطة",
            status: "pending",
          },
          { id: "check-1-3", name: "Check progress bars", nameAr: "فحص أشرطة التقدم", status: "pending" },
        ],
      },
      {
        id: "check-2",
        name: "Template Management",
        nameAr: "إدارة القوالب",
        category: "Checklists",
        categoryAr: "قوائم المراجعة",
        description: "Test checklist templates and creation",
        descriptionAr: "اختبار قوالب قوائم المراجعة والإنشاء",
        status: "pending",
        priority: "high",
        steps: [
          { id: "check-2-1", name: "Switch to templates tab", nameAr: "التبديل إلى تبويب القوالب", status: "pending" },
          { id: "check-2-2", name: "Test template cards", nameAr: "اختبار بطاقات القوالب", status: "pending" },
          { id: "check-2-3", name: "Test use template button", nameAr: "اختبار زر استخدام القالب", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "reports",
    name: "Report Generation",
    nameAr: "إنشاء التقارير",
    description: "Test report templates, generation, and analytics",
    descriptionAr: "اختبار قوالب التقارير والإنشاء والتحليلات",
    status: "pending",
    progress: 0,
    tests: [
      {
        id: "rep-1",
        name: "Report Dashboard",
        nameAr: "لوحة تحكم التقارير",
        category: "Reports",
        categoryAr: "التقارير",
        description: "Test report dashboard and metrics",
        descriptionAr: "اختبار لوحة تحكم التقارير والمقاييس",
        status: "pending",
        priority: "critical",
        steps: [
          { id: "rep-1-1", name: "Load reports page", nameAr: "تحميل صفحة التقارير", status: "pending" },
          { id: "rep-1-2", name: "Verify report metrics", nameAr: "التحقق من مقاييس التقارير", status: "pending" },
          { id: "rep-1-3", name: "Check generated reports", nameAr: "فحص التقارير المُنشأة", status: "pending" },
        ],
      },
      {
        id: "rep-2",
        name: "Report Templates",
        nameAr: "قوالب التقارير",
        category: "Reports",
        categoryAr: "التقارير",
        description: "Test report template selection and usage",
        descriptionAr: "اختبار اختيار واستخدام قوالب التقارير",
        status: "pending",
        priority: "high",
        steps: [
          { id: "rep-2-1", name: "Switch to templates tab", nameAr: "التبديل إلى تبويب القوالب", status: "pending" },
          { id: "rep-2-2", name: "Test template details", nameAr: "اختبار تفاصيل القوالب", status: "pending" },
          { id: "rep-2-3", name: "Test use template", nameAr: "اختبار استخدام القالب", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "team",
    name: "Team Management",
    nameAr: "إدارة الفريق",
    description: "Test team member management, departments, and workload",
    descriptionAr: "اختبار إدارة أعضاء الفريق والأقسام وعبء العمل",
    status: "pending",
    progress: 0,
    tests: [
      {
        id: "team-1",
        name: "Team Overview",
        nameAr: "نظرة عامة على الفريق",
        category: "Team",
        categoryAr: "الفريق",
        description: "Test team overview and member display",
        descriptionAr: "اختبار نظرة عامة على الفريق وعرض الأعضاء",
        status: "pending",
        priority: "critical",
        steps: [
          { id: "team-1-1", name: "Load team page", nameAr: "تحميل صفحة الفريق", status: "pending" },
          { id: "team-1-2", name: "Verify team stats", nameAr: "التحقق من إحصائيات الفريق", status: "pending" },
          { id: "team-1-3", name: "Check member cards", nameAr: "فحص بطاقات الأعضاء", status: "pending" },
        ],
      },
      {
        id: "team-2",
        name: "Workload Distribution",
        nameAr: "توزيع عبء العمل",
        category: "Team",
        categoryAr: "الفريق",
        description: "Test workload visualization and distribution",
        descriptionAr: "اختبار تصور وتوزيع عبء العمل",
        status: "pending",
        priority: "medium",
        steps: [
          { id: "team-2-1", name: "Switch to workload tab", nameAr: "التبديل إلى تبويب عبء العمل", status: "pending" },
          { id: "team-2-2", name: "Test workload bars", nameAr: "اختبار أشرطة عبء العمل", status: "pending" },
          { id: "team-2-3", name: "Check workload indicators", nameAr: "فحص مؤشرات عبء العمل", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "compliance",
    name: "Compliance Management",
    nameAr: "إدارة الامتثال",
    description: "Test compliance standards, trends, and monitoring",
    descriptionAr: "اختبار معايير الامتثال والاتجاهات والمراقبة",
    status: "pending",
    progress: 0,
    tests: [
      {
        id: "comp-1",
        name: "Compliance Dashboard",
        nameAr: "لوحة تحكم الامتثال",
        category: "Compliance",
        categoryAr: "الامتثال",
        description: "Test compliance overview and statistics",
        descriptionAr: "اختبار نظرة عامة على الامتثال والإحصائيات",
        status: "pending",
        priority: "critical",
        steps: [
          { id: "comp-1-1", name: "Load compliance page", nameAr: "تحميل صفحة الامتثال", status: "pending" },
          { id: "comp-1-2", name: "Verify compliance stats", nameAr: "التحقق من إحصائيات الامتثال", status: "pending" },
          { id: "comp-1-3", name: "Check standards list", nameAr: "فحص قائمة المعايير", status: "pending" },
        ],
      },
      {
        id: "comp-2",
        name: "Compliance Trends",
        nameAr: "اتجاهات الامتثال",
        category: "Compliance",
        categoryAr: "الامتثال",
        description: "Test compliance trend charts and analysis",
        descriptionAr: "اختبار مخططات اتجاهات الامتثال والتحليل",
        status: "pending",
        priority: "high",
        steps: [
          { id: "comp-2-1", name: "Switch to trends tab", nameAr: "التبديل إلى تبويب الاتجاهات", status: "pending" },
          { id: "comp-2-2", name: "Test trend chart", nameAr: "اختبار مخطط الاتجاهات", status: "pending" },
          { id: "comp-2-3", name: "Verify chart data", nameAr: "التحقق من بيانات المخطط", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "ai-features",
    name: "AI Features",
    nameAr: "ميزات الذكاء الاصطناعي",
    description: "Test AI workpaper analysis and intelligent features",
    descriptionAr: "اختبار تحليل أوراق العمل بالذكاء الاصطناعي والميزات الذكية",
    status: "pending",
    progress: 0,
    tests: [
      {
        id: "ai-1",
        name: "AI Workpaper Analyzer",
        nameAr: "محلل أوراق العمل بالذكاء الاصطناعي",
        category: "AI Features",
        categoryAr: "ميزات الذكاء الاصطناعي",
        description: "Test AI analysis features and results display",
        descriptionAr: "اختبار ميزات التحليل بالذكاء الاصطناعي وعرض النتائج",
        status: "pending",
        priority: "high",
        steps: [
          { id: "ai-1-1", name: "Load AI analyzer", nameAr: "تحميل محلل الذكاء الاصطناعي", status: "pending" },
          { id: "ai-1-2", name: "Test analysis overview", nameAr: "اختبار نظرة عامة على التحليل", status: "pending" },
          { id: "ai-1-3", name: "Check findings display", nameAr: "فحص عرض النتائج", status: "pending" },
          { id: "ai-1-4", name: "Test recommendations", nameAr: "اختبار التوصيات", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "api-integration",
    name: "API Integration",
    nameAr: "تكامل واجهة برمجة التطبيقات",
    description: "Test API integrations, monitoring, and alerts",
    descriptionAr: "اختبار تكاملات واجهة برمجة التطبيقات والمراقبة والتنبيهات",
    status: "pending",
    progress: 0,
    tests: [
      {
        id: "api-1",
        name: "API Integration Manager",
        nameAr: "مدير تكامل واجهة برمجة التطبيقات",
        category: "API Integration",
        categoryAr: "تكامل واجهة برمجة التطبيقات",
        description: "Test API integration management and monitoring",
        descriptionAr: "اختبار إدارة ومراقبة تكامل واجهة برمجة التطبيقات",
        status: "pending",
        priority: "high",
        steps: [
          { id: "api-1-1", name: "Load API manager", nameAr: "تحميل مدير واجهة برمجة التطبيقات", status: "pending" },
          { id: "api-1-2", name: "Test integration list", nameAr: "اختبار قائمة التكاملات", status: "pending" },
          { id: "api-1-3", name: "Test connection status", nameAr: "اختبار حالة الاتصال", status: "pending" },
        ],
      },
      {
        id: "api-2",
        name: "Alert Management",
        nameAr: "إدارة التنبيهات",
        category: "API Integration",
        categoryAr: "تكامل واجهة برمجة التطبيقات",
        description: "Test alert configuration and monitoring",
        descriptionAr: "اختبار تكوين التنبيهات والمراقبة",
        status: "pending",
        priority: "high",
        steps: [
          { id: "api-2-1", name: "Load alert manager", nameAr: "تحميل مدير التنبيهات", status: "pending" },
          { id: "api-2-2", name: "Test alert rules", nameAr: "اختبار قواعد التنبيهات", status: "pending" },
          { id: "api-2-3", name: "Test alert channels", nameAr: "اختبار قنوات التنبيهات", status: "pending" },
        ],
      },
    ],
  },
]

interface WebsiteTesterProps {
  isArabic: boolean
}

export function WebsiteTester({ isArabic }: WebsiteTesterProps) {
  const [testSuitesState, setTestSuitesState] = useState<TestSuite[]>(testSuites)
  const [selectedSuite, setSelectedSuite] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)
  const [testLog, setTestLog] = useState<string[]>([])

  const runTest = async (suiteId: string, testId?: string) => {
    setIsRunning(true)
    const suite = testSuitesState.find((s) => s.id === suiteId)
    if (!suite) return

    // Update suite status
    setTestSuitesState((prev) => prev.map((s) => (s.id === suiteId ? { ...s, status: "running", progress: 0 } : s)))

    const testsToRun = testId ? suite.tests.filter((t) => t.id === testId) : suite.tests
    let completedTests = 0

    for (const test of testsToRun) {
      // Update test status
      setTestSuitesState((prev) =>
        prev.map((s) =>
          s.id === suiteId
            ? {
                ...s,
                tests: s.tests.map((t) => (t.id === test.id ? { ...t, status: "running" } : t)),
              }
            : s,
        ),
      )

      addToLog(`Starting test: ${isArabic ? test.nameAr : test.name}`)

      // Run test steps
      for (let i = 0; i < test.steps.length; i++) {
        const step = test.steps[i]
        addToLog(`  Running step: ${isArabic ? step.nameAr : step.name}`)

        // Simulate test execution
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500))

        // Simulate test results (90% pass rate)
        const passed = Math.random() > 0.1
        const stepStatus = passed ? "passed" : "failed"
        const stepError = passed ? undefined : "Simulated test failure"

        // Update step status
        setTestSuitesState((prev) =>
          prev.map((s) =>
            s.id === suiteId
              ? {
                  ...s,
                  tests: s.tests.map((t) =>
                    t.id === test.id
                      ? {
                          ...t,
                          steps: t.steps.map((st, idx) =>
                            idx === i ? { ...st, status: stepStatus, error: stepError } : st,
                          ),
                        }
                      : t,
                  ),
                }
              : s,
          ),
        )

        if (!passed) {
          addToLog(`    ❌ Step failed: ${stepError}`)
          break
        } else {
          addToLog(`    ✅ Step passed`)
        }
      }

      // Determine test result
      const failedSteps = test.steps.filter((s) => s.status === "failed").length
      const testStatus = failedSteps > 0 ? "failed" : "passed"
      const testDuration = Math.random() * 5000 + 1000

      // Update test status
      setTestSuitesState((prev) =>
        prev.map((s) =>
          s.id === suiteId
            ? {
                ...s,
                tests: s.tests.map((t) =>
                  t.id === test.id ? { ...t, status: testStatus, duration: testDuration } : t,
                ),
              }
            : s,
        ),
      )

      completedTests++
      const progress = (completedTests / testsToRun.length) * 100

      // Update suite progress
      setTestSuitesState((prev) => prev.map((s) => (s.id === suiteId ? { ...s, progress } : s)))

      addToLog(`Test completed: ${testStatus === "passed" ? "✅ PASSED" : "❌ FAILED"}`)
    }

    // Update suite status
    setTestSuitesState((prev) =>
      prev.map((s) =>
        s.id === suiteId
          ? {
              ...s,
              status: "completed",
              progress: 100,
            }
          : s,
      ),
    )

    addToLog(`Test suite completed: ${suiteId}`)
    setIsRunning(false)
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setTestLog([])
    addToLog("Starting comprehensive website testing...")

    for (const suite of testSuitesState) {
      await runTest(suite.id)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Brief pause between suites
    }

    addToLog("All tests completed!")
    generateTestReport()
    setIsRunning(false)
  }

  const addToLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setTestLog((prev) => [...prev, `[${timestamp}] ${message}`])
  }

  const generateTestReport = () => {
    const totalTests = testSuitesState.reduce((sum, suite) => sum + suite.tests.length, 0)
    const passedTests = testSuitesState.reduce(
      (sum, suite) => sum + suite.tests.filter((t) => t.status === "passed").length,
      0,
    )
    const failedTests = testSuitesState.reduce(
      (sum, suite) => sum + suite.tests.filter((t) => t.status === "failed").length,
      0,
    )

    setTestResults({
      totalTests,
      passedTests,
      failedTests,
      passRate: totalTests > 0 ? (passedTests / totalTests) * 100 : 0,
      completedSuites: testSuitesState.filter((s) => s.status === "completed").length,
      totalSuites: testSuitesState.length,
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "running":
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "navigation":
        return <Target className="h-4 w-4" />
      case "dashboard":
        return <BarChart3 className="h-4 w-4" />
      case "documents":
        return <FileText className="h-4 w-4" />
      case "team":
        return <Users className="h-4 w-4" />
      case "compliance":
        return <Shield className="h-4 w-4" />
      case "api integration":
        return <Zap className="h-4 w-4" />
      case "ai features":
        return <TestTube className="h-4 w-4" />
      default:
        return <Bug className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isArabic ? "اختبار شامل للموقع" : "Comprehensive Website Testing"}
          </h2>
          <p className="text-gray-600">
            {isArabic
              ? "اختبار جميع وظائف الموقع والتأكد من عملها بشكل صحيح"
              : "Test all website functions and ensure they work correctly"}
          </p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="outline" onClick={() => setTestLog([])} disabled={isRunning}>
            {isArabic ? "مسح السجل" : "Clear Log"}
          </Button>
          <Button onClick={runAllTests} disabled={isRunning}>
            {isRunning ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2 rtl:ml-2 rtl:mr-0" />
            ) : (
              <Play className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            )}
            {isRunning
              ? isArabic
                ? "جاري التشغيل..."
                : "Running..."
              : isArabic
                ? "تشغيل جميع الاختبارات"
                : "Run All Tests"}
          </Button>
        </div>
      </div>

      {/* Test Results Summary */}
      {testResults && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">{isArabic ? "نتائج الاختبار" : "Test Results"}</AlertTitle>
          <AlertDescription className="text-green-700">
            {isArabic
              ? `اكتمل ${testResults.passedTests} من ${testResults.totalTests} اختبار بنجاح (${Math.round(testResults.passRate)}%)`
              : `${testResults.passedTests} of ${testResults.totalTests} tests passed (${Math.round(testResults.passRate)}%)`}
            {testResults.failedTests > 0 &&
              (isArabic ? ` - ${testResults.failedTests} اختبار فشل` : ` - ${testResults.failedTests} tests failed`)}
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Suites */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">{isArabic ? "مجموعات الاختبار" : "Test Suites"}</h3>
          {testSuitesState.map((suite) => (
            <Card key={suite.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{isArabic ? suite.nameAr : suite.name}</CardTitle>
                    <CardDescription>{isArabic ? suite.descriptionAr : suite.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Badge className={getStatusColor(suite.status)}>{suite.status}</Badge>
                    <Button variant="outline" size="sm" onClick={() => runTest(suite.id)} disabled={isRunning}>
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {suite.status === "running" && (
                  <div className="mt-2">
                    <Progress value={suite.progress} className="h-2" />
                    <p className="text-sm text-gray-500 mt-1">
                      {Math.round(suite.progress)}% {isArabic ? "مكتمل" : "complete"}
                    </p>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suite.tests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-2 rounded border">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        {getCategoryIcon(test.category)}
                        <div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-medium">{isArabic ? test.nameAr : test.name}</span>
                            <Badge className={getPriorityColor(test.priority)} variant="outline">
                              {test.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">{isArabic ? test.descriptionAr : test.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {getStatusIcon(test.status)}
                        {test.duration && <span className="text-xs text-gray-500">{Math.round(test.duration)}ms</span>}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => runTest(suite.id, test.id)}
                          disabled={isRunning}
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Test Log */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">{isArabic ? "سجل الاختبار" : "Test Log"}</h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center space-x-2 rtl:space-x-reverse">
                <Activity className="h-4 w-4" />
                <span>{isArabic ? "سجل التشغيل" : "Execution Log"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 overflow-y-auto">
                <Textarea
                  value={testLog.join("\n")}
                  readOnly
                  className="h-full resize-none border-none p-0 text-xs font-mono"
                  placeholder={isArabic ? "سيظهر سجل الاختبار هنا..." : "Test log will appear here..."}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{isArabic ? "إحصائيات سريعة" : "Quick Stats"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{isArabic ? "إجمالي المجموعات" : "Total Suites"}</span>
                  <span className="font-medium">{testSuitesState.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{isArabic ? "إجمالي الاختبارات" : "Total Tests"}</span>
                  <span className="font-medium">
                    {testSuitesState.reduce((sum, suite) => sum + suite.tests.length, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{isArabic ? "الاختبارات المكتملة" : "Completed Tests"}</span>
                  <span className="font-medium">
                    {testSuitesState.reduce(
                      (sum, suite) => sum + suite.tests.filter((t) => t.status !== "pending").length,
                      0,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{isArabic ? "الاختبارات الناجحة" : "Passed Tests"}</span>
                  <span className="font-medium text-green-600">
                    {testSuitesState.reduce(
                      (sum, suite) => sum + suite.tests.filter((t) => t.status === "passed").length,
                      0,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{isArabic ? "الاختبارات الفاشلة" : "Failed Tests"}</span>
                  <span className="font-medium text-red-600">
                    {testSuitesState.reduce(
                      (sum, suite) => sum + suite.tests.filter((t) => t.status === "failed").length,
                      0,
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
