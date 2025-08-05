#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const https = require("https")

const PRODUCTION_ENDPOINTS = {
  "tax-authority": "https://api.eta.gov.eg/v2/health",
  "commercial-registry": "https://api.gafi.gov.eg/registry/v1/status",
  cbe: "https://api.cbe.org.eg/v3/ping",
  efra: "https://api.fra.gov.eg/v2/health",
  egx: "https://api.egx.com.eg/v4/status",
  esia: "https://api.nosi.gov.eg/v1/health",
  eeaa: "https://api.eeaa.gov.eg/v2/status",
  easb: "https://api.easb.gov.eg/v1/ping",
}

const REQUIRED_ENV_VARS = [
  "NEXT_PUBLIC_API_BASE_URL",
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
]

async function checkEndpointHealth(name, url) {
  return new Promise((resolve) => {
    const request = https.get(url, { timeout: 10000 }, (response) => {
      resolve({
        name,
        url,
        status: response.statusCode,
        healthy: response.statusCode >= 200 && response.statusCode < 300,
      })
    })

    request.on("error", () => {
      resolve({
        name,
        url,
        status: 0,
        healthy: false,
        error: "Connection failed",
      })
    })

    request.on("timeout", () => {
      request.destroy()
      resolve({
        name,
        url,
        status: 0,
        healthy: false,
        error: "Timeout",
      })
    })
  })
}

function validateEnvironmentVariables() {
  console.log("🔍 Validating environment variables...")
  const missing = []

  for (const varName of REQUIRED_ENV_VARS) {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  }

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:")
    missing.forEach((varName) => console.error(`   - ${varName}`))
    return false
  }

  console.log("✅ All required environment variables are present")
  return true
}

async function testAPIConnectivity() {
  console.log("🌐 Testing API connectivity...")
  const results = []

  for (const [name, url] of Object.entries(PRODUCTION_ENDPOINTS)) {
    console.log(`   Testing ${name}...`)
    const result = await checkEndpointHealth(name, url)
    results.push(result)

    if (result.healthy) {
      console.log(`   ✅ ${name}: OK (${result.status})`)
    } else {
      console.log(`   ❌ ${name}: Failed (${result.error || result.status})`)
    }
  }

  const healthyCount = results.filter((r) => r.healthy).length
  console.log(`\n📊 API Health Summary: ${healthyCount}/${results.length} endpoints healthy`)

  return results
}

function generateProductionEnvTemplate() {
  console.log("📝 Generating production environment template...")

  const template = `# Egyptian Audit Solution - Production Environment Variables
# Copy this file to .env.production and fill in the actual values

# Application Configuration
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.audit.gov.eg

# Egyptian Tax Authority API
NEXT_PUBLIC_TAX_AUTHORITY_API_URL=https://api.eta.gov.eg/v2
NEXT_PUBLIC_TAX_AUTHORITY_API_KEY=your_tax_authority_api_key
NEXT_PUBLIC_TAX_AUTHORITY_CLIENT_ID=your_tax_authority_client_id
TAX_AUTHORITY_CLIENT_SECRET=your_tax_authority_client_secret

# Commercial Registry API
NEXT_PUBLIC_COMMERCIAL_REGISTRY_API_URL=https://api.gafi.gov.eg/registry/v1
NEXT_PUBLIC_COMMERCIAL_REGISTRY_API_KEY=your_commercial_registry_api_key

# Central Bank of Egypt API
NEXT_PUBLIC_CBE_API_URL=https://api.cbe.org.eg/v3
NEXT_PUBLIC_CBE_API_KEY=your_cbe_api_key
CBE_ACCESS_TOKEN=your_cbe_access_token

# Egyptian Financial Regulatory Authority API
NEXT_PUBLIC_EFRA_API_URL=https://api.fra.gov.eg/v2
NEXT_PUBLIC_EFRA_CLIENT_ID=your_efra_client_id
EFRA_CLIENT_SECRET=your_efra_client_secret
NEXT_PUBLIC_EFRA_REDIRECT_URI=https://audit.gov.eg/auth/efra/callback

# Egyptian Stock Exchange API
NEXT_PUBLIC_EGX_API_URL=https://api.egx.com.eg/v4
NEXT_PUBLIC_EGX_API_KEY=your_egx_api_key
NEXT_PUBLIC_EGX_SUBSCRIPTION_KEY=your_egx_subscription_key

# Egyptian Social Insurance Authority API
NEXT_PUBLIC_ESIA_API_URL=https://api.nosi.gov.eg/v1
NEXT_PUBLIC_ESIA_API_KEY=your_esia_api_key
ESIA_ACCESS_TOKEN=your_esia_access_token

# Egyptian Environmental Affairs Agency API
NEXT_PUBLIC_EEAA_API_URL=https://api.eeaa.gov.eg/v2
NEXT_PUBLIC_EEAA_API_KEY=your_eeaa_api_key

# Egyptian Accounting Standards Board API
NEXT_PUBLIC_EASB_API_URL=https://api.easb.gov.eg/v1
NEXT_PUBLIC_EASB_API_KEY=your_easb_api_key
EASB_ACCESS_TOKEN=your_easb_access_token

# Security Configuration
CORS_ORIGINS=https://audit.gov.eg,https://www.audit.gov.eg
ENABLE_MOCK_DATA=false
ENABLE_LOGGING=true
ENABLE_METRICS=true

# Monitoring Configuration
HEALTH_CHECK_INTERVAL=300000
ALERT_ERROR_RATE_THRESHOLD=5.0
ALERT_RESPONSE_TIME_THRESHOLD=5000
ALERT_AVAILABILITY_THRESHOLD=95.0

# Database Configuration (if using)
DATABASE_URL=postgresql://username:password@localhost:5432/egyptian_audit
REDIS_URL=redis://localhost:6379

# Email Configuration (for alerts)
SMTP_HOST=smtp.gov.eg
SMTP_PORT=587
SMTP_USER=alerts@audit.gov.eg
SMTP_PASS=your_smtp_password
`

  const templatePath = path.join(process.cwd(), ".env.production.template")
  fs.writeFileSync(templatePath, template)
  console.log(`✅ Template created: ${templatePath}`)
}

function generateDocumentation() {
  console.log("📚 Generating API documentation...")

  const docsDir = path.join(process.cwd(), "docs")
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true })
  }

  const apiSetupDoc = `# Production API Setup Guide

## Overview
This guide covers the setup and configuration of Egyptian government and financial APIs for the Egyptian Audit Solution.

## Required API Registrations

### 1. Egyptian Tax Authority (مصلحة الضرائب المصرية)
- **Registration URL**: https://developer.eta.gov.eg
- **Documentation**: https://docs.eta.gov.eg/api/v2
- **Authentication**: OAuth2 with client credentials
- **Required Scopes**: tax_verification, compliance_status, declaration_submission

### 2. Commercial Registry (السجل التجاري)
- **Registration URL**: https://developer.gafi.gov.eg
- **Documentation**: https://docs.gafi.gov.eg/registry/v1
- **Authentication**: API Key
- **Rate Limits**: 500 requests/hour

### 3. Central Bank of Egypt (البنك المركزي المصري)
- **Registration URL**: https://developer.cbe.org.eg
- **Documentation**: https://docs.cbe.org.eg/api/v3
- **Authentication**: Bearer Token
- **Rate Limits**: 2000 requests/hour

### 4. Egyptian Financial Regulatory Authority (الهيئة العامة للرقابة المالية)
- **Registration URL**: https://developer.fra.gov.eg
- **Documentation**: https://docs.fra.gov.eg/api/v2
- **Authentication**: OAuth2
- **Special Requirements**: VPN connection required for production

### 5. Egyptian Stock Exchange (البورصة المصرية)
- **Registration URL**: https://developer.egx.com.eg
- **Documentation**: https://docs.egx.com.eg/api/v4
- **Authentication**: API Key + Subscription Key
- **Rate Limits**: 1500 requests/hour

### 6. Egyptian Social Insurance Authority (الهيئة القومية للتأمين الاجتماعي)
- **Registration URL**: https://developer.nosi.gov.eg
- **Documentation**: https://docs.nosi.gov.eg/api/v1
- **Authentication**: Bearer Token
- **Special Requirements**: VPN connection required for production

### 7. Egyptian Environmental Affairs Agency (جهاز شؤون البيئة المصري)
- **Registration URL**: https://developer.eeaa.gov.eg
- **Documentation**: https://docs.eeaa.gov.eg/api/v2
- **Authentication**: API Key
- **Rate Limits**: 100 requests/hour

### 8. Egyptian Accounting Standards Board (مجلس معايير المحاسبة المصرية)
- **Registration URL**: https://developer.easb.gov.eg
- **Documentation**: https://docs.easb.gov.eg/api/v1
- **Authentication**: Bearer Token
- **Rate Limits**: 150 requests/hour

## Setup Steps

1. **Register with each API provider**
2. **Obtain API credentials**
3. **Configure environment variables**
4. **Test connectivity**
5. **Deploy to production**

## Environment Configuration

Copy \`.env.production.template\` to \`.env.production\` and fill in your actual API credentials.

## Testing

Run the setup script to validate your configuration:

\`\`\`bash
node scripts/setup-production-apis.js
\`\`\`

## Monitoring

The system includes built-in monitoring for:
- API health checks
- Response time monitoring
- Error rate tracking
- Circuit breaker status
- Rate limit monitoring

## Support

For technical support, contact:
- Email: support@audit.gov.eg
- Phone: +20-2-XXXXXXX
`

  const deploymentDoc = `# Deployment Checklist

## Pre-Deployment

- [ ] All API credentials obtained and tested
- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Database migrations completed
- [ ] Backup procedures in place

## Deployment Steps

1. **Environment Setup**
   - [ ] Copy \`.env.production.template\` to \`.env.production\`
   - [ ] Fill in all required environment variables
   - [ ] Validate configuration with setup script

2. **API Configuration**
   - [ ] Test all API endpoints
   - [ ] Verify authentication tokens
   - [ ] Check rate limits and quotas
   - [ ] Configure VPN connections (EFRA, ESIA)

3. **Security Configuration**
   - [ ] Enable HTTPS enforcement
   - [ ] Configure CORS origins
   - [ ] Set up API key validation
   - [ ] Enable rate limiting

4. **Monitoring Setup**
   - [ ] Configure health checks
   - [ ] Set up alerting thresholds
   - [ ] Test alert notifications
   - [ ] Configure log aggregation

5. **Performance Optimization**
   - [ ] Enable response caching
   - [ ] Configure CDN
   - [ ] Optimize database queries
   - [ ] Set up load balancing

## Post-Deployment

- [ ] Verify all APIs are responding
- [ ] Check monitoring dashboards
- [ ] Test critical user flows
- [ ] Monitor error rates
- [ ] Validate performance metrics

## Rollback Plan

1. Keep previous version available
2. Database rollback scripts ready
3. DNS failover configured
4. Monitoring alerts for issues

## Emergency Contacts

- Technical Lead: +20-X-XXXXXXX
- DevOps Team: +20-X-XXXXXXX
- API Support: support@audit.gov.eg
`

  fs.writeFileSync(path.join(docsDir, "production-api-setup.md"), apiSetupDoc)
  fs.writeFileSync(path.join(docsDir, "deployment-checklist.md"), deploymentDoc)

  console.log("✅ Documentation generated in docs/ directory")
}

async function main() {
  console.log("🚀 Egyptian Audit Solution - Production API Setup\n")

  // Step 1: Validate environment variables
  const envValid = validateEnvironmentVariables()

  // Step 2: Test API connectivity
  const apiResults = await testAPIConnectivity()

  // Step 3: Generate templates and documentation
  generateProductionEnvTemplate()
  generateDocumentation()

  // Summary
  console.log("\n📋 Setup Summary:")
  console.log(`   Environment Variables: ${envValid ? "✅ Valid" : "❌ Invalid"}`)

  const healthyApis = apiResults.filter((r) => r.healthy).length
  console.log(`   API Connectivity: ${healthyApis}/${apiResults.length} endpoints healthy`)

  if (envValid && healthyApis === apiResults.length) {
    console.log("\n🎉 Production setup completed successfully!")
    console.log("   Next steps:")
    console.log("   1. Review and update .env.production.template")
    console.log("   2. Configure API credentials")
    console.log("   3. Deploy to production environment")
  } else {
    console.log("\n⚠️  Setup completed with issues")
    console.log("   Please review the errors above and fix them before deployment")
  }
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = {
  checkEndpointHealth,
  validateEnvironmentVariables,
  testAPIConnectivity,
}
