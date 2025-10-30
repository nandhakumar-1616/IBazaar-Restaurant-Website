"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-[#10b981] bg-gradient-to-r from-[#0891b2] to-[#10b981] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Top Left */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="iBazaar Logo" width={60} height={60} className="h-14 w-14" />
          </Link>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-base font-semibold text-white hover:text-[#f59e0b] transition-colors">
              Home
            </Link>
            <Link href="/menu" className="text-base font-semibold text-white hover:text-[#f59e0b] transition-colors">
              Menu
            </Link>
            <Link href="/contact" className="text-base font-semibold text-white hover:text-[#f59e0b] transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Actions - Right Side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors relative" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5 text-white" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#f59e0b] text-white text-xs flex items-center justify-center font-semibold">
                0
              </span>
            </button>
            <Link href="/auth">
              <Button className="bg-white text-[#0891b2] hover:bg-white/90 font-semibold shadow-md">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4">
            <input
              type="search"
              placeholder="Search for dishes, groceries..."
              className="w-full px-4 py-3 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/20"
              autoFocus
            />
          </div>
        )}
      </div>
    </header>
  )
}
