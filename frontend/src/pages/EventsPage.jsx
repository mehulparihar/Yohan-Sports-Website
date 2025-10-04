import React from 'react'
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// Mock Events Data (enhanced from your existing code)
const EVENTS = [
  {
    id: "e1",
    title: "🏆 Inter-school Tournament Finals",
    date: "2025-10-04",
    time: "9:00 AM – 5:00 PM",
    location: "Wadala Stadium, Mumbai",
    category: "tournament",
    color: "from-yellow-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1549060279-7e16338922a7?auto=format&fit=crop&w=600",
    description: "The grand finale of our annual inter-school championship featuring top teams from 50+ partner schools.",
    registrationOpen: true,
  },
  {
    id: "e2",
    title: "👨‍🏫 Summer Coaches Clinic",
    date: "2025-11-12",
    time: "10:00 AM – 4:00 PM",
    location: "Thane Centre",
    category: "workshop",
    color: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600",
    description: "Professional development workshop for coaches with international guest speakers and certification.",
    registrationOpen: true,
  },
  {
    id: "e3",
    title: "🌟 Scholarship Trials",
    date: "2025-12-08",
    time: "8:00 AM – 2:00 PM",
    location: "All Centres",
    category: "scholarship",
    color: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1518608055487-1baca02035f5?auto=format&fit=crop&w=600",
    description: "Merit-based trials for full and partial scholarships in Cricket, Football, and Basketball academies.",
    registrationOpen: true,
  },
  {
    id: "e4",
    title: "🏅 National Youth Sports Festival",
    date: "2026-01-18",
    time: "11:00 AM – 6:00 PM",
    location: "Mumbai Sports Complex",
    category: "festival",
    color: "from-green-500 to-emerald-500",
    image: "https://images.unsplash.com/photo-1546551373-84025920336?auto=format&fit=crop&w=600",
    description: "A celebration of youth sports with exhibitions, clinics, and showcase matches across 5 disciplines.",
    registrationOpen: false,
  },
  {
    id: "e5",
    title: "🎯 Parent-Athlete Orientation",
    date: "2025-09-20",
    time: "5:30 PM – 7:00 PM",
    location: "Online (Zoom)",
    category: "info",
    color: "from-indigo-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600",
    description: "Learn about our programs, training philosophy, and how to support your child's athletic journey.",
    registrationOpen: true,
  },
  {
    id: "e6",
    title: "🤝 School Partnership Summit",
    date: "2025-10-25",
    time: "9:30 AM – 3:00 PM",
    location: "Bhakti Park, Wadala",
    category: "business",
    color: "from-gray-700 to-gray-900",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600",
    description: "For school leaders and PE coordinators: explore curriculum integration, infrastructure, and co-branded programs.",
    registrationOpen: true,
  },
]

const CATEGORIES = [
  { id: "all", name: "All Events", icon: "📅" },
  { id: "tournament", name: "Tournaments", icon: "🏆" },
  { id: "workshop", name: "Workshops", icon: "👨‍🏫" },
  { id: "scholarship", name: "Scholarships", icon: "🎓" },
  { id: "festival", name: "Festivals", icon: "🎪" },
  { id: "info", name: "Info Sessions", icon: "ℹ️" },
  { id: "business", name: "For Schools", icon: "🏫" },
]

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
const [clickedItem, setClickedItem] = useState(null)

  const filteredEvents = EVENTS.filter(event => {
    const matchesCategory = activeCategory === "all" || event.category === activeCategory
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleRegister = (event) => {
    setSelectedEvent(event)
    setIsRegisterModalOpen(true)
  }

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-IN', options)
  }
  const handleProgramClick = useCallback((program) => {
      setClickedItem(program)
    }, [])

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen antialiased">
       <Navbar onProgramSelect={handleProgramClick} theme="dark" />
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-indigo-500/20 rounded-full border border-white/20 text-blue-300 text-sm font-medium mb-6"
          >
            📅 Upcoming Events
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight"
          >
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Join the Movement
            </span>
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mt-4">
              Play. Learn. Grow.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mt-8 leading-relaxed"
          >
            From tournaments to workshops, our events bring together athletes, coaches, parents, and schools to celebrate sports and development.
          </motion.p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 flex-1">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
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
            {/* Search */}
            <div className="md:w-80">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No events found</h3>
              <p className="text-white/70">Try a different category or search term.</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-500 overflow-hidden relative"
                >
                  <div className="relative rounded-2xl overflow-hidden mb-5">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${event.color} text-white`}>
                      {CATEGORIES.find(c => c.id === event.category)?.name || "Event"}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-indigo-300 font-medium">{formatDate(event.date)}</div>
                      <h3 className="text-xl font-bold mt-1">{event.title}</h3>
                      <div className="flex items-center gap-2 text-white/80 text-sm mt-2">
                        <span>📍</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <span>⏰</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{event.description}</p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRegister(event)}
                      disabled={!event.registrationOpen}
                      className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                        event.registrationOpen
                          ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:shadow-lg"
                          : "bg-white/10 text-white/60 cursor-not-allowed"
                      }`}
                    >
                      {event.registrationOpen ? "Register Now" : "Registration Closed"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {isRegisterModalOpen && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsRegisterModalOpen(false)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-60 w-full max-w-2xl rounded-3xl bg-gradient-to-br from-black/60 to-black/40 border border-white/20 backdrop-blur-xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-center">
                <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${selectedEvent.color} text-white mb-4`}>
                  {CATEGORIES.find(c => c.id === selectedEvent.category)?.name}
                </div>
                <h3 className="text-2xl font-bold mb-2">{selectedEvent.title}</h3>
                <div className="text-white/80 mb-6">
                  <div>{formatDate(selectedEvent.date)} • {selectedEvent.time}</div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span>📍</span>
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 mb-6 text-left">
                  <h4 className="font-bold text-lg mb-2">Registration Form</h4>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert(`Thank you! You're registered for "${selectedEvent.title}". We'll contact you soon.`)
                      setIsRegisterModalOpen(false)
                    }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-indigo-400"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-indigo-400"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone (+91 XXXX-XXXXXX)"
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-indigo-400"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold hover:shadow-lg transition-all"
                    >
                      Confirm Registration
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer CTA */}
      <footer className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Don’t see what you’re looking for?</h3>
          <p className="text-xl text-white/80 mb-8">
            We host custom events for schools, clubs, and communities. Let’s co-create something special.
          </p>
          <motion.a
            href="mailto:info@yohansports.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold shadow-lg hover:shadow-xl"
          >
            Propose an Event
          </motion.a>
        </div>
      </footer>
      <Footer/>
    </div>
  )
}

export default EventsPage