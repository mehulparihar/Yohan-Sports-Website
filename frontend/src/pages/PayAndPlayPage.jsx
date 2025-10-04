import React from 'react'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// Mock Data
const SESSIONS = [
  {
    id: "s1",
    title: "Cricket Batting & Bowling",
    sport: "cricket",
    duration: "90 mins",
    price: 800,
    location: "Wadala – Mumbai",
    timeSlots: ["4:00 PM", "6:00 PM"],
    icon: "🏏",
    color: "from-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1518608055487-1baca02035f5?auto=format&fit=crop&w=800",
    features: ["Coach-led drills", "Net practice", "Video feedback", "Batting & bowling rotation"],
  },
  {
    id: "s2",
    title: "Football Skills & Match Play",
    sport: "football",
    duration: "90 mins",
    price: 750,
    location: "Thane Centre",
    timeSlots: ["5:00 PM", "7:00 PM"],
    icon: "⚽",
    color: "from-green-500 to-emerald-400",
    image: "https://images.unsplash.com/photo-1546551373-84025920336?auto=format&fit=crop&w=800",
    features: ["Dribbling & passing drills", "Small-sided games", "Position-specific coaching", "Fitness integration"],
  },
  {
    id: "s3",
    title: "Basketball Shooting & Game",
    sport: "basketball",
    duration: "90 mins",
    price: 850,
    location: "Wadala – Mumbai",
    timeSlots: ["5:30 PM"],
    icon: "🏀",
    color: "from-yellow-500 to-orange-400",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800",
    features: ["Shooting form correction", "Pick & roll drills", "3v3/5v5 matches", "Defensive positioning"],
  },
  {
    id: "s4",
    title: "Multi-Sport Fun Session",
    sport: "multi",
    duration: "60 mins",
    price: 600,
    location: "Thane Centre",
    timeSlots: ["4:30 PM"],
    icon: "🏅",
    color: "from-indigo-500 to-cyan-400",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800",
    features: ["Cricket, football, basketball", "Team games", "Obstacle courses", "Perfect for beginners"],
  },
]

const LOCATIONS = [
  {
    id: "loc1",
    name: "Wadala – Mumbai",
    address: "Bhakti Park, Wadala",
    phone: "+91 9004-200-200",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400",
  },
  {
    id: "loc2",
    name: "Thane Centre",
    address: "Ghodbunder Road, Thane",
    phone: "+91 9810-111-222",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400",
  },
]

const FAQS = [
  {
    q: "Do I need to bring my own equipment?",
    a: "We provide all essential equipment (bats, balls, cones, bibs). You may bring your own bat or gloves if preferred.",
  },
  {
    q: "What should my child wear?",
    a: "Comfortable sports attire and football/basketball shoes. Cricket spikes allowed on turf.",
  },
  {
    q: "Can I just show up or do I need to book?",
    a: "Booking is required to ensure coach availability and session balance. Walk-ins may be accommodated if space permits.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Full refund if cancelled 24 hours before session. No refund for no-shows.",
  },
]
const PayAndPlayPage = () => {
  const [selectedSession, setSelectedSession] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [isBooking, setIsBooking] = useState(false)

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
            className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-full border border-white/20 text-purple-300 text-sm font-medium mb-6"
          >
            💰 Flexible • No Commitment • Drop-In
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight"
          >
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Pay and Play
            </span>
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mt-4">
              Train Like a Pro — Anytime You Want
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mt-8 leading-relaxed"
          >
            No long-term commitment. Just book a session, show up, and play. Perfect for beginners, weekend warriors, or athletes looking for extra practice.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { number: "₹600", label: "Starting Price" },
              { number: "90", label: "Mins Per Session" },
              { number: "2", label: "Centres" },
              { number: "4", label: "Sports Available" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="mt-2 text-sm md:text-base text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Sessions</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Choose your sport, time, and location. Book online in seconds.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {SESSIONS.map((session, index) => (
              <motion.article
                key={session.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedSession(session)}
                className="group cursor-pointer bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-500 overflow-hidden"
              >
                <div className="relative rounded-2xl overflow-hidden mb-5 h-56">
                  <img
                    src={session.image}
                    alt={session.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-500 to-cyan-400 text-white">
                    {session.location}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded-lg text-xs font-bold">
                    {session.duration}
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-3xl mb-2">{session.icon}</div>
                      <h3 className="text-xl font-bold">{session.title}</h3>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      ₹{session.price}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {session.timeSlots.map((slot, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-2">
                    {session.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/80 text-sm">
                        <span className="text-indigo-400 mt-0.5">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 px-4 bg-black/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Where to Play</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              State-of-the-art facilities at our Wadala and Thane centres.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {LOCATIONS.map((loc, index) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-black/30 to-black/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm"
              >
                <div className="font-bold text-white text-xl mb-3">{loc.name}</div>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl">📍</span>
                  <span className="text-white/80">{loc.address}</span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl">📞</span>
                  <span className="text-white/80">{loc.phone}</span>
                </div>
                <motion.a
                  href="tel:+919004200200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-medium"
                >
                  🗺️ Get Directions
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Choose Session", desc: "Select sport, time, and location" },
              { step: "2", title: "Book Online", desc: "Pay securely via UPI, card, or wallet" },
              { step: "3", title: "Show Up & Play", desc: "Arrive 10 mins early, ready to train" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-white/5 rounded-3xl border border-white/10"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-6">
            {FAQS.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-black/30 to-black/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm"
              >
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-white/80">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Play?</h3>
          <p className="text-xl text-white/80 mb-10">
            Book your first session today — no membership, no hidden fees.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="tel:+919004200200"
            className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl text-lg"
          >
            📞 Call to Book Now
          </motion.a>
          <div className="mt-6 text-white/60 text-sm">
            Or select a session above to book online
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedSession(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-60 w-full max-w-2xl rounded-3xl bg-gradient-to-br from-black/60 to-black/40 border border-white/20 backdrop-blur-xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedSession(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">{selectedSession.title}</div>
                <div className="text-lg text-indigo-300 mb-4">₹{selectedSession.price} • {selectedSession.duration}</div>
                <div className="mb-6">
                  <div className="text-sm text-white/70 mb-2">Select Time Slot</div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {selectedSession.timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${
                          selectedSlot === slot
                            ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white"
                            : "bg-white/10 text-white/80 hover:bg-white/20"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!selectedSlot) return alert("Please select a time slot")
                    alert(`Booking confirmed for ${selectedSession.title} at ${selectedSlot}!`)
                    setSelectedSession(null)
                    setSelectedSlot(null)
                  }}
                  className="space-y-4 text-left"
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-indigo-400"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone (+91 XXXX-XXXXXX)"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-indigo-400"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold"
                  >
                    Confirm Booking
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer CTA */}
      <Footer/>
    </div>
  )
}

export default PayAndPlayPage