import React from 'react'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const MODULES = [
  {
    id: "m1",
    title: "Foundations of Sports Pedagogy",
    duration: "20 hours",
    icon: "📚",
    desc: "Learn age-appropriate coaching methodologies, skill progression models, and inclusive teaching strategies.",
  },
  {
    id: "m2",
    title: "Sport-Specific Technical Mastery",
    duration: "30 hours",
    icon: "🏏",
    desc: "Deep dive into cricket, football, or basketball techniques with ex-international coaches and video analysis.",
  },
  {
    id: "m3",
    title: "Athlete Development & Psychology",
    duration: "15 hours",
    icon: "🧠",
    desc: "Understand growth stages, motivation techniques, and mental resilience training for young athletes.",
  },
  {
    id: "m4",
    title: "Injury Prevention & Conditioning",
    duration: "12 hours",
    icon: "💪",
    desc: "Learn warm-up protocols, strength routines, and recovery strategies tailored for school-age athletes.",
  },
  {
    id: "m5",
    title: "Curriculum Design & Assessment",
    duration: "18 hours",
    icon: "📊",
    desc: "Build PE programs aligned with CBSE/ICSE standards and implement skill-based evaluation frameworks.",
  },
  {
    id: "m6",
    title: "Leadership & Classroom Management",
    duration: "10 hours",
    icon: "👥",
    desc: "Master group dynamics, behavior management, and creating a positive, engaging sports environment.",
  },
]

const BENEFITS = [
  "✅ Certified by Yohan Sports & NSN (National Sports Network)",
  "✅ Eligible to coach in 50+ partner schools nationwide",
  "✅ Access to exclusive coaching resources & playbooks",
  "✅ Mentorship from senior international-level coaches",
  "✅ Pathway to lead regional training centers",
  "✅ Annual upskilling workshops & refresher courses",
]

const TESTIMONIALS = [
  {
    quote: "This program transformed how I teach PE. I now design sessions that are fun, structured, and inclusive.",
    author: "Rahul Mehta",
    role: "PE Teacher, St. Mary’s School",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100",
  },
  {
    quote: "The certification opened doors to full-time coaching roles. The practical sessions were game-changing.",
    author: "Anjali Rao",
    role: "Cricket Coach, Mumbai Academy",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100",
  },
]

const TrainTheTrainersPage = () => {
  const [selectedModule, setSelectedModule] = useState(null)
  const [isEnrolling, setIsEnrolling] = useState(false)

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
            className="inline-block px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-500/20 rounded-full border border-white/20 text-green-300 text-sm font-medium mb-6"
          >
            🎓 Certified Coach Development Program
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight"
          >
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Train the Trainers
            </span>
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mt-4">
              Empower the Next Generation of Coaches
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mt-8 leading-relaxed"
          >
            A comprehensive, hands-on certification program for aspiring and current coaches, PE teachers, and sports educators — designed to build world-class coaching capacity in India.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEnrolling(true)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Enroll Now – Batch Starting Oct 2025
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#curriculum"
              className="px-8 py-4 rounded-2xl bg-white/10 text-white font-bold backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              View Full Curriculum
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { number: "120+", label: "Certified Coaches" },
              { number: "6", label: "Months Program" },
              { number: "200+", label: "Hours of Training" },
              { number: "100%", label: "Placement Support" },
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

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Program Curriculum</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Blend of theory, practical sessions, classroom observation, and live coaching assessments.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MODULES.map((module, index) => (
              <motion.article
                key={module.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedModule(module)}
                className="group cursor-pointer bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-500"
              >
                <div className="text-4xl mb-4">{module.icon}</div>
                <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">{module.desc}</p>
                <div className="text-xs text-green-400 font-medium">{module.duration} • In-person + Online</div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-black/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join Our Program?</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Become part of a national network of elite sports educators.
            </p>
          </motion.div>
          <div className="space-y-4">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="text-green-400 mt-1">✓</div>
                <div className="text-white/90">{benefit}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Hear From Our Graduates</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-black/30 to-black/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm"
              >
                <div className="text-xl mb-3 text-white/80 relative">
                  <span className="absolute -left-6 -top-2 text-4xl text-white/20">"</span>
                  {t.quote}
                  <span className="absolute -right-6 -bottom-4 text-4xl text-white/20">"</span>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">{t.author}</div>
                    <div className="text-white/60">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Become a Certified Coach?</h3>
          <p className="text-xl text-white/80 mb-10">
            Join our next batch and gain the skills, certification, and network to transform sports education in India.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEnrolling(true)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold shadow-lg hover:shadow-xl text-lg"
          >
            📩 Apply Now – Limited Seats
          </motion.button>
          <div className="mt-6 text-white/60 text-sm">
            Program Fee: ₹25,000 (includes certification, kit, and 6-month mentorship)
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {isEnrolling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsEnrolling(false)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-60 w-full max-w-2xl rounded-3xl bg-gradient-to-br from-black/60 to-black/40 border border-white/20 backdrop-blur-xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setIsEnrolling(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Apply for Train the Trainers</div>
                <p className="text-white/70 mb-6">Batch starting October 2025 • Mumbai & Thane</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert("Thank you! Our team will contact you shortly with next steps.")
                    setIsEnrolling(false)
                  }}
                  className="space-y-4 text-left"
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-green-400"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-green-400"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone (+91 XXXX-XXXXXX)"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-green-400"
                    required
                  />
                  <select
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-green-400"
                    required
                  >
                    <option value="">Current Role</option>
                    <option value="teacher">School PE Teacher</option>
                    <option value="coach">Private Coach</option>
                    <option value="student">Sports Student</option>
                    <option value="other">Other</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold"
                  >
                    Submit Application
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

export default TrainTheTrainersPage