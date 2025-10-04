"use client"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
// Reuse your existing data
const STATS = [
  { number: 50, label: "Schools Partnered", suffix: "+" },
  { number: 2000, label: "Students Trained", suffix: "+" },
  { number: 15, label: "National Champions", suffix: "+" },
  { number: 8, label: "Locations Nationwide", suffix: "" },
]

const CORE_VALUES = [
  {
    title: "Holistic Development",
    desc: "We believe sports build character, discipline, and leadership — not just physical skill.",
    icon: "🧠",
  },
  {
    title: "Inclusive Excellence",
    desc: "World-class training made accessible to every child, regardless of background.",
    icon: "🤝",
  },
  {
    title: "Science-Backed Coaching",
    desc: "Programs designed with sports science, analytics, and certified international curricula.",
    icon: "🔬",
  },
  {
    title: "Community First",
    desc: "We partner with schools, parents, and local communities to create lasting impact.",
    icon: "🏘️",
  },
]

const TEAM_HIGHLIGHTS = [
  {
    name: "Amit Sharma",
    role: "Head Cricket Coach",
    bio: "Former Ranji Trophy player with 10+ years coaching youth to national championships.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200",
  },
  {
    name: "Neha Patil",
    role: "Football Coach",
    bio: "Ex-Indian Women's National Team player focused on grassroots development.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200",
  },
  {
    name: "Priya Desai",
    role: "PE Curriculum Lead",
    bio: "Designed curriculum for 50+ schools aligned to CBSE & ICSE standards.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200",
  },
]

export default function AboutUsPage() {
    const [clickedItem, setClickedItem] = useState(null);
    const handleProgramClick = useCallback((program) => {
        setClickedItem(program)
      }, [])
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen antialiased">
      {/* Hero Section */}
      <Navbar onProgramSelect={handleProgramClick} />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-indigo-500/20 rounded-full border border-white/20 text-blue-300 text-sm font-medium mb-6"
          >
            👋 Our Story
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight"
          >
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Building Champions
            </span>
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mt-4">
              On and Off the Field
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mt-8 leading-relaxed"
          >
            Since 2015, Yohan Sports has been redefining sports education in India — blending passion, science, and purpose to nurture the next generation of athletes and leaders.
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
                  {stat.suffix}
                </div>
                <div className="mt-2 text-sm md:text-base text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://images.unsplash.com/photo-1549060279-7e16338922a7?auto=format&fit=crop&w=600"
              alt="Young athletes training"
              className="rounded-3xl shadow-2xl border border-white/10"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-white/80 leading-relaxed">
                To empower every child through sports by providing world-class coaching, holistic development, and equitable access — because every child deserves to play, grow, and shine.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-white/80 leading-relaxed">
                A world where sports are a fundamental part of education — building healthier, happier, and more resilient communities across India.
              </p>
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Partner With Us
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-black/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              These principles guide everything we do — from coaching to community engagement.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CORE_VALUES.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Highlights */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Certified, passionate, and proven — our coaches and educators are the heart of Yohan Sports.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM_HIGHLIGHTS.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-black/40 to-black/20 border border-white/10 backdrop-blur-sm">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-bold text-lg">{member.name}</div>
                    <div className="text-indigo-300 text-sm">{member.role}</div>
                  </div>
                </div>
                <div className="mt-4 text-white/80 text-sm leading-relaxed">
                  {member.bio}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Join Our Movement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Whether you're a school, parent, coach, or partner — you can help us build a world that plays.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/programs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Explore Programs
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-white/10 text-white font-bold backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
            >
              Get in Touch
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer (minimal) */}
      <Footer/>
    </div>
  )
}