"use client"

import { useMenu } from "@/lib/menu-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useMenu()
  const { toast } = useToast()

  const orderStatuses = [
    "Food Processing",
    "Ready for Pickup",
    "Out for Delivery",
    "Delivered",
    "Cancelled"
  ] as const;

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus)
    toast({
      title: "Status Updated",
      description: `Order status changed to ${newStatus}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Food Processing":
        return "bg-blue-500"
      case "Ready for Pickup":
        return "bg-yellow-500"
      case "Out for Delivery":
        return "bg-orange-500"
      case "Delivered":
        return "bg-green-500"
      case "Cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#0891b2] mb-8">Order Page</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-6">
              {/* Order Icon */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0891b2] to-[#10b981] rounded-lg flex items-center justify-center">
                  <Package className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Order Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0891b2] mb-1">
                      {order.items.map((item) => `${item.item.name} x ${item.quantity}`).join(", ")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#10b981]">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-[#0891b2] mb-1">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order.customerAddress}</p>
                    <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <Select
                      value={order.status}
                      onValueChange={(value) =>
                        handleStatusChange(order.id, value as "Food Processing" | "Out for delivery" | "Delivered")
                      }
                    >
                      <SelectTrigger className="w-48 border-[#0891b2]/30 focus:border-[#0891b2]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Food Processing">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            Food Processing
                          </div>
                        </SelectItem>
                        <SelectItem value="Out for delivery">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-orange-500" />
                            Out for delivery
                          </div>
                        </SelectItem>
                        <SelectItem value="Delivered">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            Delivered
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-[#0891b2] mb-2">Order Items:</p>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.item.image || "/placeholder.svg"}
                            alt={item.item.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?key=njulk"
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.item.name}</p>
                          <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-[#10b981]">${(item.item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">No orders yet</p>
          </div>
        )}
      </div>

      <Toaster />
    </div>
  )
}
