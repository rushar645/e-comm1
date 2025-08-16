"use client"

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  // Users,
  Truck,
  Star,
  FileText,
  BarChart2,
  UserCog,
  // ChevronDown,
} from "lucide-react"
import Link from "next/link"
//import { useState } from "react"
import { usePathname} from 'next/navigation'
import { Button } from "@/components/ui/button"
//import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useUser } from "@/contexts/user-contexts"
//import { usePathname } from "next/navigation"

interface DashboardSidebarProps {
  isMobile: boolean
}

const menuItems = [
  {
    title: "Main",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: <Package className="h-5 w-5" />,
  },
  // {
  //   title: "Customers",
  //   href: "/admin/customers",
  //   icon: <Users className="h-5 w-5" />,
  // },
  {
    title: "Home Page Banner",
    href: "/admin/cms",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Delivery",
    href: "/admin/delivery",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: <Star className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart2 className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <UserCog className="h-5 w-5" />,
  },
]

export function DashboardSidebar({ isMobile = false }: DashboardSidebarProps) {
  const pathname = usePathname()
  // const [open, setOpen] = useState(false)
  const {user} = useUser();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage || user?.role !="admin") {
    return <div></div>
  }
  else
  return (
    <div className={cn("flex flex-col h-screen", isMobile ? "border-t" : "border-r")}>
      <div className="px-4 py-2">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6" />
          <span>Admin</span>
        </Link>
      </div>
      <Separator />
      <div className="flex-1 flex flex-col py-4">
        <nav className="flex-1">
          {menuItems.map((item) =>
            (
              <Link key={item.title} href={item.href}>
                <Button variant="ghost" className="flex h-9 w-full items-center gap-2 px-2 justify-start cursor-pointer">
                  {item.icon}
                  <span>{item.title}</span>
                </Button>
              </Link>
            ),
          )}
        </nav>
      </div>
    </div>
  )
}
