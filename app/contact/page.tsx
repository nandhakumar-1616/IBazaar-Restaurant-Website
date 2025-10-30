"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Clock, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Contact form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="bg-gradient-to-r from-(--color-primary) to-(--color-secondary) text-white py-16 mb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-white/90">{"We'd love to hear from you. Visit us or send us a message!"}</p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-(--color-primary)/20 hover:border-(--color-primary) transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-(--color-primary) to-(--color-secondary) flex items-center justify-center shadow-lg">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-(--color-primary)">Location</h3>
              <p className="text-sm text-gray-700">653 Pin Oak Rd #4</p>
              <p className="text-sm text-gray-700">Katy, TX 77494</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-(--color-primary)/20 hover:border-(--color-primary) transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-(--color-primary) to-(--color-secondary) flex items-center justify-center shadow-lg">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-(--color-primary)">Phone</h3>
              <a href="tel:8327205960" className="text-sm text-gray-700 hover:text-(--color-primary) transition-colors">
                (832) 720-5960
              </a>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-(--color-primary)/20 hover:border-(--color-primary) transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-(--color-primary) to-(--color-secondary) flex items-center justify-center shadow-lg">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-(--color-primary)">Email</h3>
              <a
                href="mailto:info@ibazaar.com"
                className="text-sm text-gray-700 hover:text-(--color-primary) transition-colors"
              >
                info@ibazaar.com
              </a>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-(--color-primary)/20 hover:border-(--color-primary) transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-(--color-primary) to-(--color-secondary) flex items-center justify-center shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-(--color-primary)">Hours</h3>
              <p className="text-sm text-gray-700">Mon-Fri: 10 AM–9 PM</p>
              <p className="text-sm text-gray-700">Sat-Sun: 9 AM–9 PM</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-(--color-primary)/10">
              <h2 className="text-3xl font-bold mb-6 text-(--color-primary)">Send Us a Message</h2>

              {submitted ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">Message Sent!</h3>
                  <p className="text-green-600">{"We'll get back to you soon."}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="border-2 border-gray-200 focus:border-(--color-primary) transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="border-2 border-gray-200 focus:border-(--color-primary) transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-gray-700">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      className="border-2 border-gray-200 focus:border-(--color-primary) transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      className="border-2 border-gray-200 focus:border-(--color-primary) transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-(--color-primary) to-(--color-secondary) hover:opacity-90 text-white font-semibold py-6 text-lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-(--color-primary)/10">
              <div className="h-full min-h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.2!2d-95.7!3d29.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQ4JzAwLjAiTiA5NcKwNDInMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="iBazaar Location Map"
                />
              </div>
            </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border-2 border-(--color-primary)/20">
            <h2 className="text-2xl font-bold mb-4 text-(--color-primary)">Visit Us Today!</h2>
            <p className="text-gray-700 leading-relaxed">
              Experience authentic Indian cuisine and grocery shopping at iBazaar. Whether you're dining in or taking
              out, we're here to serve you with the finest Indian flavors in Katy, Texas. Stop by during our business
              hours or give us a call to place your order!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
