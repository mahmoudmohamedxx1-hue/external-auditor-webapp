import type { NextRequest } from "next/server"
import { xai } from "@ai-sdk/xai"
import { streamText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { messages, context = "general" } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response("Messages array is required", { status: 400 })
    }

    // Create context-aware system prompt
    const getSystemPrompt = (context: string) => {
      const basePrompt = `You are an expert Egyptian audit and accounting professional with deep knowledge of:
- Egyptian Accounting Standards (EAS)
- International Financial Reporting Standards (IFRS)
- Egyptian Tax Law and CBE regulations
- Excel VBA programming and data analysis
- Risk assessment and audit procedures
- Arabic and English languages

You provide professional, accurate, and helpful responses. You can communicate in both Arabic and English as needed.`

      switch (context) {
        case "audit":
          return `${basePrompt}

Focus on audit-related topics including:
- Audit planning and risk assessment
- Evidence collection and documentation
- Egyptian audit standards and procedures
- Compliance with local regulations
- Internal controls evaluation`

        case "analysis":
          return `${basePrompt}

Focus on data analysis topics including:
- Excel data analysis techniques
- VBA programming for automation
- Financial data interpretation
- Statistical analysis methods
- Data visualization and reporting`

        case "arabic":
          return `${basePrompt}

Respond primarily in Arabic when appropriate. Provide explanations in Arabic for Egyptian-specific topics while maintaining professional terminology.`

        default:
          return basePrompt
      }
    }

    const systemPrompt = getSystemPrompt(context)

    const result = await streamText({
      model: xai("grok-2"),
      system: systemPrompt,
      messages: messages,
      maxTokens: 2000,
      temperature: 0.7,
    })

    return result.toAIStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(
      JSON.stringify({
        error: "Chat request failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
