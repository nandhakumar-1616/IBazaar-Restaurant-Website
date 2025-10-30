"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/lib/admin-context"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAdminLoggedIn } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!isAdminLoggedIn) {
      router.push("/admin")
    }
  }, [isAdminLoggedIn, router])

  if (!isAdminLoggedIn) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
