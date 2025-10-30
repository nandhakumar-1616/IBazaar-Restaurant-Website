"use client"

import type React from "react"

import { useState } from "react"
import { useMenu } from "@/lib/menu-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Edit, Search } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export default function ListItemsPage() {
  const { menuItems, deleteMenuItem, updateMenuItem } = useMenu()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [editingItem, setEditingItem] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMenuItem(id)
      toast({
        title: "Deleted",
        description: "Menu item deleted successfully",
      })
    }
  }

  const handleEdit = (item: any) => {
    setEditingItem({ ...item })
    setIsEditDialogOpen(true)
  }

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      updateMenuItem(editingItem.id, {
        name: editingItem.name,
        description: editingItem.description,
        price: Number.parseFloat(editingItem.price),
        category: editingItem.category,
      })
      toast({
        title: "Updated",
        description: "Menu item updated successfully",
      })
      setIsEditDialogOpen(false)
      setEditingItem(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#0891b2]">List Items</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-[#0891b2]/30 focus:border-[#0891b2]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48 bg-gradient-to-br from-[#ecfdf5] to-[#cffafe]">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/vibrant-indian-cuisine.png"
                }}
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-[#0891b2] mb-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
                </div>
                <span className="text-lg font-bold text-[#10b981]">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(item)}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-[#0891b2] text-[#0891b2] hover:bg-[#0891b2] hover:text-white"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(item.id, item.name)}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No items found</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#0891b2]">Edit Menu Item</DialogTitle>
            <DialogDescription>Update the details of your menu item</DialogDescription>
          </DialogHeader>
          {editingItem && (
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-[#0891b2] font-semibold">
                  Product name
                </Label>
                <Input
                  id="edit-name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="border-[#0891b2]/30 focus:border-[#0891b2]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description" className="text-[#0891b2] font-semibold">
                  Product description
                </Label>
                <Textarea
                  id="edit-description"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="min-h-24 border-[#0891b2]/30 focus:border-[#0891b2]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category" className="text-[#0891b2] font-semibold">
                    Product category
                  </Label>
                  <Select
                    value={editingItem.category}
                    onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}
                  >
                    <SelectTrigger className="border-[#0891b2]/30 focus:border-[#0891b2]">
                      <SelectValue />
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
                  <Label htmlFor="edit-price" className="text-[#0891b2] font-semibold">
                    Product Price
                  </Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                    className="border-[#0891b2]/30 focus:border-[#0891b2]"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#0891b2] to-[#10b981] hover:from-[#0e7490] hover:to-[#059669] text-white"
                >
                  Update
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}
