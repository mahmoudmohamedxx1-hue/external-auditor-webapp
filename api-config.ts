export interface APIEndpoint {
  id: string
  name: string
  nameAr: string
  baseUrl: string
  version: string
  authType: "api-key" | "oauth2" | "bearer" | "basic"
  requiresVPN: boolean
  rateLimit: {
    requests: number
    window: number // in seconds
  }
  timeout: number
  retryAttempts: number
  healthCheckPath: string
}

export const PRODUCTION_API_ENDPOINTS: Record<string, APIEndpoint> = {
  "tax-authority": {
    id: "tax-authority",
    name: "Egyptian Tax Authority",
    nameAr: "مصلحة الضرائب المصرية",
    baseUrl: "https://api.eta.gov.eg/v2",
    version: "v2",
    authType: "oauth2",
    requiresVPN: false,
    rateLimit: { requests: 1000, window: 3600 },
    timeout: 30000,
    retryAttempts: 3,
    healthCheckPath: "/health",
  },
  "commercial-registry": {
    id: "commercial-registry",
    name: "Commercial Registry",
    nameAr: "السجل التجاري",
    baseUrl: "https://api.gafi.gov.eg/registry/v1",
    version: "v1",
    authType: "api-key",
    requiresVPN: false,
    rateLimit: { requests: 500, window: 3600 },
    timeout: 25000,
    retryAttempts: 3,
    healthCheckPath: "/status",
  },
  cbe: {
    id: "cbe",
    name: "Central Bank of Egypt",
    nameAr: "البنك المركزي المصري",
    baseUrl: "https://api.cbe.org.eg/v3",
    version: "v3",
    authType: "bearer",
    requiresVPN: false,
    rateLimit: { requests: 2000, window: 3600 },
    timeout: 15000,
    retryAttempts: 2,
    healthCheckPath: "/ping",
  },
  efra: {
    id: "efra",
    name: "Egyptian Financial Regulatory Authority",
    nameAr: "الهيئة العامة للرقابة المالية",
    baseUrl: "https://api.fra.gov.eg/v2",
    version: "v2",
    authType: "oauth2",
    requiresVPN: true,
    rateLimit: { requests: 300, window: 3600 },
    timeout: 45000,
    retryAttempts: 3,
    healthCheckPath: "/health",
  },
  egx: {
    id: "egx",
    name: "Egyptian Stock Exchange",
    nameAr: "البورصة المصرية",
    baseUrl: "https://api.egx.com.eg/v4",
    version: "v4",
    authType: "api-key",
    requiresVPN: false,
    rateLimit: { requests: 1500, window: 3600 },
    timeout: 20000,
    retryAttempts: 2,
    healthCheckPath: "/status",
  },
  esia: {
    id: "esia",
    name: "Egyptian Social Insurance Authority",
    nameAr: "الهيئة القومية للتأمين الاجتماعي",
    baseUrl: "https://api.nosi.gov.eg/v1",
    version: "v1",
    authType: "bearer",
    requiresVPN: true,
    rateLimit: { requests: 200, window: 3600 },
    timeout: 35000,
    retryAttempts: 3,
    healthCheckPath: "/health",
  },
  eeaa: {
    id: "eeaa",
    name: "Egyptian Environmental Affairs Agency",
    nameAr: "جهاز شؤون البيئة المصري",
    baseUrl: "https://api.eeaa.gov.eg/v2",
    version: "v2",
    authType: "api-key",
    requiresVPN: false,
    rateLimit: { requests: 100, window: 3600 },
    timeout: 30000,
    retryAttempts: 3,
    healthCheckPath: "/status",
  },
  easb: {
    id: "easb",
    name: "Egyptian Accounting Standards Board",
    nameAr: "مجلس معايير المحاسبة المصرية",
    baseUrl: "https://api.easb.gov.eg/v1",
    version: "v1",
    authType: "bearer",
    requiresVPN: false,
    rateLimit: { requests: 150, window: 3600 },
    timeout: 25000,
    retryAttempts: 2,
    healthCheckPath: "/ping",
  },
}

export const DEVELOPMENT_API_ENDPOINTS: Record<string, APIEndpoint> = {
  "tax-authority": {
    ...PRODUCTION_API_ENDPOINTS["tax-authority"],
    baseUrl: "https://sandbox.eta.gov.eg/v2",
  },
  "commercial-registry": {
    ...PRODUCTION_API_ENDPOINTS["commercial-registry"],
    baseUrl: "https://sandbox.gafi.gov.eg/registry/v1",
  },
  cbe: {
    ...PRODUCTION_API_ENDPOINTS["cbe"],
    baseUrl: "https://sandbox.cbe.org.eg/v3",
  },
  efra: {
    ...PRODUCTION_API_ENDPOINTS["efra"],
    baseUrl: "https://sandbox.fra.gov.eg/v2",
    requiresVPN: false,
  },
  egx: {
    ...PRODUCTION_API_ENDPOINTS["egx"],
    baseUrl: "https://sandbox.egx.com.eg/v4",
  },
  esia: {
    ...PRODUCTION_API_ENDPOINTS["esia"],
    baseUrl: "https://sandbox.nosi.gov.eg/v1",
    requiresVPN: false,
  },
  eeaa: {
    ...PRODUCTION_API_ENDPOINTS["eeaa"],
    baseUrl: "https://sandbox.eeaa.gov.eg/v2",
  },
  easb: {
    ...PRODUCTION_API_ENDPOINTS["easb"],
    baseUrl: "https://sandbox.easb.gov.eg/v1",
  },
}

export function getAPIEndpoints(): Record<string, APIEndpoint> {
  const environment = process.env.NODE_ENV || "development"
  return environment === "production" ? PRODUCTION_API_ENDPOINTS : DEVELOPMENT_API_ENDPOINTS
}

export function getAPIEndpoint(id: string): APIEndpoint | null {
  const endpoints = getAPIEndpoints()
  return endpoints[id] || null
}
