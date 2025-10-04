import React from 'react'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// Mock Infrastructure Data
const FACILITIES = [
  {
    id: "f1",
    title: "FIFA-Approved Synthetic Turf",
    category: "football",
    image: "https://images.unsplash.com/photo-1546551373-84025920336?auto=format&fit=crop&w=800",
    features: ["Shock-absorbing base layer", "Drainage system", "All-weather usability", "Pro-grade surface"],
  },
  {
    id: "f2",
    title: "International Cricket Pitches",
    category: "cricket",
    image: "https://images.unsplash.com/photo-1518608055487-1baca02035f5?auto=format&fit=crop&w=800",
    features: ["Red soil & clay mix", "Rolling & watering protocol", "Match-ready in 7 days", "Practice & match lanes"],
  },
  {
    id: "f3",
    title: "NBA-Standard Basketball Courts",
    category: "basketball",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800",
    features: ["Maple wood flooring", "Professional rim & backboard", "Scoreboard & lighting", "Video analysis setup"],
  },
  {
    id: "f4",
    title: "Multi-Sport Indoor Arena",
    category: "indoor",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800",
    features: ["Climate-controlled", "Badminton, table tennis, gymnastics", "Sound system", "Spectator seating"],
  },
  {
    id: "f5",
    title: "Athlete Recovery Zone",
    category: "wellness",
    image: "https://images.unsplash.com/photo-1591561093203-2ac5f7b6da50?auto=format&fit=crop&w=800",
    features: ["Physiotherapy", "Ice baths", "Stretching area", "Nutrition counseling"],
  },
  {
    id: "f6",
    title: "Smart Analytics Lab",
    category: "tech",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800",
    features: ["Motion capture", "Performance tracking", "Video breakdown", "Custom training plans"],
  },
]

const CATEGORIES = [
  { id: "all", name: "All Facilities", icon: "🏟️" },
  { id: "cricket", name: "Cricket", icon: "🏏" },
  { id: "football", name: "Football", icon: "⚽" },
  { id: "basketball", name: "Basketball", icon: "🏀" },
  { id: "indoor", name: "Indoor Sports", icon: "🏠" },
  { id: "wellness", name: "Recovery", icon: "🧘" },
  { id: "tech", name: "Tech & Analytics", icon: "📊" },
]

const STATS = [
  { number: "8", label: "Centres Nationwide" },
  { number: "25+", label: "Acres of Playing Fields" },
  { number: "100%", label: "CCTV & Security" },
  { number: "24/7", label: "Maintenance Support" },
]
const InfrastructurePage = () => {
   const [activeCategory, setActiveCategory] = useState("all")
  const [selectedFacility, setSelectedFacility] = useState(null)

  const filteredFacilities = FACILITIES.filter(
    (f) => activeCategory === "all" || f.category === activeCategory
  )

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
            className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-indigo-500/20 rounded-full border border-white/20 text-purple-300 text-sm font-medium mb-6"
          >
            🏗️ World-Class Infrastructure
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight"
          >
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Built for Performance,
            </span>
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mt-4">
              Designed for Safety
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mt-8 leading-relaxed"
          >
            From FIFA-approved turfs to smart analytics labs — our infrastructure is engineered to nurture elite athletes while ensuring safety, accessibility, and year-round usability.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {STATS.map((stat, index) => (
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

      {/* Filters */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredFacilities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No facilities found</h3>
              <p className="text-white/70">Try a different category.</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFacilities.map((facility, index) => (
                <motion.article
                  key={facility.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedFacility(facility)}
                  className="group cursor-pointer bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="relative rounded-2xl overflow-hidden mb-5 h-56">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-500 to-cyan-400 text-white">
                      {CATEGORIES.find(c => c.id === facility.category)?.name}
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3">{facility.title}</h3>
                    <ul className="space-y-2">
                      {facility.features.map((feature, i) => (
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
          )}
        </div>
      </section>

      {/* Safety & Standards Section */}
      <section className="py-20 px-4 bg-black/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Safety & Standards</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Every facility is built and maintained to international safety and performance benchmarks.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-black/30 to-black/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm"
            >
              <div className="text-2xl mb-4">🛡️ Safety First</div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-400 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>24/7 CCTV surveillance & trained security personnel</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-400 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Certified first-aid stations at every centre</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-400 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Emergency response protocol & parent alerts</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-black/30 to-black/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm"
            >
              <div className="text-2xl mb-4">🏅 Certified Standards</div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>FIFA Quality Pro for football turfs</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>BCCI-compliant cricket pitches</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>NBA-spec basketball courts</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Experience Our World-Class Facilities</h3>
          <p className="text-xl text-white/80 mb-10">
            Book a free facility tour and see why 50+ schools trust us with their sports programs.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="tel:+919004200200"
            className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold shadow-lg hover:shadow-xl text-lg"
          >
            📞 Schedule a Tour Today
          </motion.a>
          <div className="mt-6 text-white/60 text-sm">
            Available at Wadala (Mumbai) & Thane Centres
          </div>
        </div>
      </section>

      {/* Facility Modal */}
      <AnimatePresence>
        {selectedFacility && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedFacility(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-60 w-full max-w-4xl rounded-3xl bg-gradient-to-br from-black/60 to-black/40 border border-white/20 backdrop-blur-xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedFacility(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-center">
                <img
                  src={selectedFacility.image}
                  alt={selectedFacility.title}
                  className="w-full h-80 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-2xl font-bold mb-4">{selectedFacility.title}</h3>
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {selectedFacility.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-white/80">
                      <span className="text-indigo-400 mt-1">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
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

export default InfrastructurePage