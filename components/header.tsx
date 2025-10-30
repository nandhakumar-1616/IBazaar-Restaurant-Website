"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { cartItems, getTotalItems, getTotalPrice, removeFromCart, updateQuantity } = useCart()

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
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors relative"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="h-5 w-5 text-white" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#f59e0b] text-white text-xs flex items-center justify-center font-semibold">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="text-[#0891b2]">Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {cartItems.map((cartItem) => (
                          <div key={cartItem.item.id} className="flex gap-4 p-4 bg-muted rounded-lg">
                            <Image
                              src={cartItem.item.image || "/placeholder.svg"}
                              alt={cartItem.item.name}
                              width={80}
                              height={80}
                              className="rounded-lg object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "/placeholder.svg?key=njulk"
                              }}
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-[#0891b2]">{cartItem.item.name}</h4>
                              <p className="text-sm text-muted-foreground">${cartItem.item.price.toFixed(2)}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center font-semibold">{cartItem.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  +
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => removeFromCart(cartItem.item.id)}
                                  className="ml-auto"
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold mb-4">
                          <span>Total:</span>
                          <span className="text-[#10b981]">${getTotalPrice().toFixed(2)}</span>
                        </div>
                        <Link href="/checkout">
                          <Button className="w-full bg-gradient-to-r from-[#0891b2] to-[#10b981] hover:from-[#0e7490] hover:to-[#059669] text-white">
                            Checkout
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
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
