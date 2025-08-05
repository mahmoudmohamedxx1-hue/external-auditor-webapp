import type { APIEndpoint } from "./api-config"

interface CircuitBreakerState {
  failures: number
  lastFailureTime: number
  state: "closed" | "open" | "half-open"
}

interface RateLimitState {
  requests: number
  windowStart: number
}

interface RequestMetrics {
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  averageResponseTime: number
  lastRequestTime: number
}

export class APIClient {
  private circuitBreakers: Map<string, CircuitBreakerState> = new Map()
  private rateLimiters: Map<string, RateLimitState> = new Map()
  private metrics: Map<string, RequestMetrics> = new Map()
  private readonly CIRCUIT_BREAKER_THRESHOLD = 5
  private readonly CIRCUIT_BREAKER_TIMEOUT = 60000 // 1 minute

  constructor() {
    this.initializeMetrics()
  }

  private initializeMetrics() {
    // Initialize metrics for all endpoints
    const endpoints = ["tax-authority", "commercial-registry", "cbe", "efra", "egx", "esia", "eeaa", "easb"]
    endpoints.forEach((id) => {
      this.metrics.set(id, {
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        averageResponseTime: 0,
        lastRequestTime: 0,
      })
    })
  }

  private isCircuitBreakerOpen(endpointId: string): boolean {
    const breaker = this.circuitBreakers.get(endpointId)
    if (!breaker) return false

    if (breaker.state === "open") {
      if (Date.now() - breaker.lastFailureTime > this.CIRCUIT_BREAKER_TIMEOUT) {
        breaker.state = "half-open"
        return false
      }
      return true
    }
    return false
  }

  private recordSuccess(endpointId: string, responseTime: number) {
    // Reset circuit breaker
    const breaker = this.circuitBreakers.get(endpointId)
    if (breaker) {
      breaker.failures = 0
      breaker.state = "closed"
    }

    // Update metrics
    const metrics = this.metrics.get(endpointId)
    if (metrics) {
      metrics.totalRequests++
      metrics.successfulRequests++
      metrics.averageResponseTime =
        (metrics.averageResponseTime * (metrics.totalRequests - 1) + responseTime) / metrics.totalRequests
      metrics.lastRequestTime = Date.now()
    }
  }

  private recordFailure(endpointId: string) {
    // Update circuit breaker
    const breaker = this.circuitBreakers.get(endpointId) || {
      failures: 0,
      lastFailureTime: 0,
      state: "closed" as const,
    }

    breaker.failures++
    breaker.lastFailureTime = Date.now()

    if (breaker.failures >= this.CIRCUIT_BREAKER_THRESHOLD) {
      breaker.state = "open"
    }

    this.circuitBreakers.set(endpointId, breaker)

    // Update metrics
    const metrics = this.metrics.get(endpointId)
    if (metrics) {
      metrics.totalRequests++
      metrics.failedRequests++
      metrics.lastRequestTime = Date.now()
    }
  }

  private checkRateLimit(endpoint: APIEndpoint): boolean {
    const now = Date.now()
    const rateLimiter = this.rateLimiters.get(endpoint.id) || {
      requests: 0,
      windowStart: now,
    }

    // Reset window if expired
    if (now - rateLimiter.windowStart > endpoint.rateLimit.window * 1000) {
      rateLimiter.requests = 0
      rateLimiter.windowStart = now
    }

    // Check if rate limit exceeded
    if (rateLimiter.requests >= endpoint.rateLimit.requests) {
      return false
    }

    rateLimiter.requests++
    this.rateLimiters.set(endpoint.id, rateLimiter)
    return true
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private getAuthHeaders(endpoint: APIEndpoint): Record<string, string> {
    const headers: Record<string, string> = {}

    switch (endpoint.authType) {
      case "api-key":
        const apiKey = process.env[`${endpoint.id.toUpperCase().replace("-", "_")}_API_KEY`]
        if (apiKey) {
          headers["X-API-Key"] = apiKey
        }
        break
      case "bearer":
        const token = process.env[`${endpoint.id.toUpperCase().replace("-", "_")}_ACCESS_TOKEN`]
        if (token) {
          headers["Authorization"] = `Bearer ${token}`
        }
        break
      case "oauth2":
        const oauthToken = process.env[`${endpoint.id.toUpperCase().replace("-", "_")}_OAUTH_TOKEN`]
        if (oauthToken) {
          headers["Authorization"] = `Bearer ${oauthToken}`
        }
        break
    }

    return headers
  }

  async request<T>(endpoint: APIEndpoint, path: string, options: RequestInit = {}): Promise<T> {
    // Check circuit breaker
    if (this.isCircuitBreakerOpen(endpoint.id)) {
      throw new Error(`Circuit breaker is open for ${endpoint.name}`)
    }

    // Check rate limit
    if (!this.checkRateLimit(endpoint)) {
      throw new Error(`Rate limit exceeded for ${endpoint.name}`)
    }

    const startTime = Date.now()
    let lastError: Error | null = null

    // Retry logic with exponential backoff
    for (let attempt = 0; attempt <= endpoint.retryAttempts; attempt++) {
      try {
        const url = `${endpoint.baseUrl}${path}`
        const headers = {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...this.getAuthHeaders(endpoint),
          ...options.headers,
        }

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), endpoint.timeout)

        const response = await fetch(url, {
          ...options,
          headers,
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response content type")
        }

        const data = await response.json()
        const responseTime = Date.now() - startTime

        this.recordSuccess(endpoint.id, responseTime)
        return data
      } catch (error) {
        lastError = error as Error

        if (attempt < endpoint.retryAttempts) {
          // Exponential backoff: 1s, 2s, 4s, 8s...
          const delay = Math.pow(2, attempt) * 1000
          await this.sleep(delay)
        }
      }
    }

    this.recordFailure(endpoint.id)
    throw lastError || new Error("Request failed after all retry attempts")
  }

  async healthCheck(endpoint: APIEndpoint): Promise<boolean> {
    try {
      await this.request(endpoint, endpoint.healthCheckPath, { method: "GET" })
      return true
    } catch {
      return false
    }
  }

  getMetrics(endpointId: string): RequestMetrics | null {
    return this.metrics.get(endpointId) || null
  }

  getCircuitBreakerState(endpointId: string): CircuitBreakerState | null {
    return this.circuitBreakers.get(endpointId) || null
  }

  getAllMetrics(): Map<string, RequestMetrics> {
    return new Map(this.metrics)
  }
}

export const apiClient = new APIClient()
