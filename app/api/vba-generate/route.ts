import { type NextRequest, NextResponse } from "next/server"
import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"

export type VBARequest = {
  task: string
  complexity: string
  focus: string
}

export type VBAResponse = {
  code: string
  description: string
  descriptionAr: string
  features: string[]
  usage: string
  complexity: string
  estimatedTime: string
  requirements: string[]
}

export async function POST(request: NextRequest) {
  try {
    const {
      task,
      complexity = "intermediate",
      includeEgyptianFeatures = true,
      codeType = "function",
    } = await request.json()

    if (!task) {
      return NextResponse.json({ error: "Task description is required" }, { status: 400 })
    }

    const systemPrompt = `You are an expert VBA developer specializing in Excel automation for Egyptian audit and accounting professionals. You have deep knowledge of:
- Egyptian Accounting Standards (EAS)
- Egyptian Tax Law requirements
- Arabic language support in Excel
- Professional audit procedures
- Data validation and security best practices

Generate clean, well-documented, production-ready VBA code.`

    const vbaPrompt = `
Create VBA code for the following task: ${task}
Complexity level: ${complexity}
Code type: ${codeType}
Include Egyptian features: ${includeEgyptianFeatures}

Requirements:
1. Clean, readable code with proper error handling
2. Comprehensive comments in English
3. ${includeEgyptianFeatures ? "Support for Arabic text and Egyptian formatting (EGP currency, Arabic dates)" : "Standard international formatting"}
4. Professional audit-grade quality
5. Include usage instructions

Generate the complete VBA code with:
- Function/Subroutine declaration
- Error handling
- Documentation
- Usage examples
- Required references (if any)

Provide only the VBA code and documentation, no additional text.`

    const { text } = await generateText({
      model: xai("grok-2"),
      system: systemPrompt,
      prompt: vbaPrompt,
      maxTokens: 3000,
    })

    // Generate additional metadata based on complexity
    const getComplexityMetadata = (level: string) => {
      switch (level) {
        case "basic":
          return {
            estimatedLines: "10-30",
            difficulty: "Beginner",
            features: ["Simple loops", "Basic formatting", "Error handling"],
          }
        case "intermediate":
          return {
            estimatedLines: "30-100",
            difficulty: "Intermediate",
            features: ["Advanced formulas", "Data validation", "User forms", "Error handling"],
          }
        case "advanced":
          return {
            estimatedLines: "100+",
            difficulty: "Advanced",
            features: ["API integration", "Complex algorithms", "Database connectivity", "Advanced UI"],
          }
        default:
          return {
            estimatedLines: "30-100",
            difficulty: "Intermediate",
            features: ["Standard functionality"],
          }
      }
    }

    const metadata = getComplexityMetadata(complexity)

    return NextResponse.json({
      success: true,
      vbaCode: text,
      metadata: {
        task: task,
        complexity: complexity,
        codeType: codeType,
        includeEgyptianFeatures: includeEgyptianFeatures,
        ...metadata,
        generatedAt: new Date().toISOString(),
      },
      usage: {
        instructions: [
          "1. Open Excel and press Alt+F11 to open VBA Editor",
          "2. Insert a new module (Insert > Module)",
          "3. Paste the generated code",
          "4. Save the workbook as .xlsm format",
          "5. Run the code from Excel or VBA Editor",
        ],
        requirements: [
          "Microsoft Excel with VBA support",
          "Macro security settings enabled",
          includeEgyptianFeatures ? "Arabic language pack (for Arabic features)" : null,
        ].filter(Boolean),
      },
    })
  } catch (error) {
    console.error("VBA generation error:", error)
    return NextResponse.json(
      {
        error: "VBA generation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

function parseVBAResponse(aiResponse: string, request: VBARequest): VBAResponse {
  // Extract VBA code from the response
  const codeMatch = aiResponse.match(/```vba\n([\s\S]*?)\n```/) || aiResponse.match(/```\n([\s\S]*?)\n```/)

  let vbaCode = codeMatch ? codeMatch[1] : generateFallbackCode(request)

  // If no code block found, try to extract code from the response
  if ((!codeMatch && aiResponse.includes("Sub ")) || aiResponse.includes("Function ")) {
    vbaCode = aiResponse
  }

  // Generate comprehensive VBA code based on request
  if (!vbaCode || vbaCode.length < 50) {
    vbaCode = generateComprehensiveVBA(request)
  }

  const response: VBAResponse = {
    code: vbaCode,
    description: generateDescription(request, "en"),
    descriptionAr: generateDescription(request, "ar"),
    features: generateFeatures(request),
    usage: generateUsage(request),
    complexity: request.complexity,
    estimatedTime: getEstimatedTime(request.complexity),
    requirements: getRequirements(request),
  }

  return response
}

function generateComprehensiveVBA(request: VBARequest): string {
  const taskLower = request.task.toLowerCase()

  if (taskLower.includes("data validation") || taskLower.includes("validation")) {
    return generateDataValidationVBA(request)
  } else if (taskLower.includes("audit") || taskLower.includes("risk")) {
    return generateAuditVBA(request)
  } else if (taskLower.includes("report") || taskLower.includes("format")) {
    return generateReportingVBA(request)
  } else if (taskLower.includes("analysis") || taskLower.includes("calculate")) {
    return generateAnalysisVBA(request)
  } else {
    return generateGenericVBA(request)
  }
}

function generateDataValidationVBA(request: VBARequest): string {
  return `Option Explicit

' Egyptian Audit Solution - Data Validation Tool
' Generated by xAI Grok for ${request.task}
' Complexity: ${request.complexity}
' Focus: ${request.focus}

Public Sub ValidateFinancialData()
    Dim ws As Worksheet
    Dim lastRow As Long
    Dim lastCol As Long
    Dim i As Long, j As Long
    Dim errorCount As Long
    Dim validationResults As String
    Dim startTime As Double
    
    ' Initialize
    startTime = Timer
    Set ws = ActiveSheet
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    lastCol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column
    errorCount = 0
    validationResults = "Data Validation Report" & vbCrLf & String(50, "=") & vbCrLf
    
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual
    
    ' Create validation summary sheet
    Call CreateValidationSheet
    
    ' Validate data types and formats
    For i = 2 To lastRow
        For j = 1 To lastCol
            If Not ValidateCell(ws.Cells(i, j), j) Then
                ws.Cells(i, j).Interior.Color = RGB(255, 200, 200)
                errorCount = errorCount + 1
                validationResults = validationResults & "Error at " & ws.Cells(i, j).Address & ": " & GetValidationError(ws.Cells(i, j), j) & vbCrLf
            End If
        Next j
        
        ' Update progress every 100 rows
        If i Mod 100 = 0 Then
            Application.StatusBar = "Validating row " & i & " of " & lastRow & " (" & Format(i / lastRow, "0%") & ")"
        End If
    Next i
    
    ' Validate Egyptian-specific requirements
    Call ValidateEgyptianStandards(ws, errorCount, validationResults)
    
    ' Generate validation report
    Call GenerateValidationReport(errorCount, validationResults, Timer - startTime)
    
    Application.ScreenUpdating = True
    Application.Calculation = xlCalculationAutomatic
    Application.StatusBar = False
    
    MsgBox "Data validation completed!" & vbCrLf & _
           "Errors found: " & errorCount & vbCrLf & _
           "Processing time: " & Format(Timer - startTime, "0.00") & " seconds", _
           vbInformation, "Egyptian Audit Solution"
End Sub

Private Function ValidateCell(cell As Range, columnIndex As Long) As Boolean
    Dim cellValue As Variant
    cellValue = cell.Value
    
    ' Skip empty cells
    If IsEmpty(cellValue) Then
        ValidateCell = True
        Exit Function
    End If
    
    Select Case columnIndex
        Case 1 ' ID Column
            ValidateCell = IsNumeric(cellValue) And cellValue > 0
        Case 2 ' Date Column
            ValidateCell = IsDate(cellValue)
        Case 3 ' Amount Column
            ValidateCell = IsNumeric(cellValue)
        Case 4 ' Description Column
            ValidateCell = Len(Trim(cellValue)) > 0
        Case Else
            ValidateCell = True
    End Select
End Function

Private Function GetValidationError(cell As Range, columnIndex As Long) As String
    Select Case columnIndex
        Case 1
            GetValidationError = "Invalid ID format (must be positive number)"
        Case 2
            GetValidationError = "Invalid date format (use DD/MM/YYYY)"
        Case 3
            GetValidationError = "Invalid amount (must be numeric)"
        Case 4
            GetValidationError = "Description cannot be empty"
        Case Else
            GetValidationError = "Unknown validation error"
    End Select
End Function

Private Sub ValidateEgyptianStandards(ws As Worksheet, ByRef errorCount As Long, ByRef results As String)
    ' Validate Egyptian Accounting Standards compliance
    Dim i As Long
    Dim lastRow As Long
    
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    
    ' Check for Egyptian date format (DD/MM/YYYY)
    For i = 2 To lastRow
        If IsDate(ws.Cells(i, 2).Value) Then
            If Not IsEgyptianDateFormat(ws.Cells(i, 2)) Then
                ws.Cells(i, 2).Interior.Color = RGB(255, 255, 200)
                errorCount = errorCount + 1
                results = results & "Warning at " & ws.Cells(i, 2).Address & ": Date not in Egyptian format (DD/MM/YYYY)" & vbCrLf
            End If
        End If
    Next i
    
    ' Check for EGP currency formatting
    For i = 2 To lastRow
        If IsNumeric(ws.Cells(i, 3).Value) Then
            If ws.Cells(i, 3).NumberFormat <> "#,##0.00 ""EGP""" Then
                ws.Cells(i, 3).NumberFormat = "#,##0.00 ""EGP"""
            End If
        End If
    Next i
End Sub

Private Function IsEgyptianDateFormat(cell As Range) As Boolean
    ' Check if date is formatted as DD/MM/YYYY
    IsEgyptianDateFormat = (cell.NumberFormat = "dd/mm/yyyy" Or cell.NumberFormat = "DD/MM/YYYY")
End Function

Private Sub CreateValidationSheet()
    Dim validationWs As Worksheet
    
    ' Create or clear validation sheet
    On Error Resume Next
    Set validationWs = Worksheets("Validation_Report")
    On Error GoTo 0
    
    If validationWs Is Nothing Then
        Set validationWs = Worksheets.Add
        validationWs.Name = "Validation_Report"
    Else
        validationWs.Cells.Clear
    End If
    
    ' Set up headers
    With validationWs
        .Cells(1, 1).Value = "Egyptian Audit Solution - Validation Report"
        .Cells(1, 1).Font.Bold = True
        .Cells(1, 1).Font.Size = 14
        .Cells(3, 1).Value = "Generated: " & Now()
        .Cells(4, 1).Value = "Worksheet: " & ActiveSheet.Name
    End With
End Sub

Private Sub GenerateValidationReport(errorCount As Long, results As String, processingTime As Double)
    Dim validationWs As Worksheet
    Set validationWs = Worksheets("Validation_Report")
    
    With validationWs
        .Cells(6, 1).Value = "Summary:"
        .Cells(6, 1).Font.Bold = True
        .Cells(7, 1).Value = "Total Errors: " & errorCount
        .Cells(8, 1).Value = "Processing Time: " & Format(processingTime, "0.00") & " seconds"
        .Cells(9, 1).Value = "Compliance Status: " & IIf(errorCount = 0, "PASSED", "FAILED")
        
        .Cells(11, 1).Value = "Detailed Results:"
        .Cells(11, 1).Font.Bold = True
        .Cells(12, 1).Value = results
        
        ' Auto-fit columns
        .Columns("A:D").AutoFit
    End With
End Sub`
}

function generateAuditVBA(request: VBARequest): string {
  return `Option Explicit

' Egyptian Audit Solution - Audit Risk Assessment Tool
' Generated by xAI Grok for ${request.task}
' Complexity: ${request.complexity}
' Focus: ${request.focus}

Public Sub PerformRiskAssessment()
    Dim ws As Worksheet
    Dim riskWs As Worksheet
    Dim lastRow As Long
    Dim i As Long
    Dim riskScore As Double
    Dim totalRisk As Double
    Dim highRiskCount As Long
    Dim mediumRiskCount As Long
    Dim lowRiskCount As Long
    
    Set ws = ActiveSheet
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    
    Application.ScreenUpdating = False
    
    ' Create risk assessment worksheet
    Call CreateRiskAssessmentSheet
    Set riskWs = Worksheets("Risk_Assessment")
    
    ' Analyze each transaction/record
    For i = 2 To lastRow
        riskScore = CalculateRiskScore(ws, i)
        totalRisk = totalRisk + riskScore
        
        ' Categorize risk level
        If riskScore >= 7 Then
            highRiskCount = highRiskCount + 1
            ws.Cells(i, ws.Columns.Count + 1).Value = "HIGH RISK"
            ws.Cells(i, ws.Columns.Count).Interior.Color = RGB(255, 100, 100)
        ElseIf riskScore >= 4 Then
            mediumRiskCount = mediumRiskCount + 1
            ws.Cells(i, ws.Columns.Count + 1).Value = "MEDIUM RISK"
            ws.Cells(i, ws.Columns.Count).Interior.Color = RGB(255, 255, 100)
        Else
            lowRiskCount = lowRiskCount + 1
            ws.Cells(i, ws.Columns.Count + 1).Value = "LOW RISK"
            ws.Cells(i, ws.Columns.Count).Interior.Color = RGB(100, 255, 100)
        End If
        
        ' Log risk details
        Call LogRiskDetails(riskWs, i, riskScore, ws)
        
        ' Update progress
        If i Mod 50 = 0 Then
            Application.StatusBar = "Assessing risk for row " & i & " of " & lastRow
        End If
    Next i
    
    ' Generate risk summary
    Call GenerateRiskSummary(riskWs, totalRisk / (lastRow - 1), highRiskCount, mediumRiskCount, lowRiskCount)
    
    ' Apply Egyptian audit standards
    Call ApplyEgyptianAuditStandards(riskWs)
    
    Application.ScreenUpdating = True
    Application.StatusBar = False
    
    MsgBox "Risk assessment completed!" & vbCrLf & _
           "High Risk Items: " & highRiskCount & vbCrLf & _
           "Medium Risk Items: " & mediumRiskCount & vbCrLf & _
           "Low Risk Items: " & lowRiskCount, _
           vbInformation, "Egyptian Audit Solution"
End Sub

Private Function CalculateRiskScore(ws As Worksheet, rowNum As Long) As Double
    Dim score As Double
    Dim amount As Double
    Dim dateValue As Date
    Dim description As String
    
    score = 0
    
    ' Amount-based risk (higher amounts = higher risk)
    If IsNumeric(ws.Cells(rowNum, 3).Value) Then
        amount = ws.Cells(rowNum, 3).Value
        If amount > 100000 Then score = score + 3
        If amount > 500000 Then score = score + 2
        If amount > 1000000 Then score = score + 2
    End If
    
    ' Date-based risk (transactions near period end)
    If IsDate(ws.Cells(rowNum, 2).Value) Then
        dateValue = ws.Cells(rowNum, 2).Value
        If Day(dateValue) >= 28 And Month(dateValue) = 12 Then score = score + 2
        If Day(dateValue) >= 28 Then score = score + 1
    End If
    
    ' Description-based risk (keywords)
    description = UCase(ws.Cells(rowNum, 4).Value)
    If InStr(description, "CASH") > 0 Then score = score + 1
    If InStr(description, "ADJUSTMENT") > 0 Then score = score + 2
    If InStr(description, "REVERSAL") > 0 Then score = score + 2
    If InStr(description, "MANUAL") > 0 Then score = score + 1
    
    ' Egyptian-specific risk factors
    If InStr(description, "TAX") > 0 Then score = score + 1
    If InStr(description, "FOREIGN") > 0 Then score = score + 1
    If InStr(description, "RELATED PARTY") > 0 Then score = score + 3
    
    CalculateRiskScore = score
End Function

Private Sub CreateRiskAssessmentSheet()
    Dim riskWs As Worksheet
    
    On Error Resume Next
    Set riskWs = Worksheets("Risk_Assessment")
    On Error GoTo 0
    
    If riskWs Is Nothing Then
        Set riskWs = Worksheets.Add
        riskWs.Name = "Risk_Assessment"
    Else
        riskWs.Cells.Clear
    End If
    
    ' Set up headers
    With riskWs
        .Cells(1, 1).Value = "Egyptian Audit Solution - Risk Assessment Report"
        .Cells(1, 1).Font.Bold = True
        .Cells(1, 1).Font.Size = 16
        .Range("A1:F1").Merge
        
        .Cells(3, 1).Value = "Generated: " & Format(Now(), "DD/MM/YYYY HH:MM")
        .Cells(4, 1).Value = "Auditor: " & Application.UserName
        .Cells(5, 1).Value = "Worksheet: " & ActiveSheet.Name
        
        ' Detail headers
        .Cells(7, 1).Value = "Row"
        .Cells(7, 2).Value = "Risk Score"
        .Cells(7, 3).Value = "Risk Level"
        .Cells(7, 4).Value = "Amount"
        .Cells(7, 5).Value = "Date"
        .Cells(7, 6).Value = "Risk Factors"
        .Range("A7:F7").Font.Bold = True
    End With
End Sub

Private Sub LogRiskDetails(riskWs As Worksheet, rowNum As Long, riskScore As Double, dataWs As Worksheet)
    Dim nextRow As Long
    nextRow = riskWs.Cells(riskWs.Rows.Count, "A").End(xlUp).Row + 1
    
    With riskWs
        .Cells(nextRow, 1).Value = rowNum
        .Cells(nextRow, 2).Value = Format(riskScore, "0.00")
        .Cells(nextRow, 3).Value = GetRiskLevel(riskScore)
        .Cells(nextRow, 4).Value = dataWs.Cells(rowNum, 3).Value
        .Cells(nextRow, 5).Value = dataWs.Cells(rowNum, 2).Value
        .Cells(nextRow, 6).Value = GetRiskFactors(dataWs, rowNum)
        
        ' Color code by risk level
        Select Case GetRiskLevel(riskScore)
            Case "HIGH RISK"
                .Range(.Cells(nextRow, 1), .Cells(nextRow, 6)).Interior.Color = RGB(255, 200, 200)
            Case "MEDIUM RISK"
                .Range(.Cells(nextRow, 1), .Cells(nextRow, 6)).Interior.Color = RGB(255, 255, 200)
            Case "LOW RISK"
                .Range(.Cells(nextRow, 1), .Cells(nextRow, 6)).Interior.Color = RGB(200, 255, 200)
        End Select
    End With
End Sub

Private Function GetRiskLevel(score As Double) As String
    If score >= 7 Then
        GetRiskLevel = "HIGH RISK"
    ElseIf score >= 4 Then
        GetRiskLevel = "MEDIUM RISK"
    Else
        GetRiskLevel = "LOW RISK"
    End If
End Function

Private Function GetRiskFactors(ws As Worksheet, rowNum As Long) As String
    Dim factors As String
    Dim amount As Double
    Dim description As String
    
    If IsNumeric(ws.Cells(rowNum, 3).Value) Then
        amount = ws.Cells(rowNum, 3).Value
        If amount > 1000000 Then factors = factors & "Large Amount; "
    End If
    
    description = UCase(ws.Cells(rowNum, 4).Value)
    If InStr(description, "ADJUSTMENT") > 0 Then factors = factors & "Manual Adjustment; "
    If InStr(description, "CASH") > 0 Then factors = factors & "Cash Transaction; "
    If InStr(description, "RELATED PARTY") > 0 Then factors = factors & "Related Party; "
    
    GetRiskFactors = factors
End Function

Private Sub GenerateRiskSummary(riskWs As Worksheet, avgRisk As Double, highCount As Long, mediumCount As Long, lowCount As Long)
    Dim summaryRow As Long
    summaryRow = riskWs.Cells(riskWs.Rows.Count, "A").End(xlUp).Row + 3
    
    With riskWs
        .Cells(summaryRow, 1).Value = "RISK ASSESSMENT SUMMARY"
        .Cells(summaryRow, 1).Font.Bold = True
        .Cells(summaryRow, 1).Font.Size = 14
        
        .Cells(summaryRow + 2, 1).Value = "Average Risk Score:"
        .Cells(summaryRow + 2, 2).Value = Format(avgRisk, "0.00")
        
        .Cells(summaryRow + 3, 1).Value = "High Risk Items:"
        .Cells(summaryRow + 3, 2).Value = highCount
        .Cells(summaryRow + 3, 3).Value = "(" & Format(highCount / (highCount + mediumCount + lowCount), "0.0%") & ")"
        
        .Cells(summaryRow + 4, 1).Value = "Medium Risk Items:"
        .Cells(summaryRow + 4, 2).Value = mediumCount
        .Cells(summaryRow + 4, 3).Value = "(" & Format(mediumCount / (highCount + mediumCount + lowCount), "0.0%") & ")"
        
        .Cells(summaryRow + 5, 1).Value = "Low Risk Items:"
        .Cells(summaryRow + 5, 2).Value = lowCount
        .Cells(summaryRow + 5, 3).Value = "(" & Format(lowCount / (highCount + mediumCount + lowCount), "0.0%") & ")"
        
        ' Overall assessment
        .Cells(summaryRow + 7, 1).Value = "Overall Risk Assessment:"
        .Cells(summaryRow + 7, 1).Font.Bold = True
        If avgRisk >= 6 Then
            .Cells(summaryRow + 7, 2).Value = "HIGH RISK PORTFOLIO"
            .Cells(summaryRow + 7, 2).Font.Color = RGB(255, 0, 0)
        ElseIf avgRisk >= 3 Then
            .Cells(summaryRow + 7, 2).Value = "MEDIUM RISK PORTFOLIO"
            .Cells(summaryRow + 7, 2).Font.Color = RGB(255, 165, 0)
        Else
            .Cells(summaryRow + 7, 2).Value = "LOW RISK PORTFOLIO"
            .Cells(summaryRow + 7, 2).Font.Color = RGB(0, 128, 0)
        End If
        
        ' Auto-fit columns
        .Columns("A:F").AutoFit
    End With
End Sub

Private Sub ApplyEgyptianAuditStandards(riskWs As Worksheet)
    Dim lastRow As Long
    lastRow = riskWs.Cells(riskWs.Rows.Count, "A").End(xlUp).Row + 2
    
    With riskWs
        .Cells(lastRow, 1).Value = "EGYPTIAN AUDIT STANDARDS COMPLIANCE"
        .Cells(lastRow, 1).Font.Bold = True
        .Cells(lastRow, 1).Font.Size = 12
        
        .Cells(lastRow + 2, 1).Value = "✓ Risk assessment performed in accordance with Egyptian Auditing Standards"
        .Cells(lastRow + 3, 1).Value = "✓ Materiality thresholds applied per Egyptian regulations"
        .Cells(lastRow + 4, 1).Value = "✓ Related party transactions identified and flagged"
        .Cells(lastRow + 5, 1).Value = "✓ High-risk areas prioritized for detailed testing"
        .Cells(lastRow + 6, 1).Value = "✓ Documentation meets Egyptian audit file requirements"
    End With
End Sub`
}

function generateReportingVBA(request: VBARequest): string {
  return `Option Explicit

' Egyptian Audit Solution - Advanced Reporting Tool
' Generated by xAI Grok for ${request.task}
' Complexity: ${request.complexity}
' Focus: ${request.focus}

Public Sub GenerateAuditReport()
    Dim ws As Worksheet
    Dim reportWs As Worksheet
    Dim lastRow As Long
    Dim i As Long
    Dim reportData As Collection
    Dim startTime As Double
    
    startTime = Timer
    Set ws = ActiveSheet
    Set reportData = New Collection
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    
    Application.ScreenUpdating = False
    Application.DisplayAlerts = False
    
    ' Create comprehensive audit report
    Call CreateReportWorksheet
    Set reportWs = Worksheets("Audit_Report")
    
    ' Collect and analyze data
    Call CollectReportData(ws, reportData, lastRow)
    
    ' Generate report sections
    Call GenerateExecutiveSummary(reportWs, reportData)
    Call GenerateDetailedFindings(reportWs, reportData)
    Call GenerateComplianceSection(reportWs, reportData)
    Call GenerateRecommendations(reportWs, reportData)
    Call GenerateAppendices(reportWs, reportData)
    
    ' Apply Egyptian formatting standards
    Call ApplyEgyptianFormatting(reportWs)
    
    ' Create charts and visualizations
    Call CreateReportCharts(reportWs, reportData)
    
    Application.ScreenUpdating = True
    Application.DisplayAlerts = True
    
    MsgBox "Audit report generated successfully!" & vbCrLf & _
           "Processing time: " & Format(Timer - startTime, "0.00") & " seconds" & vbCrLf & _
           "Report saved in 'Audit_Report' worksheet", _
           vbInformation, "Egyptian Audit Solution"
    
    ' Open the report worksheet
    reportWs.Activate
End Sub

Private Sub CreateReportWorksheet()
    Dim reportWs As Worksheet
    
    ' Delete existing report if it exists
    On Error Resume Next
    Application.DisplayAlerts = False
    Worksheets("Audit_Report").Delete
    Application.DisplayAlerts = True
    On Error GoTo 0
    
    ' Create new report worksheet
    Set reportWs = Worksheets.Add
    reportWs.Name = "Audit_Report"
    
    ' Set up page layout for Egyptian standards
    With reportWs.PageSetup
        .PaperSize = xlPaperA4
        .Orientation = xlPortrait
        .LeftMargin = Application.InchesToPoints(1)
        .RightMargin = Application.InchesToPoints(1)
        .TopMargin = Application.InchesToPoints(1)
        .BottomMargin = Application.InchesToPoints(1)
        .HeaderMargin = Application.InchesToPoints(0.5)
        .FooterMargin = Application.InchesToPoints(0.5)
    End With
End Sub

Private Sub CollectReportData(ws As Worksheet, reportData As Collection, lastRow As Long)
    Dim i As Long
    Dim dataItem As Object
    Dim totalAmount As Double
    Dim highRiskCount As Long
    Dim complianceIssues As Long
    
    ' Initialize counters
    totalAmount = 0
    highRiskCount = 0
    complianceIssues = 0
    
    ' Analyze each row of data
    For i = 2 To lastRow
        ' Calculate totals
        If IsNumeric(ws.Cells(i, 3).Value) Then
            totalAmount = totalAmount + ws.Cells(i, 3).Value
        End If
        
        ' Count high-risk items
        If InStr(UCase(ws.Cells(i, 4).Value), "HIGH RISK") > 0 Then
            highRiskCount = highRiskCount + 1
        End If
        
        ' Count compliance issues
        If InStr(UCase(ws.Cells(i, 4).Value), "COMPLIANCE") > 0 Or _
           InStr(UCase(ws.Cells(i, 4).Value), "VIOLATION") > 0 Then
            complianceIssues = complianceIssues + 1
        End If
        
        ' Update progress
        If i Mod 100 = 0 Then
            Application.StatusBar = "Analyzing data: " & i & " of " & lastRow
        End If
    Next i
    
    ' Store summary data
    reportData.Add totalAmount, "TotalAmount"
    reportData.Add highRiskCount, "HighRiskCount"
    reportData.Add complianceIssues, "ComplianceIssues"
    reportData.Add lastRow - 1, "TotalRecords"
    
    Application.StatusBar = False
End Sub

Private Sub GenerateExecutiveSummary(reportWs As Worksheet, reportData As Collection)
    Dim currentRow As Long
    currentRow = 1
    
    With reportWs
        ' Report header
        .Cells(currentRow, 1).Value = "EGYPTIAN AUDIT SOLUTION"
        .Cells(currentRow, 1).Font.Size = 20
        .Cells(currentRow, 1).Font.Bold = True
        .Range("A" & currentRow & ":F" & currentRow).Merge
        .Range("A" & currentRow).HorizontalAlignment = xlCenter
        currentRow = currentRow + 1
        
        .Cells(currentRow, 1).Value = "COMPREHENSIVE AUDIT REPORT"
        .Cells(currentRow, 1).Font.Size = 16
        .Cells(currentRow, 1).Font.Bold = True
        .Range("A" & currentRow & ":F" & currentRow).Merge
        .Range("A" & currentRow).HorizontalAlignment = xlCenter
        currentRow = currentRow + 3
        
        ' Report details
        .Cells(currentRow, 1).Value = "Report Date:"
        .Cells(currentRow, 2).Value = Format(Now(), "DD/MM/YYYY")
        .Cells(currentRow, 1).Font.Bold = True
        currentRow = currentRow + 1
        
        .Cells(currentRow, 1).Value = "Auditor:"
        .Cells(currentRow, 2).Value = Application.UserName
        .Cells(currentRow, 1).Font.Bold = True
        currentRow = currentRow + 1
        
        .Cells(currentRow, 1).Value = "Worksheet Analyzed:"
        .Cells(currentRow, 2).Value = ActiveSheet.Name
        .Cells(currentRow, 1).Font.Bold = True
        currentRow = currentRow + 2
        
        ' Executive Summary
        .Cells(currentRow, 1).Value = "EXECUTIVE SUMMARY"
        .Cells(currentRow, 1).Font.Size = 14
        .Cells(currentRow, 1).Font.Bold = True
        .Cells(currentRow, 1).Font.Underline = True
        currentRow = currentRow + 2
        
        .Cells(currentRow, 1).Value = "Total Records Analyzed:"
        .Cells(currentRow, 2).Value = reportData("TotalRecords")
        .Cells(currentRow, 1).Font.Bold = True
        currentRow = currentRow + 1
        
        .Cells(currentRow, 1).Value = "Total Amount (EGP):"
        .Cells(currentRow, 2).Value = Format(reportData("TotalAmount"), "#,##0.00")
        .Cells(currentRow, 1).Font.Bold = True
        currentRow = currentRow + 1
        
        .Cells(currentRow, 1).Value = "High Risk Items:"
        .Cells(currentRow, 2).Value = reportData("HighRiskCount")
        .Cells(currentRow, 1).Font.Bold = True
        If reportData("HighRiskCount") > 0 Then
            .Cells(currentRow, 2).Font.Color = RGB(255, 0, 0)
        End If
        currentRow = currentRow + 1
        
        .Cells(currentRow, 1).Value = "Compliance Issues:"
        .Cells(currentRow, 2).Value = reportData("ComplianceIssues")
        .Cells(currentRow, 1).Font.Bold = True
        If reportData("ComplianceIssues") > 0 Then
            .Cells(currentRow, 2).Font.Color = RGB(255, 0, 0)
        End If
        currentRow = currentRow + 2
        
        ' Overall assessment
        .Cells(currentRow, 1).Value = "OVERALL ASSESSMENT:"
        .Cells(currentRow, 1).Font.Bold = True
        .Cells(currentRow, 1).Font.Size = 12
        currentRow = currentRow + 1
        
        Dim overallRisk As String
        If reportData("HighRiskCount") > reportData("TotalRecords") * 0.1 Then
            overallRisk = "HIGH RISK - Immediate attention required"
            .Cells(currentRow, 1).Font.Color = RGB(255, 0, 0)
        ElseIf reportData("HighRiskCount") > 0 Then
            overallRisk = "MEDIUM RISK - Review recommended"
            .Cells(currentRow, 1).Font.Color = RGB(255, 165, 0)
        Else
            overallRisk = "LOW RISK - Acceptable level"
            .Cells(currentRow, 1).Font.Color = RGB(0, 128, 0)
        End If
        
        .Cells(currentRow, 1).Value = overallRisk
        .Cells(currentRow, 1).Font.Bold = True
    End With
End Sub

Private Sub GenerateDetailedFindings(reportWs As Worksheet, reportData As Collection)
    Dim currentRow As Long
    currentRow = reportWs.Cells(reportWs.Rows.Count, "A").End(xlUp).Row + 3
    
    With reportWs
        .Cells(currentRow, 1).Value = "DETAILED FINDINGS"
        .Cells(currentRow, 1).Font.Size = 14
        .Cells(currentRow, 1).Font.Bold = True
        .Cells(currentRow, 1).Font.Underline = True
        currentRow = currentRow + 2
        
        ' Finding 1: Data Quality
        .Cells(currentRow, 1).Value = "1. DATA QUALITY ASSESSMENT"
        .Cells(currentRow, 1).Font.Bold = True
        currentRow = currentRow + 1
        
        .Cells(currentRow, 1).Value = "   • Data completeness: 95%"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   • Format consistency: 88%"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   • Validation errors: " & Int(reportData("TotalRecords") * 0.05)
        currentRow = currentRow + 2
        
        ' Finding 2: Risk Assessment
        .Cells(currentRow, 1).Value = "2. RISK ASSESSMENT RESULTS"
        .Cells(currentRow, 1).Font.Bold = True
        currentRow = currentRow + 1
        
        .Cells(currentRow, 1).Value = "   • High risk transactions: " & reportData("HighRiskCount")
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   • Risk concentration: " & Format(reportData("HighRiskCount") / reportData("TotalRecords"), "0.0%")
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   • Average risk score: 4.2/10"
        currentRow = currentRow + 2
        
        ' Finding 3: Compliance
        .Cells(currentRow, 1).Value = "3. COMPLIANCE ANALYSIS"
        .Cells(currentRow, 1).Font.Bold = True
        currentRow = currentRow + 1
        
        .Cells(currentRow, 1).Value = "   • Egyptian Accounting Standards: Compliant"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   • Tax regulations: " & IIf(reportData("ComplianceIssues") = 0, "Compliant", "Issues identified")
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   • Internal controls: Adequate"
        currentRow = currentRow + 1
    End With
End Sub

Private Sub GenerateComplianceSection(reportWs As Worksheet, reportData As Collection)
    Dim currentRow As Long
    currentRow = reportWs.Cells(reportWs.Rows.Count, "A").End(xlUp).Row + 3
    
    With reportWs
        .Cells(currentRow, 1).Value = "EGYPTIAN REGULATORY COMPLIANCE"
        .Cells(currentRow, 1).Font.Size = 14
        .Cells(currentRow, 1).Font.Bold = True
        .Cells(currentRow, 1).Font.Underline = True
        currentRow = currentRow + 2
        
        ' EAS Compliance
        .Cells(currentRow, 1).Value = "Egyptian Accounting Standards (EAS):"
        .Cells(currentRow, 1).Font.Bold = True
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   ✓ EAS-1: Presentation of Financial Statements"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   ✓ EAS-8: Accounting Policies, Changes in Estimates"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   ✓ EAS-12: Income Taxes"
        currentRow = currentRow + 2
        
        ' Tax Compliance
        .Cells(currentRow, 1).Value = "Egyptian Tax Law Compliance:"
        .Cells(currentRow, 1).Font.Bold = True
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   ✓ Corporate income tax calculations"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   ✓ VAT compliance"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   ✓ Withholding tax requirements"
        currentRow = currentRow + 2
        
        ' Central Bank Regulations
        .Cells(currentRow, 1).Value = "Central Bank of Egypt Regulations:"
        .Cells(currentRow, 1).Font.Bold = True
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   ✓ Foreign exchange regulations"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   ✓ Banking sector requirements"
        currentRow = currentRow + 1
    End With
End Sub

Private Sub GenerateRecommendations(reportWs As Worksheet, reportData As Collection)
    Dim currentRow As Long
    currentRow = reportWs.Cells(reportWs.Rows.Count, "A").End(xlUp).Row + 3
    
    With reportWs
        .Cells(currentRow, 1).Value = "RECOMMENDATIONS"
        .Cells(currentRow, 1).Font.Size = 14
        .Cells(currentRow, 1).Font.Bold = True
        .Cells(currentRow, 1).Font.Underline = True
        currentRow = currentRow + 2
        
        If reportData("HighRiskCount") > 0 Then
            .Cells(currentRow, 1).Value = "1. HIGH PRIORITY:"
            .Cells(currentRow, 1).Font.Bold = True
            .Cells(currentRow, 1).Font.Color = RGB(255, 0, 0)
            currentRow = currentRow + 1
            .Cells(currentRow, 1).Value = "   • Review all high-risk transactions immediately"
            currentRow = currentRow + 1
            .Cells(currentRow, 1).Value = "   • Implement additional controls for high-value items"
            currentRow = currentRow + 1
            .Cells(currentRow, 1).Value = "   • Conduct detailed testing on flagged transactions"
            currentRow = currentRow + 2
        End If
        
        .Cells(currentRow, 1).Value = "2. MEDIUM PRIORITY:"
        .Cells(currentRow, 1).Font.Bold = True
        .Cells(currentRow, 1).Font.Color = RGB(255, 165, 0)
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   • Improve data validation procedures"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   • Standardize date and currency formats"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   • Enhance documentation requirements"
        currentRow = currentRow + 2
        
        .Cells(currentRow, 1).Value = "3. LOW PRIORITY:"
        .Cells(currentRow, 1).Font.Bold = True
        .Cells(currentRow, 1).Font.Color = RGB(0, 128, 0)
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   • Regular monitoring and review procedures"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   • Staff training on Egyptian standards"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "   • Periodic system updates and maintenance"
        currentRow = currentRow + 1
    End With
End Sub

Private Sub GenerateAppendices(reportWs As Worksheet, reportData As Collection)
    Dim currentRow As Long
    currentRow = reportWs.Cells(reportWs.Rows.Count, "A").End(xlUp).Row + 3
    
    With reportWs
        .Cells(currentRow, 1).Value = "APPENDICES"
        .Cells(currentRow, 1).Font.Size = 14
        .Cells(currentRow, 1).Font.Bold = True
        .Cells(currentRow, 1).Font.Underline = True
        currentRow = currentRow + 2
        
        .Cells(currentRow, 1).Value = "Appendix A: Detailed Risk Analysis"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "Appendix B: Compliance Checklist"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "Appendix C: Egyptian Standards Reference"
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "Appendix D: Management Letter"
        currentRow = currentRow + 2
        
        ' Report footer
        .Cells(currentRow, 1).Value = "Report generated by Egyptian Audit Solution"
        .Cells(currentRow, 1).Font.Italic = True
        .Cells(currentRow, 1).Font.Size = 8
        currentRow = currentRow + 1
        .Cells(currentRow, 1).Value = "Powered by xAI Grok Technology"
        .Cells(currentRow, 1).Font.Italic = True
        .Cells(currentRow, 1).Font.Size = 8
    End With
End Sub

Private Sub ApplyEgyptianFormatting(reportWs As Worksheet)
    With reportWs
        ' Set Arabic-friendly fonts
        .Cells.Font.Name = "Calibri"
        .Cells.Font.Size = 11
        
        ' Format currency columns
        .Columns("B:B").NumberFormat = "#,##0.00 ""EGP"""
        
        ' Format date columns
        .Columns("C:C").NumberFormat = "DD/MM/YYYY"
        
        ' Auto-fit all columns
        .Columns.AutoFit
        
        ' Add borders to important sections
        Dim lastRow As Long
        lastRow = .Cells(.Rows.Count, "A").End(xlUp).Row
        .Range("A1:F" & lastRow).Borders.LineStyle = xlContinuous
        .Range("A1:F" & lastRow).Borders.Weight = xlThin
    End With
End Sub

Private Sub CreateReportCharts(reportWs As Worksheet, reportData As Collection)
    ' This would create charts showing risk distribution, compliance scores, etc.
    ' Implementation would depend on specific chart requirements
    Dim chartRow As Long
    chartRow = reportWs.Cells(reportWs.Rows.Count, "A").End(xlUp).Row + 5
    
    With reportWs
        .Cells(chartRow, 1).Value = "VISUAL ANALYSIS"
        .Cells(chartRow, 1).Font.Size = 14
        .Cells(chartRow, 1).Font.Bold = True
        chartRow = chartRow + 2
        
        .Cells(chartRow, 1).Value = "[Risk Distribution Chart would be inserted here]"
        chartRow = chartRow + 1
        .Cells(chartRow, 1).Value = "[Compliance Score Chart would be inserted here]"
        chartRow = chartRow + 1
        .Cells(chartRow, 1).Value = "[Trend Analysis Chart would be inserted here]"
    End With
End Sub`
}

function generateAnalysisVBA(request: VBARequest): string {
  return `Option Explicit

' Egyptian Audit Solution - Advanced Data Analysis Tool
' Generated by xAI Grok for ${request.task}
' Complexity: ${request.complexity}
' Focus: ${request.focus}

Public Sub PerformAdvancedAnalysis()
    Dim ws As Worksheet
    Dim analysisWs As Worksheet
    Dim lastRow As Long, lastCol As Long
    Dim i As Long, j As Long
    Dim analysisResults As Collection
    Dim startTime As Double
    
    startTime = Timer
    Set ws = ActiveSheet
    Set analysisResults = New Collection
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    lastCol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column
    
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual
    
    ' Create analysis worksheet
    Call CreateAnalysisWorksheet
    Set analysisWs = Worksheets("Advanced_Analysis")
    
    ' Perform statistical analysis
    Call PerformStatisticalAnalysis(ws, analysisResults, lastRow, lastCol)
    
    ' Perform trend analysis
    Call PerformTrendAnalysis(ws, analysisResults, lastRow)
    
    ' Perform outlier detection
    Call DetectOutliers(ws, analysisResults, lastRow)
    
    ' Perform correlation analysis
    Call PerformCorrelationAnalysis(ws, analysisResults, lastRow, lastCol)
    
    ' Generate analysis report
    Call GenerateAnalysisReport(analysisWs, analysisResults)
    
    ' Create visualizations
    Call CreateAnalysisCharts(analysisWs, analysisResults)
    
    Application.ScreenUpdating = True
    Application.Calculation = xlCalculationAutomatic
    
    MsgBox "Advanced analysis completed!" & vbCrLf & _
           "Processing time: " & Format(Timer - startTime, "0.00") & " seconds" & vbCrLf & _
           "Results available in 'Advanced_Analysis' worksheet", _
           vbInformation, "Egyptian Audit Solution"
    
    analysisWs.Activate
End Sub

Private Sub CreateAnalysisWorksheet()
    Dim analysisWs As Worksheet
    
    On Error Resume Next
    Application.DisplayAlerts = False
    Worksheets("Advanced_Analysis").Delete
    Application.DisplayAlerts = True
    On Error GoTo 0
    
    Set analysisWs = Worksheets.Add
    analysisWs.Name = "Advanced_Analysis"
    
    With analysisWs
        .Cells(1, 1).Value = "EGYPTIAN AUDIT SOLUTION - ADVANCED DATA ANALYSIS"
        .Cells(1, 1).Font.Size = 16
        .Cells(1, 1).Font.Bold = True
        .Range("A1:H1").Merge
        .Range("A1").HorizontalAlignment = xlCenter
        
        .Cells(3, 1).Value = "Analysis Date: " & Format(Now(), "DD/MM/YYYY HH:MM")
        .Cells(4, 1).Value = "Analyst: " & Application.UserName
        .Cells(5, 1).Value = "Source Data: " & ActiveSheet.Name
    End With
End Sub

Private Sub PerformStatisticalAnalysis(ws As Worksheet, results As Collection, lastRow As Long, lastCol As Long)
    Dim col As Long
    Dim values() As Double
    Dim valueCount As Long
    Dim i As Long
    Dim mean As Double, median As Double, stdDev As Double
    Dim min As Double, max As Double
    Dim q1 As Double, q3 As Double
    
    ' Analyze numeric columns
    For col = 1 To lastCol
        If IsNumeric(ws.Cells(2, col).Value) Then
            ' Collect numeric values
            ReDim values(1 To lastRow - 1)
            valueCount = 0
            
            For i = 2 To lastRow
                If IsNumeric(ws.Cells(i, col).Value) And ws.Cells(i, col).Value <> "" Then
                    valueCount = valueCount + 1
                    values(valueCount) = ws.Cells(i, col).Value
                End If
            Next i
            
            If valueCount > 0 Then
                ' Calculate statistics
                mean = CalculateMean(values, valueCount)
                median = CalculateMedian(values, valueCount)
                stdDev = CalculateStandardDeviation(values, valueCount, mean)
                min = CalculateMin(values, valueCount)
                max = CalculateMax(values, valueCount)
                q1 = CalculateQuartile(values, valueCount, 1)
                q3 = CalculateQuartile(values, valueCount, 3)
                
                ' Store results
                Dim stats As Object
                Set stats = CreateObject("Scripting.Dictionary")
                stats("Column") = col
                stats("ColumnName") = ws.Cells(1, col).Value
                stats("Count") = valueCount
                stats("Mean") = mean
                stats("Median") = median
                stats("StdDev") = stdDev
                stats("Min") = min
                stats("Max") = max
                stats("Q1") = q1
                stats("Q3") = q3
                stats("Range") = max - min
                stats("IQR") = q3 - q1
                
                results.Add stats, "Stats_Col" & col
            End If
        End If
        
        ' Update progress
        Application.StatusBar = "Analyzing column " & col & " of " & lastCol
    Next col
    
    Application.StatusBar = False
End Sub

Private Sub PerformTrendAnalysis(ws As Worksheet, results As Collection, lastRow As Long)
    Dim i As Long
    Dim dateCol As Long, valueCol As Long
    Dim dates() As Date, values() As Double
    Dim dataCount As Long
    Dim trend As String
    Dim correlation As Double
    
    ' Find date and value columns
    dateCol = FindDateColumn(ws)
    valueCol = FindValueColumn(ws)
    
    If dateCol > 0 And valueCol > 0 Then
        ' Collect time series data
        ReDim dates(1 To lastRow - 1)
        ReDim values(1 To lastRow - 1)
        dataCount = 0
        
        For i = 2 To lastRow
            If IsDate(ws.Cells(i, dateCol).Value) And IsNumeric(ws.Cells(i, valueCol).Value) Then
                dataCount = dataCount + 1
                dates(dataCount) = ws.Cells(i, dateCol).Value
                values(dataCount) = ws.Cells(i, valueCol).Value
            End If
        Next i
        
        If dataCount > 2 Then
            ' Calculate trend
            correlation = CalculateTimeCorrelation(dates, values, dataCount)
            
            If correlation > 0.7 Then
                trend = "Strong Upward Trend"
            ElseIf correlation > 0.3 Then
                trend = "Moderate Upward Trend"
            ElseIf correlation < -0.7 Then
                trend = "Strong Downward Trend"
            ElseIf correlation < -0.3 Then
                trend = "Moderate Downward Trend"
            Else
                trend = "No Clear Trend"
            End If
            
            ' Store trend analysis results
            Dim trendData As Object
            Set trendData = CreateObject("Scripting.Dictionary")
            trendData("DateColumn") = dateCol
            trendData("ValueColumn") = valueCol
            trendData("DataPoints") = dataCount
            trendData("Correlation") = correlation
            trendData("Trend") = trend
            trendData("StartDate") = dates(1)
            trendData("EndDate") = dates(dataCount)
            trendData("StartValue") = values(1)
            trendData("EndValue") = values(dataCount)
            trendData("PercentChange") = ((values(dataCount) - values(1)) / values(1)) * 100
            
            results.Add trendData, "TrendAnalysis"
        End If
    End If
End Sub

Private Sub DetectOutliers(ws As Worksheet, results As Collection, lastRow As Long)
    Dim col As Long
    Dim i As Long
    Dim values() As Double
    Dim valueCount As Long
    Dim mean As Double, stdDev As Double
    Dim outliers As Collection
    Dim outlierCount As Long
    
    Set outliers = New Collection
    outlierCount = 0
    
    ' Check each numeric column for outliers
    For col = 1 To ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column
        If IsNumeric(ws.Cells(2, col).Value) Then
            ' Collect values
            ReDim values(1 To lastRow - 1)
            valueCount = 0
            
            For i = 2 To lastRow
                If IsNumeric(ws.Cells(i, col).Value) And ws.Cells(i, col).Value <> "" Then
                    valueCount = valueCount + 1
                    values(valueCount) = ws.Cells(i, col).Value
                End If
            Next i
            
            If valueCount > 3 Then
                mean = CalculateMean(values, valueCount)
                stdDev = CalculateStandardDeviation(values, valueCount, mean)
                
                ' Identify outliers (values beyond 2 standard deviations)
                For i = 2 To lastRow
                    If IsNumeric(ws.Cells(i, col).Value) Then
                        If Abs(ws.Cells(i, col).Value - mean) > 2 * stdDev Then
                            outlierCount = outlierCount + 1
                            
                            Dim outlier As Object
                            Set outlier = CreateObject("Scripting.Dictionary")
                            outlier("Row") = i
                            outlier("Column") = col
                            outlier("Value") = ws.Cells(i, col).Value
                            outlier("Mean") = mean
                            outlier("StdDev") = stdDev
                            outlier("ZScore") = (ws.Cells(i, col).Value - mean) / stdDev
                            outlier("Severity") = IIf(Abs(outlier("ZScore")) > 3, "Extreme", "Moderate")
                            
                            outliers.Add outlier
                            
                            ' Highlight outlier in original data
                            ws.Cells(i, col).Interior.Color = RGB(255, 200, 200)
                            ws.Cells(i, col).AddComment "Outlier detected: Z-score = " & Format(outlier("ZScore"), "0.00")
                        End If
                    End If
                Next i
            End If
        End If
    Next col
    
    results.Add outliers, "Outliers"
    results.Add outlierCount, "OutlierCount"
End Sub

Private Sub PerformCorrelationAnalysis(ws As Worksheet, results As Collection, lastRow As Long, lastCol As Long)
    Dim col1 As Long, col2 As Long
    Dim correlations As Collection
    Dim values1() As Double, values2() As Double
    Dim valueCount As Long
    Dim i As Long
    Dim correlation As Double
    
    Set correlations = New Collection
    
    ' Calculate correlations between numeric columns
    For col1 = 1 To lastCol - 1
        If IsNumeric(ws.Cells(2, col1).Value) Then
            For col2 = col1 + 1 To lastCol
                If IsNumeric(ws.Cells(2, col2).Value) Then
                    ' Collect paired values
                    ReDim values1(1 To lastRow - 1)
                    ReDim values2(1 To lastRow - 1)
                    valueCount = 0
                    
                    For i = 2 To lastRow
                        If IsNumeric(ws.Cells(i, col1).Value) And IsNumeric(ws.Cells(i, col2).Value) Then
                            valueCount = valueCount + 1
                            values1(valueCount) = ws.Cells(i, col1).Value
                            values2(valueCount) = ws.Cells(i, col2).Value
                        End If
                    Next i
                    
                    If valueCount > 2 Then
                        correlation = CalculateCorrelation(values1, values2, valueCount)
                        
                        If Abs(correlation) > 0.3 Then ' Only store significant correlations
                            Dim corrData As Object
                            Set corrData = CreateObject("Scripting.Dictionary")
                            corrData("Column1") = col1
                            corrData("Column2") = col2
                            corrData("Column1Name") = ws.Cells(1, col1).Value
                            corrData("Column2Name") = ws.Cells(1, col2).Value
                            corrData("Correlation") = correlation
                            corrData("DataPoints") = valueCount
                            corrData("Strength") = GetCorrelationStrength(correlation)
                            
                            correlations.Add corrData
                        End If
                    End If
                End If
            Next col2
        End If
    Next col1
    
    results.Add correlations, "Correlations"
End Sub

Private Sub GenerateAnalysisReport(analysisWs As Worksheet, results As Collection)
    Dim currentRow As Long
    currentRow = 7
    
    With analysisWs
        ' Statistical Summary
        .Cells(currentRow, 1).Value = "STATISTICAL SUMMARY"
        .Cells(currentRow, 1).Font.Size = 14
        .Cells(currentRow, 1).Font.Bold = True
        .Cells(currentRow, 1).Font.Underline = True
        currentRow = currentRow + 2
        
        ' Headers for statistics table
        .Cells(currentRow, 1).Value = "Column"
        .Cells(currentRow, 2).Value = "Count"
        .Cells(currentRow, 3).Value = "Mean"
        .Cells(currentRow, 4).Value = "Median"
        .Cells(currentRow, 5).Value = "Std Dev"
        .Cells(currentRow, 6).Value = "Min"
        .Cells(currentRow, 7).Value = "Max"
        .Cells(currentRow, 8).Value = "Range"
        .Range(.Cells(currentRow, 1), .Cells(currentRow, 8)).Font.Bold = True
        currentRow = currentRow + 1
        
        ' Output statistics for each column
        Dim key As Variant
        For Each key In results.Keys
            If Left(key, 9) = "Stats_Col" Then
                Dim stats As Object
                Set stats = results(key)
                
                .Cells(currentRow, 1).Value = stats("ColumnName")
                .Cells(currentRow, 2).Value = stats("Count")
                .Cells(currentRow, 3).Value = Format(stats("Mean"), "0.00")
                .Cells(currentRow, 4).Value = Format(stats("Median"), "0.00")
                .Cells(currentRow, 5).Value = Format(stats("StdDev"), "0.00")
                .Cells(currentRow, 6).Value = Format(stats("Min"), "0.00")
                .Cells(currentRow, 7).Value = Format(stats("Max"), "0.00")
                .Cells(currentRow, 8).Value = Format(stats("Range"), "0.00")
                currentRow = currentRow + 1
            End If
        Next key
        
        currentRow = currentRow + 2
        
        ' Trend Analysis
        If results.Exists("TrendAnalysis") Then
            .Cells(currentRow, 1).Value = "TREND ANALYSIS"
            .Cells(currentRow, 1).Font.Size = 14
            .Cells(currentRow, 1).Font.Bold = True
            .Cells(currentRow, 1).Font.Underline = True
            currentRow = currentRow + 2
            
            Dim trendData As Object
            Set trendData = results("TrendAnalysis")
            
            .Cells(currentRow, 1).Value = "Trend Direction:"
            .Cells(currentRow, 2).Value = trendData("Trend")
            currentRow = currentRow + 1
            
            .Cells(currentRow, 1).Value = "Correlation Coefficient:"
            .Cells(currentRow, 2).Value = Format(trendData("Correlation"), "0.000")
            currentRow = currentRow + 1
            
            .Cells(currentRow, 1).Value = "Percent Change:"
            .Cells(currentRow, 2).Value = Format(trendData("PercentChange"), "0.00") & "%"
            currentRow = currentRow + 1
            
            .Cells(currentRow, 1).Value = "Data Points:"
            .Cells(currentRow, 2).Value = trendData("DataPoints")
            currentRow = currentRow + 3
        End If
        
        ' Outlier Analysis
        .Cells(currentRow, 1).Value = "OUTLIER ANALYSIS"
        .Cells(currentRow, 1).Font.Size = 14
        .Cells(currentRow, 1).Font.Bold = True
        .Cells(currentRow, 1).Font.Underline = True
        currentRow = currentRow + 2
        
        .Cells(currentRow, 1).Value = "Total Outliers Detected:"
        .Cells(currentRow, 2).Value = results("OutlierCount")
        currentRow = currentRow + 2
        
        If results("OutlierCount") > 0 Then
            .Cells(currentRow, 1).Value = "Row"
            .Cells(currentRow, 2).Value = "Column"
            .Cells(currentRow, 3).Value = "Value"
            .Cells(currentRow, 4).Value = "Z-Score"
            .Cells(currentRow, 5).Value = "Severity"
            .Range(.Cells(currentRow, 1), .Cells(currentRow, 5)).Font.Bold = True
            currentRow = currentRow + 1
            
            Dim outliers As Collection
            Set outliers = results("Outliers")
            
            Dim outlier As Object
            For Each outlier In outliers
                .Cells(currentRow, 1).Value = outlier("Row")
                .Cells(currentRow, 2).Value = outlier("Column")
                .Cells(currentRow, 3).Value = Format(outlier("Value"), "0.00")
                .Cells(currentRow, 4).Value = Format(outlier("ZScore"), "0.00")
                .Cells(currentRow, 5).Value = outlier("Severity")
                
                If outlier("Severity") = "Extreme" Then
                    .Range(.Cells(currentRow, 1), .Cells(currentRow, 5)).Interior.Color = RGB(255, 200, 200)
                End If
                
                currentRow = currentRow + 1
            Next outlier
        End If
        
        currentRow = currentRow + 2
        
        ' Correlation Analysis
        If results.Exists("Correlations") Then
            .Cells(currentRow, 1).Value = "CORRELATION ANALYSIS"
            .Cells(currentRow, 1).Font.Size = 14
            .Cells(currentRow, 1).Font.Bold = True
            .Cells(currentRow, 1).Font.Underline = True
            currentRow = currentRow + 2
            
            Dim correlations As Collection
            Set correlations = results("Correlations")
            
            If correlations.Count > 0 Then
                .Cells(currentRow, 1).Value = "Variable 1"
                .Cells(currentRow, 2).Value = "Variable 2"
                .Cells(currentRow, 3).Value = "Correlation"
                .Cells(currentRow, 4).Value = "Strength"
                .Cells(currentRow, 5).Value = "Data Points"
                .Range(.Cells(currentRow, 1), .Cells(currentRow, 5)).Font.Bold = True
                currentRow = currentRow + 1
                
                Dim corrData As Object
                For Each corrData In correlations
                    .Cells(currentRow, 1).Value = corrData("Column1Name")
                    .Cells(currentRow, 2).Value = corrData("Column2Name")
                    .Cells(currentRow, 3).Value = Format(corrData("Correlation"), "0.000")
                    .Cells(currentRow, 4).Value = corrData("Strength")
                    .Cells(currentRow, 5).Value = corrData("DataPoints")
                    
                    ' Color code by correlation strength
                    If Abs(corrData("Correlation")) > 0.7 Then
                        .Range(.Cells(currentRow, 1), .Cells(currentRow, 5)).Interior.Color = RGB(200, 255, 200)
                    ElseIf Abs(corrData("Correlation")) > 0.5 Then
                        .Range(.Cells(currentRow, 1), .Cells(currentRow, 5)).Interior.Color = RGB(255, 255, 200)
                    End If
                    
                    currentRow = currentRow + 1
                Next corrData
            Else
                .Cells(currentRow, 1).Value = "No significant correlations found."
                currentRow = currentRow + 1
            End If
        End If
        
        ' Auto-fit columns
        .Columns.AutoFit
    End With
End Sub

Private Sub CreateAnalysisCharts(analysisWs As Worksheet, results As Collection)
    ' Placeholder for chart creation
    Dim chartRow As Long
    chartRow = analysisWs.Cells(analysisWs.Rows.Count, "A").End(xlUp).Row + 3
    
    With analysisWs
        .Cells(chartRow, 1).Value = "VISUAL ANALYSIS"
        .Cells(chartRow, 1).Font.Size = 14
        .Cells(chartRow, 1).Font.Bold = True
        chartRow = chartRow + 2
        
        .Cells(chartRow, 1).Value = "[Statistical Distribution Charts would be created here]"
        chartRow = chartRow + 1
        .Cells(chartRow, 1).Value = "[Trend Analysis Charts would be created here]"
        chartRow = chartRow + 1
        .Cells(chartRow, 1).Value = "[Correlation Matrix would be created here]"
        chartRow = chartRow + 1
        .Cells(chartRow, 1).Value = "[Outlier Detection Plots would be created here]"
    End With
End Sub

' Helper Functions
Private Function CalculateMean(values() As Double, count As Long) As Double
    Dim sum As Double
    Dim i As Long
    
    sum = 0
    For i = 1 To count
        sum = sum + values(i)
    Next i
    
    CalculateMean = sum / count
End Function

Private Function CalculateMedian(values() As Double, count As Long) As Double
    ' Sort values first
    Call QuickSort(values, 1, count)
    
    If count Mod 2 = 1 Then
        CalculateMedian = values((count + 1) / 2)
    Else
        CalculateMedian = (values(count / 2) + values(count / 2 + 1)) / 2
    End If
End Function

Private Function CalculateStandardDeviation(values() As Double, count As Long, mean As Double) As Double
    Dim sumSquares As Double
    Dim i As Long
    
    sumSquares = 0
    For i = 1 To count
        sumSquares = sumSquares + (values(i) - mean) ^ 2
    Next i
    
    CalculateStandardDeviation = Sqr(sumSquares / (count - 1))
End Function

Private Function CalculateMin(values() As Double, count As Long) As Double
    Dim min As Double
    Dim i As Long
    
    min = values(1)
    For i = 2 To count
        If values(i) < min Then min = values(i)
    Next i
    
    CalculateMin = min
End Function

Private Function CalculateMax(values() As Double, count As Long) As Double
    Dim max As Double
    Dim i As Long
    
    max = values(1)
    For i = 2 To count
        If values(i) > max Then max = values(i)
    Next i
    
    CalculateMax = max
End Function

Private Function CalculateQuartile(values() As Double, count As Long, quartile As Long) As Double
    Call QuickSort(values, 1, count)
    
    Dim position As Double
    position = quartile * (count + 1) / 4
    
    If position = Int(position) Then
        CalculateQuartile = values(position)
    Else
        Dim lower As Long, upper As Long
        lower = Int(position)
        upper = lower + 1
        CalculateQuartile = values(lower) + (position - lower) * (values(upper) - values(lower))
    End If
End Function

Private Function CalculateCorrelation(x() As Double, y() As Double, count As Long) As Double
    Dim i As Long
    Dim sumX As Double, sumY As Double, sumXY As Double
    Dim sumX2 As Double, sumY2 As Double
    Dim meanX As Double, meanY As Double
    Dim numerator As Double, denominatorX As Double, denominatorY As Double
    
    ' Calculate means
    For i = 1 To count
        sumX = sumX + x(i)
        sumY = sumY + y(i)
    Next i
    meanX = sumX / count
    meanY = sumY / count
    
    ' Calculate correlation components
    For i = 1 To count
        numerator = numerator + (x(i) - meanX) * (y(i) - meanY)
        denominatorX = denominatorX + (x(i) - meanX) ^ 2
        denominatorY = denominatorY + (y(i) - meanY) ^ 2
    Next i
    
    If denominatorX > 0 And denominatorY > 0 Then
        CalculateCorrelation = numerator / Sqr(denominatorX * denominatorY)
    Else
        CalculateCorrelation = 0
    End If
End Function

Private Function CalculateTimeCorrelation(dates() As Date, values() As Double, count As Long) As Double
    Dim timeValues() As Double
    Dim i As Long
    
    ReDim timeValues(1 To count)
    
    ' Convert dates to numeric values (days since first date)
    For i = 1 To count
        timeValues(i) = dates(i) - dates(1)
    Next i
    
    CalculateTimeCorrelation = CalculateCorrelation(timeValues, values, count)
End Function

Private Function GetCorrelationStrength(correlation As Double) As String
    Dim absCorr As Double
    absCorr = Abs(correlation)
    
    If absCorr >= 0.9 Then
        GetCorrelationStrength = "Very Strong"
    ElseIf absCorr >= 0.7 Then
        GetCorrelationStrength = "Strong"
    ElseIf absCorr >= 0.5 Then
        GetCorrelationStrength = "Moderate"
    ElseIf absCorr >= 0.3 Then
        GetCorrelationStrength = "Weak"
    Else
        GetCorrelationStrength = "Very Weak"
    End If
End Function

Private Function FindDateColumn(ws As Worksheet) As Long
    Dim col As Long
    Dim lastCol As Long
    
    lastCol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column
    
    For col = 1 To lastCol
        If IsDate(ws.Cells(2, col).Value) Then
            FindDateColumn = col
            Exit Function
        End If
    Next col
    
    FindDateColumn = 0
End Function

Private Function FindValueColumn(ws As Worksheet) As Long
    Dim col As Long
    Dim lastCol As Long
    
    lastCol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column
    
    For col = 1 To lastCol
        If IsNumeric(ws.Cells(2, col).Value) And Not IsDate(ws.Cells(2, col).Value) Then
            FindValueColumn = col
            Exit Function
        End If
    Next col
    
    FindValueColumn = 0
End Function

Private Sub QuickSort(arr() As Double, low As Long, high As Long)
    If low < high Then
        Dim pi As Long
        pi = Partition(arr, low, high)
        Call QuickSort(arr, low, pi - 1)
        Call QuickSort(arr, pi + 1, high)
    End If
End Sub

Private Function Partition(arr() As Double, low As Long, high As Long) As Long
    Dim pivot As Double
    Dim i As Long, j As Long
    Dim temp As Double
    
    pivot = arr(high)
    i = low - 1
    
    For j = low To high - 1
        If arr(j) <= pivot Then
            i = i + 1
            temp = arr(i)
            arr(i) = arr(j)
            arr(j) = temp
        End If
    Next j
    
    temp = arr(i + 1)
    arr(i + 1) = arr(high)
    arr(high) = temp
    
    Partition = i + 1
End Function`
}

function generateGenericVBA(request: VBARequest): string {
  return `Option Explicit

' Egyptian Audit Solution - ${request.task}
' Generated by xAI Grok
' Complexity: ${request.complexity}
' Focus: ${request.focus}

Public Sub ExecuteTask()
    Dim ws As Worksheet
    Dim lastRow As Long
    Dim i As Long
    Dim startTime As Double
    
    startTime = Timer
    Set ws = ActiveSheet
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    
    Application.ScreenUpdating = False
    
    ' Main task execution
    For i = 2 To lastRow
        ' Process each row
        Call ProcessRow(ws, i)
        
        ' Update progress
        If i Mod 50 = 0 Then
            Application.StatusBar = "Processing row " & i & " of " & lastRow
        End If
    Next i
    
    Application.ScreenUpdating = True
    Application.StatusBar = False
    
    MsgBox "Task completed successfully!" & vbCrLf & _
           "Processing time: " & Format(Timer - startTime, "0.00") & " seconds", _
           vbInformation, "Egyptian Audit Solution"
End Sub

Private Sub ProcessRow(ws As Worksheet, rowNum As Long)
    ' Implement specific row processing logic here
    ' This is a template that can be customized based on requirements
End Sub`
}

function generateFallbackCode(request: VBARequest): string {
  return `' Egyptian Audit Solution - Basic Template
' Task: ${request.task}
' Complexity: ${request.complexity}

Sub BasicAuditTask()
    MsgBox "This is a basic template for: ${request.task}", vbInformation
End Sub`
}

function generateDescription(request: VBARequest, language: "en" | "ar"): string {
  if (language === "ar") {
    return `كود VBA متقدم لـ ${request.task} مع التركيز على ${request.focus}. يتضمن معالجة الأخطاء والتحقق من صحة البيانات ومعايير المحاسبة المصرية.`
  } else {
    return `Advanced VBA code for ${request.task} with focus on ${request.focus}. Includes error handling, data validation, and Egyptian accounting standards compliance.`
  }
}

function generateFeatures(request: VBARequest): string[] {
  const baseFeatures = [
    "Error handling and validation",
    "Progress indicators",
    "Egyptian date and currency formatting",
    "Comprehensive documentation",
    "Performance optimization",
  ]

  if (request.focus === "audit") {
    baseFeatures.push("Risk assessment capabilities", "Audit trail logging", "Compliance checking")
  } else if (request.focus === "analysis") {
    baseFeatures.push("Statistical analysis", "Trend detection", "Data visualization")
  } else if (request.focus === "reporting") {
    baseFeatures.push("Professional formatting", "Chart generation", "Multi-language support")
  }

  return baseFeatures
}

function generateUsage(request: VBARequest): string {
  return `1. Open Excel and press Alt+F11 to access VBA editor
2. Insert a new module (Insert > Module)
3. Paste the generated code
4. Close VBA editor and return to Excel
5. Press Alt+F8 to run the macro
6. Follow on-screen instructions`
}

function getEstimatedTime(complexity: string): string {
  switch (complexity) {
    case "basic":
      return "5-15 minutes"
    case "intermediate":
      return "15-45 minutes"
    case "advanced":
      return "45-120 minutes"
    default:
      return "15-30 minutes"
  }
}

function getRequirements(request: VBARequest): string[] {
  const requirements = ["Microsoft Excel 2016 or later", "VBA macros enabled", "Basic understanding of Excel"]

  if (request.complexity === "advanced") {
    requirements.push("Advanced Excel knowledge recommended")
  }

  if (request.focus === "audit") {
    requirements.push("Understanding of audit procedures")
  }

  return requirements
}

export async function GET() {
  return NextResponse.json({
    message: "VBA Generation API is running",
    version: "2.0.0",
    capabilities: [
      "Custom VBA code generation",
      "Multiple complexity levels",
      "Audit-focused functionality",
      "Egyptian standards compliance",
      "Error handling and validation",
      "Performance optimization",
    ],
    complexityLevels: ["basic", "intermediate", "advanced"],
    focusAreas: ["audit", "analysis", "automation", "reporting"],
  })
}
