import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";
import Lenis from "@studio-freight/lenis";
import { Link } from "react-router-dom";

function Navbar({ theme = "dark", onProgramSelect = () => {} }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("explore");
  const [isScrolled, setIsScrolled] = useState(false);

  const exploreRef = useRef(null);
  const statsRef = useRef(null);
  const aboutRef = useRef(null);
  const programsRef = useRef(null);
  const coachesRef = useRef(null);
  const whyRef = useRef(null);
  const successRef = useRef(null);
  const impactRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      const sections = [
        { id: "explore", ref: exploreRef },
        { id: "stats", ref: statsRef },
        { id: "about", ref: aboutRef },
        { id: "programs", ref: programsRef },
        { id: "coaches", ref: coachesRef },
        { id: "why", ref: whyRef },
        { id: "success", ref: successRef },
        { id: "impact", ref: impactRef },
        { id: "contact", ref: contactRef },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId, ref) => {
    setMobileMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg"
            >
              <Award className="text-white w-6 h-6" />
            </motion.div>
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Yohan Sports
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Direct Links */}
            <Link
              to="/"
              className={`text-sm font-medium ${
                activeSection === "home"
                  ? "text-emerald-600 font-bold"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium ${
                activeSection === "about"
                  ? "text-emerald-600 font-bold"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              About Us
            </Link>

            {/* Business dropdown */}
            <div className="relative group">
              <button
                className={`text-sm font-medium flex items-center gap-1 ${
                  activeSection === "business"
                    ? "text-emerald-600 font-bold"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                Business
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white/90 backdrop-blur-xl border border-gray-200 shadow-lg
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-2 space-y-1">
                  <Link
                    to="/train-the-trainers"
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-emerald-600 text-sm"
                  >
                    Train the Trainers
                  </Link>
                  <Link
                    to="/pay-and-play"
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-emerald-600 text-sm"
                  >
                    Pay and Play
                  </Link>
                  <Link
                    to="/infrastructure"
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-emerald-600 text-sm"
                  >
                    Infrastructure
                  </Link>
                </div>
              </div>
            </div>

            {/* Programs dropdown */}
            <div className="relative group">
              <button
                className={`text-sm font-medium flex items-center gap-1 ${
                  activeSection === "programs"
                    ? "text-emerald-600 font-bold"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                Programs
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white/90 backdrop-blur-xl border border-gray-200 shadow-lg
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-2 space-y-1">
                  <Link
                    to="/in-school-program"
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-emerald-600 text-sm"
                  >
                    In-School Physical Education
                  </Link>
                  <Link
                    to="/train-the-trainers"
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-emerald-600 text-sm"
                  >
                    Train the Trainers
                  </Link>
                  <Link
                    to="/pay-and-play"
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-emerald-600 text-sm"
                  >
                    Pay and Play
                  </Link>
                </div>
              </div>
            </div>

            {/* Other Links */}
            <Link
              to="/events"
              className={`text-sm font-medium ${
                activeSection === "events"
                  ? "text-emerald-600 font-bold"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              Events
            </Link>
            <Link
              to="/blogs"
              className={`text-sm font-medium ${
                activeSection === "blogs"
                  ? "text-emerald-600 font-bold"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              Blogs
            </Link>
            <Link
              to="/testimonials"
              className={`text-sm font-medium ${
                activeSection === "testimonials"
                  ? "text-emerald-600 font-bold"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              Testimonials
            </Link>
          </nav>

          <motion.button
            className="hidden md:block bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-xl hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            
          >
            Enroll Now
          </motion.button>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-current rounded mb-1.5"></div>
            <div className="w-6 h-0.5 bg-current rounded my-1.5"></div>
            <div className="w-6 h-0.5 bg-current rounded mt-1.5"></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-3">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left py-3 px-4 rounded-xl font-medium text-gray-700 hover:bg-gray-100"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left py-3 px-4 rounded-xl font-medium text-gray-700 hover:bg-gray-100"
                >
                  About Us
                </Link>
                <Link
                  to="/events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left py-3 px-4 rounded-xl font-medium text-gray-700 hover:bg-gray-100"
                >
                  Events
                </Link>
                <Link
                  to="/blogs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left py-3 px-4 rounded-xl font-medium text-gray-700 hover:bg-gray-100"
                >
                  Blogs
                </Link>
                <Link
                  to="/testimonials"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left py-3 px-4 rounded-xl font-medium text-gray-700 hover:bg-gray-100"
                >
                  Testimonials
                </Link>
                <Link
                  to="/enroll"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 text-center"
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
