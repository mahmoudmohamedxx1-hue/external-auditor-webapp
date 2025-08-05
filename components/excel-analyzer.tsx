"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileSpreadsheet,
  Upload,
  AlertTriangle,
  CheckCircle,
  Code,
  BarChart3,
  Shield,
  Zap,
  Download,
  Copy,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExcelFile {
  name: string
  size: number
  type: string
  data: any
  sheets: string[]
}

interface AnalysisResult {
  dataQuality: {
    score: number
    issues: string[]
    recommendations: string[]
  }
  vbaAnalysis: {
    hasVBA: boolean
    security: "safe" | "warning" | "dangerous"
    performance: number
    issues: string[]
  }
  riskAssessment: {
    level: "low" | "medium" | "high"
    factors: Array<{
      category: string
      score: number
      description: string
    }>
  }
  auditFindings: Array<{
    severity: "low" | "medium" | "high" | "critical"
    category: string
    description: string
    recommendation: string
  }>
}

export function ExcelAnalyzer({ isArabic = false }: { isArabic?: boolean }) {
  const [files, setFiles] = useState<ExcelFile[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [customPrompt, setCustomPrompt] = useState("")
  const [analysisType, setAnalysisType] = useState("comprehensive")
  const [generatedCode, setGeneratedCode] = useState("")
  const { toast } = useToast()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          try {
            // Simulate Excel file parsing
            const mockData = {
              name: file.name,
              size: file.size,
              type: file.type,
              data: reader.result,
              sheets: ["Sheet1", "Data", "Analysis", "Summary"],
            }
            setFiles((prev) => [...prev, mockData])
            toast({
              title: isArabic ? "تم رفع الملف بنجاح" : "File uploaded successfully",
              description: `${file.name} - ${(file.size / 1024 / 1024).toFixed(2)} MB`,
            })
          } catch (error) {
            toast({
              title: isArabic ? "خطأ في رفع الملف" : "File upload error",
              description: isArabic ? "فشل في قراءة الملف" : "Failed to read file",
              variant: "destructive",
            })
          }
        }
        reader.readAsArrayBuffer(file)
      })
    },
    [isArabic, toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
      "text/csv": [".csv"],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  const analyzeFiles = async () => {
    if (files.length === 0) return

    setAnalyzing(true)
    setProgress(0)

    try {
      // Simulate analysis progress
      const progressSteps = [
        { step: 20, message: isArabic ? "قراءة البيانات..." : "Reading data..." },
        { step: 40, message: isArabic ? "تحليل الجودة..." : "Analyzing quality..." },
        { step: 60, message: isArabic ? "فحص VBA..." : "Checking VBA..." },
        { step: 80, message: isArabic ? "تقييم المخاطر..." : "Assessing risks..." },
        { step: 100, message: isArabic ? "إنهاء التحليل..." : "Finalizing analysis..." },
      ]

      for (const { step, message } of progressSteps) {
        setProgress(step)
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      // Call analysis API
      const response = await fetch("/api/excel-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileData: files,
          analysisType,
          customPrompt,
        }),
      })

      if (!response.ok) throw new Error("Analysis failed")

      // Mock analysis result
      const mockResult: AnalysisResult = {
        dataQuality: {
          score: 94.5,
          issues: [
            isArabic ? "3 خلايا فارغة في العمود B" : "3 empty cells in column B",
            isArabic ? "تنسيق تاريخ غير متسق" : "Inconsistent date formatting",
          ],
          recommendations: [
            isArabic ? "ملء الخلايا الفارغة أو استخدام قيم افتراضية" : "Fill empty cells or use default values",
            isArabic ? "توحيد تنسيق التواريخ" : "Standardize date formatting",
          ],
        },
        vbaAnalysis: {
          hasVBA: true,
          security: "warning",
          performance: 78,
          issues: [
            isArabic ? "استخدام متغيرات عامة غير ضرورية" : "Unnecessary global variables",
            isArabic ? "عدم وجود معالجة للأخطاء" : "Missing error handling",
          ],
        },
        riskAssessment: {
          level: "medium",
          factors: [
            {
              category: isArabic ? "جودة البيانات" : "Data Quality",
              score: 85,
              description: isArabic ? "جودة عالية مع مشاكل بسيطة" : "High quality with minor issues",
            },
            {
              category: isArabic ? "الأمان" : "Security",
              score: 70,
              description: isArabic ? "يحتاج تحسينات أمنية" : "Needs security improvements",
            },
            {
              category: isArabic ? "الأداء" : "Performance",
              score: 78,
              description: isArabic ? "أداء جيد مع إمكانية التحسين" : "Good performance with room for improvement",
            },
          ],
        },
        auditFindings: [
          {
            severity: "medium",
            category: isArabic ? "جودة البيانات" : "Data Quality",
            description: isArabic ? "وجود خلايا فارغة في البيانات الأساسية" : "Empty cells in critical data",
            recommendation: isArabic ? "تنفيذ فحص شامل للبيانات" : "Implement comprehensive data validation",
          },
          {
            severity: "high",
            category: isArabic ? "الأمان" : "Security",
            description: isArabic ? "كود VBA غير محمي" : "Unprotected VBA code",
            recommendation: isArabic ? "إضافة حماية بكلمة مرور للكود" : "Add password protection to code",
          },
        ],
      }

      setAnalysisResult(mockResult)
      toast({
        title: isArabic ? "تم التحليل بنجاح" : "Analysis completed",
        description: isArabic ? "تم تحليل الملفات بنجاح" : "Files analyzed successfully",
      })
    } catch (error) {
      toast({
        title: isArabic ? "خطأ في التحليل" : "Analysis error",
        description: isArabic ? "فشل في تحليل الملفات" : "Failed to analyze files",
        variant: "destructive",
      })
    } finally {
      setAnalyzing(false)
    }
  }

  const generateVBACode = async (task: string) => {
    try {
      const response = await fetch("/api/vba-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task,
          complexity: "intermediate",
          focus: "audit",
          requirements: customPrompt,
        }),
      })

      const result = await response.json()
      setGeneratedCode(result.code)

      toast({
        title: isArabic ? "تم إنشاء الكود" : "Code generated",
        description: isArabic ? "تم إنشاء كود VBA بنجاح" : "VBA code generated successfully",
      })
    } catch (error) {
      toast({
        title: isArabic ? "خطأ في إنشاء الكود" : "Code generation error",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: isArabic ? "تم النسخ" : "Copied",
      description: isArabic ? "تم نسخ النص إلى الحافظة" : "Text copied to clipboard",
    })
  }

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <FileSpreadsheet className="h-5 w-5" />
            <span>{isArabic ? "رفع ملفات Excel" : "Upload Excel Files"}</span>
          </CardTitle>
          <CardDescription>
            {isArabic
              ? "ارفع ملفات Excel للتحليل الذكي باستخدام xAI Grok"
              : "Upload Excel files for intelligent analysis using xAI Grok"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">
              {isDragActive
                ? isArabic
                  ? "اسحب الملفات هنا..."
                  : "Drop files here..."
                : isArabic
                  ? "اسحب ملفات Excel هنا أو انقر للاختيار"
                  : "Drag Excel files here or click to select"}
            </p>
            <p className="text-sm text-gray-500">
              {isArabic ? "يدعم .xlsx, .xls, .csv (حتى 50 ميجابايت)" : "Supports .xlsx, .xls, .csv (up to 50MB)"}
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-medium">{isArabic ? "الملفات المرفوعة:" : "Uploaded Files:"}</h4>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • {file.sheets.length} {isArabic ? "أوراق" : "sheets"}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{isArabic ? "جاهز" : "Ready"}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>{isArabic ? "إعدادات التحليل" : "Analysis Configuration"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{isArabic ? "نوع التحليل" : "Analysis Type"}</label>
            <Select value={analysisType} onValueChange={setAnalysisType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprehensive">{isArabic ? "تحليل شامل" : "Comprehensive Analysis"}</SelectItem>
                <SelectItem value="data-quality">{isArabic ? "جودة البيانات" : "Data Quality"}</SelectItem>
                <SelectItem value="vba-review">{isArabic ? "مراجعة VBA" : "VBA Review"}</SelectItem>
                <SelectItem value="risk-assessment">{isArabic ? "تقييم المخاطر" : "Risk Assessment"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {isArabic ? "متطلبات إضافية (اختياري)" : "Additional Requirements (Optional)"}
            </label>
            <Textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={isArabic ? "اكتب أي متطلبات خاصة للتحليل..." : "Enter any specific analysis requirements..."}
              rows={3}
            />
          </div>

          <Button onClick={analyzeFiles} disabled={files.length === 0 || analyzing} className="w-full">
            {analyzing ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                {isArabic ? "جاري التحليل..." : "Analyzing..."}
              </>
            ) : (
              <>
                <BarChart3 className="h-4 w-4 mr-2" />
                {isArabic ? "بدء التحليل بـ xAI Grok" : "Start Analysis with xAI Grok"}
              </>
            )}
          </Button>

          {analyzing && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center text-gray-600">
                {progress}% {isArabic ? "مكتمل" : "Complete"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>{isArabic ? "نتائج التحليل" : "Analysis Results"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">{isArabic ? "نظرة عامة" : "Overview"}</TabsTrigger>
                <TabsTrigger value="data-quality">{isArabic ? "جودة البيانات" : "Data Quality"}</TabsTrigger>
                <TabsTrigger value="vba">{isArabic ? "تحليل VBA" : "VBA Analysis"}</TabsTrigger>
                <TabsTrigger value="findings">{isArabic ? "النتائج" : "Findings"}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{isArabic ? "جودة البيانات" : "Data Quality"}</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mt-2">{analysisResult.dataQuality.score}%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Shield className="h-5 w-5 text-orange-600" />
                        <span className="font-medium">{isArabic ? "أمان VBA" : "VBA Security"}</span>
                      </div>
                      <Badge
                        variant={analysisResult.vbaAnalysis.security === "safe" ? "default" : "destructive"}
                        className="mt-2"
                      >
                        {analysisResult.vbaAnalysis.security === "safe"
                          ? isArabic
                            ? "آمن"
                            : "Safe"
                          : isArabic
                            ? "تحذير"
                            : "Warning"}
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span className="font-medium">{isArabic ? "مستوى المخاطر" : "Risk Level"}</span>
                      </div>
                      <Badge
                        variant={analysisResult.riskAssessment.level === "low" ? "default" : "destructive"}
                        className="mt-2"
                      >
                        {isArabic
                          ? analysisResult.riskAssessment.level === "low"
                            ? "منخفض"
                            : analysisResult.riskAssessment.level === "medium"
                              ? "متوسط"
                              : "عالي"
                          : analysisResult.riskAssessment.level.toUpperCase()}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="data-quality" className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    {isArabic
                      ? `نقاط جودة البيانات: ${analysisResult.dataQuality.score}% - جودة ممتازة`
                      : `Data Quality Score: ${analysisResult.dataQuality.score}% - Excellent quality`}
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="font-medium mb-2">{isArabic ? "المشاكل المكتشفة:" : "Issues Found:"}</h4>
                  <ul className="space-y-1">
                    {analysisResult.dataQuality.issues.map((issue, index) => (
                      <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">{isArabic ? "التوصيات:" : "Recommendations:"}</h4>
                  <ul className="space-y-1">
                    {analysisResult.dataQuality.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="vba" className="space-y-4">
                {analysisResult.vbaAnalysis.hasVBA ? (
                  <>
                    <Alert>
                      <Code className="h-4 w-4" />
                      <AlertDescription>
                        {isArabic
                          ? `تم العثور على كود VBA - نقاط الأداء: ${analysisResult.vbaAnalysis.performance}%`
                          : `VBA code detected - Performance Score: ${analysisResult.vbaAnalysis.performance}%`}
                      </AlertDescription>
                    </Alert>

                    <div>
                      <h4 className="font-medium mb-2">{isArabic ? "مشاكل الكود:" : "Code Issues:"}</h4>
                      <ul className="space-y-1">
                        {analysisResult.vbaAnalysis.issues.map((issue, index) => (
                          <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">
                        {isArabic ? "إنشاء كود VBA محسن:" : "Generate Optimized VBA Code:"}
                      </h4>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button onClick={() => generateVBACode("Data Validation Tool")} variant="outline">
                          {isArabic ? "أداة التحقق من البيانات" : "Data Validation Tool"}
                        </Button>
                        <Button onClick={() => generateVBACode("Audit Helper Functions")} variant="outline">
                          {isArabic ? "دوال مساعدة المراجعة" : "Audit Helper Functions"}
                        </Button>
                        <Button onClick={() => generateVBACode("Risk Assessment Macro")} variant="outline">
                          {isArabic ? "ماكرو تقييم المخاطر" : "Risk Assessment Macro"}
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <Alert>
                    <AlertDescription>
                      {isArabic ? "لم يتم العثور على كود VBA في هذا الملف" : "No VBA code found in this file"}
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>

              <TabsContent value="findings" className="space-y-4">
                <div>
                  <h4 className="font-medium mb-4">{isArabic ? "نتائج المراجعة:" : "Audit Findings:"}</h4>
                  <div className="space-y-3">
                    {analysisResult.auditFindings.map((finding, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                                <Badge
                                  variant={
                                    finding.severity === "critical" || finding.severity === "high"
                                      ? "destructive"
                                      : "default"
                                  }
                                >
                                  {isArabic
                                    ? finding.severity === "low"
                                      ? "منخفض"
                                      : finding.severity === "medium"
                                        ? "متوسط"
                                        : finding.severity === "high"
                                          ? "عالي"
                                          : "حرج"
                                    : finding.severity.toUpperCase()}
                                </Badge>
                                <span className="font-medium">{finding.category}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{finding.description}</p>
                              <p className="text-sm font-medium text-green-600">{finding.recommendation}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Generated VBA Code */}
      {generatedCode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Code className="h-5 w-5" />
                <span>{isArabic ? "كود VBA المُنشأ" : "Generated VBA Code"}</span>
              </div>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(generatedCode)}>
                  <Copy className="h-4 w-4 mr-1" />
                  {isArabic ? "نسخ" : "Copy"}
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  {isArabic ? "تحميل" : "Download"}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{generatedCode}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
