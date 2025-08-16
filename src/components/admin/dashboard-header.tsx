"use client"

// import { useState, useEffect } from "react"
import { User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"
import { useRouter, usePathname } from 'next/navigation'
import axiosInstance from "@/lib/axios"
import { useUser } from "@/contexts/user-contexts"
// import { useAdmin } from "@/contexts/admin-context"
interface DashboardHeaderProps {
  title?: string
  description?: string
  action?: React.ReactNode
}

export function DashboardHeader({title, description, action}: DashboardHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'
  const { user, setUser} = useUser()

  const logOut = async() =>{
    try{
      const res = await axiosInstance.post("api/auth/logout")
      if (res.status == 200){
        setUser(null);
        router.push('/admin/login');
      }
    }
    catch(e){
      console.log("Error Logging Out", e)
    }
  }

  if(isLoginPage || user?.role!="admin"){
    return <></>
  }
  else
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6">
      <div className="flex-1">
        <div>
          { title && <h1 className="text-xl font-semibold">Admin</h1>}
          {description && <p className="text-sm text-muted-foreground">hrloo</p>}
        </div>
      </div>

      {action && <div className="mr-4">{action}</div>}

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            {/* <Bell className="h-5 w-5 text-gray-600" /> */}
            
          </button>
        </div>
        {user?.role == "admin" &&
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center text-sm bg-gray-100 rounded-full p-1 focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-[#3A2723] text-white flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white">
            <div className="px-4 py-3">
              <p className="text-sm">Signed in as</p>
              <p className="text-sm font-medium truncate">admin@dressdexterity.com</p>
            </div>
            <DropdownMenuSeparator />
            
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer flex items-center text-red-600">
              <button className='flex cursor-pointer' onClick={logOut}>
              <LogOut className="mr-2 h-4 w-4"/><span>Log out</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
}
      </div>
    </header>
  )
}
