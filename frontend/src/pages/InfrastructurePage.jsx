'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Users, Award, Trophy, Calendar, MapPin, Clock, TrendingUp, Shield, Star, CheckCircle, Play } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock data for infrastructure
const facilities = [
  {
    id: 1,
    name: "Main Sports Complex",
    description: "Our flagship 50,000 sq ft facility featuring state-of-the-art training equipment and multiple sports courts.",
    features: ["Indoor Cricket Nets", "Football Turf", "Basketball Courts", "Swimming Pool", "Gymnasium", "Recovery Center"],
    capacity: "500+ athletes",
    image: "https://placehold.co/800x500/059669/white?text=Main+Complex",
    area: "50,000 sq ft"
  },
  {
    id: 2,
    name: "Cricket Academy",
    description: "Dedicated cricket training facility with international-standard pitches and advanced analytics equipment.",
    features: ["6 Turf Pitches", "Indoor Nets", "Video Analysis Room", "Bowling Machines", "Batting Cages", "Fielding Practice Area"],
    capacity: "120 players",
    image: "https://placehold.co/800x500/dc2626/white?text=Cricket+Academy",
    area: "15,000 sq ft"
  },
  {
    id: 3,
    name: "Football Training Ground",
    description: "FIFA-certified artificial turf with floodlights and professional training equipment.",
    features: ["FIFA-Certified Turf", "Floodlights", "Goalkeeper Training Area", "Tactical Analysis Room", "Recovery Zone"],
    capacity: "80 players",
    image: "https://placehold.co/800x500/7c3aed/white?text=Football+Ground",
    area: "12,000 sq ft"
  },
  {
    id: 4,
    name: "Aquatic Center",
    description: "Olympic-standard swimming facility with multiple pools and advanced water treatment systems.",
    features: ["50m Olympic Pool", "25m Training Pool", "Diving Platform", "Water Safety Equipment", "Hydrotherapy Pool"],
    capacity: "60 swimmers",
    image: "https://placehold.co/800x500/0891b2/white?text=Aquatic+Center",
    area: "18,000 sq ft"
  }
];

const equipment = [
  {
    category: "Performance Analytics",
    items: [
      { name: "GPS Tracking Vests", count: 50, description: "Real-time performance monitoring" },
      { name: "Video Analysis Systems", count: 8, description: "Advanced technique analysis" },
      { name: "Force Plates", count: 4, description: "Power and strength measurement" },
      { name: "Heart Rate Monitors", count: 100, description: "Cardiovascular monitoring" }
    ]
  },
  {
    category: "Training Equipment",
    items: [
      { name: "Resistance Bands", count: 200, description: "Strength and flexibility training" },
      { name: "Agility Ladders", count: 30, description: "Speed and coordination drills" },
      { name: "Medicine Balls", count: 75, description: "Core strength and power" },
      { name: "Cones & Markers", count: 500, description: "Drill setup and organization" }
    ]
  },
  {
    category: "Recovery & Wellness",
    items: [
      { name: "Cryotherapy Chamber", count: 1, description: "Advanced recovery treatment" },
      { name: "Massage Tables", count: 6, description: "Professional massage therapy" },
      { name: "Foam Rollers", count: 40, description: "Self-myofascial release" },
      { name: "Compression Boots", count: 8, description: "Enhanced circulation recovery" }
    ]
  }
];

const technology = [
  {
    id: 1,
    name: "SportEdu Performance Platform",
    description: "Proprietary software for tracking athlete progress, scheduling, and performance analytics.",
    features: ["Real-time Performance Tracking", "Personalized Training Plans", "Progress Visualization", "Coach-Athlete Communication"],
    image: "https://placehold.co/600x400/f59e0b/white?text=Performance+Platform"
  },
  {
    id: 2,
    name: "Video Analysis Suite",
    description: "Advanced video analysis tools for technique refinement and tactical planning.",
    features: ["Multi-Angle Recording", "Slow Motion Analysis", "Biomechanical Assessment", "Comparison Tools"],
    image: "https://placehold.co/600x400/10b981/white?text=Video+Analysis"
  },
  {
    id: 3,
    name: "Smart Training Equipment",
    description: "IoT-enabled equipment that provides real-time feedback and performance data.",
    features: ["Smart Cricket Bats", "Connected Footballs", "Intelligent Basketball Hoops", "Wearable Sensors"],
    image: "https://placehold.co/600x400/8b5cf6/white?text=Smart+Equipment"
  }
];

const infrastructureStats = [
  { number: 50000, label: "Total Area (sq ft)", suffix: "+" },
  { number: 8, label: "Training Facilities", suffix: "" },
  { number: 500, label: "Equipment Pieces", suffix: "+" },
  { number: 1200, label: "Daily Capacity", suffix: "+" }
];

const safetyMeasures = [
  "Certified First Aid Staff On-Site",
  "CCTV Surveillance Throughout Facilities",
  "Regular Equipment Maintenance & Safety Checks",
  "Emergency Response Protocols",
  "Qualified Lifeguards at Aquatic Center",
  "Fire Safety Systems & Regular Drills",
  "Secure Access Control Systems",
  "Comprehensive Insurance Coverage"
];

const InfrastructurePage = () => {
  const [activeTab, setActiveTab] = useState('facilities');
  const infrastructureRef = useRef(null);

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

  // Custom counter hook
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
              World-Class <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Infrastructure</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              State-of-the-art facilities, cutting-edge equipment, and advanced technology 
              designed to maximize athletic performance and development.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Infrastructure Stats */}
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
              Our Infrastructure by Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Investing in world-class facilities for exceptional athlete development
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {infrastructureStats.map((stat, index) => {
              const count = useCounter(stat.number);
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100 hover:border-emerald-200 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
                    {index === 0 && <MapPin className="text-white w-6 h-6" />}
                    {index === 1 && <Users className="text-white w-6 h-6" />}
                    {index === 2 && <Award className="text-white w-6 h-6" />}
                    {index === 3 && <TrendingUp className="text-white w-6 h-6" />}
                  </div>
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  >
                    {count.toLocaleString()}{stat.suffix}
                  </motion.div>
                  <p className="text-gray-700 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section> */}

      {/* Navigation Tabs */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'facilities', name: 'Training Facilities' },
              { id: 'equipment', name: 'Equipment' },
              { id: 'technology', name: 'Technology' },
              { id: 'safety', name: 'Safety Measures' }
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

          {/* Facilities Tab */}
          {activeTab === 'facilities' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {facilities.map((facility) => (
                <motion.div
                  key={facility.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
                >
                  <div className="h-80 overflow-hidden relative">
                    <img 
                      src={facility.image} 
                      alt={facility.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{facility.name}</h3>
                      <p className="text-white/90">{facility.area}</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">{facility.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-emerald-600 mr-3" />
                        <span className="text-gray-700">{facility.capacity}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-emerald-600 mr-3" />
                        <span className="text-gray-700">{facility.area}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {facility.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Equipment Tab */}
          {activeTab === 'equipment' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="space-y-12"
            >
              {equipment.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 hover:border-emerald-200 transition-all duration-300"
                      >
                        <div className="text-3xl font-bold text-emerald-600 mb-2">{item.count}</div>
                        <h4 className="font-bold text-gray-900 mb-2">{item.name}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Technology Tab */}
          {activeTab === 'technology' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {technology.map((tech) => (
                <motion.div
                  key={tech.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={tech.image} 
                      alt={tech.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{tech.name}</h3>
                    <p className="text-gray-600 mb-4">{tech.description}</p>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {tech.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Star className="w-3 h-3 text-amber-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Safety Measures Tab */}
          {activeTab === 'safety' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-12 text-white text-center mb-12"
              >
                <Shield className="w-16 h-16 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-4">Safety First</h3>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  The safety and well-being of our athletes is our top priority. 
                  All our facilities are equipped with comprehensive safety measures.
                </p>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comprehensive Safety Measures</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {safetyMeasures.map((measure, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10 }}
                      className="flex items-start"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <CheckCircle className="text-emerald-600 w-4 h-4" />
                      </div>
                      <span className="text-gray-700 text-lg">{measure}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience Our Facilities Virtually
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Take a 360° virtual tour of our world-class training facilities 
              from the comfort of your home.
            </p>
            
            <motion.button
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Virtual Tour
            </motion.button>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Main Complex', 'Cricket Academy', 'Football Ground', 'Aquatic Center'].map((facility, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                    <Play className="w-6 h-6" />
                  </div>
                  <span className="font-medium">{facility}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Facility Booking */}
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
              Book Our Facilities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Interested in renting our world-class facilities for your team or event? 
              Contact us to discuss availability and pricing.
            </p>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { name: "Cricket Pitches", price: "From ₹2,000/hour", availability: "Daily 6AM-10PM" },
                { name: "Football Turf", price: "From ₹3,500/hour", availability: "Daily 6AM-10PM" },
                { name: "Swimming Pool", price: "From ₹1,500/hour", availability: "Daily 7AM-8PM" }
              ].map((facility, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-emerald-200 transition-all duration-500"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{facility.name}</h3>
                  <div className="text-2xl font-bold text-emerald-600 mb-3">{facility.price}</div>
                  <div className="flex items-center text-gray-600 mb-6">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{facility.availability}</span>
                  </div>
                  <motion.button
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl font-medium transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Inquire Now
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default InfrastructurePage