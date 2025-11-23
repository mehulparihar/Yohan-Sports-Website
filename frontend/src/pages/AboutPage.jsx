'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Users, GraduationCap, Award, Trophy, Target, Shield, Heart, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useStore from '../stores';

// Mock data for other sections (stats, timeline, values remain the same)
const stats = [
  { number: 12, label: "Schools Partnered", icon: GraduationCap, suffix: "+" },
  { number: 300, label: "Students Trained", icon: Users, suffix: "+" },
  { number: 25, label: "National Champions", icon: Trophy, suffix: "+" },
  { number: 5, label: "Years Experience", icon: Award, suffix: "+" }
];

const timeline = [
  {
    year: "2024",
    title: "Foundation",
    description: "Yohan Sports founded with mission to revolutionize sports education"
  },
  {
    year: "2024",
    title: "First Championship",
    description: "First national championship win with partner school"
  },
  {
    year: "2025",
    title: "Expansion",
    description: "Expanded to 12+ schools across the region"
  },
  {
    year: "2025",
    title: "Milestone",
    description: "300+ students trained, 25+ national champions"
  }
];

const values = [
  {
    title: "Excellence",
    description: "We strive for the highest standards in coaching and athlete development.",
    icon: Award
  },
  {
    title: "Integrity",
    description: "Honesty and transparency in all our interactions and operations.",
    icon: Shield
  },
  {
    title: "Innovation",
    description: "Continuously evolving our methods with the latest sports science.",
    icon: TrendingUp
  },
  {
    title: "Community",
    description: "Building strong relationships with schools, families, and athletes.",
    icon: Users
  }
];

export default function AboutUsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const statsRef = useRef(null);

  // Get coaches data from Zustand store
  const { coaches, fetchCoaches } = useStore();

  // Fetch coaches data on component mount
  useEffect(() => {
    // Only fetch if we haven't fetched before or if there's an error
    if (!coaches.list || coaches.list.length === 0) {
      fetchCoaches();
    }
  }, [fetchCoaches, coaches.list]);

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
      const increment = end / (duration / 16);

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
              Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Story</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Since 2011, we've been transforming lives through sports education,
              creating champions both on and off the field.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
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

      {/* Mission & Vision */}
      <section className="py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To revolutionize sports education by providing world-class training programs
                that develop not just athletes, but well-rounded individuals with strong
                character, discipline, and leadership skills.
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                We believe that sports have the power to transform lives, build communities,
                and create opportunities that extend far beyond the playing field.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="text-emerald-600 w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Holistic Development</h4>
                    <p className="text-gray-600">Focus on physical, mental, and character development</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="text-emerald-600 w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Accessible Excellence</h4>
                    <p className="text-gray-600">World-class training made accessible to all</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="text-emerald-600 w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Community Impact</h4>
                    <p className="text-gray-600">Building stronger communities through sports</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
              className="relative"
            >
        
              <img
                src="1000331337.jpg"
                alt="Preview"
                className="bg-gray-200 border-2 rounded-2xl w-full h-96 object-cover"
              />
            </motion.div>
          </div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-24 text-center"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Vision</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              To be the most trusted and impactful sports education provider in the country,
              recognized for developing champions who excel in their sport and make positive
              contributions to society.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              From humble beginnings to becoming a leader in sports education
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/30"></div>
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={`w-1/2 pr-12 ${index % 2 === 0 ? '' : 'order-2 pr-0 pl-12 text-right'}`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="opacity-90">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex justify-center z-10">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-emerald-600 font-bold text-lg shadow-lg">
                      {item.year}
                    </div>
                  </div>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'order-2 pl-12' : 'pr-12'}`}>
                    {/* Empty div for spacing */}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team - Now using coaches from Zustand store */}
      <section className="py-28 bg-gradient-to-b from-gray-50 to-white">
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

          {/* Loading state */}
          {coaches.loading && (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading our expert coaches...</p>
            </div>
          )}

          {/* Error state */}
          {coaches.error && !coaches.loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load coaches</h3>
              <p className="text-gray-600 mb-4">{coaches.error}</p>
              <button
                onClick={() => fetchCoaches()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Coaches grid - with proper array checking */}
          {!coaches.loading && !coaches.error && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              
              {coaches.list.map((coach, index) => (
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
          )}

          {/* Empty state */}
          {!coaches.loading && !coaches.error && coaches.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No coaches available</h3>
              <p className="text-gray-600">We'll add our expert coaches soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-28 bg-gradient-to-br from-white to-gray-50">
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
              Our Core Values
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:border-emerald-200 transition-all duration-500 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}