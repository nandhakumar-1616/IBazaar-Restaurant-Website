"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/lib/admin-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isAdminLoggedIn } = useAdmin()
  const router = useRouter()

  // Redirect if already logged in
  if (isAdminLoggedIn) {
    router.push("/admin/dashboard")
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = login(username, password)
    if (success) {
      router.push("/admin/dashboard")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0891b2] via-[#10b981] to-[#0891b2] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="iBazaar Logo" width={80} height={80} className="object-contain" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 text-[#0891b2]">Admin Panel</h1>
        <p className="text-center text-muted-foreground mb-8">Sign in to manage iBazaar</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-[#0891b2] font-semibold">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="border-[#0891b2]/30 focus:border-[#0891b2] focus:ring-[#0891b2]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#0891b2] font-semibold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="border-[#0891b2]/30 focus:border-[#0891b2] focus:ring-[#0891b2]"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0891b2] to-[#10b981] hover:from-[#0e7490] hover:to-[#059669] text-white font-semibold py-6 text-lg"
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">Demo credentials: admin / admin123</p>
      </div>
    </div>
  )
}
