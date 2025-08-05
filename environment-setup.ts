export interface EnvironmentConfig {
  nodeEnv: "development" | "staging" | "production"
  apiBaseUrl: string
  enableMockData: boolean
  enableLogging: boolean
  enableMetrics: boolean
  securityConfig: {
    enforceHttps: boolean
    enableCors: boolean
    corsOrigins: string[]
    enableRateLimit: boolean
    enableApiKeyValidation: boolean
  }
  monitoringConfig: {
    enableHealthChecks: boolean
    healthCheckInterval: number
    enableAlerts: boolean
    alertThresholds: {
      errorRate: number
      responseTime: number
      availability: number
    }
  }
}

export function getEnvironmentConfig(): EnvironmentConfig {
  const nodeEnv = (process.env.NODE_ENV as any) || "development"

  const baseConfig: EnvironmentConfig = {
    nodeEnv,
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
    enableMockData: process.env.ENABLE_MOCK_DATA === "true",
    enableLogging: process.env.ENABLE_LOGGING !== "false",
    enableMetrics: process.env.ENABLE_METRICS !== "false",
    securityConfig: {
      enforceHttps: nodeEnv === "production",
      enableCors: true,
      corsOrigins: process.env.CORS_ORIGINS?.split(",") || ["http://localhost:3000"],
      enableRateLimit: nodeEnv !== "development",
      enableApiKeyValidation: nodeEnv !== "development",
    },
    monitoringConfig: {
      enableHealthChecks: true,
      healthCheckInterval: Number.parseInt(process.env.HEALTH_CHECK_INTERVAL || "300000"), // 5 minutes
      enableAlerts: nodeEnv !== "development",
      alertThresholds: {
        errorRate: Number.parseFloat(process.env.ALERT_ERROR_RATE_THRESHOLD || "5.0"),
        responseTime: Number.parseInt(process.env.ALERT_RESPONSE_TIME_THRESHOLD || "5000"),
        availability: Number.parseFloat(process.env.ALERT_AVAILABILITY_THRESHOLD || "95.0"),
      },
    },
  }

  // Environment-specific overrides
  switch (nodeEnv) {
    case "production":
      return {
        ...baseConfig,
        enableMockData: false,
        securityConfig: {
          ...baseConfig.securityConfig,
          enforceHttps: true,
          corsOrigins: process.env.CORS_ORIGINS?.split(",") || ["https://audit.gov.eg"],
        },
      }

    case "staging":
      return {
        ...baseConfig,
        enableMockData: process.env.ENABLE_MOCK_DATA === "true",
        securityConfig: {
          ...baseConfig.securityConfig,
          enforceHttps: true,
          corsOrigins: process.env.CORS_ORIGINS?.split(",") || ["https://staging.audit.gov.eg"],
        },
      }

    default: // development
      return {
        ...baseConfig,
        enableMockData: true,
        securityConfig: {
          ...baseConfig.securityConfig,
          enforceHttps: false,
          enableRateLimit: false,
          enableApiKeyValidation: false,
        },
        monitoringConfig: {
          ...baseConfig.monitoringConfig,
          enableAlerts: false,
        },
      }
  }
}

export function validateEnvironmentVariables(): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  const nodeEnv = process.env.NODE_ENV

  // Required for all environments
  const requiredVars = ["NEXT_PUBLIC_API_BASE_URL"]

  // Production-specific required variables
  if (nodeEnv === "production") {
    requiredVars.push(
      "NEXT_PUBLIC_TAX_AUTHORITY_API_URL",
      "NEXT_PUBLIC_COMMERCIAL_REGISTRY_API_URL",
      "NEXT_PUBLIC_CBE_API_URL",
      "NEXT_PUBLIC_EFRA_API_URL",
      "NEXT_PUBLIC_EGX_API_URL",
      "NEXT_PUBLIC_ESIA_API_URL",
      "NEXT_PUBLIC_EEAA_API_URL",
      "NEXT_PUBLIC_EASB_API_URL",
      "TAX_AUTHORITY_CLIENT_SECRET",
      "EFRA_CLIENT_SECRET",
      "CBE_ACCESS_TOKEN",
      "ESIA_ACCESS_TOKEN",
      "EASB_ACCESS_TOKEN",
    )
  }

  // Check required variables
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      errors.push(`Missing required environment variable: ${varName}`)
    }
  }

  // Validate URLs
  const urlVars = [
    "NEXT_PUBLIC_API_BASE_URL",
    "NEXT_PUBLIC_TAX_AUTHORITY_API_URL",
    "NEXT_PUBLIC_COMMERCIAL_REGISTRY_API_URL",
    "NEXT_PUBLIC_CBE_API_URL",
  ]

  for (const varName of urlVars) {
    const value = process.env[varName]
    if (value && !isValidUrl(value)) {
      errors.push(`Invalid URL format for ${varName}: ${value}`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

export function logEnvironmentInfo(): void {
  const config = getEnvironmentConfig()
  const validation = validateEnvironmentVariables()

  console.log("🔧 Environment Configuration:")
  console.log(`   Environment: ${config.nodeEnv}`)
  console.log(`   API Base URL: ${config.apiBaseUrl}`)
  console.log(`   Mock Data: ${config.enableMockData ? "Enabled" : "Disabled"}`)
  console.log(`   HTTPS Enforced: ${config.securityConfig.enforceHttps ? "Yes" : "No"}`)
  console.log(`   Rate Limiting: ${config.securityConfig.enableRateLimit ? "Enabled" : "Disabled"}`)

  if (!validation.isValid) {
    console.error("❌ Environment Validation Errors:")
    validation.errors.forEach((error) => console.error(`   - ${error}`))
  } else {
    console.log("✅ Environment validation passed")
  }
}
