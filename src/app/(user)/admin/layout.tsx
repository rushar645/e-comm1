import type React from "react"
import { AdminProvider } from "@/contexts/admin-context"
import { DashboardSidebar } from "@/components/admin/dashboard-sidebar"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { Toaster } from "@/components/ui/use-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
        <Toaster />
      </div>
    </AdminProvider>
  )
}
