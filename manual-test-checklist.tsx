"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, AlertTriangle, Download } from "lucide-react"

interface ManualTestItem {
  id: string
  category: string
  categoryAr: string
  test: string
  testAr: string
  steps: string[]
  stepsAr: string[]
  expectedResult: string
  expectedResultAr: string
  priority: "critical" | "high" | "medium" | "low"
  status: "pending" | "passed" | "failed" | "blocked"
  notes?: string
}

const manualTests: ManualTestItem[] = [
  {
    id: "ui-1",
    category: "User Interface",
    categoryAr: "واجهة المستخدم",
    test: "Responsive Design Test",
    testAr: "اختبار التصميم المتجاوب",
    steps: [
      "Open the website on desktop (1920x1080)",
      "Resize browser to tablet size (768x1024)",
      "Resize browser to mobile size (375x667)",
      "Check all pages for layout issues",
      "Verify navigation menu works on all sizes",
    ],
    stepsAr: [
      "افتح الموقع على سطح المكتب (1920x1080)",
      "غير حجم المتصفح إلى حجم الجهاز اللوحي (768x1024)",
      "غير حجم المتصفح إلى حجم الهاتف المحمول (375x667)",
      "تحقق من جميع الصفحات لمشاكل التخطيط",
      "تأكد من عمل قائمة التنقل على جميع الأحجام",
    ],
    expectedResult: "Layout adapts properly to all screen sizes without horizontal scrolling",
    expectedResultAr: "يتكيف التخطيط بشكل صحيح مع جميع أحجام الشاشة بدون تمرير أفقي",
    priority: "critical",
    status: "pending",
  },
  {
    id: "ui-2",
    category: "User Interface",
    categoryAr: "واجهة المستخدم",
    test: "Arabic RTL Layout Test",
    testAr: "اختبار تخطيط RTL العربي",
    steps: [
      "Switch language to Arabic",
      "Verify text direction is right-to-left",
      "Check navigation menu alignment",
      "Verify form field alignment",
      "Check chart and table alignment",
    ],
    stepsAr: [
      "بدل اللغة إلى العربية",
      "تأكد من أن اتجاه النص من اليمين إلى اليسار",
      "تحقق من محاذاة قائمة التنقل",
      "تأكد من محاذاة حقول النموذج",
      "تحقق من محاذاة المخططات والجداول",
    ],
    expectedResult: "All UI elements properly align for RTL reading direction",
    expectedResultAr: "جميع عناصر واجهة المستخدم تتماشى بشكل صحيح مع اتجاه القراءة من اليمين إلى اليسار",
    priority: "critical",
    status: "pending",
  },
  {
    id: "nav-1",
    category: "Navigation",
    categoryAr: "التنقل",
    test: "Main Navigation Test",
    testAr: "اختبار التنقل الرئيسي",
    steps: [
      "Click on Dashboard link",
      "Click on Documents link",
      "Click on Risk Assessment link",
      "Click on Checklists link",
      "Click on Reports link",
      "Click on Team link",
      "Click on Compliance link",
      "Click on Settings link",
    ],
    stepsAr: [
      "انقر على رابط لوحة التحكم",
      "انقر على رابط المستندات",
      "انقر على رابط تقييم المخاطر",
      "انقر على رابط قوائم المراجعة",
      "انقر على رابط التقارير",
      "انقر على رابط الفريق",
      "انقر على رابط الامتثال",
      "انقر على رابط الإعدادات",
    ],
    expectedResult: "All navigation links work and load the correct pages",
    expectedResultAr: "جميع روابط التنقل تعمل وتحمل الصفحات الصحيحة",
    priority: "critical",
    status: "pending",
  },
  {
    id: "dash-1",
    category: "Dashboard",
    categoryAr: "لوحة التحكم",
    test: "Dashboard Charts Test",
    testAr: "اختبار مخططات لوحة التحكم",
    steps: [
      "Navigate to Dashboard page",
      "Verify all statistics cards display numbers",
      "Check that bar chart renders properly",
      "Check that pie chart renders properly",
      "Hover over chart elements to see tooltips",
      "Verify chart responsiveness on mobile",
    ],
    stepsAr: [
      "انتقل إلى صفحة لوحة التحكم",
      "تأكد من أن جميع بطاقات الإحصائيات تعرض الأرقام",
      "تحقق من أن المخطط الشريطي يعرض بشكل صحيح",
      "تحقق من أن المخطط الدائري يعرض بشكل صحيح",
      "مرر فوق عناصر المخطط لرؤية التلميحات",
      "تأكد من استجابة المخططات على الهاتف المحمول",
    ],
    expectedResult: "All charts render correctly with proper data and interactions",
    expectedResultAr: "جميع المخططات تعرض بشكل صحيح مع البيانات والتفاعلات المناسبة",
    priority: "high",
    status: "pending",
  },
  {
    id: "doc-1",
    category: "Documents",
    categoryAr: "المستندات",
    test: "Document Management Test",
    testAr: "اختبار إدارة المستندات",
    steps: [
      "Navigate to Documents page",
      "Verify document list displays",
      "Test search functionality with keywords",
      "Test category filter dropdown",
      "Click on Upload Document button",
      "Fill out upload form",
      "Test form validation",
    ],
    stepsAr: [
      "انتقل إلى صفحة المستندات",
      "تأكد من عرض قائمة المستندات",
      "اختبر وظيفة البحث بالكلمات المفتاحية",
      "اختبر قائمة تصفية الفئات المنسدلة",
      "انقر على زر رفع المستند",
      "املأ نموذج الرفع",
      "اختبر التحقق من النموذج",
    ],
    expectedResult: "Document management features work correctly including search and upload",
    expectedResultAr: "ميزات إدارة المستندات تعمل بشكل صحيح بما في ذلك البحث والرفع",
    priority: "high",
    status: "pending",
  },
  {
    id: "risk-1",
    category: "Risk Assessment",
    categoryAr: "تقييم المخاطر",
    test: "Risk Assessment Features Test",
    testAr: "اختبار ميزات تقييم المخاطر",
    steps: [
      "Navigate to Risk Assessment page",
      "Verify risk category statistics",
      "Switch to Heatmap tab",
      "Test scatter plot interactions",
      "Switch to Trends tab",
      "Verify line chart displays",
      "Switch to Risk Items tab",
      "Check risk item details",
    ],
    stepsAr: [
      "انتقل إلى صفحة تقييم المخاطر",
      "تأكد من إحصائيات فئات المخاطر",
      "بدل إلى تبويب الخريطة الحرارية",
      "اختبر تفاعلات المخطط المبعثر",
      "بدل إلى تبويب الاتجاهات",
      "تأكد من عرض المخطط الخطي",
      "بدل إلى تبويب عناصر المخاطر",
      "تحقق من تفاصيل عناصر المخاطر",
    ],
    expectedResult: "All risk assessment tabs and features function properly",
    expectedResultAr: "جميع تبويبات وميزات تقييم المخاطر تعمل بشكل صحيح",
    priority: "high",
    status: "pending",
  },
  {
    id: "check-1",
    category: "Checklists",
    categoryAr: "قوائم المراجعة",
    test: "Checklist Management Test",
    testAr: "اختبار إدارة قوائم المراجعة",
    steps: [
      "Navigate to Checklists page",
      "Verify active checklists display",
      "Check progress bars",
      "Switch to Templates tab",
      "Verify template cards display",
      "Click on a checklist to view details",
      "Test checklist item interactions",
    ],
    stepsAr: [
      "انتقل إلى صفحة قوائم المراجعة",
      "تأكد من عرض قوائم المراجعة النشطة",
      "تحقق من أشرطة التقدم",
      "بدل إلى تبويب القوالب",
      "تأكد من عرض بطاقات القوالب",
      "انقر على قائمة مراجعة لعرض التفاصيل",
      "اختبر تفاعلات عناصر قائمة المراجعة",
    ],
    expectedResult: "Checklist management features work including progress tracking",
    expectedResultAr: "ميزات إدارة قوائم المراجعة تعمل بما في ذلك تتبع التقدم",
    priority: "high",
    status: "pending",
  },
  {
    id: "rep-1",
    category: "Reports",
    categoryAr: "التقارير",
    test: "Report Generation Test",
    testAr: "اختبار إنشاء التقارير",
    steps: [
      "Navigate to Reports page",
      "Verify report metrics display",
      "Check generated reports list",
      "Switch to Templates tab",
      "Verify template information",
      "Switch to Analytics tab",
      "Check analytics charts",
    ],
    stepsAr: [
      "انتقل إلى صفحة التقارير",
      "تأكد من عرض مقاييس التقارير",
      "تحقق من قائمة التقارير المُنشأة",
      "بدل إلى تبويب القوالب",
      "تأكد من معلومات القوالب",
      "بدل إلى تبويب التحليلات",
      "تحقق من مخططات التحليلات",
    ],
    expectedResult: "Report generation and analytics features work correctly",
    expectedResultAr: "ميزات إنشاء التقارير والتحليلات تعمل بشكل صحيح",
    priority: "medium",
    status: "pending",
  },
  {
    id: "team-1",
    category: "Team Management",
    categoryAr: "إدارة الفريق",
    test: "Team Management Test",
    testAr: "اختبار إدارة الفريق",
    steps: [
      "Navigate to Team page",
      "Verify team overview statistics",
      "Check team member cards",
      "Switch to Departments tab",
      "Verify department information",
      "Switch to Workload tab",
      "Check workload distribution",
    ],
    stepsAr: [
      "انتقل إلى صفحة الفريق",
      "تأكد من إحصائيات نظرة عامة على الفريق",
      "تحقق من بطاقات أعضاء الفريق",
      "بدل إلى تبويب الأقسام",
      "تأكد من معلومات الأقسام",
      "بدل إلى تبويب عبء العمل",
      "تحقق من توزيع عبء العمل",
    ],
    expectedResult: "Team management features display correctly with proper data",
    expectedResultAr: "ميزات إدارة الفريق تعرض بشكل صحيح مع البيانات المناسبة",
    priority: "medium",
    status: "pending",
  },
  {
    id: "comp-1",
    category: "Compliance",
    categoryAr: "الامتثال",
    test: "Compliance Management Test",
    testAr: "اختبار إدارة الامتثال",
    steps: [
      "Navigate to Compliance page",
      "Verify compliance overview",
      "Check standards list",
      "Switch to Trends tab",
      "Verify trend chart",
      "Switch to Updates tab",
      "Check recent updates",
      "Switch to Actions tab",
      "Verify compliance actions",
    ],
    stepsAr: [
      "انتقل إلى صفحة الامتثال",
      "تأكد من نظرة عامة على الامتثال",
      "تحقق من قائمة المعايير",
      "بدل إلى تبويب الاتجاهات",
      "تأكد من مخطط الاتجاهات",
      "بدل إلى تبويب التحديثات",
      "تحقق من التحديثات الأخيرة",
      "بدل إلى تبويب الإجراءات",
      "تأكد من إجراءات الامتثال",
    ],
    expectedResult: "All compliance management tabs and features work properly",
    expectedResultAr: "جميع تبويبات وميزات إدارة الامتثال تعمل بشكل صحيح",
    priority: "medium",
    status: "pending",
  },
  {
    id: "perf-1",
    category: "Performance",
    categoryAr: "الأداء",
    test: "Page Load Performance Test",
    testAr: "اختبار أداء تحميل الصفحة",
    steps: [
      "Open browser developer tools",
      "Navigate to each page and measure load time",
      "Check for console errors",
      "Verify images load properly",
      "Test on slow network connection",
      "Check memory usage",
    ],
    stepsAr: [
      "افتح أدوات المطور في المتصفح",
      "انتقل إلى كل صفحة وقس وقت التحميل",
      "تحقق من أخطاء وحدة التحكم",
      "تأكد من تحميل الصور بشكل صحيح",
      "اختبر على اتصال شبكة بطيء",
      "تحقق من استخدام الذاكرة",
    ],
    expectedResult: "All pages load within 3 seconds with no console errors",
    expectedResultAr: "جميع الصفحات تحمل خلال 3 ثوانٍ بدون أخطاء في وحدة التحكم",
    priority: "high",
    status: "pending",
  },
  {
    id: "acc-1",
    category: "Accessibility",
    categoryAr: "إمكانية الوصول",
    test: "Accessibility Compliance Test",
    testAr: "اختبار الامتثال لإمكانية الوصول",
    steps: [
      "Test keyboard navigation through all pages",
      "Verify alt text on all images",
      "Check color contrast ratios",
      "Test with screen reader",
      "Verify ARIA labels",
      "Check focus indicators",
    ],
    stepsAr: [
      "اختبر التنقل بلوحة المفاتيح عبر جميع الصفحات",
      "تأكد من النص البديل على جميع الصور",
      "تحقق من نسب تباين الألوان",
      "اختبر مع قارئ الشاشة",
      "تأكد من تسميات ARIA",
      "تحقق من مؤشرات التركيز",
    ],
    expectedResult: "Website meets WCAG 2.1 AA accessibility standards",
    expectedResultAr: "الموقع يلبي معايير إمكانية الوصول WCAG 2.1 AA",
    priority: "high",
    status: "pending",
  },
]

interface ManualTestChecklistProps {
  isArabic: boolean
}

export function ManualTestChecklist({ isArabic }: ManualTestChecklistProps) {
  const [tests, setTests] = useState<ManualTestItem[]>(manualTests)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [testNotes, setTestNotes] = useState<Record<string, string>>({})

  const updateTestStatus = (testId: string, status: ManualTestItem["status"]) => {
    setTests((prev) => prev.map((test) => (test.id === testId ? { ...test, status } : test)))
  }

  const updateTestNotes = (testId: string, notes: string) => {
    setTestNotes((prev) => ({ ...prev, [testId]: notes }))
    setTests((prev) => prev.map((test) => (test.id === testId ? { ...test, notes } : test)))
  }

  const getStatusIcon = (status: ManualTestItem["status"]) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "blocked":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
    }
  }

  const getStatusColor = (status: ManualTestItem["status"]) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "blocked":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: ManualTestItem["priority"]) => {
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

  const categories = Array.from(new Set(tests.map((test) => test.category)))
  const filteredTests = selectedCategory === "all" ? tests : tests.filter((test) => test.category === selectedCategory)

  const totalTests = tests.length
  const passedTests = tests.filter((test) => test.status === "passed").length
  const failedTests = tests.filter((test) => test.status === "failed").length
  const blockedTests = tests.filter((test) => test.status === "blocked").length
  const completedTests = passedTests + failedTests + blockedTests
  const progressPercentage = totalTests > 0 ? (completedTests / totalTests) * 100 : 0

  const generateReport = () => {
    const report = {
      summary: {
        totalTests,
        passedTests,
        failedTests,
        blockedTests,
        progressPercentage: Math.round(progressPercentage),
      },
      testResults: tests.map((test) => ({
        id: test.id,
        category: isArabic ? test.categoryAr : test.category,
        test: isArabic ? test.testAr : test.test,
        status: test.status,
        priority: test.priority,
        notes: test.notes || "",
      })),
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `manual-test-report-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isArabic ? "قائمة الاختبار اليدوي" : "Manual Test Checklist"}
          </h2>
          <p className="text-gray-600">
            {isArabic
              ? "قائمة شاملة للاختبارات اليدوية للتحقق من جميع وظائف الموقع"
              : "Comprehensive manual testing checklist to verify all website functions"}
          </p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="outline" onClick={generateReport}>
            <Download className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {isArabic ? "تحميل التقرير" : "Download Report"}
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{isArabic ? "نظرة عامة على التقدم" : "Progress Overview"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalTests}</div>
              <div className="text-sm text-gray-600">{isArabic ? "إجمالي الاختبارات" : "Total Tests"}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{passedTests}</div>
              <div className="text-sm text-gray-600">{isArabic ? "نجح" : "Passed"}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{failedTests}</div>
              <div className="text-sm text-gray-600">{isArabic ? "فشل" : "Failed"}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{blockedTests}</div>
              <div className="text-sm text-gray-600">{isArabic ? "محجوب" : "Blocked"}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round(progressPercentage)}%</div>
              <div className="text-sm text-gray-600">{isArabic ? "مكتمل" : "Complete"}</div>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
        >
          {isArabic ? "جميع الفئات" : "All Categories"}
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {isArabic ? tests.find((t) => t.category === category)?.categoryAr : category}
          </Button>
        ))}
      </div>

      {/* Test Items */}
      <div className="space-y-4">
        {filteredTests.map((test) => (
          <Card key={test.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  {getStatusIcon(test.status)}
                  <div>
                    <CardTitle className="text-base">{isArabic ? test.testAr : test.test}</CardTitle>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                      <Badge variant="outline">{isArabic ? test.categoryAr : test.category}</Badge>
                      <Badge className={getPriorityColor(test.priority)}>{test.priority}</Badge>
                      <Badge className={getStatusColor(test.status)}>{test.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" size="sm" onClick={() => updateTestStatus(test.id, "passed")}>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => updateTestStatus(test.id, "failed")}>
                    <XCircle className="h-4 w-4 text-red-600" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => updateTestStatus(test.id, "blocked")}>
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="steps" className="w-full">
                <TabsList>
                  <TabsTrigger value="steps">{isArabic ? "الخطوات" : "Steps"}</TabsTrigger>
                  <TabsTrigger value="expected">{isArabic ? "النتيجة المتوقعة" : "Expected Result"}</TabsTrigger>
                  <TabsTrigger value="notes">{isArabic ? "الملاحظات" : "Notes"}</TabsTrigger>
                </TabsList>

                <TabsContent value="steps" className="mt-4">
                  <div className="space-y-2">
                    {(isArabic ? test.stepsAr : test.steps).map((step, index) => (
                      <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="expected" className="mt-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800">{isArabic ? test.expectedResultAr : test.expectedResult}</p>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="mt-4">
                  <Textarea
                    placeholder={isArabic ? "أضف ملاحظات الاختبار..." : "Add test notes..."}
                    value={testNotes[test.id] || test.notes || ""}
                    onChange={(e) => updateTestNotes(test.id, e.target.value)}
                    className="min-h-[100px]"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
