import React from 'react'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// Mock Testimonials Data (enhanced from your existing data)
const TESTIMONIALS = [
  {
    id: "t1",
    quote: "The Gurukul transformed our school's PE program. Student participation increased by 75% in just one year!",
    author: "Principal Mehta",
    role: "St. Xavier's School, Mumbai",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100",
    category: "school",
    image: "https://images.unsplash.com/photo-1549060279-7e16338922a7?auto=format&fit=crop&w=800",
  },
  {
    id: "t2",
    quote: "My son went from never touching a cricket bat to representing our state in under 18 months. Incredible coaching!",
    author: "Mrs. Kapoor",
    role: "Parent, Thane",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100",
    category: "parent",
    image: "https://images.unsplash.com/photo-1518608055487-1baca02035f5?auto=format&fit=crop&w=800",
  },
  {
    id: "t3",
    quote: "Our daughter’s confidence has skyrocketed since joining the football academy. The coaches don’t just train — they mentor.",
    author: "Mr. & Mrs. Desai",
    role: "Parents, Wadala",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100",
    category: "parent",
    image: "https://images.unsplash.com/photo-1546551373-84025920336?auto=format&fit=crop&w=800",
  },
  {
    id: "t4",
    quote: "Partnering with Yohan Sports was the best decision we made for our school’s holistic development program.",
    author: "Dr. Anjali Rao",
    role: "Head of PE, Greenfield International",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100",
    category: "school",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800",
  },
  {
    id: "t5",
    quote: "The scholarship program gave my son a future he never imagined. Today, he’s training for national-level tournaments.",
    author: "Ramesh Yadav",
    role: "Parent, Navi Mumbai",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=100",
    category: "parent",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800",
  },
  {
    id: "t6",
    quote: "Yohan’s curriculum is aligned with CBSE guidelines but goes beyond — it builds character, not just athletes.",
    author: "Sunita Iyer",
    role: "Principal, Vidya Mandir School",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100",
    category: "school",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800",
  },
]

const CATEGORIES = [
  { id: "all", name: "All Stories", icon: "💬" },
  { id: "parent", name: "From Parents", icon: "👨‍👩‍👧‍👦" },
  { id: "school", name: "From Schools", icon: "🏫" },
]

const TestimonialsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedTestimonial, setSelectedTestimonial] = useState(null)

  const filteredTestimonials = TESTIMONIALS.filter(
    (t) => activeCategory === "all" || t.category === activeCategory
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
            className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-white/20 text-yellow-300 text-sm font-medium mb-6"
          >
            💬 Real Stories, Real Impact
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight"
          >
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Hear From Our
            </span>
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mt-4">
              Community
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mt-8 leading-relaxed"
          >
            Parents, schools, and athletes share how Yohan Sports has transformed lives through sport, discipline, and opportunity.
          </motion.p>
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

      {/* Testimonials Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredTestimonials.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No testimonials found</h3>
              <p className="text-white/70">Try a different category.</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial, index) => (
                <motion.article
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedTestimonial(testimonial)}
                  className="group cursor-pointer bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="relative rounded-2xl overflow-hidden mb-5 h-48">
                    <img
                      src={testimonial.image}
                      alt=""
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-500 to-cyan-400 text-white">
                      {testimonial.category === "parent" ? "Parent" : "School Leader"}
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="text-xl mb-4 text-white/80 relative">
                      <span className="absolute -left-6 -top-2 text-4xl text-white/20">"</span>
                      {testimonial.quote}
                      <span className="absolute -right-6 -bottom-4 text-4xl text-white/20">"</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                      />
                      <div>
                        <div className="font-bold text-white">{testimonial.author}</div>
                        <div className="text-white/60 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Share Your Story</h3>
          <p className="text-xl text-white/80 mb-8">
            Have you seen a transformation through Yohan Sports? We’d love to feature your journey.
          </p>
          <motion.a
            href="mailto:stories@yohansports.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold shadow-lg hover:shadow-xl"
          >
            Submit Your Testimonial
          </motion.a>
        </div>
      </section>

      {/* Modal for Full Testimonial */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-60 w-full max-w-3xl rounded-3xl bg-gradient-to-br from-black/60 to-black/40 border border-white/20 backdrop-blur-xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <img
                    src={selectedTestimonial.image}
                    alt=""
                    className="w-full h-64 object-cover rounded-2xl opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <img
                      src={selectedTestimonial.avatar}
                      alt={selectedTestimonial.author}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white mx-auto"
                    />
                  </div>
                </div>
                <div className="mt-12 text-2xl text-white/90 px-4 relative">
                  <span className="absolute -left-8 -top-2 text-6xl text-white/10">"</span>
                  {selectedTestimonial.quote}
                  <span className="absolute -right-8 -bottom-6 text-6xl text-white/10">"</span>
                </div>
                <div className="mt-8">
                  <div className="font-bold text-white text-xl">{selectedTestimonial.author}</div>
                  <div className="text-white/60">{selectedTestimonial.role}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer CTA */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center text-white/60 text-sm">
          © {new Date().getFullYear()} Yohan Sports. All rights reserved.
        </div>
      </footer>
      <Footer/>
    </div>
  )
}

export default TestimonialsPage