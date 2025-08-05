"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  BarChart3,
  FileText,
  Target,
  CheckCircle,
  AlertTriangle,
  Brain,
  Settings,
  Eye,
  MessageSquare,
  Shield,
  Lightbulb,
  Star,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

interface AuditToolsTechniquesProps {
  isArabic: boolean
}

const auditTools = [
  {
    id: "structured-interviews",
    name: "Structured Interviews",
    nameAr: "المقابلات المنظمة",
    category: "Information Gathering",
    categoryAr: "جمع المعلومات",
    description: "Systematic approach to gathering information through planned conversations",
    descriptionAr: "نهج منهجي لجمع المعلومات من خلال المحادثات المخططة",
    icon: <MessageSquare className="h-5 w-5" />,
    effectiveness: 90,
    timeRequired: "2-4 hours",
    timeRequiredAr: "2-4 ساعات",
    cost: "Low",
    costAr: "منخفض",
    reliability: 85,
    coverage: 70,
    advantages: [
      { en: "Direct interaction with stakeholders", ar: "تفاعل مباشر مع أصحاب المصلحة" },
      { en: "Clarification of complex issues", ar: "توضيح القضايا المعقدة" },
      { en: "Real-time feedback", ar: "ردود فعل فورية" },
      { en: "Builds rapport and trust", ar: "يبني العلاقات والثقة" },
    ],
    limitations: [
      { en: "Time-intensive process", ar: "عملية تستغرق وقتاً طويلاً" },
      { en: "Potential for bias", ar: "احتمالية التحيز" },
      { en: "Requires skilled interviewers", ar: "يتطلب محاورين مهرة" },
    ],
    bestUseCases: [
      { en: "Understanding complex processes", ar: "فهم العمليات المعقدة" },
      { en: "Gathering qualitative insights", ar: "جمع الرؤى النوعية" },
      { en: "Stakeholder engagement", ar: "إشراك أصحاب المصلحة" },
    ],
  },
  {
    id: "data-analytics",
    name: "Data Analytics",
    nameAr: "تحليل البيانات",
    category: "Analysis",
    categoryAr: "التحليل",
    description: "Statistical analysis and pattern recognition in large datasets",
    descriptionAr: "التحليل الإحصائي والتعرف على الأنماط في مجموعات البيانات الكبيرة",
    icon: <BarChart3 className="h-5 w-5" />,
    effectiveness: 95,
    timeRequired: "1-3 days",
    timeRequiredAr: "1-3 أيام",
    cost: "Medium",
    costAr: "متوسط",
    reliability: 95,
    coverage: 100,
    advantages: [
      { en: "Processes large volumes of data", ar: "يعالج كميات كبيرة من البيانات" },
      { en: "Identifies hidden patterns", ar: "يحدد الأنماط المخفية" },
      { en: "Objective and unbiased", ar: "موضوعي وغير متحيز" },
      { en: "Continuous monitoring capability", ar: "قدرة المراقبة المستمرة" },
    ],
    limitations: [
      { en: "Requires quality data", ar: "يتطلب بيانات عالية الجودة" },
      { en: "Technical expertise needed", ar: "يحتاج خبرة تقنية" },
      { en: "May miss contextual factors", ar: "قد يفوت العوامل السياقية" },
    ],
    bestUseCases: [
      { en: "Fraud detection", ar: "اكتشاف الاحتيال" },
      { en: "Trend analysis", ar: "تحليل الاتجاهات" },
      { en: "Risk assessment", ar: "تقييم المخاطر" },
    ],
  },
  {
    id: "document-review",
    name: "Document Review",
    nameAr: "مراجعة الوثائق",
    category: "Information Gathering",
    categoryAr: "جمع المعلومات",
    description: "Systematic examination of organizational documents and records",
    descriptionAr: "الفحص المنهجي لوثائق وسجلات المنظمة",
    icon: <FileText className="h-5 w-5" />,
    effectiveness: 85,
    timeRequired: "3-7 days",
    timeRequiredAr: "3-7 أيام",
    cost: "Low",
    costAr: "منخفض",
    reliability: 90,
    coverage: 80,
    advantages: [
      { en: "Comprehensive coverage", ar: "تغطية شاملة" },
      { en: "Historical perspective", ar: "منظور تاريخي" },
      { en: "Evidence-based findings", ar: "نتائج قائمة على الأدلة" },
      { en: "Cost-effective", ar: "فعال من حيث التكلفة" },
    ],
    limitations: [
      { en: "Time-consuming", ar: "يستغرق وقتاً طويلاً" },
      { en: "May be outdated", ar: "قد تكون قديمة" },
      { en: "Incomplete documentation", ar: "توثيق غير مكتمل" },
    ],
    bestUseCases: [
      { en: "Compliance verification", ar: "التحقق من الامتثال" },
      { en: "Policy assessment", ar: "تقييم السياسات" },
      { en: "Historical analysis", ar: "التحليل التاريخي" },
    ],
  },
  {
    id: "control-testing",
    name: "Control Testing",
    nameAr: "اختبار الضوابط",
    category: "Testing",
    categoryAr: "الاختبار",
    description: "Evaluation of the effectiveness of internal controls",
    descriptionAr: "تقييم فعالية الضوابط الداخلية",
    icon: <Shield className="h-5 w-5" />,
    effectiveness: 90,
    timeRequired: "2-5 days",
    timeRequiredAr: "2-5 أيام",
    cost: "Medium",
    costAr: "متوسط",
    reliability: 92,
    coverage: 85,
    advantages: [
      { en: "Direct control assessment", ar: "تقييم مباشر للضوابط" },
      { en: "Risk mitigation validation", ar: "التحقق من تخفيف المخاطر" },
      { en: "Compliance verification", ar: "التحقق من الامتثال" },
      { en: "Improvement recommendations", ar: "توصيات التحسين" },
    ],
    limitations: [
      { en: "Sample-based approach", ar: "نهج قائم على العينات" },
      { en: "Point-in-time assessment", ar: "تقييم في نقطة زمنية محددة" },
      { en: "Requires control understanding", ar: "يتطلب فهم الضوابط" },
    ],
    bestUseCases: [
      { en: "Internal control evaluation", ar: "تقييم الضوابط الداخلية" },
      { en: "SOX compliance", ar: "امتثال SOX" },
      { en: "Risk management assessment", ar: "تقييم إدارة المخاطر" },
    ],
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    nameAr: "الأتمتة بالذكاء الاصطناعي",
    category: "Technology",
    categoryAr: "التكنولوجيا",
    description: "Machine learning and AI-powered audit procedures",
    descriptionAr: "إجراءات المراجعة المدعومة بالتعلم الآلي والذكاء الاصطناعي",
    icon: <Brain className="h-5 w-5" />,
    effectiveness: 98,
    timeRequired: "Hours",
    timeRequiredAr: "ساعات",
    cost: "High",
    costAr: "عالي",
    reliability: 96,
    coverage: 100,
    advantages: [
      { en: "24/7 continuous monitoring", ar: "مراقبة مستمرة 24/7" },
      { en: "Pattern recognition", ar: "التعرف على الأنماط" },
      { en: "Predictive analytics", ar: "التحليلات التنبؤية" },
      { en: "Scalable processing", ar: "معالجة قابلة للتوسع" },
    ],
    limitations: [
      { en: "High initial investment", ar: "استثمار أولي عالي" },
      { en: "Requires technical expertise", ar: "يتطلب خبرة تقنية" },
      { en: "Black box decision making", ar: "اتخاذ قرارات غير شفافة" },
    ],
    bestUseCases: [
      { en: "Anomaly detection", ar: "اكتشاف الشذوذ" },
      { en: "Large dataset analysis", ar: "تحليل مجموعات البيانات الكبيرة" },
      { en: "Continuous auditing", ar: "المراجعة المستمرة" },
    ],
  },
  {
    id: "sampling-techniques",
    name: "Sampling Techniques",
    nameAr: "تقنيات أخذ العينات",
    category: "Testing",
    categoryAr: "الاختبار",
    description: "Statistical methods for selecting representative samples",
    descriptionAr: "الطرق الإحصائية لاختيار عينات تمثيلية",
    icon: <Target className="h-5 w-5" />,
    effectiveness: 80,
    timeRequired: "1-2 days",
    timeRequiredAr: "1-2 يوم",
    cost: "Low",
    costAr: "منخفض",
    reliability: 85,
    coverage: 60,
    advantages: [
      { en: "Cost-effective testing", ar: "اختبار فعال من حيث التكلفة" },
      { en: "Statistical validity", ar: "صحة إحصائية" },
      { en: "Time-efficient", ar: "فعال من حيث الوقت" },
      { en: "Risk-based selection", ar: "اختيار قائم على المخاطر" },
    ],
    limitations: [
      { en: "Sampling risk", ar: "مخاطر أخذ العينات" },
      { en: "May miss outliers", ar: "قد يفوت القيم الشاذة" },
      { en: "Requires statistical knowledge", ar: "يتطلب معرفة إحصائية" },
    ],
    bestUseCases: [
      { en: "Transaction testing", ar: "اختبار المعاملات" },
      { en: "Population analysis", ar: "تحليل المجتمع" },
      { en: "Compliance testing", ar: "اختبار الامتثال" },
    ],
  },
]

const toolCategories = [
  { id: "all", name: "All Tools", nameAr: "جميع الأدوات" },
  { id: "Information Gathering", name: "Information Gathering", nameAr: "جمع المعلومات" },
  { id: "Analysis", name: "Analysis", nameAr: "التحليل" },
  { id: "Testing", name: "Testing", nameAr: "الاختبار" },
  { id: "Technology", name: "Technology", nameAr: "التكنولوجيا" },
]

export function AuditToolsTechniques({ isArabic }: AuditToolsTechniquesProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTools = auditTools.filter((tool) => {
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.nameAr.includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.descriptionAr.includes(searchTerm)
    return matchesCategory && matchesSearch
  })

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 90) return "text-green-600"
    if (effectiveness >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getCostColor = (cost: string) => {
    switch (cost.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCostText = (cost: string) => {
    const costMap: Record<string, { en: string; ar: string }> = {
      low: { en: "Low", ar: "منخفض" },
      medium: { en: "Medium", ar: "متوسط" },
      high: { en: "High", ar: "عالي" },
    }
    return isArabic ? costMap[cost.toLowerCase()]?.ar || cost : costMap[cost.toLowerCase()]?.en || cost
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
          <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full">
            <Settings className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isArabic ? "أدوات وتقنيات المراجعة" : "Audit Tools & Techniques"}
            </h2>
            <p className="text-gray-600">
              {isArabic
                ? "مجموعة شاملة من الأدوات والتقنيات لتحسين كفاءة المراجعة"
                : "Comprehensive collection of tools and techniques to enhance audit efficiency"}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">{isArabic ? "البحث" : "Search"}</Label>
              <div className="relative">
                <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder={isArabic ? "ابحث عن الأدوات..." : "Search tools..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rtl:pr-10 rtl:pl-3"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Label htmlFor="category">{isArabic ? "الفئة" : "Category"}</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {toolCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {isArabic ? category.nameAr : category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grid">{isArabic ? "عرض الشبكة" : "Grid View"}</TabsTrigger>
          <TabsTrigger value="comparison">{isArabic ? "مقارنة الأدوات" : "Tool Comparison"}</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-6">
          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{tool.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{isArabic ? tool.nameAr : tool.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {isArabic ? tool.categoryAr : tool.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getEffectivenessColor(tool.effectiveness)}`}>
                        {tool.effectiveness}%
                      </div>
                      <div className="text-xs text-gray-500">{isArabic ? "الفعالية" : "Effectiveness"}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">{isArabic ? tool.descriptionAr : tool.description}</p>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-sm font-medium">{tool.reliability}%</div>
                        <div className="text-xs text-gray-500">{isArabic ? "الموثوقية" : "Reliability"}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{tool.coverage}%</div>
                        <div className="text-xs text-gray-500">{isArabic ? "التغطية" : "Coverage"}</div>
                      </div>
                      <div>
                        <Badge className={getCostColor(tool.cost)} variant="secondary">
                          {getCostText(tool.cost)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{isArabic ? "الوقت المطلوب:" : "Time Required:"}</span>
                      <span className="font-medium">{isArabic ? tool.timeRequiredAr : tool.timeRequired}</span>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full bg-transparent">
                          <Eye className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          {isArabic ? "عرض التفاصيل" : "View Details"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                            {tool.icon}
                            <span>{isArabic ? tool.nameAr : tool.name}</span>
                          </DialogTitle>
                          <DialogDescription>{isArabic ? tool.descriptionAr : tool.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          {/* Metrics */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">{tool.effectiveness}%</div>
                              <div className="text-sm text-gray-600">{isArabic ? "الفعالية" : "Effectiveness"}</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">{tool.reliability}%</div>
                              <div className="text-sm text-gray-600">{isArabic ? "الموثوقية" : "Reliability"}</div>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                              <div className="text-2xl font-bold text-purple-600">{tool.coverage}%</div>
                              <div className="text-sm text-gray-600">{isArabic ? "التغطية" : "Coverage"}</div>
                            </div>
                            <div className="text-center p-4 bg-orange-50 rounded-lg">
                              <div className="text-lg font-bold text-orange-600">
                                {isArabic ? tool.timeRequiredAr : tool.timeRequired}
                              </div>
                              <div className="text-sm text-gray-600">{isArabic ? "الوقت" : "Time"}</div>
                            </div>
                          </div>

                          {/* Advantages */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center space-x-2 rtl:space-x-reverse">
                              <ThumbsUp className="h-4 w-4 text-green-600" />
                              <span>{isArabic ? "المزايا:" : "Advantages:"}</span>
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {tool.advantages.map((advantage, index) => (
                                <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span className="text-sm">{isArabic ? advantage.ar : advantage.en}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Limitations */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center space-x-2 rtl:space-x-reverse">
                              <ThumbsDown className="h-4 w-4 text-red-600" />
                              <span>{isArabic ? "القيود:" : "Limitations:"}</span>
                            </h4>
                            <div className="space-y-2">
                              {tool.limitations.map((limitation, index) => (
                                <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                                  <span className="text-sm">{isArabic ? limitation.ar : limitation.en}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Best Use Cases */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center space-x-2 rtl:space-x-reverse">
                              <Star className="h-4 w-4 text-yellow-600" />
                              <span>{isArabic ? "أفضل حالات الاستخدام:" : "Best Use Cases:"}</span>
                            </h4>
                            <div className="space-y-2">
                              {tool.bestUseCases.map((useCase, index) => (
                                <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                                  <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                                  <span className="text-sm">{isArabic ? useCase.ar : useCase.en}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>{isArabic ? "مقارنة الأدوات" : "Tool Comparison"}</CardTitle>
              <CardDescription>
                {isArabic
                  ? "مقارنة شاملة لجميع أدوات المراجعة المتاحة"
                  : "Comprehensive comparison of all available audit tools"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{isArabic ? "الأداة" : "Tool"}</TableHead>
                      <TableHead>{isArabic ? "الفئة" : "Category"}</TableHead>
                      <TableHead>{isArabic ? "الفعالية" : "Effectiveness"}</TableHead>
                      <TableHead>{isArabic ? "الموثوقية" : "Reliability"}</TableHead>
                      <TableHead>{isArabic ? "التغطية" : "Coverage"}</TableHead>
                      <TableHead>{isArabic ? "التكلفة" : "Cost"}</TableHead>
                      <TableHead>{isArabic ? "الوقت" : "Time"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTools.map((tool) => (
                      <TableRow key={tool.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            {tool.icon}
                            <span className="font-medium">{isArabic ? tool.nameAr : tool.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{isArabic ? tool.categoryAr : tool.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Progress value={tool.effectiveness} className="w-16 h-2" />
                            <span className={`text-sm font-medium ${getEffectivenessColor(tool.effectiveness)}`}>
                              {tool.effectiveness}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Progress value={tool.reliability} className="w-16 h-2" />
                            <span className="text-sm">{tool.reliability}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Progress value={tool.coverage} className="w-16 h-2" />
                            <span className="text-sm">{tool.coverage}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCostColor(tool.cost)}>{getCostText(tool.cost)}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{isArabic ? tool.timeRequiredAr : tool.timeRequired}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Tool Selection Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Lightbulb className="h-5 w-5" />
                <span>{isArabic ? "توصيات اختيار الأدوات" : "Tool Selection Recommendations"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {isArabic ? "للمشاريع الصغيرة" : "For Small Projects"}
                  </h4>
                  <p className="text-sm text-green-700 mb-3">
                    {isArabic ? "مشاريع بميزانية محدودة ووقت قصير" : "Projects with limited budget and time"}
                  </p>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {isArabic ? "المقابلات المنظمة" : "Structured Interviews"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {isArabic ? "مراجعة الوثائق" : "Document Review"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {isArabic ? "تقنيات أخذ العينات" : "Sampling Techniques"}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {isArabic ? "للمشاريع المتوسطة" : "For Medium Projects"}
                  </h4>
                  <p className="text-sm text-blue-700 mb-3">
                    {isArabic
                      ? "مشاريع بموارد متوسطة ومتطلبات معقدة"
                      : "Projects with moderate resources and complex requirements"}
                  </p>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {isArabic ? "تحليل البيانات" : "Data Analytics"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {isArabic ? "اختبار الضوابط" : "Control Testing"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {isArabic ? "المقابلات المنظمة" : "Structured Interviews"}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    {isArabic ? "للمشاريع الكبيرة" : "For Large Projects"}
                  </h4>
                  <p className="text-sm text-purple-700 mb-3">
                    {isArabic
                      ? "مشاريع معقدة بموارد كبيرة ومتطلبات متقدمة"
                      : "Complex projects with extensive resources and advanced requirements"}
                  </p>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {isArabic ? "الأتمتة بالذكاء الاصطناعي" : "AI Automation"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {isArabic ? "تحليل البيانات" : "Data Analytics"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {isArabic ? "اختبار الضوابط" : "Control Testing"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
