"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Brain,
  Send,
  Copy,
  Download,
  FileSpreadsheet,
  Code,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  User,
  Sparkles,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  type?: "text" | "code" | "analysis" | "recommendation"
  metadata?: {
    confidence?: number
    sources?: string[]
    codeLanguage?: string
    analysisType?: string
  }
}

interface AIAuditAssistantProps {
  isArabic: boolean
}

export function AIAuditAssistant({ isArabic }: AIAuditAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: isArabic
        ? "مرحباً! أنا مساعد المراجعة الذكي المدعوم بـ xAI Grok. يمكنني مساعدتك في تحليل ملفات Excel، إنشاء كود VBA، تقييم المخاطر، وتقديم استشارات المراجعة وفقاً للمعايير المصرية. كيف يمكنني مساعدتك اليوم؟"
        : "Hello! I'm your AI Audit Assistant powered by xAI Grok. I can help you analyze Excel files, generate VBA code, assess risks, and provide audit consulting according to Egyptian standards. How can I assist you today?",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickSuggestions = [
    {
      id: "excel-analysis",
      text: isArabic ? "تحليل ملف Excel" : "Analyze Excel file",
      textAr: "تحليل ملف Excel",
      icon: <FileSpreadsheet className="h-4 w-4" />,
      prompt: isArabic
        ? "أريد تحليل ملف Excel للبحث عن الأخطاء والشذوذات في البيانات المالية"
        : "I want to analyze an Excel file to find errors and anomalies in financial data",
    },
    {
      id: "vba-generation",
      text: isArabic ? "إنشاء كود VBA" : "Generate VBA code",
      textAr: "إنشاء كود VBA",
      icon: <Code className="h-4 w-4" />,
      prompt: isArabic
        ? "أحتاج كود VBA لأتمتة عملية التحقق من صحة البيانات في جداول المحاسبة"
        : "I need VBA code to automate data validation in accounting spreadsheets",
    },
    {
      id: "risk-assessment",
      text: isArabic ? "تقييم المخاطر" : "Risk assessment",
      textAr: "تقييم المخاطر",
      icon: <AlertTriangle className="h-4 w-4" />,
      prompt: isArabic
        ? "ساعدني في تقييم المخاطر المالية وإنشاء مصفوفة المخاطر للشركة"
        : "Help me assess financial risks and create a risk matrix for the company",
    },
    {
      id: "audit-procedures",
      text: isArabic ? "إجراءات المراجعة" : "Audit procedures",
      textAr: "إجراءات المراجعة",
      icon: <CheckCircle className="h-4 w-4" />,
      prompt: isArabic
        ? "أريد إرشادات حول إجراءات المراجعة وفقاً للمعايير المصرية"
        : "I want guidance on audit procedures according to Egyptian standards",
    },
    {
      id: "trend-analysis",
      text: isArabic ? "تحليل الاتجاهات" : "Trend analysis",
      textAr: "تحليل الاتجاهات",
      icon: <TrendingUp className="h-4 w-4" />,
      prompt: isArabic
        ? "ساعدني في تحليل الاتجاهات المالية وتحديد الأنماط في البيانات"
        : "Help me analyze financial trends and identify patterns in the data",
    },
    {
      id: "compliance-check",
      text: isArabic ? "فحص الامتثال" : "Compliance check",
      textAr: "فحص الامتثال",
      icon: <CheckCircle className="h-4 w-4" />,
      prompt: isArabic
        ? "أريد فحص الامتثال للقوانين واللوائح المصرية في التقارير المالية"
        : "I want to check compliance with Egyptian laws and regulations in financial reports",
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim()
    if (!text) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Simulate AI response with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 3000))

      // Generate contextual response based on message content
      let assistantResponse = ""
      let responseType: Message["type"] = "text"
      let metadata: Message["metadata"] = {}

      if (text.toLowerCase().includes("excel") || text.toLowerCase().includes("تحليل")) {
        assistantResponse = isArabic
          ? `تحليل ممتاز! بناءً على طلبك لتحليل ملف Excel، إليك ما يمكنني فعله:

📊 **تحليل البيانات الشامل:**
- فحص جودة البيانات وتحديد القيم المفقودة
- اكتشاف الشذوذات والقيم الاستثنائية
- التحقق من صحة الصيغ والحسابات
- تحليل الاتجاهات والأنماط

🔍 **نتائج التحليل:**
- معدل جودة البيانات: 94.5%
- تم اكتشاف 12 شذوذ محتمل
- 3 صيغ تحتاج مراجعة
- 5 توصيات للتحسين

💡 **التوصيات:**
1. إضافة التحقق من صحة البيانات للأعمدة الرقمية
2. تحديث الصيغ المعطلة في الصفوف 15-23
3. إنشاء نسخة احتياطية قبل التعديلات

هل تريد مني إنشاء كود VBA لأتمتة هذه العمليات؟`
          : `Excellent analysis request! Based on your Excel analysis needs, here's what I can do:

📊 **Comprehensive Data Analysis:**
- Data quality assessment and missing value identification
- Anomaly and outlier detection
- Formula and calculation validation
- Trend and pattern analysis

🔍 **Analysis Results:**
- Data quality score: 94.5%
- 12 potential anomalies detected
- 3 formulas need review
- 5 improvement recommendations

💡 **Recommendations:**
1. Add data validation for numeric columns
2. Update broken formulas in rows 15-23
3. Create backup before modifications

Would you like me to generate VBA code to automate these processes?`

        responseType = "analysis"
        metadata = {
          confidence: 94.5,
          analysisType: "excel-comprehensive",
          sources: ["Data Quality Engine", "Formula Validator", "Anomaly Detector"],
        }
      } else if (text.toLowerCase().includes("vba") || text.toLowerCase().includes("كود")) {
        assistantResponse = isArabic
          ? `ممتاز! سأقوم بإنشاء كود VBA مخصص لك. إليك مثال على كود للتحقق من صحة البيانات:

\`\`\`vba
Sub ValidateFinancialData()
    Dim ws As Worksheet
    Dim lastRow As Long
    Dim i As Long
    Dim errorCount As Long
    
    Set ws = ActiveSheet
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    errorCount = 0
    
    Application.ScreenUpdating = False
    
    ' التحقق من البيانات الرقمية
    For i = 2 To lastRow
        If Not IsNumeric(ws.Cells(i, 2).Value) And ws.Cells(i, 2).Value <> "" Then
            ws.Cells(i, 2).Interior.Color = RGB(255, 200, 200)
            errorCount = errorCount + 1
        End If
        
        ' التحقق من التواريخ
        If Not IsDate(ws.Cells(i, 3).Value) And ws.Cells(i, 3).Value <> "" Then
            ws.Cells(i, 3).Interior.Color = RGB(255, 200, 200)
            errorCount = errorCount + 1
        End If
    Next i
    
    Application.ScreenUpdating = True
    
    MsgBox "تم الانتهاء من التحقق. تم العثور على " & errorCount & " خطأ."
End Sub
\`\`\`

🔧 **ميزات الكود:**
- التحقق التلقائي من صحة البيانات
- تمييز الأخطاء بالألوان
- تحسين الأداء مع ScreenUpdating
- رسائل تقدم واضحة

هل تريد تخصيص هذا الكود أو إضافة ميزات أخرى؟`
          : `Excellent! I'll create custom VBA code for you. Here's an example of data validation code:

\`\`\`vba
Sub ValidateFinancialData()
    Dim ws As Worksheet
    Dim lastRow As Long
    Dim i As Long
    Dim errorCount As Long
    
    Set ws = ActiveSheet
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    errorCount = 0
    
    Application.ScreenUpdating = False
    
    ' Validate numeric data
    For i = 2 To lastRow
        If Not IsNumeric(ws.Cells(i, 2).Value) And ws.Cells(i, 2).Value <> "" Then
            ws.Cells(i, 2).Interior.Color = RGB(255, 200, 200)
            errorCount = errorCount + 1
        End If
        
        ' Validate dates
        If Not IsDate(ws.Cells(i, 3).Value) And ws.Cells(i, 3).Value <> "" Then
            ws.Cells(i, 3).Interior.Color = RGB(255, 200, 200)
            errorCount = errorCount + 1
        End If
    Next i
    
    Application.ScreenUpdating = True
    
    MsgBox "Validation completed. Found " & errorCount & " errors."
End Sub
\`\`\`

🔧 **Code Features:**
- Automatic data validation
- Color-coded error highlighting
- Performance optimization with ScreenUpdating
- Clear progress messages

Would you like me to customize this code or add other features?`

        responseType = "code"
        metadata = {
          confidence: 96,
          codeLanguage: "vba",
          sources: ["VBA Best Practices", "Excel Automation Guide"],
        }
      } else if (text.toLowerCase().includes("risk") || text.toLowerCase().includes("مخاطر")) {
        assistantResponse = isArabic
          ? `تقييم المخاطر المالية - تحليل شامل:

🎯 **مستوى المخاطر الإجمالي: متوسط (65/100)**

📊 **عوامل المخاطر الرئيسية:**

1. **جودة البيانات (75/100)**
   - بعض مشاكل جودة البيانات ولكنها مقبولة عموماً
   - توصية: تحسين عمليات إدخال البيانات

2. **سلامة الصيغ (45/100)**
   - أخطاء حرجة في الصيغ تحتاج اهتمام فوري
   - توصية: مراجعة وإصلاح الصيغ المعطلة

3. **الأمان (85/100)**
   - ممارسات أمنية جيدة مطبقة
   - توصية: الحفاظ على المستوى الحالي

4. **الامتثال (60/100)**
   - بعض الثغرات في الامتثال
   - توصية: مراجعة المتطلبات التنظيمية

🚨 **إجراءات فورية مطلوبة:**
- إصلاح أخطاء الصيغ في الخلايا E15:E19
- تحديث قواعد التحقق من صحة البيانات
- إنشاء مسار مراجعة للتغييرات`
          : `Financial Risk Assessment - Comprehensive Analysis:

🎯 **Overall Risk Level: Medium (65/100)**

📊 **Key Risk Factors:**

1. **Data Quality (75/100)**
   - Some data quality issues but generally acceptable
   - Recommendation: Improve data entry processes

2. **Formula Integrity (45/100)**
   - Critical formula errors need immediate attention
   - Recommendation: Review and fix broken formulas

3. **Security (85/100)**
   - Good security practices implemented
   - Recommendation: Maintain current level

4. **Compliance (60/100)**
   - Some compliance gaps identified
   - Recommendation: Review regulatory requirements

🚨 **Immediate Actions Required:**
- Fix formula errors in cells E15:E19
- Update data validation rules
- Create audit trail for changes`

        responseType = "analysis"
        metadata = {
          confidence: 88,
          analysisType: "risk-assessment",
          sources: ["Risk Assessment Engine", "Compliance Checker", "Security Analyzer"],
        }
      } else {
        assistantResponse = isArabic
          ? `شكراً لسؤالك! كمساعد مراجعة ذكي مدعوم بـ xAI Grok، يمكنني مساعدتك في:

🔍 **تحليل البيانات:**
- تحليل ملفات Excel الشامل
- اكتشاف الأخطاء والشذوذات
- تقييم جودة البيانات

💻 **البرمجة والأتمتة:**
- إنشاء كود VBA مخصص
- أتمتة المهام المتكررة
- تحسين الأداء

📊 **المراجعة والامتثال:**
- إجراءات المراجعة المصرية
- فحص الامتثال
- تقييم المخاطر

🎯 **الاستشارات المتخصصة:**
- أفضل الممارسات
- حلول مخصصة
- التدريب والدعم

كيف يمكنني مساعدتك بشكل أكثر تحديداً؟`
          : `Thank you for your question! As an AI Audit Assistant powered by xAI Grok, I can help you with:

🔍 **Data Analysis:**
- Comprehensive Excel file analysis
- Error and anomaly detection
- Data quality assessment

💻 **Programming & Automation:**
- Custom VBA code generation
- Task automation
- Performance optimization

📊 **Auditing & Compliance:**
- Egyptian audit procedures
- Compliance checking
- Risk assessment

🎯 **Specialized Consulting:**
- Best practices
- Custom solutions
- Training and support

How can I help you more specifically?`

        metadata = {
          confidence: 92,
          sources: ["Knowledge Base", "Best Practices Guide"],
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantResponse,
        timestamp: new Date(),
        type: responseType,
        metadata,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: isArabic
          ? "عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى."
          : "Sorry, there was an error processing your request. Please try again.",
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const formatMessageContent = (content: string) => {
    // Simple markdown-like formatting
    const lines = content.split("\n")
    return lines.map((line, index) => {
      if (line.startsWith("```")) {
        return null // Handle code blocks separately
      }
      if (line.startsWith("# ")) {
        return (
          <h3 key={index} className="text-lg font-bold mt-4 mb-2">
            {line.substring(2)}
          </h3>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <h4 key={index} className="text-md font-semibold mt-3 mb-2">
            {line.substring(3)}
          </h4>
        )
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={index} className="font-semibold mt-2 mb-1">
            {line.substring(2, line.length - 2)}
          </p>
        )
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-4 mb-1">
            {line.substring(2)}
          </li>
        )
      }
      if (line.trim() === "") {
        return <br key={index} />
      }
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      )
    })
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">{isArabic ? "مساعد المراجعة الذكي" : "AI Audit Assistant"}</CardTitle>
              <CardDescription className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Z</span>
                </div>
                <span>{isArabic ? "مدعوم بـ xAI Grok" : "Powered by xAI Grok"}</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {isArabic ? "متصل" : "Online"}
            </Badge>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Sparkles className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                  {isArabic ? "الميزات" : "Features"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{isArabic ? "ميزات المساعد الذكي" : "AI Assistant Features"}</DialogTitle>
                  <DialogDescription>
                    {isArabic
                      ? "اكتشف جميع الإمكانيات المتاحة لمساعد المراجعة الذكي"
                      : "Discover all available capabilities of the AI Audit Assistant"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: <FileSpreadsheet className="h-5 w-5" />,
                      title: isArabic ? "تحليل Excel" : "Excel Analysis",
                      desc: isArabic ? "تحليل شامل للملفات" : "Comprehensive file analysis",
                    },
                    {
                      icon: <Code className="h-5 w-5" />,
                      title: isArabic ? "إنشاء VBA" : "VBA Generation",
                      desc: isArabic ? "كود مخصص وذكي" : "Custom intelligent code",
                    },
                    {
                      icon: <AlertTriangle className="h-5 w-5" />,
                      title: isArabic ? "تقييم المخاطر" : "Risk Assessment",
                      desc: isArabic ? "تحليل المخاطر المتقدم" : "Advanced risk analysis",
                    },
                    {
                      icon: <CheckCircle className="h-5 w-5" />,
                      title: isArabic ? "فحص الامتثال" : "Compliance Check",
                      desc: isArabic ? "وفقاً للمعايير المصرية" : "Egyptian standards compliance",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 rtl:space-x-reverse p-3 border rounded-lg">
                      <div className="p-2 bg-green-100 rounded-lg text-green-600">{feature.icon}</div>
                      <div>
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Quick Suggestions */}
        <div className="p-4 border-b bg-gray-50">
          <h4 className="text-sm font-medium mb-3">{isArabic ? "اقتراحات سريعة:" : "Quick Suggestions:"}</h4>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion) => (
              <Button
                key={suggestion.id}
                variant="outline"
                size="sm"
                className="text-xs h-8 bg-transparent"
                onClick={() => handleSendMessage(suggestion.prompt)}
              >
                {suggestion.icon}
                <span className="ml-1 rtl:mr-1 rtl:ml-0">{isArabic ? suggestion.textAr : suggestion.text}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} space-x-2 rtl:space-x-reverse`}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-green-600 text-white"
                      : message.type === "code"
                        ? "bg-gray-900 text-green-400 font-mono text-sm"
                        : message.type === "analysis"
                          ? "bg-blue-50 border border-blue-200"
                          : "bg-gray-100"
                  }`}
                >
                  <div className="space-y-2">
                    {message.type === "code" ? (
                      <pre className="whitespace-pre-wrap overflow-x-auto">
                        <code>{message.content}</code>
                      </pre>
                    ) : (
                      <div className="prose prose-sm max-w-none">{formatMessageContent(message.content)}</div>
                    )}

                    {message.metadata && (
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.metadata.confidence && (
                            <>
                              <Separator orientation="vertical" className="h-3" />
                              <span>
                                {message.metadata.confidence}% {isArabic ? "ثقة" : "confidence"}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(message.content)}>
                            <Copy className="h-3 w-3" />
                          </Button>
                          {message.type === "code" && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {message.role === "user" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gray-600 text-white text-xs">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start space-x-2 rtl:space-x-reverse">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="flex space-x-1 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{isArabic ? "Grok يفكر..." : "Grok is thinking..."}</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isArabic ? "اكتب رسالتك هنا... (اضغط Enter للإرسال)" : "Type your message here... (Press Enter to send)"
              }
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>
              {isArabic ? "مدعوم بـ xAI Grok-3 للحصول على أفضل النتائج" : "Powered by xAI Grok-3 for best results"}
            </span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{isArabic ? "متصل" : "Connected"}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
