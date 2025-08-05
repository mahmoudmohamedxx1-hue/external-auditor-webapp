"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Search, FileText, Download, Eye, Edit, Trash2, Calendar, User, Lock, Unlock } from "lucide-react"

const documents = [
  {
    id: 1,
    name: "Financial Statements 2024.pdf",
    nameAr: "القوائم المالية 2024.pdf",
    type: "Financial Statement",
    typeAr: "قائمة مالية",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    uploadedBy: "Ahmed Hassan",
    status: "Reviewed",
    statusAr: "تمت المراجعة",
    category: "Financial",
    categoryAr: "مالية",
    confidential: true,
  },
  {
    id: 2,
    name: "Tax Returns 2023.xlsx",
    nameAr: "الإقرارات الضريبية 2023.xlsx",
    type: "Tax Document",
    typeAr: "مستند ضريبي",
    size: "1.8 MB",
    uploadDate: "2024-01-14",
    uploadedBy: "Fatima Ali",
    status: "Pending Review",
    statusAr: "في انتظار المراجعة",
    category: "Tax",
    categoryAr: "ضرائب",
    confidential: true,
  },
  {
    id: 3,
    name: "Board Meeting Minutes.docx",
    nameAr: "محضر اجتماع مجلس الإدارة.docx",
    type: "Meeting Minutes",
    typeAr: "محضر اجتماع",
    size: "856 KB",
    uploadDate: "2024-01-13",
    uploadedBy: "Mohamed Saeed",
    status: "Draft",
    statusAr: "مسودة",
    category: "Governance",
    categoryAr: "حوكمة",
    confidential: false,
  },
  {
    id: 4,
    name: "Internal Controls Assessment.pdf",
    nameAr: "تقييم الضوابط الداخلية.pdf",
    type: "Assessment Report",
    typeAr: "تقرير تقييم",
    size: "3.2 MB",
    uploadDate: "2024-01-12",
    uploadedBy: "Sara Ibrahim",
    status: "Approved",
    statusAr: "معتمد",
    category: "Risk",
    categoryAr: "مخاطر",
    confidential: true,
  },
  {
    id: 5,
    name: "Compliance Checklist.xlsx",
    nameAr: "قائمة الامتثال.xlsx",
    type: "Checklist",
    typeAr: "قائمة مراجعة",
    size: "1.2 MB",
    uploadDate: "2024-01-11",
    uploadedBy: "Omar Mahmoud",
    status: "In Progress",
    statusAr: "قيد التنفيذ",
    category: "Compliance",
    categoryAr: "امتثال",
    confidential: false,
  },
]

function DocumentsContent() {
  const { isArabic, toggleLanguage } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      (isArabic ? doc.nameAr : doc.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (isArabic ? doc.typeAr : doc.type).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Reviewed":
        return "bg-blue-100 text-blue-800"
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-orange-100 text-orange-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isArabic={isArabic} toggleLanguage={toggleLanguage} />

      <main className={`p-6 ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isArabic ? "إدارة المستندات" : "Document Management"}
            </h1>
            <p className="text-gray-600">
              {isArabic ? "إدارة وتنظيم مستندات المراجعة بأمان" : "Securely manage and organize audit documents"}
            </p>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={isArabic ? "البحث في المستندات..." : "Search documents..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rtl:pr-10 rtl:pl-3"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={isArabic ? "اختر الفئة" : "Select Category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isArabic ? "جميع الفئات" : "All Categories"}</SelectItem>
                <SelectItem value="financial">{isArabic ? "مالية" : "Financial"}</SelectItem>
                <SelectItem value="tax">{isArabic ? "ضرائب" : "Tax"}</SelectItem>
                <SelectItem value="governance">{isArabic ? "حوكمة" : "Governance"}</SelectItem>
                <SelectItem value="risk">{isArabic ? "مخاطر" : "Risk"}</SelectItem>
                <SelectItem value="compliance">{isArabic ? "امتثال" : "Compliance"}</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {isArabic ? "رفع مستند" : "Upload Document"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{isArabic ? "رفع مستند جديد" : "Upload New Document"}</DialogTitle>
                  <DialogDescription>
                    {isArabic ? "اختر الملف وأدخل التفاصيل المطلوبة" : "Select file and enter required details"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="file">{isArabic ? "الملف" : "File"}</Label>
                    <Input id="file" type="file" />
                  </div>
                  <div>
                    <Label htmlFor="category">{isArabic ? "الفئة" : "Category"}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={isArabic ? "اختر الفئة" : "Select Category"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financial">{isArabic ? "مالية" : "Financial"}</SelectItem>
                        <SelectItem value="tax">{isArabic ? "ضرائب" : "Tax"}</SelectItem>
                        <SelectItem value="governance">{isArabic ? "حوكمة" : "Governance"}</SelectItem>
                        <SelectItem value="risk">{isArabic ? "مخاطر" : "Risk"}</SelectItem>
                        <SelectItem value="compliance">{isArabic ? "امتثال" : "Compliance"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">{isArabic ? "الوصف" : "Description"}</Label>
                    <Textarea id="description" placeholder={isArabic ? "وصف المستند..." : "Document description..."} />
                  </div>
                  <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                      {isArabic ? "إلغاء" : "Cancel"}
                    </Button>
                    <Button onClick={() => setUploadDialogOpen(false)}>{isArabic ? "رفع" : "Upload"}</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Documents Grid */}
          <div className="grid gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{isArabic ? doc.nameAr : doc.name}</h3>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 mt-1">
                          <span>{isArabic ? doc.typeAr : doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Calendar className="h-3 w-3" />
                            <span>{doc.uploadDate}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <User className="h-3 w-3" />
                            <span>{doc.uploadedBy}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {doc.confidential ? (
                          <Lock className="h-4 w-4 text-red-500" />
                        ) : (
                          <Unlock className="h-4 w-4 text-green-500" />
                        )}
                        <Badge className={getStatusColor(doc.status)}>{isArabic ? doc.statusAr : doc.status}</Badge>
                        <Badge variant="outline">{isArabic ? doc.categoryAr : doc.category}</Badge>
                      </div>

                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {isArabic ? "لا توجد مستندات" : "No documents found"}
                </h3>
                <p className="text-gray-500">
                  {isArabic
                    ? "لم يتم العثور على مستندات تطابق معايير البحث"
                    : "No documents match your search criteria"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

export default function Documents() {
  return (
    <LanguageProvider>
      <DocumentsContent />
    </LanguageProvider>
  )
}
