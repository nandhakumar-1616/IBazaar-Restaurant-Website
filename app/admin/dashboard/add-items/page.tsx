"use client"

import type React from "react"

import { useState } from "react"
import { useMenu } from "@/lib/menu-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

const categories = [
  "Vegetable Appetizers",
  "Non-Veg Appetizers",
  "Soups",
  "Combo Specials",
  "Dosa",
  "Uthappam",
  "Vegetable Curries",
  "Non-Veg Curries",
  "Biriyani",
  "Bread",
  "DK Specialty Breads",
  "Weekend Specials",
  "Indo Chinese",
  "Kids Corner",
  "Sides",
  "Desserts",
  "Drinks",
]

export default function AddItemsPage() {
  const { addMenuItem } = useMenu()
  const { toast } = useToast()
  interface FormData {
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  })
  const [imagePreview, setImagePreview] = useState<string>("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    addMenuItem({
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      category: formData.category,
      image: formData.image || "/vibrant-indian-cuisine.png",
    })

    toast({
      title: "Success",
      description: "Menu item added successfully",
    })

    // Reset form
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    })
    setImagePreview("")
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-[#0891b2] mb-8">Add Items</h1>

      <div className="bg-white rounded-xl shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-[#0891b2] font-semibold">Upload Image</Label>
            <div className="flex flex-col items-center gap-4">
              {imagePreview ? (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-[#0891b2]">
                  <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-lg border-2 border-dashed border-[#0891b2]/30 flex items-center justify-center bg-[#ecfdf5]">
                  <Upload className="w-8 h-8 text-[#0891b2]/50" />
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="max-w-xs border-[#0891b2]/30 focus:border-[#0891b2]"
              />
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#0891b2] font-semibold">
              Product name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Enter product name"
              className="border-[#0891b2]/30 focus:border-[#0891b2]"
              required
            />
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#0891b2] font-semibold">
              Product description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Food provides essential nutrients for overall health and well-being"
              className="min-h-32 border-[#0891b2]/30 focus:border-[#0891b2]"
              required
            />
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-[#0891b2] font-semibold">
                Product category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="border-[#0891b2]/30 focus:border-[#0891b2]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-[#0891b2] font-semibold">
                Product Price
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="$25"
                className="border-[#0891b2]/30 focus:border-[#0891b2]"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0891b2] to-[#10b981] hover:from-[#0e7490] hover:to-[#059669] text-white font-semibold py-6 text-lg"
          >
            ADD
          </Button>
        </form>
      </div>
      <Toaster />
    </div>
  )
}
