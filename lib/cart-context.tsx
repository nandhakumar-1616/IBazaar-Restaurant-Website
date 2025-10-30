"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { MenuItem } from "./menu-context"

interface CartItem {
  item: MenuItem
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: MenuItem, quantity: number) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item: MenuItem, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.item.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem,
        )
      }
      return [...prev, { item, quantity }]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((cartItem) => cartItem.item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCartItems((prev) => prev.map((cartItem) => (cartItem.item.id === itemId ? { ...cartItem, quantity } : cartItem)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
