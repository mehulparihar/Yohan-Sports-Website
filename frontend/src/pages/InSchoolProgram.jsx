'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Users, Award, Trophy, Calendar, MapPin, Clock, TrendingUp, Shield, Star, CheckCircle, GraduationCap, BookOpen, Target, Heart, School,ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// Mock data for in-school programs
const programs = [
  {
    id: 1,
    name: "Comprehensive Sports Curriculum",
    description: "Complete sports education program integrated into school curriculum with certified coaches and structured progression.",
    duration: "Academic Year (Semester/Annual)",
    features: ["Customized Curriculum", "Professional Coaching", "Equipment Provided", "Progress Tracking", "Tournament Participation", "Parent Communication"],
    image: "https://placehold.co/800x500/059669/white?text=Comprehensive+Curriculum",
    sports: ["Cricket", "Football", "Basketball", "Athletics", "Swimming"],
    ageGroups: "6-18 years",
    schoolsPartnered: 150
  },
  {
    id: 2,
    name: "Elite Athlete Development",
    description: "Advanced program for talented students with specialized coaching, performance analytics, and competitive opportunities.",
    duration: "Term-based (3-6 months)",
    features: ["Elite Coaching", "Performance Analytics", "Video Analysis", "Tournament Preparation", "Scholarship Guidance", "Individual Assessment"],
    image: "https://placehold.co/800x500/dc2626/white?text=Elite+Development",
    sports: ["Cricket", "Football", "Basketball", "Swimming"],
    ageGroups: "12-18 years",
    schoolsPartnered: 85
  },
  {
    id: 3,
    name: "Physical Education Enhancement",
    description: "Supplement existing PE programs with professional coaching, modern equipment, and structured lesson plans.",
    duration: "Flexible (Monthly/Quarterly)",
    features: ["PE Teacher Support", "Modern Equipment", "Lesson Plans", "Assessment Tools", "Staff Training", "Curriculum Alignment"],
    image: "https://placehold.co/800x500/7c3aed/white?text=PE+Enhancement",
    sports: ["Multi-sport", "Fitness", "Games", "Activities"],
    ageGroups: "5-16 years",
    schoolsPartnered: 200
  },
  {
    id: 4,
    name: "After-School Sports Academy",
    description: "Structured after-school programs focusing on skill development, fitness, and team building in specific sports.",
    duration: "Weekly/Monthly packages",
    features: ["Skill Development", "Fitness Training", "Team Building", "Flexible Scheduling", "Progress Reports", "Holiday Camps"],
    image: "https://placehold.co/800x500/0891b2/white?text=After+School+Academy",
    sports: ["Cricket", "Football", "Basketball", "Tennis", "Swimming"],
    ageGroups: "6-16 years",
    schoolsPartnered: 120
  }
];

const curriculumStructure = [
  {
    phase: "Phase 1",
    title: "Foundation & Assessment",
    duration: "Weeks 1-4",
    activities: ["Initial Skill Assessment", "Fitness Testing", "Goal Setting", "Basic Skill Development", "Team Formation"],
    outcomes: ["Baseline Performance Data", "Individual Development Plans", "Team Assignments"]
  },
  {
    phase: "Phase 2",
    title: "Skill Development",
    duration: "Weeks 5-12",
    activities: ["Technical Training", "Tactical Understanding", "Physical Conditioning", "Game Situations", "Regular Assessments"],
    outcomes: ["Improved Technical Skills", "Enhanced Game Understanding", "Better Physical Fitness"]
  },
  {
    phase: "Phase 3",
    title: "Competition & Application",
    duration: "Weeks 13-20",
    activities: ["Intra-school Tournaments", "Inter-school Competitions", "Performance Analysis", "Leadership Development", "Advanced Tactics"],
    outcomes: ["Competitive Experience", "Performance Improvement", "Leadership Skills"]
  },
  {
    phase: "Phase 4",
    title: "Evaluation & Progression",
    duration: "Weeks 21-24",
    activities: ["Final Assessments", "Progress Reports", "Parent Meetings", "Next Level Planning", "Award Ceremonies"],
    outcomes: ["Comprehensive Progress Report", "Future Development Plan", "Recognition & Awards"]
  }
];

const benefits = [
  {
    category: "For Students",
    items: [
      "Holistic physical development",
      "Improved academic performance",
      "Enhanced social skills and teamwork",
      "Better discipline and focus",
      "Increased confidence and self-esteem",
      "Pathway to competitive sports"
    ]
  },
  {
    category: "For Schools",
    items: [
      "Enhanced school reputation",
      "Improved student engagement",
      "Better academic outcomes",
      "Reduced behavioral issues",
      "Competitive sports success",
      "Comprehensive PE solution"
    ]
  },
  {
    category: "For Parents",
    items: [
      "Professional sports education",
      "Regular progress updates",
      "Safe and supervised environment",
      "Value for money",
      "Convenient on-campus access",
      "Holistic child development"
    ]
  }
];

const implementationProcess = [
  {
    step: 1,
    title: "Initial Consultation",
    description: "Meet with school leadership to understand needs and objectives"
  },
  {
    step: 2,
    title: "Program Design",
    description: "Customize program based on school requirements and student demographics"
  },
  {
    step: 3,
    title: "Resource Allocation",
    description: "Assign certified coaches and provide necessary equipment"
  },
  {
    step: 4,
    title: "Implementation",
    description: "Launch program with proper orientation and scheduling"
  },
  {
    step: 5,
    title: "Monitoring & Support",
    description: "Regular assessments, feedback, and continuous improvement"
  },
  {
    step: 6,
    title: "Evaluation & Renewal",
    description: "Comprehensive review and planning for next academic year"
  }
];

const successMetrics = [
  { metric: "Student Participation", improvement: "70% increase", icon: Users },
  { metric: "Academic Performance", improvement: "15% improvement", icon: GraduationCap },
  { metric: "School Championships", improvement: "42 national titles", icon: Trophy },
  { metric: "Parent Satisfaction", improvement: "95% satisfaction rate", icon: Heart }
];

const faqs = [
  {
    question: "How do you integrate with our existing curriculum?",
    answer: "We work closely with your academic team to align our sports program with your school calendar, ensuring no conflicts with academic activities while maximizing student participation."
  },
  {
    question: "What sports do you offer for in-school programs?",
    answer: "We offer comprehensive programs in Cricket, Football, Basketball, Swimming, Tennis, and Athletics. We can also customize programs based on your school's specific requirements and facilities."
  },
  {
    question: "Are your coaches qualified and certified?",
    answer: "Yes, all our coaches are certified professionals with relevant qualifications, background checks, and extensive experience working with school-age children. Many hold international coaching certifications."
  },
  {
    question: "How do you handle different skill levels in the same class?",
    answer: "Our programs use differentiated instruction with small group rotations, individualized attention, and progressive skill development to cater to students of all ability levels within the same session."
  },
  {
    question: "What equipment do you provide?",
    answer: "We provide all necessary sports equipment, training aids, and safety gear. This includes balls, bats, cones, markers, first aid kits, and specialized training equipment based on the sport."
  },
  {
    question: "How do you measure and report student progress?",
    answer: "We use a comprehensive assessment system that tracks technical skills, physical fitness, tactical understanding, and social development. Parents receive detailed progress reports every term."
  }
];


const InSchoolProgram = () => {
   const [activeTab, setActiveTab] = useState('programs');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [inquiryForm, setInquiryForm] = useState({
    schoolName: '',
    contactPerson: '',
    email: '',
    phone: '',
    studentCount: '',
    programInterest: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleInquire = (program) => {
    setSelectedProgram(program);
    setInquiryForm(prev => ({ ...prev, programInterest: program.name }));
    setShowInquiryModal(true);
  };

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    // Handle inquiry submission
    console.log('Inquiry submitted:', { ...inquiryForm });
    setShowInquiryModal(false);
    // Reset form
    setInquiryForm({
      schoolName: '',
      contactPerson: '',
      email: '',
      phone: '',
      studentCount: '',
      programInterest: '',
      message: ''
    });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
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

  return (
    <div className="bg-white">
      <Navbar/>
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
              In-School <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Programs</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your school's sports education with our comprehensive, 
              professionally managed in-school programs designed for academic institutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Program Stats */}
      {/* <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Program Impact in Schools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Partnering with educational institutions since 2011
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: 150, label: "Schools Partnered", icon: School },
              { number: 8500, label: "Students Trained", icon: Users },
              { number: 42, label: "National Champions", icon: Trophy },
              { number: 95, label: "Parent Satisfaction %", icon: Heart }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100 hover:border-emerald-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-white w-6 h-6" />
                </div>
                <motion.div 
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                >
                  {stat.number}+
                </motion.div>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* Navigation Tabs */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'programs', name: 'Programs' },
              { id: 'curriculum', name: 'Curriculum Structure' },
              { id: 'benefits', name: 'Benefits' },
              { id: 'process', name: 'Implementation' },
              { id: 'faq', name: 'FAQ' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
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
              {programs.map((program) => (
                <motion.div
                  key={program.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={program.image} 
                      alt={program.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{program.name}</h3>
                      <div className="flex items-center text-white/90 text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        {program.duration}
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                        {program.ageGroups}
                      </span>
                      <span className="ml-3 text-sm text-gray-600">{program.schoolsPartnered}+ schools</span>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {program.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-2">Sports Offered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.sports.map((sport, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {sport}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={() => handleInquire(program)}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Request Proposal
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Curriculum Structure Tab */}
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
                  Structured Curriculum Framework
                </h3>
                <p className="text-gray-600">
                  Our 24-week academic program ensures comprehensive development
                </p>
              </motion.div>
              
              <motion.div
                variants={containerVariants}
                className="space-y-6"
              >
                {curriculumStructure.map((phase, index) => (
                  <motion.div
                    key={phase.phase}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-emerald-200 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold mr-4">
                          {phase.phase.split(' ')[1]}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{phase.title}</h4>
                          <p className="text-gray-600">{phase.duration}</p>
                        </div>
                      </div>
                      <div className="text-emerald-600">
                        <Target className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-bold text-gray-900 mb-2">Key Activities:</h5>
                        <ul className="space-y-1">
                          {phase.activities.map((activity, activityIndex) => (
                            <li key={activityIndex} className="flex items-center">
                              <BookOpen className="w-3 h-3 text-emerald-600 mr-2 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 mb-2">Expected Outcomes:</h5>
                        <ul className="space-y-1">
                          {phase.outcomes.map((outcome, outcomeIndex) => (
                            <li key={outcomeIndex} className="flex items-center">
                              <Award className="w-3 h-3 text-amber-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Benefits Tab */}
          {activeTab === 'benefits' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="max-w-6xl mx-auto"
            >
              <motion.div
                variants={itemVariants}
                className="text-center mb-12"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Comprehensive Benefits
                </h3>
                <p className="text-gray-600">
                  Value for students, schools, and parents
                </p>
              </motion.div>
              
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {benefits.map((benefitCategory, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                  >
                    <div className="text-center mb-6">
                      {index === 0 && <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />}
                      {index === 1 && <School className="w-12 h-12 text-emerald-600 mx-auto mb-4" />}
                      {index === 2 && <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />}
                      <h4 className="text-xl font-bold text-gray-900">{benefitCategory.category}</h4>
                    </div>
                    <ul className="space-y-3">
                      {benefitCategory.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Success Metrics */}
              <motion.div
                variants={itemVariants}
                className="mt-16"
              >
                <h4 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  Measurable Success Metrics
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {successMetrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -10, scale: 1.05 }}
                      className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white text-center"
                    >
                      <metric.icon className="w-8 h-8 mx-auto mb-3" />
                      <div className="text-2xl font-bold mb-1">{metric.improvement}</div>
                      <div className="opacity-90">{metric.metric}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Implementation Process Tab */}
          {activeTab === 'process' && (
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
                  Seamless Implementation Process
                </h3>
                <p className="text-gray-600">
                  Six-step process for successful program integration
                </p>
              </motion.div>
              
              <motion.div
                variants={containerVariants}
                className="relative"
              >
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-teal-500 hidden md:block"></div>
                
                <div className="space-y-8">
                  {implementationProcess.map((step, index) => (
                    <motion.div
                      key={step.step}
                      variants={itemVariants}
                      className="flex flex-col md:flex-row items-start"
                    >
                      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8 relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {step.step}
                        </div>
                        {index < implementationProcess.length - 1 && (
                          <div className="hidden md:block absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-emerald-500 to-teal-500"></div>
                        )}
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
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
              School Success Stories
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Hear from our educational partners
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                school: "Lincoln High School",
                quote: "Student participation in sports increased by 70% and we've won 3 state championships since partnering with SportEdu.",
                role: "Principal Davis",
                years: "5 years"
              },
              {
                school: "Greenfield Academy",
                quote: "The comprehensive curriculum has transformed our PE program. Parents love the regular progress updates and structured approach.",
                role: "Sports Coordinator",
                years: "3 years"
              },
              {
                school: "Sunrise International",
                quote: "Our elite athlete program has produced 8 national champions. The professional coaching and analytics have been game-changing.",
                role: "Athletic Director",
                years: "4 years"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:border-white/40 transition-all duration-500"
              >
                <blockquote className="text-lg mb-6 italic opacity-90">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-center">
                  <p className="font-bold text-lg">{testimonial.school}</p>
                  <p className="opacity-75">{testimonial.role}</p>
                  <p className="text-sm opacity-60 mt-2">{testimonial.years} partnership</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transform Your School's Sports Program
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Schedule a free consultation with our education specialists to discuss 
              how we can enhance your school's sports education.
            </p>
            
            <motion.div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.button
                onClick={() => setShowInquiryModal(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-10 py-5 rounded-full font-medium text-lg transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request a Proposal
              </motion.button>
              <motion.button
                onClick={() => window.location.href = 'tel:+1234567890'}
                className="bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600 px-10 py-5 rounded-full font-medium text-lg transition-all duration-300 shadow-xl hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Call Us: (123) 456-7890
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedProgram ? `Inquiry for ${selectedProgram.name}` : 'School Program Inquiry'}
              </h3>
              <button 
                onClick={() => setShowInquiryModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmitInquiry} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">School Name *</label>
                  <input
                    type="text"
                    name="schoolName"
                    value={inquiryForm.schoolName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Lincoln High School"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Contact Person *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={inquiryForm.contactPerson}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="John Smith"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={inquiryForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="principal@school.edu"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={inquiryForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Approximate Student Count</label>
                  <input
                    type="number"
                    name="studentCount"
                    value={inquiryForm.studentCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Program of Interest</label>
                  <select
                    name="programInterest"
                    value={inquiryForm.programInterest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select a program</option>
                    {programs.map(program => (
                      <option key={program.id} value={program.name}>{program.name}</option>
                    ))}
                    <option value="custom">Custom Program</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">Additional Information</label>
                <textarea
                  name="message"
                  value={inquiryForm.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Tell us about your school's current sports program, facilities, and specific requirements..."
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="privacy" className="ml-3 text-gray-700">
                  I agree to the <a href="#" className="text-emerald-600 hover:underline">privacy policy</a>
                </label>
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-xl font-medium text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Inquiry
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
      <Footer/>
    </div>
  );
}

export default InSchoolProgram