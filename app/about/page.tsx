"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8fafc] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#0891b2] mb-8">About Us</h1>
          
          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0891b2]">Our Story</h2>
              <p className="text-gray-600">
                Welcome to iBazaar - your premier destination for authentic Indian cuisine. 
                Established with a passion for bringing the rich flavors of India to your table, 
                we take pride in offering a diverse menu that celebrates the culinary heritage of India.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0891b2]">Our Mission</h2>
              <p className="text-gray-600">
                Our mission is to serve authentic, high-quality Indian dishes while providing 
                an exceptional dining experience. We source the finest ingredients and use 
                traditional cooking methods to ensure every dish meets our high standards.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0891b2]">Quality & Service</h2>
              <p className="text-gray-600">
                At iBazaar, we believe in:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Using fresh, high-quality ingredients</li>
                <li>Maintaining authentic flavors and cooking techniques</li>
                <li>Providing excellent customer service</li>
                <li>Creating a welcoming dining atmosphere</li>
                <li>Supporting our local community</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0891b2]">Visit Us</h2>
              <p className="text-gray-600">
                We invite you to visit our restaurant and experience the warm hospitality 
                and delicious flavors that make iBazaar special. Our friendly staff is 
                ready to make your dining experience memorable.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}