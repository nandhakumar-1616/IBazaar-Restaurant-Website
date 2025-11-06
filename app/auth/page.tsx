"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

const VALID_EMAIL = "sashyn16@gmail.com"
const VALID_PASSWORD = "1234"

export default function AuthPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.email !== VALID_EMAIL || formData.password !== VALID_PASSWORD) {
      setError("Invalid email or password")
      return
    }

    // Successful login
    router.push("/admin/dashboard")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Link
        href="/"
        className="p-4 text-[#0891b2] hover:text-[#10b981] transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Home
      </Link>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="iBazaar Logo"
                width={80}
                height={80}
                className="mx-auto"
              />
            </Link>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#0891b2]">
              Admin Login
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-[#0891b2]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-[#0891b2]">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0891b2] to-[#10b981] text-white hover:from-[#0e7490] hover:to-[#059669]"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}