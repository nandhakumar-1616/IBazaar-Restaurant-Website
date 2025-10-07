import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
          <Image src="/hero-image.png" alt="Authentic Indian Food" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0891b2]/80 via-[#10b981]/60 to-[#0891b2]/40" />

          {/* Hero Text */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-balance drop-shadow-2xl">
                  Authentic Indian Grocery and Restaurant
                </h1>
                <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed drop-shadow-lg font-medium">
                  Experience the rich flavors and traditions of India with our carefully crafted dishes and premium
                  groceries.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-[#10b981] hover:bg-[#059669] text-white font-semibold rounded-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                    Order Now
                  </button>
                  <button className="px-8 py-4 bg-[#0891b2] hover:bg-[#0e7490] text-white font-semibold rounded-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                    View Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-b from-[#ecfdf5] to-[#cffafe]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-[#0891b2]">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#0891b2] to-[#10b981] flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🍛</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#0891b2]">Authentic Cuisine</h3>
                <p className="text-muted-foreground">Traditional recipes passed down through generations</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-[#10b981]">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#10b981] to-[#0891b2] flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#10b981]">Fresh Groceries</h3>
                <p className="text-muted-foreground">Premium Indian spices and ingredients</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-[#f59e0b]">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#0891b2] to-[#10b981] flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#0891b2]">Quality Service</h3>
                <p className="text-muted-foreground">Dedicated to your satisfaction</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
