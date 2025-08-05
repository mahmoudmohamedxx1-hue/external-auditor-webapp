"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { LanguageProvider, useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  MoreHorizontal,
} from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Ahmed Hassan",
    nameAr: "أحمد حسن",
    role: "Senior Auditor",
    roleAr: "مراجع أول",
    department: "Financial Audit",
    departmentAr: "المراجعة المالية",
    email: "ahmed.hassan@company.com",
    phone: "+20 100 123 4567",
    location: "Cairo, Egypt",
    locationAr: "القاهرة، مصر",
    joinDate: "2020-03-15",
    status: "Active",
    statusAr: "نشط",
    activeAudits: 5,
    completedAudits: 45,
    certifications: ["CPA", "CIA", "CISA"],
    avatar: "/placeholder.svg?height=40&width=40&text=AH",
  },
  {
    id: 2,
    name: "Fatima Ali",
    nameAr: "فاطمة علي",
    role: "Tax Specialist",
    roleAr: "أخصائي ضرائب",
    department: "Tax Advisory",
    departmentAr: "الاستشارات الضريبية",
    email: "fatima.ali@company.com",
    phone: "+20 101 234 5678",
    location: "Alexandria, Egypt",
    locationAr: "الإسكندرية، مصر",
    joinDate: "2019-08-22",
    status: "Active",
    statusAr: "نشط",
    activeAudits: 3,
    completedAudits: 38,
    certifications: ["CPA", "CMA"],
    avatar: "/placeholder.svg?height=40&width=40&text=FA",
  },
  {
    id: 3,
    name: "Mohamed Saeed",
    nameAr: "محمد سعيد",
    role: "Risk Analyst",
    roleAr: "محلل مخاطر",
    department: "Risk Management",
    departmentAr: "إدارة المخاطر",
    email: "mohamed.saeed@company.com",
    phone: "+20 102 345 6789",
    location: "Giza, Egypt",
    locationAr: "الجيزة، مصر",
    joinDate: "2021-01-10",
    status: "Active",
    statusAr: "نشط",
    activeAudits: 4,
    completedAudits: 28,
    certifications: ["FRM", "PRM"],
    avatar: "/placeholder.svg?height=40&width=40&text=MS",
  },
  {
    id: 4,
    name: "Sara Ibrahim",
    nameAr: "سارة إبراهيم",
    role: "Compliance Officer",
    roleAr: "مسؤول امتثال",
    department: "Compliance",
    departmentAr: "الامتثال",
    email: "sara.ibrahim@company.com",
    phone: "+20 103 456 7890",
    location: "Cairo, Egypt",
    locationAr: "القاهرة، مصر",
    joinDate: "2022-05-18",
    status: "Active",
    statusAr: "نشط",
    activeAudits: 2,
    completedAudits: 15,
    certifications: ["CAMS", "CFE"],
    avatar: "/placeholder.svg?height=40&width=40&text=SI",
  },
  {
    id: 5,
    name: "Omar Mahmoud",
    nameAr: "عمر محمود",
    role: "Junior Auditor",
    roleAr: "مراجع مبتدئ",
    department: "Financial Audit",
    departmentAr: "المراجعة المالية",
    email: "omar.mahmoud@company.com",
    phone: "+20 104 567 8901",
    location: "Mansoura, Egypt",
    locationAr: "المنصورة، مصر",
    joinDate: "2023-09-01",
    status: "On Leave",
    statusAr: "في إجازة",
    activeAudits: 1,
    completedAudits: 8,
    certifications: ["ACCA"],
    avatar: "/placeholder.svg?height=40&width=40&text=OM",
  },
]

const departments = [
  {
    name: "Financial Audit",
    nameAr: "المراجعة المالية",
    members: 3,
    activeProjects: 12,
    head: "Ahmed Hassan",
  },
  {
    name: "Tax Advisory",
    nameAr: "الاستشارات الضريبية",
    members: 2,
    activeProjects: 8,
    head: "Fatima Ali",
  },
  {
    name: "Risk Management",
    nameAr: "إدارة المخاطر",
    members: 2,
    activeProjects: 6,
    head: "Mohamed Saeed",
  },
  {
    name: "Compliance",
    nameAr: "الامتثال",
    members: 1,
    activeProjects: 4,
    head: "Sara Ibrahim",
  },
]

const workloadData = [
  { member: "Ahmed Hassan", memberAr: "أحمد حسن", workload: 85 },
  { member: "Fatima Ali", memberAr: "فاطمة علي", workload: 70 },
  { member: "Mohamed Saeed", memberAr: "محمد سعيد", workload: 75 },
  { member: "Sara Ibrahim", memberAr: "سارة إبراهيم", workload: 60 },
  { member: "Omar Mahmoud", memberAr: "عمر محمود", workload: 40 },
]

function TeamContent() {
  const { isArabic, toggleLanguage } = useLanguage()
  const [newMemberOpen, setNewMemberOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return "bg-red-500"
    if (workload >= 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isArabic={isArabic} toggleLanguage={toggleLanguage} />

      <main className={`p-6 ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{isArabic ? "إدارة الفريق" : "Team Management"}</h1>
            <p className="text-gray-600">
              {isArabic
                ? "إدارة أعضاء الفريق والأقسام وتوزيع العمل"
                : "Manage team members, departments, and workload distribution"}
            </p>
          </div>

          {/* Team Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{isArabic ? "إجمالي الأعضاء" : "Total Members"}</p>
                    <p className="text-3xl font-bold text-gray-900">{teamMembers.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {isArabic ? "الأعضاء النشطون" : "Active Members"}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {teamMembers.filter((m) => m.status === "Active").length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{isArabic ? "الأقسام" : "Departments"}</p>
                    <p className="text-3xl font-bold text-gray-900">{departments.length}</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {isArabic ? "المشاريع النشطة" : "Active Projects"}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {departments.reduce((sum, dept) => sum + dept.activeProjects, 0)}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="members" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="members">{isArabic ? "الأعضاء" : "Members"}</TabsTrigger>
                <TabsTrigger value="departments">{isArabic ? "الأقسام" : "Departments"}</TabsTrigger>
                <TabsTrigger value="workload">{isArabic ? "عبء العمل" : "Workload"}</TabsTrigger>
              </TabsList>

              <Dialog open={newMemberOpen} onOpenChange={setNewMemberOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {isArabic ? "عضو جديد" : "New Member"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{isArabic ? "إضافة عضو جديد" : "Add New Member"}</DialogTitle>
                    <DialogDescription>
                      {isArabic ? "أدخل تفاصيل العضو الجديد" : "Enter new member details"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="memberName">{isArabic ? "الاسم" : "Name"}</Label>
                      <Input id="memberName" placeholder={isArabic ? "اسم العضو" : "Member name"} />
                    </div>
                    <div>
                      <Label htmlFor="memberRole">{isArabic ? "المنصب" : "Role"}</Label>
                      <Input id="memberRole" placeholder={isArabic ? "المنصب" : "Role"} />
                    </div>
                    <div>
                      <Label htmlFor="department">{isArabic ? "القسم" : "Department"}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={isArabic ? "اختر القسم" : "Select department"} />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept, index) => (
                            <SelectItem key={index} value={dept.name}>
                              {isArabic ? dept.nameAr : dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="email">{isArabic ? "البريد الإلكتروني" : "Email"}</Label>
                      <Input id="email" type="email" placeholder={isArabic ? "البريد الإلكتروني" : "Email address"} />
                    </div>
                    <div>
                      <Label htmlFor="phone">{isArabic ? "الهاتف" : "Phone"}</Label>
                      <Input id="phone" placeholder={isArabic ? "رقم الهاتف" : "Phone number"} />
                    </div>
                    <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                      <Button variant="outline" onClick={() => setNewMemberOpen(false)}>
                        {isArabic ? "إلغاء" : "Cancel"}
                      </Button>
                      <Button onClick={() => setNewMemberOpen(false)}>{isArabic ? "إضافة" : "Add"}</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <TabsContent value="members" className="space-y-6">
              <div className="grid gap-6">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {isArabic ? member.nameAr : member.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {isArabic ? member.roleAr : member.role} •{" "}
                              {isArabic ? member.departmentAr : member.department}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <Mail className="h-4 w-4" />
                                <span>{member.email}</span>
                              </div>
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <Phone className="h-4 w-4" />
                                <span>{member.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <MapPin className="h-4 w-4" />
                                <span>{isArabic ? member.locationAr : member.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse mt-3">
                              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-600">
                                  {isArabic ? "انضم في" : "Joined"}: {member.joinDate}
                                </span>
                              </div>
                              <Badge className={getStatusColor(member.status)}>
                                {isArabic ? member.statusAr : member.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse mt-3">
                              <div className="text-sm">
                                <span className="text-gray-600">
                                  {isArabic ? "المراجعات النشطة" : "Active Audits"}:{" "}
                                </span>
                                <span className="font-medium">{member.activeAudits}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-600">{isArabic ? "المراجعات المكتملة" : "Completed"}: </span>
                                <span className="font-medium">{member.completedAudits}</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm text-gray-600 mb-2">{isArabic ? "الشهادات" : "Certifications"}:</p>
                              <div className="flex flex-wrap gap-1">
                                {member.certifications.map((cert, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="departments" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departments.map((dept, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Award className="h-5 w-5 text-blue-600" />
                        <span>{isArabic ? dept.nameAr : dept.name}</span>
                      </CardTitle>
                      <CardDescription>
                        {isArabic ? "رئيس القسم" : "Department Head"}: {dept.head}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{isArabic ? "عدد الأعضاء" : "Members"}</span>
                          <span className="font-medium">{dept.members}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {isArabic ? "المشاريع النشطة" : "Active Projects"}
                          </span>
                          <span className="font-medium">{dept.activeProjects}</span>
                        </div>
                        <div className="pt-4">
                          <Button size="sm" className="w-full">
                            {isArabic ? "عرض التفاصيل" : "View Details"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workload" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isArabic ? "توزيع عبء العمل" : "Workload Distribution"}</CardTitle>
                  <CardDescription>
                    {isArabic ? "عبء العمل الحالي لكل عضو في الفريق" : "Current workload for each team member"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {workloadData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="w-32 text-sm font-medium">{isArabic ? item.memberAr : item.member}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>{isArabic ? "عبء العمل" : "Workload"}</span>
                            <span>{item.workload}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getWorkloadColor(item.workload)}`}
                              style={{ width: `${item.workload}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-20 text-right rtl:text-left">
                          {item.workload >= 80 && <AlertCircle className="h-5 w-5 text-red-500" />}
                          {item.workload >= 60 && item.workload < 80 && <Clock className="h-5 w-5 text-yellow-500" />}
                          {item.workload < 60 && <CheckCircle className="h-5 w-5 text-green-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default function Team() {
  return (
    <LanguageProvider>
      <TeamContent />
    </LanguageProvider>
  )
}
