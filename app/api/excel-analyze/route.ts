import { type NextRequest, NextResponse } from "next/server"
import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { fileContent, fileName, analysisType = "comprehensive" } = await request.json()

    if (!fileContent) {
      return NextResponse.json({ error: "File content is required" }, { status: 400 })
    }

    // Create specialized prompt based on analysis type
    const systemPrompt = `You are an expert Egyptian audit professional with deep knowledge of:
- Egyptian Accounting Standards (EAS)
- International Financial Reporting Standards (IFRS)
- Egyptian Tax Law and CBE regulations
- Excel data analysis and VBA security
- Risk assessment methodologies

Analyze the provided Excel data and provide comprehensive insights in JSON format.`

    const analysisPrompt = `
Analyze this Excel file data: ${fileContent}
File name: ${fileName}
Analysis type: ${analysisType}

Please provide a comprehensive analysis in the following JSON structure:
{
  "summary": "Brief overview of the file",
  "dataQuality": {
    "score": 85,
    "issues": ["Missing values in column A", "Inconsistent date formats"],
    "recommendations": ["Clean missing data", "Standardize formats"]
  },
  "riskAssessment": {
    "overallRisk": "Medium",
    "riskFactors": ["Data integrity issues", "Formula complexity"],
    "riskScore": 6.5
  },
  "complianceCheck": {
    "easCompliance": true,
    "ifrsCompliance": true,
    "taxLawCompliance": false,
    "issues": ["Missing required tax calculations"]
  },
  "vbaSecurity": {
    "hasVBA": false,
    "securityRisk": "Low",
    "recommendations": []
  },
  "insights": [
    "Revenue trends show 15% growth",
    "Expense ratios are within normal ranges"
  ],
  "recommendations": [
    "Implement data validation rules",
    "Add audit trail functionality"
  ]
}

Provide only valid JSON response.`

    const { text } = await generateText({
      model: xai("grok-2"),
      system: systemPrompt,
      prompt: analysisPrompt,
      maxTokens: 2000,
    })

    // Parse AI response
    let analysisResult
    try {
      analysisResult = JSON.parse(text)
    } catch (parseError) {
      // Fallback if AI doesn't return valid JSON
      analysisResult = {
        summary: "Analysis completed with AI assistance",
        dataQuality: {
          score: 75,
          issues: ["Unable to parse detailed analysis"],
          recommendations: ["Manual review recommended"],
        },
        riskAssessment: {
          overallRisk: "Medium",
          riskFactors: ["Requires manual verification"],
          riskScore: 5.0,
        },
        complianceCheck: {
          easCompliance: null,
          ifrsCompliance: null,
          taxLawCompliance: null,
          issues: ["Compliance check requires manual review"],
        },
        vbaSecurity: {
          hasVBA: false,
          securityRisk: "Unknown",
          recommendations: ["Manual VBA security review needed"],
        },
        insights: [text.substring(0, 200) + "..."],
        recommendations: ["Detailed manual analysis recommended"],
      }
    }

    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      timestamp: new Date().toISOString(),
      fileName: fileName,
    })
  } catch (error) {
    console.error("Excel analysis error:", error)
    return NextResponse.json(
      {
        error: "Analysis failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
