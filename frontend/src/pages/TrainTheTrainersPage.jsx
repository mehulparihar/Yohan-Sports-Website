'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Users, Award, Trophy, Calendar, MapPin, Clock, TrendingUp, Shield, Star, CheckCircle, BookOpen, GraduationCap, Target, Heart, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useStore from '../stores';

// Mock data for train the trainer (kept as fallback)
const MOCK_PROGRAMS = [
  {
    id: 1,
    name: "Certified Sports Coach Program",
    description: "Comprehensive certification program for aspiring sports coaches covering all aspects of modern coaching methodology.",
    duration: "12 weeks",
    format: "Hybrid (Online + In-person)",
    price: 25000,
    features: ["International Certification", "Practical Training", "Mentorship", "Job Placement Assistance", "Lifetime Access to Resources"],
    image: "https://placehold.co/800x500/059669/white?text=Coach+Certification",
    level: "Beginner to Advanced",
    nextBatch: "June 15, 2024"
  },
  {
    id: 2,
    name: "Advanced Coaching Methodology",
    description: "Specialized program for experienced coaches looking to enhance their skills with cutting-edge techniques and analytics.",
    duration: "8 weeks",
    format: "In-person intensive",
    price: 18000,
    features: ["Advanced Analytics", "Video Analysis Training", "Performance Psychology", "Leadership Development", "Peer Networking"],
    image: "https://placehold.co/800x500/dc2626/white?text=Advanced+Coaching",
    level: "Intermediate to Advanced",
    nextBatch: "July 10, 2024"
  },
  {
    id: 3,
    name: "Youth Sports Development Specialist",
    description: "Focused program on coaching young athletes with age-appropriate training methods and child psychology.",
    duration: "6 weeks",
    format: "Online + Weekend Workshops",
    price: 12000,
    features: ["Child Psychology", "Age-Appropriate Training", "Injury Prevention", "Parent Communication", "Long-term Athlete Development"],
    image: "https://placehold.co/800x500/7c3aed/white?text=Youth+Specialist",
    level: "Beginner",
    nextBatch: "August 5, 2024"
  },
  {
    id: 4,
    name: "Sports Psychology for Coaches",
    description: "Specialized training in mental conditioning, motivation techniques, and psychological aspects of athletic performance.",
    duration: "4 weeks",
    format: "Online",
    price: 8000,
    features: ["Mental Conditioning", "Motivation Strategies", "Stress Management", "Team Dynamics", "Individual Athlete Psychology"],
    image: "https://placehold.co/800x500/0891b2/white?text=Sports+Psychology",
    level: "All Levels",
    nextBatch: "September 1, 2024"
  }
];

const curriculum = [
  {
    module: "Module 1",
    title: "Foundations of Sports Coaching",
    topics: ["Coaching Philosophy", "Ethics in Sports", "Communication Skills", "Basic Training Principles"],
    duration: "2 weeks"
  },
  {
    module: "Module 2",
    title: "Technical & Tactical Training",
    topics: ["Sport-Specific Techniques", "Game Strategy", "Video Analysis", "Performance Assessment"],
    duration: "3 weeks"
  },
  {
    module: "Module 3",
    title: "Physical Conditioning",
    topics: ["Strength Training", "Speed & Agility", "Injury Prevention", "Recovery Methods"],
    duration: "2 weeks"
  },
  {
    module: "Module 4",
    title: "Mental & Psychological Aspects",
    topics: ["Mental Toughness", "Motivation Techniques", "Team Building", "Leadership Skills"],
    duration: "2 weeks"
  },
  {
    module: "Module 5",
    title: "Practical Application",
    topics: ["Live Coaching Sessions", "Feedback & Evaluation", "Program Design", "Career Development"],
    duration: "3 weeks"
  }
];

const trainers = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    role: "Program Director",
    qualifications: "PhD Sports Science, Former National Coach, 20+ years experience",
    specialties: ["Coaching Methodology", "Sports Psychology", "Program Design"],
    image: "https://placehold.co/400x400/059669/white?text=RK",
    certifications: ["ISSA", "NSCA", "FIFA Coaching License"]
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Lead Instructor",
    qualifications: "MBA Sports Management, Certified Coach Educator, 15+ years experience",
    specialties: ["Youth Development", "Coach Education", "Leadership Training"],
    image: "https://placehold.co/400x400/dc2626/white?text=PS",
    certifications: ["NCCP", "UEFA B License", "ACSM"]
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Technical Director",
    qualifications: "International Level Coach, Sports Psychology Expert, 18+ years experience",
    specialties: ["Performance Analysis", "Mental Conditioning", "Tactical Training"],
    image: "https://placehold.co/400x400/7c3aed/white?text=VS",
    certifications: ["ASCA", "ISSP", "Olympic Coach Certification"]
  }
];

const testimonials = [
  {
    id: 1,
    name: "Amit Patel",
    role: "School Sports Coordinator",
    quote: "The certification program transformed my coaching approach. I'm now implementing evidence-based methods that have improved our team's performance by 40%.",
    image: "https://placehold.co/100x100/059669/white?text=AP"
  },
  {
    id: 2,
    name: "Sneha Gupta",
    role: "Private Coach",
    quote: "The mentorship and practical training were invaluable. I've since started my own coaching business and have 50+ clients thanks to the skills I learned.",
    image: "https://placehold.co/100x100/dc2626/white?text=SG"
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "College Athletic Director",
    quote: "Our entire coaching staff went through the program, and the impact on our athletes has been remarkable. The certification is now a requirement for all our coaches.",
    image: "https://placehold.co/100x100/7c3aed/white?text=RM"
  }
];

const certificationBenefits = [
  "Internationally recognized certification",
  "Access to exclusive coaching resources and tools",
  "Lifetime membership to yohansports Coach Network",
  "Priority job placement assistance",
  "Continuing education credits",
  "Professional liability insurance discounts",
  "Access to advanced workshops and seminars",
  "Mentorship from experienced coaches"
];

const faqs = [
  {
    question: "What are the prerequisites for joining the program?",
    answer: "For the Certified Sports Coach Program, you need a high school diploma and basic sports knowledge. For advanced programs, relevant coaching experience is required."
  },
  {
    question: "Is the certification internationally recognized?",
    answer: "Yes, our certification is recognized by international sports organizations and coaching associations. We're also working towards additional accreditations."
  },
  {
    question: "What kind of support do you provide after certification?",
    answer: "We provide lifetime access to our online resources, monthly coaching webinars, job placement assistance, and ongoing mentorship opportunities."
  },
  {
    question: "Can I specialize in a particular sport?",
    answer: "Yes, while our core curriculum covers universal coaching principles, you can choose sport-specific electives and practical training in your preferred discipline."
  },
  {
    question: "What's the success rate of your graduates?",
    answer: "95% of our graduates secure coaching positions within 6 months of completion, and 80% report significant career advancement within the first year."
  },
  {
    question: "Do you offer payment plans or scholarships?",
    answer: "Yes, we offer flexible payment plans and merit-based scholarships for deserving candidates. Please contact us for more details."
  }
];


const TrainTheTrainersPage = () => {
  // Tabs & UI state (unchanged)
  const [activeTab, setActiveTab] = useState('programs');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
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

  // Zustand store for programs
  const { programs, fetchPrograms, createEnquiry } = useStore();

  // Fetch programs on mount if not present
  useEffect(() => {
    // defensive: if programs.list isn't an array or is empty, fetch
    const list = programs && programs.list;
    const hasArray = Array.isArray(list) && list.length > 0;
    // Also handle wrapper shape: programs.list?.data
    const wrapped = list && list.data && Array.isArray(list.data) && list.data.length > 0;
    if (!hasArray && !wrapped) {
      fetchPrograms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper to normalize programs from store (handles resp wrappers)
  const getProgramsArray = () => {
    if (!programs) return MOCK_PROGRAMS;

    // If store already holds array at programs.list
    if (Array.isArray(programs.list) && programs.list.length > 0) return programs.list;

    // If programs.list is a wrapper: { data: [...] }
    if (programs.list && Array.isArray(programs.list.data)) return programs.list.data;

    // If server returned at programs.data
    if (Array.isArray(programs.data) && programs.data.length > 0) return programs.data;
    if (programs.data && Array.isArray(programs.data.data) && programs.data.data.length > 0) return programs.data.data;

    // fallback to mock data so UI still renders
    return MOCK_PROGRAMS;
  };

  // Enrollment handlers (unchanged functionality)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnroll = (program) => {
    setSelectedProgram(program);
    setFormData(prev => ({ ...prev, program: program.name }));
    setShowEnrollmentModal(true);
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

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Animation variants (kept same)
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

  // Get the programs to render (either from store or fallback)
  const programsToRender = getProgramsArray();

  return (
    <div className="bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Train the <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Trainer</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Become a certified sports coach with our internationally recognized
              training programs designed to develop world-class coaching professionals.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'programs', name: 'Programs' },
              { id: 'curriculum', name: 'Curriculum' },
              { id: 'trainers', name: 'Master Trainers' },
              { id: 'benefits', name: 'Certification Benefits' },
              { id: 'faq', name: 'FAQ' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Programs Tab */}
          {activeTab === 'programs' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {programsToRender.map((program) => (
                <motion.div
                  key={program._id || program.id || program.name}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={program.images?.[0]?.url || "https://placehold.co/800x500/059669/white?text=Program"}
                      alt={program.name}
                      onError={(e) => { e.currentTarget.src = "https://placehold.co/800x500/059669/white?text=Coach+Certification"; }}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{program.name}</h3>
                      <div className="flex items-center text-white/90 text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        {program.duration} • {program.format}
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                        {program.level}
                      </span>
                      <span className="ml-3 text-sm text-gray-600">Next Batch: {program.nextBatch}</span>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {(program.features || []).map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-emerald-600">₹{(program.price || 0).toLocaleString()}</div>
                      <motion.button
                        onClick={() => handleEnroll(program)}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Enroll Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Curriculum Tab */}
          {activeTab === 'curriculum' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                variants={itemVariants}
                className="text-center mb-12"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Comprehensive Curriculum
                </h3>
                <p className="text-gray-600">
                  Our 12-week program covers all essential aspects of modern sports coaching
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="space-y-6"
              >
                {curriculum.map((module, index) => (
                  <motion.div
                    key={module.module}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-emerald-200 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold mr-4">
                          {module.module.split(' ')[1]}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{module.title}</h4>
                          <p className="text-gray-600">{module.duration}</p>
                        </div>
                      </div>
                      <div className="text-emerald-600">
                        <BookOpen className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, topicIndex) => (
                        <span key={topicIndex} className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white text-center"
              >
                <GraduationCap className="w-12 h-12 mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">Ready to Start Your Coaching Journey?</h4>
                <p className="opacity-90 mb-6">Enroll in our flagship Certified Sports Coach Program today!</p>
                <motion.button
                  onClick={() => handleEnroll(programsToRender[0])}
                  className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enroll Now
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Master Trainers Tab */}
          {activeTab === 'trainers' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {trainers.map((trainer) => (
                <motion.div
                  key={trainer.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="h-64 bg-gray-200 relative overflow-hidden">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="text-white">
                        <p className="font-bold text-xl mb-1">{trainer.name}</p>
                        <p className="text-sm opacity-90">{trainer.role}</p>
                      </div>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4">{trainer.qualifications}</p>
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {trainer.specialties.map((specialty, index) => (
                          <span key={index} className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Certifications:</h4>
                      <div className="flex flex-wrap gap-1">
                        {trainer.certifications.map((cert, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Certification Benefits Tab */}
          {activeTab === 'benefits' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                variants={itemVariants}
                className="text-center mb-12"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Certification Benefits
                </h3>
                <p className="text-gray-600">
                  What you get with your yohansports certification
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {certificationBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className="flex items-start p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-emerald-200 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <CheckCircle className="text-emerald-600 w-4 h-4" />
                    </div>
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-12 text-center"
              >
                <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="text-xl font-bold">Internationally Recognized</h4>
                  <p className="opacity-90 mt-1">Valid across 50+ countries</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="max-w-3xl mx-auto"
            >
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="border border-gray-200 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: activeFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-emerald-600"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: activeFaq === index ? 'auto' : 0,
                        opacity: activeFaq === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-600 bg-gray-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Success Stories
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Hear from our certified coaches
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:border-white/40 transition-all duration-500"
              >
                <div className="w-20 h-20 mx-auto mb-6 overflow-hidden rounded-full">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <blockquote className="text-lg mb-6 italic opacity-90">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-bold text-lg">{testimonial.name}</p>
                  <p className="opacity-75">{testimonial.role}</p>
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
      <Footer />
    </div>
  );
}

export default TrainTheTrainersPage;
