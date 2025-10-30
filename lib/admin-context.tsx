"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AdminContextType {
  isAdminLoggedIn: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const adminStatus = localStorage.getItem("adminLoggedIn")
    if (adminStatus === "true") {
      setIsAdminLoggedIn(true)
    }
  }, [])

  const login = (username: string, password: string) => {
    // Simple authentication - in production, this would be server-side
    if (username === "admin" && password === "admin123") {
      setIsAdminLoggedIn(true)
      localStorage.setItem("adminLoggedIn", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdminLoggedIn(false)
    localStorage.removeItem("adminLoggedIn")
  }

  return <AdminContext.Provider value={{ isAdminLoggedIn, login, logout }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
