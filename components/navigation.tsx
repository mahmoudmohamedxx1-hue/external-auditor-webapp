"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  FileText,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  Globe,
  Moon,
  Sun,
  LogOut,
  User,
  Shield,
  Target,
  CheckSquare,
  AlertTriangle,
  FileSpreadsheet,
  Zap,
} from "lucide-react"

interface NavigationProps {
  isArabic: boolean
  toggleLanguage: () => void
}

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    labelAr: "الرئيسية",
    icon: <BarChart3 className="h-4 w-4" />,
    href: "/",
    badge: null,
  },
  {
    id: "excel-analyzer",
    label: "Excel Analyzer",
    labelAr: "محلل Excel",
    icon: <FileSpreadsheet className="h-4 w-4" />,
    href: "/excel-analyzer",
    badge: { count: 1, type: "new" },
  },
  {
    id: "documents",
    label: "Documents",
    labelAr: "الوثائق",
    icon: <FileText className="h-4 w-4" />,
    href: "/documents",
    badge: { count: 3, type: "new" },
  },
  {
    id: "checklists",
    label: "Checklists",
    labelAr: "قوائم المراجعة",
    icon: <CheckSquare className="h-4 w-4" />,
    href: "/checklists",
    badge: null,
  },
  {
    id: "system-audit",
    label: "System Audit",
    labelAr: "مراجعة الأنظمة",
    icon: <Shield className="h-4 w-4" />,
    href: "/system-audit",
    badge: { count: 1, type: "enhanced" },
  },
  {
    id: "risk-assessment",
    label: "Risk Assessment",
    labelAr: "تقييم المخاطر",
    icon: <AlertTriangle className="h-4 w-4" />,
    href: "/risk-assessment",
    badge: null,
  },
  {
    id: "reports",
    label: "Reports",
    labelAr: "التقارير",
    icon: <BarChart3 className="h-4 w-4" />,
    href: "/reports",
    badge: null,
  },
  {
    id: "team",
    label: "Team",
    labelAr: "الفريق",
    icon: <Users className="h-4 w-4" />,
    href: "/team",
    badge: null,
  },
  {
    id: "compliance",
    label: "Compliance",
    labelAr: "الامتثال",
    icon: <Target className="h-4 w-4" />,
    href: "/compliance",
    badge: null,
  },
  {
    id: "settings",
    label: "Settings",
    labelAr: "الإعدادات",
    icon: <Settings className="h-4 w-4" />,
    href: "/settings",
    badge: null,
  },
]

export function Navigation({ isArabic, toggleLanguage }: NavigationProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()
  const [notifications] = useState([
    {
      id: 1,
      title: isArabic ? "مراجعة جديدة مطلوبة" : "New audit required",
      message: isArabic ? "مراجعة مالية لشركة ABC" : "Financial audit for ABC Company",
      time: "2h ago",
      type: "audit",
    },
    {
      id: 2,
      title: isArabic ? "تحديث المخاطر" : "Risk update",
      message: isArabic ? "تم اكتشاف مخاطر جديدة" : "New risks detected",
      time: "4h ago",
      type: "risk",
    },
    {
      id: 3,
      title: isArabic ? "تقرير جاهز" : "Report ready",
      message: isArabic ? "تقرير الامتثال الشهري" : "Monthly compliance report",
      time: "6h ago",
      type: "report",
    },
  ])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {isArabic ? "حل المراجعة المصري" : "Egyptian Audit Solution"}
                </h1>
              </div>
            </Link>
            <Badge variant="outline" className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
              <Zap className="h-3 w-3" />
              <span className="text-xs">{isArabic ? "مدعوم بـ xAI" : "xAI Powered"}</span>
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
            {navigationItems.slice(0, 6).map((item) => (
              <Link key={item.id} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  className="flex items-center space-x-2 rtl:space-x-reverse relative"
                >
                  {item.icon}
                  <span className="text-sm">{isArabic ? item.labelAr : item.label}</span>
                  {item.badge && (
                    <Badge
                      variant={item.badge.type === "new" ? "default" : "secondary"}
                      className="ml-1 rtl:mr-1 rtl:ml-0 text-xs"
                    >
                      {item.badge.type === "new" ? item.badge.count : isArabic ? "محدث" : "New"}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* Search */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>{isArabic ? "الإشعارات" : "Notifications"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm">{notification.title}</span>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <span className="text-xs text-gray-600 mt-1">{notification.message}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center">
                  <span className="text-sm text-blue-600">
                    {isArabic ? "عرض جميع الإشعارات" : "View all notifications"}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleLanguage}>
              <Globe className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
              <span className="text-sm">{isArabic ? "EN" : "عر"}</span>
            </Button>

            {/* Dark Mode Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>AH</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{isArabic ? "أحمد حسن" : "Ahmed Hassan"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {isArabic ? "مراجع أول" : "Senior Auditor"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  <span>{isArabic ? "الملف الشخصي" : "Profile"}</span>
                </DropdownMenuItem>
                <Link href="/settings">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                    <span>{isArabic ? "الإعدادات" : "Settings"}</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  <span>{isArabic ? "تسجيل الخروج" : "Log out"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isArabic ? "left" : "right"} className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Shield className="h-5 w-5" />
                    <span>{isArabic ? "حل المراجعة المصري" : "Egyptian Audit Solution"}</span>
                  </SheetTitle>
                  <SheetDescription>
                    {isArabic ? "نظام إدارة المراجعة الشامل" : "Comprehensive audit management system"}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-2">
                  {navigationItems.map((item) => (
                    <Link key={item.id} href={item.href}>
                      <Button
                        variant={pathname === item.href ? "default" : "ghost"}
                        className="w-full justify-start space-x-2 rtl:space-x-reverse"
                      >
                        {item.icon}
                        <span>{isArabic ? item.labelAr : item.label}</span>
                        {item.badge && (
                          <Badge
                            variant={item.badge.type === "new" ? "default" : "secondary"}
                            className="ml-auto rtl:mr-auto rtl:ml-0 text-xs"
                          >
                            {item.badge.type === "new" ? item.badge.count : isArabic ? "محدث" : "New"}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
