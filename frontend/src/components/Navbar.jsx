import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link,useLocation } from "react-router-dom";

const PROGRAMS = [
  {
    id: "p1",
    title: "In-School Physical Education",
    desc: "Comprehensive curriculum-aligned PE programs designed for K-12 schools with certified instructors.",
    href: "/in-school-program",
    age: "6–17",
    icon: "🎓",
    color: "from-blue-500 to-cyan-400",
    image: "https://images.unsplash.com/photo-1549060279-7e16338922a7?auto=format&fit=crop&w=400",
  },
  {
    id: "p2",
    title: "Cricket Academy",
    desc: "Professional skill development, match simulations, and tournament preparation with ex-international coaches.",
    href: "/cricket-academy",
    age: "8–18",
    icon: "🏏",
    color: "from-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1518608055487-1baca02035f5?auto=format&fit=crop&w=400",
  },
  {
    id: "p3",
    title: "Football Training",
    desc: "Tactical & technical mastery programs with UEFA-certified coaches and performance analytics.",
    href: "/football-training",
    age: "6–18",
    icon: "⚽",
    color: "from-green-500 to-emerald-400",
    image: "https://images.unsplash.com/photo-1546551373-84025920336?auto=format&fit=crop&w=400",
  },
  {
    id: "p4",
    title: "Basketball Academy",
    desc: "Elite court skills, strength conditioning, and game IQ development with NCAA-style training.",
    href: "/basketball-academy",
    age: "8–18",
    icon: "🏀",
    color: "from-yellow-500 to-orange-400",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=400",
  },
];

function Navbar({ theme = "dark", onProgramSelect = () => {} }) {
  const location = useLocation();

// Map pathname to activeSection key
const pathToSection = {
  "/": "home",
  "/about": "about-us",
  "/events": "events",
  "/blogs": "blogs",
  "/testimonials": "testimonials",
  "/in-school-program": "programs",
  "/train-the-trainers": "business",
  "/pay-and-play": "business",
  "/infrastructure": "business",
};


const [clickedItem, setClickedItem] = useState(null);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const activeSection = pathToSection[location.pathname];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 px-6 py-3">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              SG
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Yohan Sports
              </div>
              <div className="text-xs text-white/60">Academy & School Programs</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === "home"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === "about-us"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              About Us
            </Link>

            {/* Business dropdown */}
            <div className="relative group">
              <button
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                  activeSection === "business"
                    ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Business
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-lg
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-2 space-y-1">
                  <Link
                    to="/train-the-trainers"
                    
                    className="block px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white text-sm"
                  >
                    Train the Trainers
                  </Link>
                  <Link
                    to="/pay-and-play"
                    
                    className="block px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white text-sm"
                  >
                    Pay and Play
                  </Link>
                  <Link
                    to="/infrastructure"
                    
                    className="block px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white text-sm"
                  >
                    Infrastructure
                  </Link>
                </div>
              </div>
            </div>

            {/* Programs dropdown */}
            <div className="relative group">
              <button
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                  activeSection === "programs"
                    ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                Programs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-lg
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-2 space-y-1">
                  {PROGRAMS.map((program) => (
                    <Link
                      key={program.id}
                      to={program.href}
                      onClick={() => {
                        setClickedItem(program);
                        
                      }}
                      className="block px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white text-sm"
                    >
                      {program.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/events"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === "events"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Events
            </Link>
            <Link
              to="/blogs"
        
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === "blogs"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Blogs
            </Link>
            <Link
              to="/testimonials"
           
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === "testimonials"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Testimonials
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/enroll"
              className="hidden md:block px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Enroll Now
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Contact Us
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-xl bg-white/10 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                <Link
                  to="/"
                  onClick={() => {
                    
                    setIsMenuOpen(false);
                  }}
                  className="block px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={() => {
                    
                    setIsMenuOpen(false);
                  }}
                  className="block px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white"
                >
                  About Us
                </Link>
                <Link
                  to="/events"
                  onClick={() => {
                    
                    setIsMenuOpen(false);
                  }}
                  className="block px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Events
                </Link>
                <Link
                  to="/blogs"
                  onClick={() => {
                   
                    setIsMenuOpen(false);
                  }}
                  className="block px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Blogs
                </Link>
                <Link
                  to="/testimonials"
                  onClick={() => {
                    
                    setIsMenuOpen(false);
                  }}
                  className="block px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Testimonials
                </Link>
                <Link
                  to="/enroll"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-center font-medium mt-2"
                >
                  Enroll Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Navbar;
