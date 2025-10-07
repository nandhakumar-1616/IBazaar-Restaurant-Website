import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-muted rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-(--color-primary) to-(--color-secondary) flex items-center justify-center">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p className="text-muted-foreground">653 Pin Oak Rd #4</p>
            <p className="text-muted-foreground">Katy, TX 77494</p>
          </div>

          <div className="text-center p-6 bg-muted rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-(--color-primary) to-(--color-secondary) flex items-center justify-center">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p className="text-muted-foreground">(832) 720-5960</p>
          </div>

          <div className="text-center p-6 bg-muted rounded-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-(--color-primary) to-(--color-secondary) flex items-center justify-center">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Hours</h3>
            <p className="text-muted-foreground text-sm">Mon-Fri: 10 AM–9 PM</p>
            <p className="text-muted-foreground text-sm">Sat-Sun: 9 AM–9 PM</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
