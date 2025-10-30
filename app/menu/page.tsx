"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useMenu } from "@/lib/menu-context"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Minus, Search, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Badge } from "@/components/ui/badge"

export default function MenuPage() {
  const { menuItems } = useMenu()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [searchTerm, setSearchTerm] = useState("")

  const starItems = [
    "Vegetable Samosa",
    "Chicken 65",
    "Chicken Tikka",
    "Masala Dosa",
    "Ghee Roast",
    "Vegetable Uthappam",
    "Malai Kofta",
    "Palak Paneer",
    "Butter Chicken",
    "Chicken Chettinad",
    "Parotta",
    "Garlic Naan",
    "Gobi Manchurian",
    "Gulab Jamun",
    "Mango Lassi",
  ]

  const categories = Array.from(new Set(menuItems.map((item) => item.category)))
  const groupedItems = categories.map((category) => ({
    category,
    items: menuItems.filter((item) => item.category === category),
  }))

  // Filter items by search
  const filteredGroups = groupedItems
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((group) => group.items.length > 0)

  const getQuantity = (itemId: string) => quantities[itemId] || 1

  const updateQuantity = (itemId: string, delta: number) => {
    const currentQty = getQuantity(itemId)
    const newQty = Math.max(1, currentQty + delta)
    setQuantities((prev) => ({ ...prev, [itemId]: newQty }))
  }

  const handleAddToCart = (item: any) => {
    const quantity = getQuantity(item.id)
    addToCart(item, quantity)
    toast({
      title: "Added to cart",
      description: `${quantity}x ${item.name} added to your cart`,
    })
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#ecfdf5] to-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#0891b2] mb-4">Our Menu</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our authentic Indian cuisine with traditional recipes and fresh ingredients
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#0891b2]/30 focus:border-[#0891b2] bg-white shadow-md"
            />
          </div>
        </div>

        {filteredGroups.map((group) => (
          <div key={group.category} className="mb-12">
            <h2 className="text-3xl font-bold text-[#0891b2] mb-6 pb-2 border-b-2 border-[#10b981]">
              {group.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item) => {
                const isStarItem = starItems.includes(item.name)
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    {isStarItem && (
                      <div className="relative h-48 bg-gradient-to-br from-[#ecfdf5] to-[#cffafe]">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?key=njulk"
                          }}
                        />
                        <Badge className="absolute top-3 right-3 bg-[#f59e0b] text-white border-none">
                          <Star className="w-3 h-3 mr-1 fill-white" />
                          Star Item
                        </Badge>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#0891b2] mb-1">{item.name}</h3>
                          <p className="text-xs text-muted-foreground font-medium">{item.category}</p>
                        </div>
                        <span className="text-2xl font-bold text-[#10b981]">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-semibold text-[#0891b2]">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-8 w-8 p-0 border-[#0891b2] text-[#0891b2] hover:bg-[#0891b2] hover:text-white"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-bold text-lg">{getQuantity(item.id)}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-8 w-8 p-0 border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-white"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-gradient-to-r from-[#0891b2] to-[#10b981] hover:from-[#0e7490] hover:to-[#059669] text-white font-semibold"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {filteredGroups.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-muted-foreground text-lg">No items found matching your search</p>
          </div>
        )}
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
