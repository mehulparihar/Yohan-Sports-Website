import React from 'react'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// Mock Data (aligned with your existing structure)
const LOCATIONS = [
  {
    id: "loc1",
    name: "Wadala – Mumbai",
    address: "Bhakti Park, Wadala",
    phone: "+91 9004-200-200",
    email: "wadala@yohansports.com",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400",
  },
  {
    id: "loc2",
    name: "Thane Centre",
    address: "Ghodbunder Road, Thane",
    phone: "+91 9810-111-222",
    email: "thane@yohansports.com",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400",
  },
]

const CONTACT_CHANNELS = [
  { icon: "📞", label: "Phone", value: "+91 9004-200-200", desc: "Mon–Sat, 9 AM – 7 PM" },
  { icon: "✉️", label: "Email", value: "info@yohansports.com", desc: "We reply within 24 hours" },
  { icon: "🕒", label: "Office Hours", value: "9:00 AM – 7:00 PM", desc: "Closed on Sundays" },
  { icon: "🏢", label: "Head Office", value: "Bhakti Park, Wadala, Mumbai", desc: "By appointment only" },
]


const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    alert(`Thank you, ${form.name}! We'll get back to you soon.`)
    setForm({ name: "", email: "", phone: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen antialiased">
        <Navbar/>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 rounded-full border border-white/20 text-indigo-300 text-sm font-medium mb-6"
          >
            📩 Let’s Connect
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight"
          >
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Get in Touch
            </span>
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mt-4">
              We’d Love to Hear From You
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mt-8 leading-relaxed"
          >
            Whether you’re a parent, school, coach, or partner — our team is ready to answer your questions and help you get started.
          </motion.p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-black/40 to-black/20 p-8 rounded-3xl border border-white/10 backdrop-blur-sm shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none"
                  placeholder="+91 XXXX-XXXXXX"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white focus:border-indigo-400 focus:outline-none"
                >
                  <option value="">Select a topic</option>
                  <option value="enrollment">Program Enrollment</option>
                  <option value="school-partnership">School Partnership</option>
                  <option value="coaching">Coaching Inquiry</option>
                  <option value="events">Events & Tournaments</option>
                  <option value="careers">Careers</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Message</label>
                <textarea
                  rows="5"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending...
                  </>
                ) : (
                  "📤 Send Message"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Locations */}
          <div className="space-y-12">
            {/* Quick Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-black/30 to-black/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">ℹ️</span> Quick Contact
              </h3>
              <div className="space-y-4">
                {CONTACT_CHANNELS.map((channel, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-2xl mt-0.5">{channel.icon}</div>
                    <div>
                      <div className="font-bold text-white">{channel.label}</div>
                      <div className="text-white/90">{channel.value}</div>
                      <div className="text-white/60 text-sm mt-1">{channel.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Locations */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold flex items-center">
                <span className="mr-2">📍</span> Our Centres
              </h3>
              {LOCATIONS.map((loc, index) => (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-gradient-to-br from-black/30 to-black/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-500"
                >
                  <div className="font-bold text-white text-lg mb-2">{loc.name}</div>
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-xl">🏠</span>
                    <span className="text-white/80">{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">📞</span>
                    <span className="text-white/80">{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">✉️</span>
                    <span className="text-white/80">{loc.email}</span>
                  </div>
                  <motion.a
                    href="tel:+919004200200"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 inline-block px-4 py-2 bg-white/10 text-white text-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    🗺️ Get Directions
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder for real map later) */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold">Find Us on the Map</h3>
            <p className="text-white/70 mt-2">Coming soon: Interactive map with all our centres</p>
          </motion.div>
          <div className="bg-gradient-to-br from-black/30 to-black/10 rounded-3xl h-96 flex items-center justify-center border border-white/10">
            <div className="text-center px-6">
              <div className="text-5xl mb-4">🗺️</div>
              <h4 className="text-xl font-bold text-white mb-2">Interactive Map</h4>
              <p className="text-white/70">Google Maps integration coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Prefer to Talk?</h3>
          <p className="text-xl text-white/80 mb-8">
            Call us directly — our team is ready to assist you.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="tel:+919004200200"
            className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold shadow-lg hover:shadow-xl text-lg"
          >
            📞 +91 9004-200-200
          </motion.a>
          <div className="mt-6 text-white/60 text-sm">
            Available Mon–Sat, 9 AM – 7 PM IST
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <Footer/>
    </div>
  )
}

export default ContactUs