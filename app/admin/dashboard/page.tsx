"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to add-items by default
    router.push("/admin/dashboard/add-items")
  }, [router])

  return null
}
