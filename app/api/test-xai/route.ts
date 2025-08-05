import { NextResponse } from "next/server"
import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"

export async function GET() {
  const testResults = {
    timestamp: new Date().toISOString(),
    tests: [] as any[],
    summary: {
      total: 0,
      passed: 0,
      failed: 0,
      overallStatus: "unknown" as "passed" | "failed" | "unknown",
    },
  }

  // Test 1: Basic Connection
  try {
    const startTime = Date.now()
    const { text } = await generateText({
      model: xai("grok-2"),
      prompt: 'Respond with exactly: "Connection successful"',
      maxTokens: 10,
    })
    const responseTime = Date.now() - startTime

    testResults.tests.push({
      name: "Basic Connection",
      status: text.includes("Connection successful") ? "passed" : "failed",
      responseTime: `${responseTime}ms`,
      details: `Response: "${text}"`,
    })
  } catch (error) {
    testResults.tests.push({
      name: "Basic Connection",
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Test 2: Text Generation
  try {
    const startTime = Date.now()
    const { text } = await generateText({
      model: xai("grok-2"),
      prompt: "Write a brief 2-sentence summary about Excel data analysis.",
      maxTokens: 100,
    })
    const responseTime = Date.now() - startTime

    testResults.tests.push({
      name: "Text Generation",
      status: text.length > 20 ? "passed" : "failed",
      responseTime: `${responseTime}ms`,
      details: `Generated ${text.length} characters`,
    })
  } catch (error) {
    testResults.tests.push({
      name: "Text Generation",
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Test 3: JSON Response
  try {
    const startTime = Date.now()
    const { text } = await generateText({
      model: xai("grok-2"),
      prompt:
        'Return a JSON object with keys "status" and "message". Status should be "ok" and message should be "test successful".',
      maxTokens: 50,
    })
    const responseTime = Date.now() - startTime

    let isValidJSON = false
    try {
      const parsed = JSON.parse(text)
      isValidJSON = parsed.status === "ok"
    } catch {
      isValidJSON = false
    }

    testResults.tests.push({
      name: "JSON Response",
      status: isValidJSON ? "passed" : "failed",
      responseTime: `${responseTime}ms`,
      details: `Response: ${text}`,
    })
  } catch (error) {
    testResults.tests.push({
      name: "JSON Response",
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Test 4: Arabic Support
  try {
    const startTime = Date.now()
    const { text } = await generateText({
      model: xai("grok-2"),
      prompt: 'Write "Hello" in Arabic.',
      maxTokens: 20,
    })
    const responseTime = Date.now() - startTime

    const hasArabic = /[\u0600-\u06FF]/.test(text)

    testResults.tests.push({
      name: "Arabic Support",
      status: hasArabic ? "passed" : "failed",
      responseTime: `${responseTime}ms`,
      details: `Response: "${text}"`,
    })
  } catch (error) {
    testResults.tests.push({
      name: "Arabic Support",
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Test 5: Audit Knowledge
  try {
    const startTime = Date.now()
    const { text } = await generateText({
      model: xai("grok-2"),
      prompt: "What does EAS stand for in Egyptian accounting?",
      maxTokens: 50,
    })
    const responseTime = Date.now() - startTime

    const hasCorrectAnswer = text.toLowerCase().includes("egyptian accounting standards")

    testResults.tests.push({
      name: "Audit Knowledge",
      status: hasCorrectAnswer ? "passed" : "failed",
      responseTime: `${responseTime}ms`,
      details: `Response: "${text}"`,
    })
  } catch (error) {
    testResults.tests.push({
      name: "Audit Knowledge",
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }

  // Calculate summary
  testResults.summary.total = testResults.tests.length
  testResults.summary.passed = testResults.tests.filter((t) => t.status === "passed").length
  testResults.summary.failed = testResults.tests.filter((t) => t.status === "failed").length
  testResults.summary.overallStatus = testResults.summary.failed === 0 ? "passed" : "failed"

  return NextResponse.json({
    success: true,
    xaiStatus: testResults.summary.overallStatus,
    results: testResults,
    recommendations:
      testResults.summary.failed > 0
        ? [
            "Check XAI_API_KEY environment variable",
            "Verify network connectivity",
            "Review API rate limits",
            "Check model availability",
          ]
        : ["xAI integration is working perfectly!", "All systems operational"],
  })
}
