import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function MenuPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>
        <p className="text-center text-muted-foreground text-lg">
          Menu coming soon! Check back later for our delicious offerings.
        </p>
      </main>
      <Footer />
    </div>
  )
}
