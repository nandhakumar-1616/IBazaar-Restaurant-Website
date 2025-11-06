import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0891b2] via-[#0e7490] to-[#10b981] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">CONTACT</h3>
            <div className="space-y-2 text-white/90">
              <p className="leading-relaxed">653 Pin Oak Rd #4</p>
              <p className="leading-relaxed">Katy, TX 77494</p>
              <p className="mt-4 font-medium">(832) 720-5960</p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">QUICK LINKS</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-white/90 hover:text-white transition-colors underline">
                Home
              </Link>
              <Link href="/menu" className="text-white/90 hover:text-white transition-colors underline">
                Menu
              </Link>
              <Link href="/about" className="text-white/90 hover:text-white transition-colors underline">
                About Us
              </Link>
              <Link href="/contact" className="text-white/90 hover:text-white transition-colors underline">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Hours Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">HOURS</h3>
            <div className="space-y-1 text-white/90">
              <p>Monday: 10 AM–9 PM</p>
              <p>Tuesday: 10 AM–9 PM</p>
              <p>Wednesday: 10 AM–9 PM</p>
              <p>Thursday: 10 AM–9 PM</p>
              <p>Friday: 10 AM–9 PM</p>
              <p>Saturday: 9 AM–9 PM</p>
              <p>Sunday: 9 AM–9 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/80 text-sm">
          <p>&copy; {new Date().getFullYear()} iBazaar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
