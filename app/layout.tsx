import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AdminProvider } from "@/lib/admin-context"
import { MenuProvider } from "@/lib/menu-context"
import { CartProvider } from "@/lib/cart-context"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "iBazaar - Authentic Indian Restaurant",
  description: "Authentic Indian Grocery and Restaurant",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <AdminProvider>
            <MenuProvider>
              <CartProvider>{children}</CartProvider>
            </MenuProvider>
          </AdminProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
