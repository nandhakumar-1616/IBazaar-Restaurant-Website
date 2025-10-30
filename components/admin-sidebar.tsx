"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlusCircle, List, ShoppingCart, LogOut } from "lucide-react"
import { useAdmin } from "@/lib/admin-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAdmin()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/admin")
  }

  const navItems = [
    {
      href: "/admin/dashboard/add-items",
      label: "Add Items",
      icon: PlusCircle,
    },
    {
      href: "/admin/dashboard/list-items",
      label: "List Items",
      icon: List,
    },
    {
      href: "/admin/dashboard/orders",
      label: "Orders",
      icon: ShoppingCart,
    },
  ]

  return (
    <div className="w-64 bg-white border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-[#0891b2]">iBazaar</h1>
        <p className="text-sm text-muted-foreground">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-[#0891b2] to-[#10b981] text-white"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start gap-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 bg-transparent"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </div>
  )
}
