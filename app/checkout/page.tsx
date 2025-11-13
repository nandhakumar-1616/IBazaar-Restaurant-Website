"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { useMenu } from "@/lib/menu-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const { addOrder } = useMenu()
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty",
        variant: "destructive",
      })
      return
    }

    // Validate form
    if (!formData.name || !formData.address || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    // Save checkout info to localStorage
    localStorage.setItem('checkoutInfo', JSON.stringify(formData))

    // Redirect to payment page
    router.push("/checkout/payment")
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#0891b2] mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some delicious items to your cart first!</p>
            <Button
              onClick={() => router.push("/menu")}
              className="bg-gradient-to-r from-[#0891b2] to-[#10b981] hover:from-[#0e7490] hover:to-[#059669] text-white"
            >
              Browse Menu
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#ecfdf5] to-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#0891b2] mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#0891b2] mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
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
                    <p className="text-sm text-muted-foreground">
                      ${cartItem.item.price.toFixed(2)} x {cartItem.quantity}
                    </p>
                    <p className="text-lg font-bold text-[#10b981] mt-1">
                      ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-2xl font-bold">
                <span className="text-[#0891b2]">Total:</span>
                <span className="text-[#10b981]">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#0891b2] mb-6">Delivery Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#0891b2] font-semibold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="border-[#0891b2]/30 focus:border-[#0891b2]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-[#0891b2] font-semibold">
                  Delivery Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter your delivery address"
                  className="border-[#0891b2]/30 focus:border-[#0891b2]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#0891b2] font-semibold">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                  className="border-[#0891b2]/30 focus:border-[#0891b2]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0891b2] to-[#10b981] hover:from-[#0e7490] hover:to-[#059669] text-white font-semibold py-6 text-lg"
              >
                Place Order
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
