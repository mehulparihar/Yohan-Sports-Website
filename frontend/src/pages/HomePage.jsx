'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { Zap, FileText, BookOpen, ChevronLeft, ChevronRight, ArrowRight, ChevronDown, Send, AlertCircle, Calendar, Users, GraduationCap, Award, Star, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin, Trophy, Target, Shield, Heart, Play, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useStore from '../stores';
import { Link } from 'react-router-dom';

// Mock data
const MOCK_PROGRAMS = [
  {
    id: 1,
    title: "Cricket Academy",
    description: "Professional cricket training with certified coaches and state-of-the-art facilities.",
    features: ["Batting & Bowling", "Fielding Drills", "Match Strategy", "Physical Conditioning"],
    duration: "Weekly/Monthly packages",
    image: "https://placehold.co/600x400/059669/white?text=Cricket",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 2,
    title: "Football Training",
    description: "Comprehensive football program focusing on skills, tactics, and team play.",
    features: ["Dribbling & Passing", "Shooting Accuracy", "Defensive Tactics", "Game Intelligence"],
    duration: "Term-based programs",
    image: "https://placehold.co/600x400/dc2626/white?text=Football",
    color: "from-red-500 to-orange-600"
  },
  {
    id: 3,
    title: "Basketball Development",
    description: "Elite basketball training for all skill levels with professional coaching.",
    features: ["Ball Handling", "Shooting Form", "Defensive Stance", "Team Coordination"],
    duration: "Flexible scheduling",
    image: "https://placehold.co/600x400/7c3aed/white?text=Basketball",
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: 4,
    title: "Swimming Excellence",
    description: "Professional swimming instruction for beginners to competitive athletes.",
    features: ["Stroke Technique", "Breathing Control", "Race Strategy", "Water Safety"],
    duration: "Session-based training",
    image: "https://placehold.co/600x400/0891b2/white?text=Swimming",
    color: "from-sky-500 to-cyan-600"
  }
];

const MOCK_COACHES = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Head Cricket Coach",
    qualifications: "Former International Player, Level 3 Certified",
    specialties: ["Batting", "Mental Conditioning"],
    image: "https://placehold.co/400x400/059669/white?text=AJ",
    experience: "12+ years"
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Football Director",
    qualifications: "UEFA Pro License, 15+ years experience",
    specialties: ["Tactical Training", "Youth Development"],
    image: "https://placehold.co/400x400/dc2626/white?text=SW",
    experience: "15+ years"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Basketball Coach",
    qualifications: "NBA Academy Graduate, Certified Trainer",
    specialties: ["Shooting", "Game Strategy"],
    image: "https://placehold.co/400x400/7c3aed/white?text=MC",
    experience: "10+ years"
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Swimming Coach",
    qualifications: "Olympic Medalist, Level 4 Instructor",
    specialties: ["Competitive Swimming", "Technique Analysis"],
    image: "https://placehold.co/400x400/0891b2/white?text=ER",
    experience: "8+ years"
  }
];

const testimonials = [
  {
    id: 1,
    quote: "Our school's cricket team won the state championship after joining Yohan Sports!",
    author: "Principal Davis",
    school: "Lincoln High School",
    logo: "https://placehold.co/100x40/059669/white?text=LHS",
    rating: 5
  },
  {
    id: 2,
    quote: "The football program transformed our college's athletic department completely.",
    author: "Coach Martinez",
    school: "State University",
    logo: "https://placehold.co/100x40/dc2626/white?text=SU",
    rating: 5
  },
  {
    id: 3,
    quote: "My daughter qualified for nationals after just 6 months of training!",
    author: "Parent Review",
    school: "Individual Program",
    logo: "https://placehold.co/100x40/7c3aed/white?text=IP",
    rating: 5
  }
];

const gallery = [
  "https://placehold.co/600x400/059669/white?text=Champions+1",
  "https://placehold.co/600x400/dc2626/white?text=Champions+2",
  "https://placehold.co/600x400/7c3aed/white?text=Training+3",
  "https://placehold.co/600x400/0891b2/white?text=Training+4",
  // "https://placehold.co/600x400/f59e0b/white?text=Event+5",
  // "https://placehold.co/600x400/10b981/white?text=Tournament+6"
];

const stats = [
  { number: 150, label: "Schools Partnered", icon: GraduationCap, suffix: "+" },
  { number: 8500, label: "Students Trained", icon: Users, suffix: "+" },
  { number: 42, label: "National Champions", icon: Trophy, suffix: "+" },
  { number: 12, label: "Years Experience", icon: Award, suffix: "+" }
];

const whyChooseUs = [
  {
    icon: Target,
    title: "Proven Results",
    description: "Our athletes consistently achieve top rankings and championships.",
    stats: "95% success rate"
  },
  {
    icon: Shield,
    title: "Certified Coaches",
    description: "All our coaches are certified professionals with extensive experience.",
    stats: "100% certified"
  },
  {
    icon: Heart,
    title: "Student-Centric",
    description: "Personalized attention and development-focused training approach.",
    stats: "1:8 ratio"
  },
  {
    icon: TrendingUp,
    title: "Modern Facilities",
    description: "State-of-the-art training facilities with the latest equipment.",
    stats: "50,000 sq ft"
  }
];

const timeline = [
  {
    year: "2011",
    title: "Foundation",
    description: "Yohan Sports founded with mission to revolutionize sports education"
  },
  {
    year: "2015",
    title: "First Championship",
    description: "First national championship win with partner school"
  },
  {
    year: "2018",
    title: "Expansion",
    description: "Expanded to 50+ schools across the region"
  },
  {
    year: "2023",
    title: "Milestone",
    description: "8500+ students trained, 42 national champions"
  }
];
const normalizeArray = (obj) => {
  if (!obj) return [];
  // if array already
  if (Array.isArray(obj)) return obj;
  // common store shapes: { list: [...] } or { data: [...] } or nested wrappers
  if (obj.list && Array.isArray(obj.list)) return obj.list;
  if (obj.data && Array.isArray(obj.data)) return obj.data;
  // sometimes API returns { list: { data: [...] } }
  if (obj.list && obj.list.data && Array.isArray(obj.list.data)) return obj.list.data;
  if (obj.data && obj.data.data && Array.isArray(obj.data.data)) return obj.data.data;
  return [];
};

export default function SportsLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('explore');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loadingPrograms, setLoadingPrograms] = useState(false);
  const [loadingCoaches, setLoadingCoaches] = useState(false);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    type: 'General',
    program: '',
    event: '',
    message: '',
    privacy: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const exploreRef = useRef(null);
  const statsRef = useRef(null);
  const aboutRef = useRef(null);
  const programsRef = useRef(null);
  const coachesRef = useRef(null);
  const whyRef = useRef(null);
  const successRef = useRef(null);
  const impactRef = useRef(null);
  const contactRef = useRef(null);

  const { programs, fetchPrograms, coaches, fetchCoaches, createEnquiry } = useStore();


  const [currentCoachSlide, setCurrentCoachSlide] = useState(0)
  const [coachesPerSlide, setCoachesPerSlide] = useState(4)
  const [hoveredId, setHoveredId] = useState(null)

  const exploreSections = [
    {
      id: "programs",
      title: "Training Programs",
      description: "Customized programs for all levels",
      icon: Zap,
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      count: "15+",
      label: "Programs",
      link: "/in-school-program",
    },
    {
      id: "events",
      title: "Live Events",
      description: "Connect with coaches and athletes",
      icon: Users,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      count: "12",
      label: "This Month",
      link: "/events",
    },
    {
      id: "blogs",
      title: "Resources & Blogs",
      description: "Expert tips and training guides",
      icon: FileText,
      color: "from-teal-400 to-cyan-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      count: "50+",
      label: "Articles",
      link: "/blogs",
    },
    {
      id: "enroll",
      title: "Enroll Now",
      description: "Start your transformation today",
      icon: BookOpen,
      color: "from-lime-400 to-green-500",
      bgColor: "bg-lime-50",
      borderColor: "border-lime-200",
      count: "100%",
      label: "Satisfaction",
      link: "/contact",
    },
  ]
  useEffect(() => {
    const updateCoachesPerSlide = () => {
      if (window.innerWidth < 640) {
        setCoachesPerSlide(1) // Mobile: 1 coach
      } else if (window.innerWidth < 768) {
        setCoachesPerSlide(2) // Small tablet: 2 coaches
      } else if (window.innerWidth < 1024) {
        setCoachesPerSlide(3) // Tablet: 3 coaches
      } else {
        setCoachesPerSlide(4) // Desktop: 4 coaches
      }
    }

    updateCoachesPerSlide()
    window.addEventListener("resize", updateCoachesPerSlide)
    return () => window.removeEventListener("resize", updateCoachesPerSlide)
  }, [])
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleEnroll = (program) => {
    setSelectedProgram(program);
    setFormData(prev => ({ ...prev, program: program.name }));
    setShowEnrollmentModal(true);
  };


  useEffect(() => {
    // defensive checks
    try {
      const programsList = normalizeArray(programs);
      if (programsList.length === 0 && typeof fetchPrograms === 'function') {
        setLoadingPrograms(true);
        // call fetch and clear local loading when done
        fetchPrograms().finally(() => setLoadingPrograms(false));
      }
    } catch (err) {
      // swallow — keep UI functional
      setLoadingPrograms(false);
      // console.warn('fetchPrograms failed', err);
    }

    try {
      const coachesList = normalizeArray(coaches);
      if (coachesList.length === 0 && typeof fetchCoaches === 'function') {
        setLoadingCoaches(true);
        fetchCoaches().finally(() => setLoadingCoaches(false));
      }
    } catch (err) {
      setLoadingCoaches(false);
      // console.warn('fetchCoaches failed', err);
    }

    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const programsArray = (() => {
    const arr = normalizeArray(programs);
    return arr.length > 0 ? arr : MOCK_PROGRAMS;
  })();

  const coachesArray = (() => {
    const arr = normalizeArray(coaches);
    return arr.length > 0 ? arr : MOCK_COACHES;
  })();
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
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

    // Handle scroll events for active section detection
    const handleScroll = () => {
      const sections = [
        { id: 'explore', ref: exploreRef },
        { id: 'stats', ref: statsRef },
        { id: 'about', ref: aboutRef },
        { id: 'programs', ref: programsRef },
        { id: 'coaches', ref: coachesRef },
        { id: 'why', ref: whyRef },
        { id: 'success', ref: successRef },
        { id: 'impact', ref: impactRef },
        { id: 'contact', ref: contactRef }
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      type: 'General',
      program: '',
      event: '',
      message: '',
      privacy: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.type,
        sport: formData.sport,
        programId: selectedProgram?._id || selectedProgram?.id || null,
        subject: formData.subject ? formData.subject.toLowerCase() : "Enquiry",
        message: formData.message ? formData.message : "No message provided",
      };

      // createEnquiry returns { ok: true/false, data or error } per your slice
      const resp = await createEnquiry(payload);
      if (resp && resp.ok) {
        setFormStatus('success');
        resetFormData();
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      console.error('createEnquiry error', err);
      setFormStatus('error');
    } finally {
      // auto-reset success message after a short delay
      setTimeout(() => {
        setFormStatus('idle');
      }, 4000);
    }
  };

  const scrollToSection = (sectionId, ref) => {
    setMobileMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll animations
  const { scrollYProgress } = useScroll();

  // Parallax effect for hero background
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Stats counter animation
  const statsControls = useAnimation();
  const statsRefInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (statsRefInView) {
      statsControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
      });
    }
  }, [statsControls, statsRefInView]);

  // Custom hook for number counter animation
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end, duration]);

    return count;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const floatAnimation = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating spheres */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-emerald-500/10 blur-xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-orange-500/10 blur-xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -30, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-purple-500/10 blur-xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-36 h-36 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Header */}
      <Navbar />

    
      {/* Explore Section */}
       <section
      ref={exploreRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-3xl"
          animate={{ y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-green-300/20 to-emerald-400/20 blur-3xl"
          animate={{ y: [0, -60, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Content */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-lime-100 border border-emerald-300 rounded-full text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
                  🌿 Transform Your Game
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-black tracking-tight leading-tight"
              >
                <span className="block text-slate-900 mb-2">Train Beyond</span>
                <motion.span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600"
                  animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  Limits
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-lg text-slate-600 max-w-lg leading-relaxed"
              >
                Experience world-class athletic programs, personalized by expert coaches to help you push boundaries
                and achieve greatness—powered by focus, discipline, and innovation.
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link to="/train-the-trainers">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl text-lg overflow-hidden shadow-lg hover:shadow-emerald-400/40 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Training
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-bold rounded-xl text-lg transition-all duration-300 shadow-sm"
                >
                  Book a Trial
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Cards */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-green-50/30 border border-emerald-200/50 backdrop-blur-xl shadow-inner"></div>

            <div className="relative z-10 grid grid-cols-2 gap-4 lg:gap-6">
              {exploreSections.map((section, i) => {
                const Icon = section.icon
                return (
                  <Link to={section.link} key={section.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className={`group relative p-6 rounded-2xl border-2 ${section.borderColor} ${section.bgColor} overflow-hidden shadow-md hover:shadow-emerald-200/50 transition-all duration-500 cursor-pointer`}
                    >
                      {/* Hover gradient shimmer */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />
                      <motion.div
                        className="absolute -inset-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{ x: ["-200%", "200%"] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      />

                      <div className="relative z-10 space-y-4 flex flex-col justify-between h-full">
                        <div>
                          <motion.div
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className={`inline-block p-3 rounded-lg bg-gradient-to-br ${section.color} text-white mb-3`}
                          >
                            <Icon size={24} />
                          </motion.div>
                          <h3 className="text-slate-900 font-bold text-lg mb-1">{section.title}</h3>
                          <p className="text-slate-600 text-sm leading-relaxed">{section.description}</p>
                        </div>

                        <div className="flex items-end justify-between pt-2 border-t border-slate-200 group-hover:border-emerald-300 transition-all duration-300">
                          <span className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${section.color}`}>
                            {section.count}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">
                            {section.label}
                          </span>
                        </div>
                      </div>

                      <motion.div
                        className="absolute top-4 right-4 text-slate-400 group-hover:text-emerald-600 transition-all duration-500"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>


      {/* Stats Section */}
      <section ref={statsRef} className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Impact in Numbers
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Years of excellence in sports education and athlete development
            </motion.p>
          </motion.div>

          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={statsControls}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const count = useCounter(stat.number);
              return (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500"
                  whileHover={{ y: -15, scale: 1.03 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <stat.icon className="text-white w-8 h-8" />
                  </div>
                  <motion.div
                    className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  >
                    {count}{stat.suffix}
                  </motion.div>
                  <p className="text-gray-700 font-semibold text-lg">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* About Us */}
      <section ref={aboutRef} className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-teal-50/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Trophy className="w-8 h-8 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">42+</h3>
                  <p className="opacity-90">National Champions</p>
                </motion.div>
                <motion.div
                  className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 text-white shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Users className="w-8 h-8 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">8500+</h3>
                  <p className="opacity-90">Students Trained</p>
                </motion.div>
                <motion.div
                  className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-6 text-white shadow-2xl col-span-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <GraduationCap className="w-8 h-8 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">150+</h3>
                  <p className="opacity-90">Educational Institutions</p>
                </motion.div>
              </div>

              <motion.div
                className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                About <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Yohan Sports</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Founded in 2011, Yohan Sports has been at the forefront of sports education,
                partnering with over 150 educational institutions to deliver world-class
                training programs that create champions both on and off the field.
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Our mission is to nurture athletic talent, promote healthy lifestyles,
                and develop well-rounded individuals through structured, professional
                training methodologies backed by science and proven results.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="text-emerald-600 w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Certified Professional Coaches</h4>
                    <p className="text-gray-600">All coaches are certified with extensive experience</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="text-emerald-600 w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">State-of-the-Art Facilities</h4>
                    <p className="text-gray-600">50,000 sq ft of modern training infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="text-emerald-600 w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Proven Curriculum</h4>
                    <p className="text-gray-600">Scientifically designed programs with measurable outcomes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-24"
          >
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Journey</h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-500 to-teal-500"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`flex ${index % 2 === 0 ? 'md:justify-start md:pr-16' : 'md:justify-end md:pl-16'} relative`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white z-10 ${index % 2 === 0 ? 'mr-6' : 'ml-6'}`}>
                      <span className="text-sm font-bold">{item.year}</span>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                      <h4 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      {/* <section ref={programsRef} className="py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Our Training Programs
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Comprehensive sports education for every level and interest
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {programsArray.map((program, index) => (
              <motion.div
                key={program._id || program.id || `${program.name || 'prog'}-${idx}`}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
              >
                <div className="h-80 overflow-hidden relative">
                  <img
                    src={program.image || "https://placehold.co/800x500/059669/white?text=Program"}
                    alt={program.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/800x500/059669/white?text=Program"; }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-80`}></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                    <p className="opacity-90">{program.duration}</p>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  <ul className="mb-8 space-y-3">
                    {program.features?.map((benefit, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-4"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    onClick={() => handleEnroll(program)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-xl font-medium transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enroll Now
                  </motion.button>
                </div>
              </motion.div>
            ))}

          </motion.div>
        </div>
      </section> */}

      <section ref={programsRef} className="py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Introduction */}
              <motion.div variants={slideInLeft} className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Our Training{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Programs
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We offer comprehensive training programs across multiple sports disciplines including{" "}
                  <span className="font-semibold text-emerald-600">Football</span>,{" "}
                  <span className="font-semibold text-emerald-600">Basketball</span>,{" "}
                  <span className="font-semibold text-emerald-600">Cricket</span>,{" "}
                  <span className="font-semibold text-emerald-600">Swimming</span>, and many more.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Each program is designed by certified professionals to help athletes of all levels achieve their
                  goals. Whether you're a beginner looking to learn the fundamentals or an advanced player aiming for
                  competitive excellence, we have the perfect program for you.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {["Football", "Basketball", "Cricket", "Swimming", "Tennis", "Athletics"].map((sport, index) => (
                    <motion.span
                      key={sport}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 px-4 py-2 rounded-full font-medium text-sm border border-emerald-200"
                    >
                      {sport}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Right side - Button */}
              <motion.div variants={slideInRight} className="flex justify-center lg:justify-end">
                <motion.a
                  href="/programs"
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/30"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View All Programs</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.a>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyRef} className="py-28 bg-gradient-to-br from-emerald-500 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Why Choose Yohan Sports?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl opacity-90 max-w-3xl mx-auto"
            >
              The difference that sets us apart
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 hover:border-white/40 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-8">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="opacity-90 mb-4">{item.description}</p>
                <div className="bg-white/20 rounded-full px-4 py-2 inline-block">
                  <span className="font-bold">{item.stats}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enrollment Modal */}
      {showEnrollmentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Enroll in {selectedProgram?.name}</h3>
              <button
                onClick={() => {
                  setShowEnrollmentModal(false);
                  resetFormData(); // clear form when closing
                  setSelectedProgram(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 p-4 bg-emerald-50 rounded-xl">
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="font-medium text-emerald-800">{selectedProgram?.duration} • {selectedProgram?.format}</span>
              </div>
              <div className="flex items-center">
                <Target className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="text-emerald-800">Level: {selectedProgram?.level}</span>
              </div>
            </div>

            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-white w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enrollment Successful!</h3>
                <p className="text-gray-600">Thank you for enrolling. Our team will contact you shortly.</p>
              </motion.div>
            ) : formStatus === 'error' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="text-white w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h3>
                <p className="text-gray-600">Please try again or contact us directly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">Primary Sport *</label>
                    <select
                      name="sport"
                      value={formData.sport}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select your primary sport</option>
                      <option value="cricket">Cricket</option>
                      <option value="football">Football</option>
                      <option value="basketball">Basketball</option>
                      <option value="swimming">Swimming</option>
                      <option value="tennis">Tennis</option>
                      <option value="athletics">Athletics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>


                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-2">Program Details:</h4>
                  <p className="text-gray-700">{selectedProgram?.name}</p>
                  <p className="text-emerald-600 font-bold mt-1">₹{(selectedProgram?.price || 0).toLocaleString()}</p>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="terms" className="ml-3 text-gray-700">
                    I agree to the <a href="#" className="text-emerald-600 hover:underline">terms and conditions</a>
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-xl font-medium text-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Complete Enrollment
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* Coaches Section */}
      {/* <section ref={coachesRef} className="py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Meet Our Expert Coaches
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Certified professionals with championship experience
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {coachesArray.map((coach, index) => (
              <motion.div
                key={coach._id || coach.id || `${coach.name || 'coach'}-${idx}`}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.03 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 group"
              >
                <div className="h-80 bg-gray-200 relative overflow-hidden">
                  <img
                    src={coach.images?.[0]?.url}
                    alt={coach.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="text-white">
                      <p className="font-bold text-xl mb-1">{coach.name}</p>
                      <p className="text-sm opacity-90 mb-2">{coach.role}</p>
                      <p className="text-xs opacity-75">{coach.experience}</p>
                    </div>
                  </motion.div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{coach.qualifications}</p>
                  <div className="flex flex-wrap gap-2">
                    {coach.specialties?.map((specialty, i) => (
                      <span key={i} className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-medium">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      <section ref={coachesRef} className="py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Expert Coaches
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Certified professionals with championship experience and passion for developing athletes
            </motion.p>
          </motion.div>

          {/* Coaches Carousel */}
          <div className="relative">
            <div className="overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 p-6">
              <motion.div
                className="flex gap-4 sm:gap-6"
                animate={{
                  x: `-${currentCoachSlide * (100 / coachesPerSlide)}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {coachesArray.map((coach) => (
                  <motion.div
                    key={coach._id || coach.id || `${coach.name || 'coach'}-${idx}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group flex-shrink-0 border border-gray-100"
                    style={{
                      width: `calc(${100 / coachesPerSlide}% - ${((coachesPerSlide - 1) * 1.5) / coachesPerSlide}rem)`,
                    }}
                  >
                    <div className="relative h-80 overflow-hidden">
                      <motion.img
                        src={coach.images?.[0]?.url || "/placeholder.svg"}
                        alt={coach.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Hover overlay content */}
                      <motion.div
                        className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={{ y: 20 }}
                        whileHover={{ y: 0 }}
                      >
                        <div className="text-white">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-emerald-400" />
                            <span className="text-sm font-medium text-emerald-400">{coach.experience}</span>
                          </div>
                          <h3 className="text-2xl font-bold mb-1">{coach.name}</h3>
                          <p className="text-sm opacity-90">{coach.role}</p>
                        </div>
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{coach.name}</h3>
                      <p className="text-emerald-600 font-medium mb-3">{coach.role}</p>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{coach.qualifications}</p>
                      <div className="flex flex-wrap gap-2">
                        {coach.specialties?.map((specialty, i) => (
                          <span
                            key={i}
                            className="bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-medium border border-emerald-200"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {coachesArray.length > coachesPerSlide && (
              <>
                <motion.button
                  onClick={() => setCurrentCoachSlide(Math.max(0, currentCoachSlide - 1))}
                  disabled={currentCoachSlide === 0}
                  className="absolute -left-4 sm:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 bg-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 text-emerald-600 hover:text-white p-3 sm:p-4 rounded-full shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 z-20 border-2 border-emerald-600 disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-white"
                  whileHover={{ scale: currentCoachSlide === 0 ? 1 : 1.15 }}
                  whileTap={{ scale: currentCoachSlide === 0 ? 1 : 0.9 }}
                  aria-label="Previous coaches"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
                </motion.button>

                <motion.button
                  onClick={() =>
                    setCurrentCoachSlide(
                      Math.min(Math.ceil(coachesArray.length / coachesPerSlide) - 1, currentCoachSlide + 1),
                    )
                  }
                  disabled={currentCoachSlide >= Math.ceil(coachesArray.length / coachesPerSlide) - 1}
                  className="absolute -right-4 sm:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 bg-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 text-emerald-600 hover:text-white p-3 sm:p-4 rounded-full shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 z-20 border-2 border-emerald-600 disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-white"
                  whileHover={{
                    scale: currentCoachSlide >= Math.ceil(coachesArray.length / coachesPerSlide) - 1 ? 1 : 1.15,
                  }}
                  whileTap={{
                    scale: currentCoachSlide >= Math.ceil(coachesArray.length / coachesPerSlide) - 1 ? 1 : 0.9,
                  }}
                  aria-label="Next coaches"
                >
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
                </motion.button>

                {/* Slide Indicators */}
                <div className="flex justify-center mt-12 space-x-3">
                  {Array.from({ length: Math.ceil(coachesArray.length / coachesPerSlide) }).map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentCoachSlide(index)}
                      className={`h-3 rounded-full transition-all duration-300 ${index === currentCoachSlide
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 w-12"
                          : "bg-gray-300 hover:bg-gray-400 w-3"
                        }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section ref={successRef} className="py-28 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Success Stories
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Hear from our champions and partners
            </motion.p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl text-gray-800 mb-8 italic leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20" />
                  <div className="ml-6 text-left">
                    <p className="font-bold text-xl text-gray-900">{testimonials[currentTestimonial].author}</p>
                    <p className="text-gray-600">{testimonials[currentTestimonial].school}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <img
                    src={testimonials[currentTestimonial].logo}
                    alt={testimonials[currentTestimonial].school}
                    className="h-12"
                  />
                </div>
              </motion.div>

              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlight and Impact */}
      <section ref={impactRef} className="py-28 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Highlight & Impact
              </h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Our programs have created a lasting impact on thousands of athletes,
                helping them achieve their dreams and represent their institutions
                at national and international levels.
              </p>
              <p className="text-xl mb-12 opacity-90 leading-relaxed">
                From school championships to national titles, our systematic approach
                to sports education has consistently delivered champions who excel
                both in their sport and academics.
              </p>

              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">42+</div>
                  <div className="text-sm opacity-90">National Champions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">150+</div>
                  <div className="text-sm opacity-90">Institutions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">8500+</div>
                  <div className="text-sm opacity-90">Athletes</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
              className="grid grid-cols-2 gap-6"
            >
              {gallery.map((image, index) => (
                <motion.div
                  key={index}
                  className="aspect-square overflow-hidden rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={image}
                    alt={`Highlight ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
            >
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-white w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : formStatus === 'error' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="text-white w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h3>
                  <p className="text-gray-600">
                    Please try again or contact us directly at yohanSports@gmail.com
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-3">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-3">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                        placeholder="Regarding trial session"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-lg font-medium text-gray-700 mb-3">
                      I'm interested as a *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                    >

                      <option value="college">General</option>
                      <option value="school">School Representative</option>
                      <option value="parent">Program</option>
                      <option value="parent">Event</option>
                      <option value="parent">Corporate</option>
                      <option value="parent">Sponsorship</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-3">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      required
                      className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                      placeholder="Tell us about your needs, questions, or how we can help you..."
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-6">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        required
                        className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                      />
                    </div>
                    <div className="ml-4 text-sm">
                      <label htmlFor="privacy" className="text-gray-700">
                        I agree to the <a href="#" className="text-emerald-600 hover:underline font-medium">privacy policy</a>
                      </label>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: formStatus !== 'submitting' ? 1.02 : 1 }}
                    whileTap={{ scale: formStatus !== 'submitting' ? 0.98 : 1 }}
                  >
                    {formStatus === 'submitting' ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Send Message
                        <Send className="w-5 h-5 ml-3" />
                      </div>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Book a Trial Session</h3>
                <motion.button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  ✕
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">Interested as</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="individual">Individual</option>
                      <option value="school">School Representative</option>
                      <option value="college">College Representative</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="modal-privacy"
                    required
                    className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="modal-privacy" className="ml-3 text-gray-700">
                    I agree to the <a href="#" className="text-emerald-600 hover:underline">privacy policy</a>
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-xl font-medium text-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Trial Session
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsOrganization",
          "name": "Yohan Sports",
          "description": "Professional sports training programs for schools, colleges, and individuals.",
          "url": "https://YohanSports.com",
          "logo": "https://placehold.co/200x200/059669/white?text=SE",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Sports Avenue",
            "addressLocality": "Athletic City",
            "postalCode": "12345",
            "addressCountry": "US"
          },
          "telephone": "+11234567890",
          "email": "info@YohanSports.com",
          "sameAs": [
            "https://facebook.com/YohanSports",
            "https://twitter.com/YohanSports",
            "https://instagram.com/YohanSports"
          ]
        })}
      </script>
    </div>
  );
}