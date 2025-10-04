import { useCallback } from "react"

import { useEffect } from "react"

import { useState } from "react"

import { useRef } from "react"

import { useFrame, useThree } from "@react-three/fiber"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Float, Html, Text, OrbitControls, Environment, Sparkles, ContactShadows, useProgress } from "@react-three/drei" // Added useProgress import
import { useInView, animate } from "framer-motion"

import Hero3D from "../components/Hero3D";
import ProgramsGrid from "../components/ProgramsGrid";
import EnrollmentForm from "../components/EnrollmentForm";
// import { PROGRAMS, COACHES, LOCATIONS, TESTIMONIALS, STATS } from "../data/siteData";
import Testimonials from "../components/Testimonials";
// import EventsStrip from "../components/EventsStrip";
import Coaches from "../components/Coaches";
import LoaderFallback from "../components/LoaderFallback";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ===========================
Enhanced Mock Data
=========================== */
const PROGRAMS = [
  {
    id: "p1",
    title: "In-School Physical Education",
    desc: "Comprehensive curriculum-aligned PE programs designed for K-12 schools with certified instructors.",
    age: "6–17",
    icon: "🎓",
    color: "from-blue-500 to-cyan-400",
    image: "https://images.unsplash.com/photo-1549060279-7e16338922a7?auto=format&fit=crop&w=400",
  },
  {
    id: "p2",
    title: "Cricket Academy",
    desc: "Professional skill development, match simulations, and tournament preparation with ex-international coaches.",
    age: "8–18",
    icon: "🏏",
    color: "from-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1518608055487-1baca02035f5?auto=format&fit=crop&w=400",
  },
  {
    id: "p3",
    title: "Football Training",
    desc: "Tactical & technical mastery programs with UEFA-certified coaches and performance analytics.",
    age: "6–18",
    icon: "⚽",
    color: "from-green-500 to-emerald-400",
    image: "https://images.unsplash.com/photo-1546551373-84025920336?auto=format&fit=crop&w=400",
  },
  {
    id: "p4",
    title: "Basketball Academy",
    desc: "Elite court skills, strength conditioning, and game IQ development with NCAA-style training.",
    age: "8–18",
    icon: "🏀",
    color: "from-yellow-500 to-orange-400",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=400",
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

const COACHES = [
  {
    id: "c1",
    name: "Amit Sharma",
    role: "Head Cricket Coach",
    bio: "Former Ranji Trophy player with 10+ years coaching youth and academy teams to national championships.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200",
    achievements: "Coached 15+ national-level players",
  },
  {
    id: "c2",
    name: "Neha Patil",
    role: "Football Coach",
    bio: "Ex-Indian Women's National Team player focused on grassroots development and technical excellence.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200",
    achievements: "UEFA B License Holder",
  },
  {
    id: "c3",
    name: "Rajiv Mehta",
    role: "Basketball Director",
    bio: "NBA Academy certified coach with experience developing players for collegiate scholarships.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200",
    achievements: "Developed 8 NCAA scholarship recipients",
  },
  {
    id: "c4",
    name: "Priya Desai",
    role: "PE Curriculum Lead",
    bio: "Master's in Sports Science with 12 years designing school PE programs aligned to CBSE & ICSE.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200",
    achievements: "Designed curriculum for 50+ schools",
  },
]

const TESTIMONIALS = [
  {
    id: "t1",
    quote: "The Gurukul transformed our school's PE program. Student participation increased by 75% in just one year!",
    author: "Principal Mehta, St. Xavier's School",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100",
  },
  {
    id: "t2",
    quote:
      "My son went from never touching a cricket bat to representing our state in under 18 months. Incredible coaching!",
    author: "Mrs. Kapoor, Parent",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100",
  },
]

const STATS = [
  { number: 50, label: "Schools Partnered", suffix: "+" },
  { number: 2000, label: "Students Trained", suffix: "+" },
  { number: 15, label: "National Champions", suffix: "+" },
  { number: 8, label: "Locations Nationwide", suffix: "" },
]



function Locations() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {LOCATIONS.map((l, index) => (
        <motion.div
          key={l.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="group bg-gradient-to-br from-black/30 to-black/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-500 relative overflow-hidden"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500"
            style={{ backgroundImage: `url(${l.image})` }}
          ></div>
          <div className="relative z-10">
            <div className="font-bold text-white text-xl mb-2">{l.name}</div>
            <div className="flex items-start gap-3 mb-4">
              <div className="text-2xl">📍</div>
              <div className="text-white/80">{l.address}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xl">📞</div>
              <div className="text-white/80 font-medium">{l.phone}</div>
            </div>
            {/* Map button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-4 py-2 bg-white/10 text-white text-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              🗺️ View on Map
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}


function EventsStrip() {
  const events = [
    {
      id: 1,
      title: "🏆 Inter-school Tournament Finals",
      date: "Oct 04, 2025",
      location: "Wadala Stadium",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 2,
      title: "👨‍🏫 Summer Coaches Clinic",
      date: "Nov 12, 2025",
      location: "Thane Centre",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "🌟 Scholarship Trials",
      date: "Dec 08, 2025",
      location: "All Centres",
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="flex gap-4 overflow-x-auto py-4 px-2 scrollbar-hide">
      {events.map((e, index) => (
        <motion.div
          key={e.id}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="flex-shrink-0 w-80 p-5 rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-500"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${e.color}`}></div>
            <div className="text-xs text-white/60 font-medium">{e.date}</div>
          </div>
          <div className="font-bold text-white text-lg mb-2">{e.title}</div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <span>📍</span>
            <span>{e.location}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-3 w-full py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Register Now
          </motion.button>
        </motion.div>
      ))}
    </div>
  )
}



function AnimatedStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-10 w-full px-4 md:px-0">
      {STATS.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
          className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 text-center flex flex-col items-center justify-center min-h-[140px] shadow-lg hover:shadow-xl"
        >
          {/* Decorative top accent */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full opacity-80"></div>

          {/* Animated Number */}
          <AnimatedNumber value={stat.number} suffix={stat.suffix || ""} />

          {/* Label */}
          <div className="mt-3 text-sm md:text-base text-white/80 font-medium leading-tight max-w-[140px]">
            {stat.label}
          </div>

          {/* Subtle glow on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </motion.div>
      ))}
    </div>
  )
}

function AnimatedNumber({ value, suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2,
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      })
      return () => controls.stop()
    }
  }, [inView, value])

  return (
    <div ref={ref} className="text-6xl md:text-7xl font-extrabold text-white">
      {displayValue}
      {suffix}
    </div>
  )
}




export default function SportsHomePage({ theme = "dark" }) {
  const [clickedItem, setClickedItem] = useState(null)
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const controls = useAnimation()

  // Handle escape key to close modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setClickedItem(null)
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Handle scroll for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about-us", "business", "programs", "events", "coaches", "testimonials", "blogs"]
      const scrollPosition = window.scrollY + 100
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Enhanced program click handler
  const handleProgramClick = useCallback((program) => {
    setClickedItem(program)
  }, [])

  return (
    <div
      className={`${theme === "dark" ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" : "bg-white"
        } text-white min-h-screen antialiased overflow-x-hidden`}
    >
      {/* Header with enhanced styling and mobile menu */}
      <Navbar onProgramSelect={handleProgramClick} theme={theme} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <section id="home" className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 rounded-full border border-white/20 text-indigo-300 text-sm font-medium">
                🏆 Premier Sports Education Since 2015
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Build Skills
                </span>
                <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Build Character
                </span>
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Build Champions
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-xl leading-relaxed">
                Structured coaching, curriculum-aligned school programs, and grassroots academies focused on long-term
                athlete development. Our science-backed approach has trained over 2000+ athletes and partnered with 50+
                schools nationwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#programs"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  Explore Programs
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#enroll"
                  className="px-8 py-4 rounded-2xl bg-white/10 text-white font-bold backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 text-center"
                >
                  Enquire Now
                </motion.a>
              </div>
              <div className="mt-8">
                <h4 className="text-sm text-white/70 mb-4 flex items-center">
                  <span className="mr-2">📅</span> Upcoming Events
                </h4>
                <EventsStrip />
              </div>
              {/* <AnimatedStats /> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Hero3D onItemClick={handleProgramClick} programs={PROGRAMS} />
            </motion.div>
          </div>
        </section>
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-slate-900/30 to-transparent">
          <div className="max-w-7xl mx-auto px-4">
            <AnimatedStats />
          </div>
        </section>
        {/* About Us Section */}
        <section id="about-us" className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-indigo-500/20 rounded-full border border-white/20 text-blue-300 text-sm font-medium mb-4">
              👋 About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story & Mission</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Yohan Sports is dedicated to fostering athletic talent and character development through comprehensive
              sports education.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/diverse-group-of-young-athletes-training.jpg"
                alt="About Us"
                className="rounded-3xl shadow-2xl border border-white/10"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-white/80"
            >
              <p>
                Founded in 2015, Yohan Sports began with a vision to revolutionize sports education in India. We believe
                that sports are not just about physical prowess, but also about building character, discipline, and
                teamwork. Our programs are designed to cater to all age groups, from grassroots development to elite
                athlete training.
              </p>
              <p>
                Our mission is to empower the next generation of athletes by providing world-class coaching,
                state-of-the-art facilities, and a holistic development approach. We partner with schools and
                communities to make sports accessible and enjoyable for everyone.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#enroll"
                className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                Join Our Journey
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Business Section */}
        <section id="business" className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-500/20 rounded-full border border-white/20 text-green-300 text-sm font-medium mb-4">
              💼 For Businesses
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Partnerships & Corporate Programs</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Collaborate with Yohan Sports to enhance employee well-being, team building, and corporate social
              responsibility initiatives.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-white/80"
            >
              <p>
                Yohan Sports offers tailored programs for corporate partners, focusing on employee fitness, team sports,
                and wellness workshops. Our corporate programs are designed to boost morale, improve productivity, and
                foster a healthy work environment.
              </p>
              <p>
                We also engage in CSR initiatives, bringing sports education to underprivileged communities. Partner
                with us to make a positive impact and promote a healthier lifestyle within your organization and beyond.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#enroll"
                className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                Partner With Us
              </motion.a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="/corporate-team-building-sports-event.jpg"
                alt="Business Partnerships"
                className="rounded-3xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programs" className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 rounded-full border border-white/20 text-indigo-300 text-sm font-medium mb-4">
              🎯 Our Programs
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Programs & Academies</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Tailored for schools, clubs & individuals with certified coaches and science-backed training
              methodologies.
            </p>
          </motion.div>
          <ProgramsGrid />
        </section>

        {/* Coaches & Locations Section */}
        <section className="grid lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2 space-y-12">
            {/* Coaches Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 id="coaches" className="text-2xl font-bold flex items-center">
                  <span className="mr-3 text-2xl">👨‍🏫</span> Meet Our Expert Coaches
                </h3>
                <div className="text-sm text-white/60">Certified professionals with proven track records</div>
              </div>
              <Coaches />
            </motion.div>
          </div>

          {/* Enrollment Sidebar */}
          <aside id="enroll" className="space-y-8">
            <EnrollmentForm onSubmit={(f) => console.log("enroll:", f)} />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-6 bg-gradient-to-br from-black/30 to-black/10 border border-white/10 backdrop-blur-sm"
            >
              <div className="font-bold text-white text-xl mb-4 flex items-center">
                <span className="mr-2">🌟</span> Why Choose Us
              </div>
              <ul className="text-white/80 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Curriculum-aligned school PE programs following CBSE & ICSE guidelines</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Certified coaches with international qualifications and experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Performance analytics and personalized development plans</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Nationwide network with opportunities for tournaments and scholarships</span>
                </li>
              </ul>
            </motion.div>
          </aside>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-white/20 text-yellow-300 text-sm font-medium mb-4">
              💬 Success Stories
            </div>
            <h3 className="text-3xl font-bold mb-4">What Parents & Schools Say</h3>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Hear from our partners and families about the transformative impact of our programs.
            </p>
          </motion.div>
          <Testimonials />
        </section>

        {/* Highlights & Gallery Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <h3 className="text-3xl font-bold flex items-center">
              <span className="mr-3 text-2xl">📸</span> Highlights & Impact
            </h3>
            <div className="text-sm text-white/60">Moments that define our journey</div>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group rounded-3xl overflow-hidden bg-gradient-to-br from-black/30 to-black/10 border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-500"
              >
                <div className="h-64 bg-gradient-to-br from-indigo-900/30 to-black/30 rounded-t-3xl overflow-hidden relative">
                  <img
                    src={`https://source.unsplash.com/random/600x400?sports,${i}`}
                    alt={`Highlight ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                    {i % 3 === 0 && "🏆 Tournament Win"}
                    {i % 3 === 1 && "👨‍🎓 Graduation Day"}
                    {i % 3 === 2 && "🌟 Skill Showcase"}
                  </div>
                </div>
                <div className="p-6">
                  <div className="font-bold text-white text-lg mb-2">Program Milestone #{i + 1}</div>
                  <div className="text-white/70 text-sm leading-relaxed">
                    {i % 3 === 0 && "Our U-16 team won the regional championship after months of intensive training."}
                    {i % 3 === 1 &&
                      "Celebrating another cohort of athletes completing our advanced development program."}
                    {i % 3 === 2 &&
                      "Showcasing exceptional skill development and sportsmanship from our young athletes."}
                  </div>
                  <div className="mt-4 flex items-center text-xs text-white/60">
                    <span>
                      📅 {new Date(Date.now() - Math.random() * 100 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
       <Footer />

      {/* Program Detail Modal */}
      <AnimatePresence>
        {clickedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setClickedItem(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-60 w-full max-w-3xl rounded-3xl bg-gradient-to-br from-black/60 to-black/40 border border-white/20 backdrop-blur-xl p-8 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setClickedItem(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2">
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                    <img
                      src={clickedItem.image || "/placeholder.svg"}
                      alt={clickedItem.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="text-4xl mb-2">{clickedItem.icon}</div>
                      <div className="text-white font-bold text-xl">{clickedItem.title}</div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 mb-6">
                    <div className="text-white/60 text-sm mb-2">AGE GROUP</div>
                    <div className="text-white font-bold text-lg">{clickedItem.age}</div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="text-white/60 text-sm mb-2">PROGRAM OVERVIEW</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{clickedItem.title}</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    {clickedItem.desc} Our comprehensive approach combines technical skill development, tactical
                    understanding, physical conditioning, and mental resilience training.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div>
                      <div className="text-white/60 text-sm mb-2">PROGRAM HIGHLIGHTS</div>
                      <ul className="text-white/80 space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-400 mt-1">✓</span>
                          <span>Personalized training plans based on skill assessment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-400 mt-1">✓</span>
                          <span>Regular progress tracking and performance analytics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-400 mt-1">✓</span>
                          <span>Competitive opportunities and tournament participation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-400 mt-1">✓</span>
                          <span>Certified coaching staff with proven track records</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold hover:shadow-lg transition-all duration-300"
                    >
                      Request Detailed Information
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-4 rounded-2xl bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      Download Syllabus
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  )
}
