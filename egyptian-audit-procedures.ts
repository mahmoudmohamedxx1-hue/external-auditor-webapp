// Egyptian Audit Procedures Library
// Based on Egyptian Auditing Standards and the provided audit program

export interface AuditProcedure {
  code: string
  name: string
  nameAr: string
  category: string
  categoryAr: string
  estimatedHours: number
  riskLevel: "low" | "medium" | "high" | "critical"
  procedures: AuditStep[]
  complianceStandards: string[]
  aiRecommendations: string[]
  aiRecommendationsAr: string[]
}

export interface AuditStep {
  id: string
  description: string
  descriptionAr: string
  type: "substantive" | "control" | "analytical" | "inquiry" | "observation"
  aiAssisted: boolean
  estimatedMinutes: number
  evidence: string[]
  workpaperRef?: string
}

export const egyptianAuditProcedures: AuditProcedure[] = [
  // General Audit Procedures
  {
    code: "2240",
    name: "General Audit Procedures",
    nameAr: "إجراءات المراجعة العامة",
    category: "General",
    categoryAr: "عام",
    estimatedHours: 5,
    riskLevel: "medium",
    procedures: [
      {
        id: "2240-001",
        description: "Review and update understanding of client's business and industry",
        descriptionAr: "مراجعة وتحديث فهم أعمال العميل والصناعة",
        type: "inquiry",
        aiAssisted: true,
        estimatedMinutes: 120,
        evidence: ["Industry analysis", "Business overview", "AI market analysis"],
      },
      {
        id: "2240-002",
        description: "Assess changes in accounting policies and estimates",
        descriptionAr: "تقييم التغييرات في السياسات والتقديرات المحاسبية",
        type: "analytical",
        aiAssisted: true,
        estimatedMinutes: 90,
        evidence: ["Policy comparison", "Management representations", "AI variance analysis"],
      },
      {
        id: "2240-003",
        description: "Review board minutes and significant contracts",
        descriptionAr: "مراجعة محاضر مجلس الإدارة والعقود المهمة",
        type: "substantive",
        aiAssisted: false,
        estimatedMinutes: 180,
        evidence: ["Board minutes", "Contract files", "Legal confirmations"],
      },
    ],
    complianceStandards: ["EAS 315", "EAS 330", "ISA 315"],
    aiRecommendations: [
      "Use AI to analyze industry trends and benchmarks",
      "Implement automated policy change detection",
      "Apply NLP to extract key information from board minutes",
    ],
    aiRecommendationsAr: [
      "استخدام الذكاء الاصطناعي لتحليل اتجاهات الصناعة والمعايير",
      "تطبيق الكشف الآلي لتغييرات السياسات",
      "تطبيق معالجة اللغة الطبيعية لاستخراج المعلومات الرئيسية من محاضر الاجتماعات",
    ],
  },

  // Contingent Liabilities and Commitments
  {
    code: "2270",
    name: "Contingent Liabilities and Commitments",
    nameAr: "الالتزامات المحتملة والارتباطات العرضية",
    category: "Liabilities",
    categoryAr: "الخصوم",
    estimatedHours: 6,
    riskLevel: "high",
    procedures: [
      {
        id: "2270-001",
        description: "Review legal confirmations and pending litigation",
        descriptionAr: "مراجعة التأكيدات القانونية والدعاوى المعلقة",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 150,
        evidence: ["Legal confirmations", "Court documents", "AI legal risk assessment"],
      },
      {
        id: "2270-002",
        description: "Analyze guarantees and warranties provided",
        descriptionAr: "تحليل الضمانات والكفالات المقدمة",
        type: "analytical",
        aiAssisted: true,
        estimatedMinutes: 120,
        evidence: ["Guarantee agreements", "Warranty provisions", "AI exposure analysis"],
      },
      {
        id: "2270-003",
        description: "Test disclosure adequacy and completeness",
        descriptionAr: "اختبار كفاية واكتمال الإفصاح",
        type: "substantive",
        aiAssisted: false,
        estimatedMinutes: 90,
        evidence: ["Financial statements", "Disclosure checklist", "Management representations"],
      },
    ],
    complianceStandards: ["EAS 37", "EAS 10", "IAS 37"],
    aiRecommendations: [
      "Use AI to scan legal documents for potential liabilities",
      "Implement predictive modeling for warranty provisions",
      "Apply text analytics to identify undisclosed commitments",
    ],
    aiRecommendationsAr: [
      "استخدام الذكاء الاصطناعي لفحص الوثائق القانونية للالتزامات المحتملة",
      "تطبيق النمذجة التنبؤية لمخصصات الضمان",
      "تطبيق تحليل النصوص لتحديد الالتزامات غير المفصح عنها",
    ],
  },

  // Subsequent Events
  {
    code: "2290",
    name: "Subsequent Events",
    nameAr: "الأحداث اللاحقة",
    category: "General",
    categoryAr: "عام",
    estimatedHours: 7,
    riskLevel: "high",
    procedures: [
      {
        id: "2290-001",
        description: "Review events between balance sheet date and audit report date",
        descriptionAr: "مراجعة الأحداث بين تاريخ الميزانية وتاريخ تقرير المراجعة",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 180,
        evidence: ["Board minutes", "Management representations", "AI news analysis"],
      },
      {
        id: "2290-002",
        description: "Assess impact on financial statements and disclosures",
        descriptionAr: "تقييم التأثير على القوائم المالية والإفصاحات",
        type: "analytical",
        aiAssisted: true,
        estimatedMinutes: 120,
        evidence: ["Impact analysis", "Disclosure assessment", "AI materiality calculation"],
      },
      {
        id: "2290-003",
        description: "Obtain management representations on subsequent events",
        descriptionAr: "الحصول على إقرارات الإدارة بشأن الأحداث اللاحقة",
        type: "inquiry",
        aiAssisted: false,
        estimatedMinutes: 60,
        evidence: ["Management letter", "Signed representations", "Event documentation"],
      },
    ],
    complianceStandards: ["EAS 10", "EAS 560", "IAS 10"],
    aiRecommendations: [
      "Use AI to monitor news and market data for relevant events",
      "Implement automated materiality assessment for subsequent events",
      "Apply sentiment analysis to identify potential impact",
    ],
    aiRecommendationsAr: [
      "استخدام الذكاء الاصطناعي لمراقبة الأخبار وبيانات السوق للأحداث ذات الصلة",
      "تطبيق التقييم الآلي للأهمية النسبية للأحداث اللاحقة",
      "تطبيق تحليل المشاعر لتحديد التأثير المحتمل",
    ],
  },

  // Cash and Cash Equivalents
  {
    code: "5130",
    name: "Cash and Cash Equivalents",
    nameAr: "النقدية بالصندوق ولدى البنوك",
    category: "Assets",
    categoryAr: "الأصول",
    estimatedHours: 8,
    riskLevel: "high",
    procedures: [
      {
        id: "5130-001",
        description: "Perform cash count and verify cash on hand",
        descriptionAr: "إجراء جرد النقدية والتحقق من النقد في الصندوق",
        type: "substantive",
        aiAssisted: false,
        estimatedMinutes: 90,
        evidence: ["Cash count sheets", "Surprise count documentation", "Reconciliation"],
      },
      {
        id: "5130-002",
        description: "Test bank reconciliations and confirm balances",
        descriptionAr: "اختبار مطابقات البنك وتأكيد الأرصدة",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 180,
        evidence: ["Bank confirmations", "Reconciliation workpapers", "AI variance analysis"],
      },
      {
        id: "5130-003",
        description: "Review cash management controls and segregation of duties",
        descriptionAr: "مراجعة ضوابط إدارة النقدية وفصل المهام",
        type: "control",
        aiAssisted: true,
        estimatedMinutes: 120,
        evidence: ["Control documentation", "Process flowcharts", "AI control assessment"],
      },
      {
        id: "5130-004",
        description: "Test cutoff procedures and deposits in transit",
        descriptionAr: "اختبار إجراءات القطع والودائع في الطريق",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 90,
        evidence: ["Bank statements", "Deposit slips", "AI cutoff analysis"],
      },
    ],
    complianceStandards: ["EAS 7", "EAS 32", "IAS 7"],
    aiRecommendations: [
      "Use AI to detect unusual cash flow patterns",
      "Implement automated bank reconciliation verification",
      "Apply anomaly detection to identify potential cash management issues",
    ],
    aiRecommendationsAr: [
      "استخدام الذكاء الاصطناعي لاكتشاف أنماط التدفق النقدي غير العادية",
      "تطبيق التحقق الآلي من مطابقات البنك",
      "تطبيق كشف الشذوذ لتحديد مشاكل إدارة النقدية المحتملة",
    ],
  },

  // Trade Receivables and Other Debtors
  {
    code: "5230",
    name: "Trade Receivables and Other Debtors",
    nameAr: "المدينون والأرصدة المدينة الأخرى",
    category: "Assets",
    categoryAr: "الأصول",
    estimatedHours: 9,
    riskLevel: "medium",
    procedures: [
      {
        id: "5230-001",
        description: "Perform aging analysis and assess collectibility",
        descriptionAr: "إجراء تحليل التقادم وتقييم القابلية للتحصيل",
        type: "analytical",
        aiAssisted: true,
        estimatedMinutes: 150,
        evidence: ["Aging reports", "Collection history", "AI collectibility model"],
      },
      {
        id: "5230-002",
        description: "Send confirmations and follow up on responses",
        descriptionAr: "إرسال التأكيدات ومتابعة الردود",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 180,
        evidence: ["Confirmation letters", "Responses", "AI response analysis"],
      },
      {
        id: "5230-003",
        description: "Test bad debt provisions and write-offs",
        descriptionAr: "اختبار مخصصات الديون المعدومة والشطب",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 120,
        evidence: ["Provision calculations", "Write-off documentation", "AI adequacy assessment"],
      },
      {
        id: "5230-004",
        description: "Review credit policies and approval procedures",
        descriptionAr: "مراجعة سياسات الائتمان وإجراءات الموافقة",
        type: "control",
        aiAssisted: false,
        estimatedMinutes: 90,
        evidence: ["Credit policies", "Approval documentation", "Control testing"],
      },
    ],
    complianceStandards: ["EAS 39", "IFRS 9", "EAS 32"],
    aiRecommendations: [
      "Use machine learning for credit risk assessment",
      "Implement predictive analytics for bad debt provisions",
      "Apply AI to optimize confirmation selection",
    ],
    aiRecommendationsAr: [
      "استخدام التعلم الآلي لتقييم مخاطر الائتمان",
      "تطبيق التحليلات التنبؤية لمخصصات الديون المعدومة",
      "تطبيق الذكاء الاصطناعي لتحسين اختيار التأكيدات",
    ],
  },

  // Customers and Bills Receivable (Net)
  {
    code: "5330",
    name: "Customers and Bills Receivable (Net)",
    nameAr: "العملاء وأوراق القبض (بالصافي)",
    category: "Assets",
    categoryAr: "الأصول",
    estimatedHours: 10,
    riskLevel: "medium",
    procedures: [
      {
        id: "5330-001",
        description: "Test customer balances and payment terms",
        descriptionAr: "اختبار أرصدة العملاء وشروط الدفع",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 180,
        evidence: ["Customer statements", "Payment terms", "AI balance verification"],
      },
      {
        id: "5330-002",
        description: "Verify bills receivable authenticity and maturity",
        descriptionAr: "التحقق من صحة أوراق القبض وتواريخ الاستحقاق",
        type: "substantive",
        aiAssisted: false,
        estimatedMinutes: 120,
        evidence: ["Bills receivable register", "Original documents", "Maturity schedule"],
      },
      {
        id: "5330-003",
        description: "Test subsequent collections and cash receipts",
        descriptionAr: "اختبار التحصيلات اللاحقة والمقبوضات النقدية",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 150,
        evidence: ["Cash receipts", "Bank deposits", "AI collection analysis"],
      },
      {
        id: "5330-004",
        description: "Review allowance for doubtful accounts adequacy",
        descriptionAr: "مراجعة كفاية مخصص الديون المشكوك في تحصيلها",
        type: "analytical",
        aiAssisted: true,
        estimatedMinutes: 90,
        evidence: ["Allowance calculations", "Historical data", "AI adequacy model"],
      },
    ],
    complianceStandards: ["EAS 39", "IFRS 9", "EAS 18"],
    aiRecommendations: [
      "Use AI to predict collection patterns and optimize cash flow",
      "Implement automated matching of payments to invoices",
      "Apply machine learning for allowance estimation",
    ],
    aiRecommendationsAr: [
      "استخدام الذكاء الاصطناعي للتنبؤ بأنماط التحصيل وتحسين التدفق النقدي",
      "تطبيق المطابقة الآلية للمدفوعات مع الفواتير",
      "تطبيق التعلم الآلي لتقدير المخصصات",
    ],
  },

  // Inventory and Documentary Credits (Net)
  {
    code: "5430",
    name: "Inventory and Documentary Credits (Net)",
    nameAr: "المخزون والاعتمادات المستندية (بالصافي)",
    category: "Assets",
    categoryAr: "الأصول",
    estimatedHours: 12,
    riskLevel: "high",
    procedures: [
      {
        id: "5430-001",
        description: "Observe physical inventory count and test count procedures",
        descriptionAr: "مراقبة الجرد الفعلي واختبار إجراءات العد",
        type: "observation",
        aiAssisted: true,
        estimatedMinutes: 240,
        evidence: ["Count sheets", "Observation notes", "AI count verification"],
      },
      {
        id: "5430-002",
        description: "Test inventory valuation methods and calculations",
        descriptionAr: "اختبار طرق تقييم المخزون والحسابات",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 180,
        evidence: ["Valuation workpapers", "Cost records", "AI valuation analysis"],
      },
      {
        id: "5430-003",
        description: "Review slow-moving and obsolete inventory provisions",
        descriptionAr: "مراجعة مخصصات المخزون بطيء الحركة والمتقادم",
        type: "analytical",
        aiAssisted: true,
        estimatedMinutes: 150,
        evidence: ["Movement analysis", "Provision calculations", "AI obsolescence model"],
      },
      {
        id: "5430-004",
        description: "Test documentary credits and related commitments",
        descriptionAr: "اختبار الاعتمادات المستندية والالتزامات ذات الصلة",
        type: "substantive",
        aiAssisted: false,
        estimatedMinutes: 120,
        evidence: ["LC documentation", "Bank confirmations", "Commitment register"],
      },
    ],
    complianceStandards: ["EAS 2", "IAS 2", "EAS 37"],
    aiRecommendations: [
      "Use computer vision for automated inventory counting",
      "Implement AI-driven demand forecasting for obsolescence",
      "Apply machine learning for optimal inventory valuation",
    ],
    aiRecommendationsAr: [
      "استخدام الرؤية الحاسوبية للعد الآلي للمخزون",
      "تطبيق التنبؤ بالطلب المدفوع بالذكاء الاصطناعي للتقادم",
      "تطبيق التعلم الآلي للتقييم الأمثل للمخزون",
    ],
  },

  // Sales and Operating Revenue
  {
    code: "8130",
    name: "Sales and Operating Revenue",
    nameAr: "المبيعات وإيرادات النشاط",
    category: "Revenue",
    categoryAr: "الإيرادات",
    estimatedHours: 12,
    riskLevel: "high",
    procedures: [
      {
        id: "8130-001",
        description: "Test revenue recognition policies and timing",
        descriptionAr: "اختبار سياسات إقرار الإيرادات والتوقيت",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 180,
        evidence: ["Revenue policies", "Contract analysis", "AI timing verification"],
      },
      {
        id: "8130-002",
        description: "Perform analytical procedures on revenue trends",
        descriptionAr: "إجراء الإجراءات التحليلية على اتجاهات الإيرادات",
        type: "analytical",
        aiAssisted: true,
        estimatedMinutes: 120,
        evidence: ["Trend analysis", "Ratio calculations", "AI pattern recognition"],
      },
      {
        id: "8130-003",
        description: "Test cutoff procedures and period-end transactions",
        descriptionAr: "اختبار إجراءات القطع ومعاملات نهاية الفترة",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 150,
        evidence: ["Cutoff testing", "Period-end transactions", "AI cutoff analysis"],
      },
      {
        id: "8130-004",
        description: "Verify contract terms and performance obligations",
        descriptionAr: "التحقق من شروط العقد والتزامات الأداء",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 210,
        evidence: ["Contract files", "Performance analysis", "AI contract review"],
      },
    ],
    complianceStandards: ["EAS 18", "IFRS 15", "EAS 11"],
    aiRecommendations: [
      "Use AI to analyze contract terms and identify revenue recognition issues",
      "Implement automated revenue trend analysis and anomaly detection",
      "Apply machine learning for performance obligation assessment",
    ],
    aiRecommendationsAr: [
      "استخدام الذكاء الاصطناعي لتحليل شروط العقد وتحديد مشاكل إقرار الإيرادات",
      "تطبيق تحليل اتجاهات الإيرادات الآلي وكشف الشذوذ",
      "تطبيق التعلم الآلي لتقييم التزامات الأداء",
    ],
  },

  // Cost of Activities
  {
    code: "8230",
    name: "Cost of Activities",
    nameAr: "تكاليف النشاط",
    category: "Expenses",
    categoryAr: "المصروفات",
    estimatedHours: 10,
    riskLevel: "medium",
    procedures: [
      {
        id: "8230-001",
        description: "Test cost allocation methods and accuracy",
        descriptionAr: "اختبار طرق توزيع التكاليف والدقة",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 180,
        evidence: ["Cost allocation sheets", "Methodology documentation", "AI accuracy verification"],
      },
      {
        id: "8230-002",
        description: "Verify direct costs and supporting documentation",
        descriptionAr: "التحقق من التكاليف المباشرة والوثائق المؤيدة",
        type: "substantive",
        aiAssisted: false,
        estimatedMinutes: 150,
        evidence: ["Invoices", "Purchase orders", "Receiving reports"],
      },
      {
        id: "8230-003",
        description: "Analyze cost trends and gross margin variations",
        descriptionAr: "تحليل اتجاهات التكلفة وتغيرات الهامش الإجمالي",
        type: "analytical",
        aiAssisted: true,
        estimatedMinutes: 120,
        evidence: ["Cost analysis", "Margin calculations", "AI trend analysis"],
      },
      {
        id: "8230-004",
        description: "Test overhead allocation and absorption rates",
        descriptionAr: "اختبار توزيع التكاليف العامة ومعدلات الامتصاص",
        type: "substantive",
        aiAssisted: true,
        estimatedMinutes: 150,
        evidence: ["Overhead calculations", "Absorption rates", "AI allocation verification"],
      },
    ],
    complianceStandards: ["EAS 2", "IAS 2", "EAS 23"],
    aiRecommendations: [
      "Use AI to optimize cost allocation algorithms",
      "Implement predictive analytics for cost trend analysis",
      "Apply machine learning for overhead rate optimization",
    ],
    aiRecommendationsAr: [
      "استخدام الذكاء الاصطناعي لتحسين خوارزميات توزيع التكاليف",
      "تطبيق التحليلات التنبؤية لتحليل اتجاهات التكلفة",
      "تطبيق التعلم الآلي لتحسين معدلات التكاليف العامة",
    ],
  },
]

// Helper functions for audit procedure management
export function getAuditProcedureByCode(code: string): AuditProcedure | undefined {
  return egyptianAuditProcedures.find((procedure) => procedure.code === code)
}

export function getAuditProceduresByCategory(category: string): AuditProcedure[] {
  return egyptianAuditProcedures.filter((procedure) => procedure.category === category)
}

export function getAuditProceduresByRiskLevel(riskLevel: string): AuditProcedure[] {
  return egyptianAuditProcedures.filter((procedure) => procedure.riskLevel === riskLevel)
}

export function calculateTotalEstimatedHours(procedures: AuditProcedure[]): number {
  return procedures.reduce((total, procedure) => total + procedure.estimatedHours, 0)
}

export function getAIAssistedSteps(procedure: AuditProcedure): AuditStep[] {
  return procedure.procedures.filter((step) => step.aiAssisted)
}

export function generateAuditProgram(clientName: string, period: string, procedures: AuditProcedure[]) {
  return {
    clientName,
    period,
    procedures,
    totalHours: calculateTotalEstimatedHours(procedures),
    aiAssistedSteps: procedures.reduce((total, proc) => total + getAIAssistedSteps(proc).length, 0),
    generatedDate: new Date().toISOString(),
  }
}
