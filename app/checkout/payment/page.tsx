'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Loader, Lock } from 'lucide-react'

export default function PaymentPage() {
  const router = useRouter()
  const { cartItems, getTotalPrice } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    address: '',
    phone: '',
  })
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  })

  // Redirect if no items in cart
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/checkout')
    }

    // Load customer info from localStorage
    const storedInfo = localStorage.getItem('checkoutInfo')
    if (storedInfo) {
      try {
        setCustomerInfo(JSON.parse(storedInfo))
      } catch (e) {
        console.error('Failed to load checkout info')
      }
    }
  }, [cartItems.length, router])

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim()
  }

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`
    }
    return numbers
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value)
    if (value.replace(/\s/g, '').length <= 16) {
      setCardInfo(prev => ({ ...prev, cardNumber: value }))
    }
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatExpiryDate(e.target.value)
    if (value.length <= 5) {
      setCardInfo(prev => ({ ...prev, expiryDate: value }))
    }
  }

  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 3) {
      setCardInfo(prev => ({ ...prev, cvc: value }))
    }
  }

  const validateCardInfo = () => {
    const cardNumber = cardInfo.cardNumber.replace(/\s/g, '')
    
    if (cardNumber.length !== 16) {
      toast({
        title: 'Error',
        description: 'Card number must be 16 digits',
        variant: 'destructive',
      })
      return false
    }

    if (cardInfo.expiryDate.length !== 5) {
      toast({
        title: 'Error',
        description: 'Expiry date must be in MM/YY format',
        variant: 'destructive',
      })
      return false
    }

    if (cardInfo.cvc.length !== 3) {
      toast({
        title: 'Error',
        description: 'CVC must be 3 digits',
        variant: 'destructive',
      })
      return false
    }

    return true
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateCardInfo()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate payment processing
      // In production, this would send to Stripe API
      await new Promise(resolve => setTimeout(resolve, 2000))

      // For now, accept all payments and redirect to success
      // Store the order information
      const orderData = {
        customerName: customerInfo.name,
        customerAddress: customerInfo.address,
        customerPhone: customerInfo.phone,
        items: cartItems,
        total: getTotalPrice(),
        status: 'Food Processing',
        orderId: `ORD-${Date.now()}`,
        cardLast4: cardInfo.cardNumber.slice(-4),
      }

      localStorage.setItem('lastOrder', JSON.stringify(orderData))

      // Redirect to success page
      router.push('/checkout/success')
    } catch (error) {
      console.error('Payment error:', error)
      toast({
        title: 'Error',
        description: 'Failed to process payment. Please try again.',
        variant: 'destructive',
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#ecfdf5] to-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#0891b2] mb-8 text-center">
          Secure Payment
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#0891b2] mb-6">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="flex gap-4 p-4 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#0891b2]">
                      {cartItem.item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      ${cartItem.item.price.toFixed(2)} x {cartItem.quantity}
                    </p>
                    <p className="text-lg font-bold text-[#10b981] mt-1">
                      ${(
                        cartItem.item.price * cartItem.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-2xl font-bold">
                <span className="text-[#0891b2]">Total:</span>
                <span className="text-[#10b981]">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Delivery Information Summary */}
            <div className="border-t mt-6 pt-6">
              <h3 className="text-lg font-bold text-[#0891b2] mb-4">
                Delivery Information
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Name:</span>{' '}
                  <span className="font-semibold">{customerInfo.name}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Email:</span>{' '}
                  <span className="font-semibold">{customerInfo.email}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Address:</span>{' '}
                  <span className="font-semibold">{customerInfo.address}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Phone:</span>{' '}
                  <span className="font-semibold">{customerInfo.phone}</span>
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="w-full mt-4"
              >
                Change Information
              </Button>
            </div>
          </div>

          {/* Payment Card Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#0891b2] mb-6">
              Card Information
            </h2>
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[#0891b2] font-semibold block">
                  Card Number
                </label>
                <Input
                  type="text"
                  value={cardInfo.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className="border-[#0891b2]/30 focus:border-[#0891b2] text-lg tracking-widest"
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  16 digits (spaces added automatically)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[#0891b2] font-semibold block">
                    Expiry Date
                  </label>
                  <Input
                    type="text"
                    value={cardInfo.expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    className="border-[#0891b2]/30 focus:border-[#0891b2] text-lg tracking-wider"
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: MM/YY
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-[#0891b2] font-semibold block">
                    CVC
                  </label>
                  <Input
                    type="text"
                    value={cardInfo.cvc}
                    onChange={handleCVCChange}
                    placeholder="123"
                    className="border-[#0891b2]/30 focus:border-[#0891b2] text-lg tracking-wider"
                    maxLength={3}
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">
                    3 digits
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p className="font-semibold mb-2">💳 Test Card Information:</p>
                <p className="mb-1">
                  <strong>Card Number:</strong> 4242 4242 4242 4242
                </p>
                <p className="mb-1">
                  <strong>Expiry:</strong> Any future date (e.g., 12/25)
                </p>
                <p>
                  <strong>CVC:</strong> Any 3 digits (e.g., 123)
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
                <div className="flex items-start gap-2">
                  <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">🔒 Secure Payment</p>
                    <p>
                      Your payment information is processed securely. We do not store your card details.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#0891b2] to-[#10b981] hover:from-[#0e7490] hover:to-[#059669] text-white font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  `Pay $${getTotalPrice().toFixed(2)}`
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
                className="w-full"
              >
                Back to Checkout
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
