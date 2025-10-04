import React from 'react'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// Mock Data (aligned with your existing structure)
const CURRICULUM_MODULES = [
  {
    id: "cm1",
    title: "Fundamental Movement Skills",
    grade: "Grades 1–3",
    duration: "40 sessions/year",
    icon: "🏃",
    color: "from-blue-500 to-cyan-400",
    outcomes: ["Balance", "Coordination", "Locomotor skills", "Team play basics"],
  },
  {
    id: "cm2",
    title: "Sport-Specific Skill Development",
    grade: "Grades 4–7",
    duration: "60 sessions/year",
    icon: "🏏",
    color: "from-orange-500 to-red-500",
    outcomes: ["Cricket", "Football", "Basketball", "Athletics"],
  },
  {
    id: "cm3",
    title: "Advanced Performance & Leadership",
    grade: "Grades 8–12",
    duration: "80 sessions/year",
    icon: "🏆",
    color: "from-green-500 to-emerald-400",
    outcomes: ["Tactical play", "Fitness conditioning", "Peer coaching", "Tournament prep"],
  },
]

const BENEFITS = [
  "✅ CBSE/ICSE-aligned PE curriculum",
  "✅ Certified, background-verified coaches",
  "✅ Term-wise progress reports & skill tracking",
  "✅ Intra & inter-school tournament access",
  "✅ No infrastructure investment required",
  "✅ Flexible scheduling (during/after school)",
]

const PARTNER_SCHOOLS = [
  "St. Xavier’s School, Mumbai",
  "Greenfield International, Thane",
  "Vidya Mandir Academy, Wadala",
  "Delhi Public School (Affiliate)",
  "+46 more across Maharashtra & Gujarat",
]

const FAQS = [
  {
    q: "Do you provide equipment?",
    a: "Yes! We supply all essential sports equipment (balls, cones, bibs, etc.). Schools only need open space (indoor/outdoor).",
  },
  {
    q: "How do you assess student progress?",
    a: "We use a digital skill-tracking system with term-wise reports shared with schools and parents.",
  },
  {
    q: "Can you work with our existing PE teacher?",
    a: "Absolutely. We offer co-teaching models, upskilling workshops, or full program delivery — as per your needs.",
  },
  {
    q: "What sports do you offer?",
    a: "Core: Cricket, Football, Basketball, Athletics. Optional add-ons: Badminton, Table Tennis, Yoga.",
  },
]


const InSchoolProgram = () => {
  const [selectedModule, setSelectedModule] = useState(null)
  const [isEnquiring, setIsEnquiring] = useState(false)

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
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-indigo-500/20 rounded-full border border-white/20 text-blue-300 text-sm font-medium mb-6"
          >
            🎓 Curriculum-Aligned • School-Ready
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight"
          >
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              In-School Physical Education
            </span>
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mt-4">
              Built for Your School, Backed by Science
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mt-8 leading-relaxed"
          >
            A turnkey PE program designed for CBSE, ICSE, and state boards — delivered by certified coaches, tracked with data, and loved by students.
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
              onClick={() => setIsEnquiring(true)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              📩 Request a School Proposal
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
              { number: "50+", label: "Schools Partnered" },
              { number: "2000+", label: "Students Trained" },
              { number: "100%", label: "Curriculum Aligned" },
              { number: "92%", label: "Parent Satisfaction" },
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Age-Appropriate Curriculum</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Structured, progressive, and aligned with national education standards.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {CURRICULUM_MODULES.map((module, index) => (
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
                <div className="text-white/70 text-sm mb-3">{module.grade}</div>
                <div className="text-indigo-400 text-sm mb-4">{module.duration}</div>
                <ul className="space-y-2">
                  {module.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/80 text-sm">
                      <span className="text-indigo-400 mt-0.5">✓</span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-black/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Schools Partner With Us</h2>
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

      {/* Partner Schools */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Trusted by Leading Schools</h2>
            <p className="text-xl text-white/70">Join 50+ institutions transforming PE</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {PARTNER_SCHOOLS.map((school, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-black/30 to-black/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏫</span>
                  <span className="text-white">{school}</span>
                </div>
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
          <h3 className="text-3xl font-bold mb-6">Ready to Transform Your School’s PE Program?</h3>
          <p className="text-xl text-white/80 mb-10">
            Get a customized proposal with pricing, curriculum mapping, and coach profiles — at zero cost.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEnquiring(true)}
            className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold shadow-lg hover:shadow-xl text-lg"
          >
            📩 Request School Proposal
          </motion.button>
          <div className="mt-6 text-white/60 text-sm">
            Or call us: +91 9004-200-200 (School Partnerships)
          </div>
        </div>
      </section>

      {/* Module Modal */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-60 w-full max-w-2xl rounded-3xl bg-gradient-to-br from-black/60 to-black/40 border border-white/20 backdrop-blur-xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedModule(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-center">
                <div className="text-4xl mb-4">{selectedModule.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{selectedModule.title}</h3>
                <div className="text-white/70 mb-2">{selectedModule.grade}</div>
                <div className="text-indigo-400 mb-6">{selectedModule.duration}</div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <h4 className="font-bold text-white mb-3">Learning Outcomes</h4>
                  <ul className="text-white/80 space-y-2">
                    {selectedModule.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-indigo-400">✓</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {isEnquiring && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsEnquiring(false)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-60 w-full max-w-2xl rounded-3xl bg-gradient-to-br from-black/60 to-black/40 border border-white/20 backdrop-blur-xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setIsEnquiring(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Request School Proposal</h3>
                <p className="text-white/70 mb-6">Our partnerships team will contact you within 24 hours.</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert("Thank you! Our school partnerships team will contact you shortly.")
                    setIsEnquiring(false)
                  }}
                  className="space-y-4 text-left"
                >
                  <input
                    type="text"
                    placeholder="School Name"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Your Name (Principal / Coordinator)"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone (+91 XXXX-XXXXXX)"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                    required
                  />
                  <select
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-blue-400"
                    required
                  >
                    <option value="">Current PE Setup</option>
                    <option value="none">No structured PE</option>
                    <option value="teacher">Existing PE teacher</option>
                    <option value="external">Current external provider</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold"
                  >
                    Send Request
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

export default InSchoolProgram