'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { useMenu } from '@/lib/menu-context'
import { CheckCircle, Loader } from 'lucide-react'

export default function SuccessPage() {
  const router = useRouter()
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const { addOrder } = useMenu()
  const [isProcessing, setIsProcessing] = useState(true)
  const [orderData, setOrderData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const processOrder = async () => {
      try {
        // Get order data from localStorage
        const storedOrder = localStorage.getItem('lastOrder')
        if (!storedOrder) {
          throw new Error('Order information not found')
        }

        const order = JSON.parse(storedOrder)
        setOrderData(order)

        // Create order in the system if cart still has items
        if (cartItems.length > 0) {
          addOrder({
            customerName: order.customerName,
            customerAddress: order.customerAddress,
            customerPhone: order.customerPhone,
            items: cartItems,
            total: order.total,
            status: 'Food Processing',
          })

          clearCart()
        }

        // Clean up
        localStorage.removeItem('lastOrder')
        localStorage.removeItem('checkoutInfo')

        setIsProcessing(false)
      } catch (err) {
        console.error('Order processing error:', err)
        setError(err instanceof Error ? err.message : 'Failed to process order')
        setIsProcessing(false)
      }
    }

    processOrder()
  }, [cartItems, getTotalPrice, addOrder, clearCart])

  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader className="h-16 w-16 animate-spin text-[#0891b2] mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">
              Processing your order...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-muted-foreground mb-8">{error}</p>
            <Button
              onClick={() => router.push('/checkout')}
              className="bg-gradient-to-r from-[#0891b2] to-[#10b981] hover:from-[#0e7490] hover:to-[#059669] text-white"
            >
              Back to Checkout
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
      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-[#0891b2] mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your order. Your food is being prepared and will be
            delivered soon.
          </p>

          {orderData && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold text-[#0891b2] mb-4">
                Order Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-semibold">{orderData.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-semibold">{orderData.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Address:</span>
                  <span className="font-semibold text-right text-sm">
                    {orderData.customerAddress}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-semibold">{orderData.customerPhone}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-semibold text-[#10b981]">
                    ${orderData.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-semibold">
                    Card ending in {orderData.cardLast4}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold text-blue-600">Food Processing</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={() => router.push('/')}
              className="w-full bg-gradient-to-r from-[#0891b2] to-[#10b981] hover:from-[#0e7490] hover:to-[#059669] text-white"
            >
              Back to Home
            </Button>
            <Button
              onClick={() => router.push('/admin/dashboard/orders')}
              variant="outline"
              className="w-full"
            >
              View Orders
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
