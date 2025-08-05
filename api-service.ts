import { apiClient } from "./api-client"
import { getAPIEndpoint } from "./api-config"
import { getEnvironmentConfig } from "./environment-setup"

// Mock data for development and fallback
const MOCK_DATA = {
  taxVerification: {
    taxNumber: "123456789",
    companyName: "بيت الخبره للتاجير التمويلي",
    companyNameEn: "Bayt ElKhebra for Financial Leasing",
    status: "active",
    statusAr: "نشط",
    registrationDate: "2020-01-15",
    lastDeclaration: "2024-12-31",
    taxType: "corporate",
    taxTypeAr: "شركات",
    compliance: {
      status: "compliant",
      statusAr: "ملتزم",
      score: 95,
      lastAudit: "2024-06-15",
      issues: [],
    },
  },
  commercialRegistry: {
    registrationNumber: "12345",
    companyName: "بيت الخبره للتاجير التمويلي",
    companyNameEn: "Bayt ElKhebra for Financial Leasing",
    legalForm: "مساهمة",
    legalFormEn: "Joint Stock Company",
    establishmentDate: "2020-01-15",
    capital: 10000000,
    currency: "EGP",
    status: "active",
    statusAr: "نشط",
    activities: [{ code: "6491", description: "Financial leasing", descriptionAr: "التأجير التمويلي" }],
    address: {
      governorate: "Cairo",
      governorateAr: "القاهرة",
      city: "Maadi",
      cityAr: "المعادي",
      street: "62 Corniche El Nil",
      streetAr: "62 كورنيش النيل",
    },
  },
  exchangeRates: {
    date: "2024-01-22",
    baseCurrency: "EGP",
    rates: {
      USD: 30.85,
      EUR: 33.42,
      GBP: 39.15,
      SAR: 8.23,
      AED: 8.4,
      KWD: 100.25,
    },
    lastUpdated: "2024-01-22T14:30:00Z",
  },
  efraCompliance: {
    licenseNumber: "EFRA-2024-001",
    companyName: "بيت الخبره للتاجير التمويلي",
    licenseType: "Financial Leasing",
    licenseTypeAr: "التأجير التمويلي",
    status: "active",
    statusAr: "نشط",
    issueDate: "2024-01-01",
    expiryDate: "2025-12-31",
    compliance: {
      status: "compliant",
      statusAr: "ملتزم",
      lastReview: "2024-06-15",
      nextReview: "2024-12-15",
      requirements: [
        { id: 1, description: "Capital adequacy", descriptionAr: "كفاية رأس المال", status: "met" },
        { id: 2, description: "Risk management", descriptionAr: "إدارة المخاطر", status: "met" },
        { id: 3, description: "Governance", descriptionAr: "الحوكمة", status: "met" },
      ],
    },
  },
  stockData: {
    symbol: "BKHR",
    companyName: "Bayt ElKhebra for Financial Leasing",
    companyNameAr: "بيت الخبره للتاجير التمويلي",
    sector: "Financial Services",
    sectorAr: "الخدمات المالية",
    marketCap: 500000000,
    currency: "EGP",
    lastPrice: 25.5,
    change: 0.75,
    changePercent: 3.03,
    volume: 125000,
    high52Week: 28.9,
    low52Week: 18.2,
    lastUpdated: "2024-01-22T15:30:00Z",
  },
  socialInsurance: {
    employerId: "SI-123456",
    companyName: "بيت الخبره للتاجير التمويلي",
    registrationDate: "2020-02-01",
    status: "active",
    statusAr: "نشط",
    employeeCount: 45,
    lastContribution: "2024-01-15",
    compliance: {
      status: "compliant",
      statusAr: "ملتزم",
      contributionRate: 26.0,
      outstandingAmount: 0,
      lastAudit: "2024-03-15",
    },
    employees: [
      {
        id: "EMP-001",
        name: "محمد أحمد علي",
        nationalId: "12345678901234",
        position: "مدير مالي",
        salary: 15000,
        contributionAmount: 3900,
      },
    ],
  },
  environmentalCompliance: {
    permitNumber: "ENV-2024-001",
    companyName: "بيت الخبره للتاجير التمويلي",
    permitType: "Environmental Management",
    permitTypeAr: "الإدارة البيئية",
    status: "valid",
    statusAr: "صالح",
    issueDate: "2024-01-01",
    expiryDate: "2025-12-31",
    compliance: {
      status: "compliant",
      statusAr: "ملتزم",
      lastInspection: "2024-09-15",
      nextInspection: "2025-03-15",
      violations: [],
    },
  },
  accountingStandards: {
    applicableStandards: [
      {
        code: "EAS-1",
        title: "Presentation of Financial Statements",
        titleAr: "عرض القوائم المالية",
        effectiveDate: "2024-01-01",
        status: "active",
      },
      {
        code: "EAS-15",
        title: "Leases",
        titleAr: "عقود الإيجار",
        effectiveDate: "2024-01-01",
        status: "active",
      },
    ],
    lastUpdate: "2024-01-15",
    complianceStatus: "compliant",
    complianceStatusAr: "ملتزم",
  },
  aiAnalysis: {
    riskScore: 25,
    riskLevel: "low",
    riskLevelAr: "منخفض",
    confidence: 0.92,
    factors: [
      {
        category: "Financial",
        categoryAr: "مالي",
        score: 85,
        weight: 0.4,
        indicators: [
          { name: "Liquidity Ratio", nameAr: "نسبة السيولة", value: 1.8, benchmark: 1.5 },
          { name: "Debt to Equity", nameAr: "نسبة الدين إلى حقوق الملكية", value: 0.6, benchmark: 1.0 },
        ],
      },
      {
        category: "Compliance",
        categoryAr: "الامتثال",
        score: 95,
        weight: 0.3,
        indicators: [
          { name: "Tax Compliance", nameAr: "الامتثال الضريبي", value: 100, benchmark: 95 },
          { name: "Regulatory Compliance", nameAr: "الامتثال التنظيمي", value: 98, benchmark: 90 },
        ],
      },
      {
        category: "Operational",
        categoryAr: "تشغيلي",
        score: 78,
        weight: 0.3,
        indicators: [
          { name: "Employee Turnover", nameAr: "معدل دوران الموظفين", value: 12, benchmark: 15 },
          { name: "Customer Satisfaction", nameAr: "رضا العملاء", value: 4.2, benchmark: 4.0 },
        ],
      },
    ],
    recommendations: [
      {
        priority: "medium",
        priorityAr: "متوسط",
        category: "Operational",
        categoryAr: "تشغيلي",
        description: "Consider implementing additional employee retention programs",
        descriptionAr: "النظر في تنفيذ برامج إضافية للاحتفاظ بالموظفين",
      },
    ],
    lastAnalysis: "2024-01-22T16:00:00Z",
  },
}

class APIService {
  private config = getEnvironmentConfig()

  private async makeRequest<T>(endpointId: string, path: string, options?: RequestInit): Promise<T> {
    const endpoint = getAPIEndpoint(endpointId)

    if (!endpoint) {
      throw new Error(`Unknown endpoint: ${endpointId}`)
    }

    try {
      // In development or when mock data is enabled, return mock data
      if (this.config.enableMockData) {
        await this.simulateNetworkDelay()
        return this.getMockData(endpointId, path) as T
      }

      // Make actual API request
      return await apiClient.request<T>(endpoint, path, options)
    } catch (error) {
      console.error(`API request failed for ${endpointId}${path}:`, error)

      // Fallback to mock data if API fails
      if (this.config.nodeEnv !== "production") {
        console.warn(`Falling back to mock data for ${endpointId}`)
        await this.simulateNetworkDelay()
        return this.getMockData(endpointId, path) as T
      }

      throw error
    }
  }

  private async simulateNetworkDelay(): Promise<void> {
    const delay = Math.random() * 1000 + 200 // 200-1200ms
    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  private getMockData(endpointId: string, path: string): any {
    // Return appropriate mock data based on endpoint and path
    switch (endpointId) {
      case "tax-authority":
        if (path.includes("/verify")) return MOCK_DATA.taxVerification
        break
      case "commercial-registry":
        if (path.includes("/company")) return MOCK_DATA.commercialRegistry
        break
      case "cbe":
        if (path.includes("/exchange-rates")) return MOCK_DATA.exchangeRates
        break
      case "efra":
        if (path.includes("/compliance")) return MOCK_DATA.efraCompliance
        break
      case "egx":
        if (path.includes("/stock")) return MOCK_DATA.stockData
        break
      case "esia":
        if (path.includes("/employer")) return MOCK_DATA.socialInsurance
        break
      case "eeaa":
        if (path.includes("/compliance")) return MOCK_DATA.environmentalCompliance
        break
      case "easb":
        if (path.includes("/standards")) return MOCK_DATA.accountingStandards
        break
    }

    return { status: "success", message: "Mock response", data: {} }
  }

  // Tax Authority API methods
  async verifyTaxNumber(taxNumber: string) {
    return this.makeRequest("tax-authority", `/verify/${taxNumber}`)
  }

  async getTaxComplianceStatus(taxNumber: string) {
    return this.makeRequest("tax-authority", `/compliance/${taxNumber}`)
  }

  async submitTaxDeclaration(taxNumber: string, declaration: any) {
    return this.makeRequest("tax-authority", `/declarations/${taxNumber}`, {
      method: "POST",
      body: JSON.stringify(declaration),
    })
  }

  // Commercial Registry API methods
  async verifyCommercialRegistration(registrationNumber: string) {
    return this.makeRequest("commercial-registry", `/company/${registrationNumber}`)
  }

  async searchCompanies(query: string) {
    return this.makeRequest("commercial-registry", `/search?q=${encodeURIComponent(query)}`)
  }

  async getCompanyDetails(registrationNumber: string) {
    return this.makeRequest("commercial-registry", `/company/${registrationNumber}/details`)
  }

  // Central Bank of Egypt API methods
  async getCBEExchangeRates() {
    return this.makeRequest("cbe", "/exchange-rates")
  }

  async getCBEInterestRates() {
    return this.makeRequest("cbe", "/interest-rates")
  }

  async getBankingRegulations() {
    return this.makeRequest("cbe", "/regulations")
  }

  // EFRA API methods
  async getEFRAComplianceStatus(licenseNumber: string) {
    return this.makeRequest("efra", `/compliance/${licenseNumber}`)
  }

  async getEFRALicenses(companyId: string) {
    return this.makeRequest("efra", `/licenses/${companyId}`)
  }

  async submitEFRAReport(licenseNumber: string, report: any) {
    return this.makeRequest("efra", `/reports/${licenseNumber}`, {
      method: "POST",
      body: JSON.stringify(report),
    })
  }

  // Egyptian Stock Exchange API methods
  async getEGXStockData(symbol: string) {
    return this.makeRequest("egx", `/stock/${symbol}`)
  }

  async getEGXMarketData() {
    return this.makeRequest("egx", "/market/summary")
  }

  async getEGXDisclosures(symbol: string) {
    return this.makeRequest("egx", `/disclosures/${symbol}`)
  }

  // Egyptian Social Insurance Authority API methods
  async verifyESIAEmployer(employerId: string) {
    return this.makeRequest("esia", `/employer/${employerId}`)
  }

  async getESIAEmployeeData(employerId: string, employeeId: string) {
    return this.makeRequest("esia", `/employer/${employerId}/employee/${employeeId}`)
  }

  async getESIAContributions(employerId: string) {
    return this.makeRequest("esia", `/employer/${employerId}/contributions`)
  }

  // Egyptian Environmental Affairs Agency API methods
  async getEEAAComplianceStatus(permitNumber: string) {
    return this.makeRequest("eeaa", `/compliance/${permitNumber}`)
  }

  async getEEAAPermits(companyId: string) {
    return this.makeRequest("eeaa", `/permits/${companyId}`)
  }

  async submitEEAAReport(permitNumber: string, report: any) {
    return this.makeRequest("eeaa", `/reports/${permitNumber}`, {
      method: "POST",
      body: JSON.stringify(report),
    })
  }

  // Egyptian Accounting Standards Board API methods
  async getEASBStandards() {
    return this.makeRequest("easb", "/standards")
  }

  async getEASBUpdates() {
    return this.makeRequest("easb", "/updates")
  }

  async getEASBGuidance(standardCode: string) {
    return this.makeRequest("easb", `/guidance/${standardCode}`)
  }

  // AI Analysis methods
  async performRiskAssessment(companyData: any) {
    // Simulate AI analysis processing time
    await this.simulateNetworkDelay()

    // In a real implementation, this would call an AI service
    // For now, return enhanced mock data based on input
    const analysis = { ...MOCK_DATA.aiAnalysis }

    // Adjust risk score based on company data
    if (companyData.financialData) {
      const debtRatio = companyData.financialData.totalDebt / companyData.financialData.totalAssets
      if (debtRatio > 0.7) {
        analysis.riskScore += 15
        analysis.riskLevel = analysis.riskScore > 50 ? "high" : "medium"
        analysis.riskLevelAr = analysis.riskScore > 50 ? "عالي" : "متوسط"
      }
    }

    return analysis
  }

  async generateComplianceReport(companyId: string) {
    // Simulate report generation
    await this.simulateNetworkDelay()

    return {
      reportId: `RPT-${Date.now()}`,
      companyId,
      generatedAt: new Date().toISOString(),
      status: "completed",
      sections: [
        { name: "Tax Compliance", nameAr: "الامتثال الضريبي", score: 95 },
        { name: "Financial Regulations", nameAr: "اللوائح المالية", score: 88 },
        { name: "Environmental Compliance", nameAr: "الامتثال البيئي", score: 92 },
        { name: "Social Insurance", nameAr: "التأمين الاجتماعي", score: 97 },
      ],
      overallScore: 93,
      recommendations: ["Improve financial reporting timeliness", "Update environmental management procedures"],
    }
  }

  // Health check methods
  async checkAPIHealth(endpointId: string): Promise<boolean> {
    const endpoint = getAPIEndpoint(endpointId)
    if (!endpoint) return false

    try {
      return await apiClient.healthCheck(endpoint)
    } catch {
      return false
    }
  }

  async checkAllAPIsHealth(): Promise<Record<string, boolean>> {
    const endpoints = ["tax-authority", "commercial-registry", "cbe", "efra", "egx", "esia", "eeaa", "easb"]
    const results: Record<string, boolean> = {}

    await Promise.all(
      endpoints.map(async (endpointId) => {
        results[endpointId] = await this.checkAPIHealth(endpointId)
      }),
    )

    return results
  }

  // Metrics methods
  getAPIMetrics(endpointId: string) {
    return apiClient.getMetrics(endpointId)
  }

  getAllAPIMetrics() {
    return apiClient.getAllMetrics()
  }

  getCircuitBreakerStatus(endpointId: string) {
    return apiClient.getCircuitBreakerState(endpointId)
  }
}

export const apiService = new APIService()
