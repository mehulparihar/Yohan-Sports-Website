'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Calendar, Users, Award, Trophy, Clock, MapPin, TrendingUp, Shield, Star, CheckCircle, Play, CreditCard, CalendarDays, ChevronRight, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useStore from '../stores';

// Mock data for other sections (packages, bookingSteps, faqs remain the same)
const packages = [
  {
    id: 1,
    name: "Weekday Warrior",
    description: "Perfect for working professionals and students during weekdays.",
    price: 2500,
    period: "per week",
    features: ["Unlimited access Mon-Fri", "All facilities included", "10% discount on coaching", "Priority booking"],
    popular: false,
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 2,
    name: "Weekend Champion",
    description: "Ideal for weekend warriors looking to maximize their training time.",
    price: 1800,
    period: "per weekend",
    features: ["Unlimited access Sat-Sun", "All facilities included", "Group session access", "Locker rental included"],
    popular: true,
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: 3,
    name: "Monthly Elite",
    description: "Best value for serious athletes with unlimited access all month.",
    price: 8000,
    period: "per month",
    features: ["Unlimited access 7 days/week", "All facilities included", "20% discount on coaching", "Personal locker", "Priority booking", "Free guest passes (2/month)"],
    popular: false,
    color: "from-orange-500 to-red-600"
  }
];

const bookingSteps = [
  {
    step: 1,
    title: "Choose Facility",
    description: "Select the facility and time slot that works for you"
  },
  {
    step: 2,
    title: "Book Online",
    description: "Secure your booking with our easy online system"
  },
  {
    step: 3,
    title: "Pay Securely",
    description: "Complete payment through our secure payment gateway"
  },
  {
    step: 4,
    title: "Play!",
    description: "Show up and enjoy world-class facilities"
  }
];

const faqs = [
  {
    question: "Do I need to be a member to use pay and play facilities?",
    answer: "No, our pay and play facilities are open to everyone. You don't need to be a member to book and use our facilities."
  },
  {
    question: "How far in advance can I book a facility?",
    answer: "You can book facilities up to 30 days in advance. We recommend booking at least 24-48 hours ahead for popular time slots."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI payments, and net banking through our secure online payment system."
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can cancel or reschedule your booking up to 6 hours before your scheduled time. Cancellations within 6 hours are non-refundable."
  },
  {
    question: "Are there any age restrictions?",
    answer: "Children under 16 must be accompanied by an adult. Some facilities like the gym have age restrictions (16+ for gym access)."
  },
  {
    question: "What should I bring with me?",
    answer: "Please bring appropriate sports attire, footwear, and any personal equipment you prefer to use. We provide basic equipment for most sports."
  }
];

const PayAndPlayPage = () => {
  const [activeTab, setActiveTab] = useState('facilities');
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    startTime: '',
    endTime: '',
    players: 1
  });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Get venues data from Zustand store
  const venues = useStore(state => state.venues);
  const fetchVenues = useStore(state => state.fetchVenues);

  useEffect(() => {
    // defensive checks in case `venues` is undefined initially
    const listLength = venues && Array.isArray(venues.list) ? venues.list.length : 0;
    if (listLength === 0 && typeof fetchVenues === 'function') {
      fetchVenues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // Fetch venues data on component mount
  // useEffect(() => {
  //   if (venues.list.length === 0) {
  //     fetchVenues();
  //   }
  // }, [fetchVenues, venues.list.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBookNow = (facility) => {
    setSelectedFacility(facility);
    setShowBookingModal(true);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log('Booking submitted:', { ...bookingForm, facility: selectedFacility.name });
    setShowBookingModal(false);
    // Reset form
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      startTime: '',
      endTime: '',
      players: 1
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

  // Helper function to safely get venues array
  const getVenuesArray = () => {
    if (!venues) return [];
    if (Array.isArray(venues.list)) return venues.list;
    // some slices may have `data` or other shapes — try common alternatives
    if (Array.isArray(venues.data)) return venues.data;
    if (venues.list && Array.isArray(venues.list.data)) return venues.list.data;
    return [];
  };

  // Transform venue data to match facility format
  const transformVenueToFacility = (venue) => {
    return {
      id: venue.id || venue._id,
      name: venue.name || "Facility Name",
      description: venue.description || "Professional sports facility with modern amenities.",
      hourlyRate: venue.hourlyRate || 500,
      dailyRate: venue.dailyRate || 3000,
      features: Array.isArray(venue.facilities) ? venue.facilities : (venue.facilities ? [venue.facilities] : ["Basic Facilities"]),
      availability: venue.availability || "6:00 AM - 10:00 PM",
      image: venue.images?.[0]?.url || "https://placehold.co/800x500/059669/white?text=Facility",
      capacity: venue.capacity ? `${venue.capacity} people` : "20 people",
      bookingRequired: venue.bookingRequired !== undefined ? venue.bookingRequired : true
    };
  };
  const venuesArray = getVenuesArray();

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
              Pay & <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Play</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Access our world-class sports facilities on-demand. No membership required. 
              Book, pay, and play whenever you want!
            </motion.p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'facilities', name: 'Facilities' },
              { id: 'packages', name: 'Packages' },
              { id: 'booking', name: 'How to Book' },
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

          {/* Facilities Tab - Now using venues from Zustand store */}
          {activeTab === 'facilities' && (
            <>
              {/* Loading state */}
              {venues && venues.loading && (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading our facilities...</p>
                </div>
              )}

              {/* Error state */}
              {venues && venues.error && !venues.loading && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load facilities</h3>
                  <p className="text-gray-600 mb-4">{venues.error}</p>
                  <button
                    onClick={() => fetchVenues && fetchVenues()}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Facilities grid */}
              {!venues?.loading && !venues?.error && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {venuesArray.length > 0 && venuesArray.map((venue) => {
                    const facility = transformVenueToFacility(venue);
                    return (
                      <motion.div
                        key={facility.id}
                        variants={itemVariants}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
                      >
                        <div className="h-48 overflow-hidden relative">
                          <img 
                            src={facility.image} 
                            alt={facility.name} 
                            onError={(e) => {
                              e.target.src = "https://placehold.co/800x500/059669/white?text=Facility";
                            }}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              facility.bookingRequired ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                            }`}>
                              {facility.bookingRequired ? 'Booking Required' : 'Walk-in Available'}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                            <h3 className="text-xl font-bold text-white mb-1">{facility.name}</h3>
                            <div className="flex items-center text-white/90 text-sm">
                              <Clock className="w-4 h-4 mr-2" />
                              {facility.availability}
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-gray-600 mb-4">{facility.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center">
                              <Users className="w-5 h-5 text-emerald-600 mr-2" />
                              <span className="text-gray-700 text-sm">{facility.capacity}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-5 h-5 text-emerald-600 mr-2" />
                              <span className="text-gray-700 text-sm truncate">Main Campus</span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-bold text-gray-900 mb-2">Pricing:</h4>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Hourly Rate:</span>
                                <span className="font-bold text-emerald-600">₹{facility.hourlyRate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Daily Rate:</span>
                                <span className="font-bold text-emerald-600">₹{facility.dailyRate}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-bold text-gray-900 mb-2">Key Features:</h4>
                            <div className="flex flex-wrap gap-1">
                              {facility.features.slice(0, 3).map((feature, index) => (
                                <span key={index} className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded">
                                  {feature}
                                </span>
                              ))}
                              {facility.features.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  +{facility.features.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <motion.button
                            onClick={() => handleBookNow(facility)}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Book Now
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* Empty state */}
              {!venues.loading && !venues.error && getVenuesArray().length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities available</h3>
                  <p className="text-gray-600">We'll add our facilities soon.</p>
                </div>
              )}
            </>
          )}

          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {packages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
                    pkg.popular ? 'ring-2 ring-emerald-500 relative' : ''
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <div className={`h-32 bg-gradient-to-r ${pkg.color} flex items-center justify-center`}>
                    <div className="text-white text-center">
                      <h3 className="text-2xl font-bold">{pkg.name}</h3>
                      <p className="opacity-90">{pkg.description}</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-gray-900">₹{pkg.price}</div>
                      <div className="text-gray-600">{pkg.period}</div>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <motion.button
                      className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Booking Process Tab */}
          {activeTab === 'booking' && (
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
                  Simple 4-Step Booking Process
                </h3>
                <p className="text-gray-600">
                  Book your facility in just a few minutes
                </p>
              </motion.div>
              
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {bookingSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-2xl p-6 shadow-lg text-center border border-gray-100 hover:border-emerald-200 transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-xl font-bold">{step.step}</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="mt-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white text-center"
              >
                <Play className="w-12 h-12 mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-2">Ready to Book?</h4>
                <p className="opacity-90 mb-6">Choose any facility above and click 'Book Now' to get started!</p>
                <motion.button
                  onClick={() => setActiveTab('facilities')}
                  className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Facilities
                </motion.button>
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

      {/* Payment Methods */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Secure Payment Options
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              We accept all major payment methods for your convenience and security
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { name: "Credit/Debit Cards", icon: CreditCard },
              { name: "UPI Payments", icon: TrendingUp },
              { name: "Net Banking", icon: Shield },
              { name: "Digital Wallets", icon: Star }
            ].map((method, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <method.icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-bold">{method.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Book {selectedFacility?.name}</h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-emerald-50 rounded-xl">
              <div className="flex items-center mb-2">
                <MapPin className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="font-medium text-emerald-800">Main Campus</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="text-emerald-800">{selectedFacility?.availability}</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
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
                    value={bookingForm.email}
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
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Number of Players</label>
                  <input
                    type="number"
                    name="players"
                    value={bookingForm.players}
                    onChange={handleInputChange}
                    min="1"
                    max={selectedFacility?.capacity.split(' ')[0] || 50}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Time Slot *</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="time"
                      name="startTime"
                      value={bookingForm.startTime}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <input
                      type="time"
                      name="endTime"
                      value={bookingForm.endTime}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Pricing Summary:</h4>
                <div className="flex justify-between">
                  <span>Hourly Rate:</span>
                  <span className="font-bold">₹{selectedFacility?.hourlyRate}/hour</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Estimated Total:</span>
                  <span className="font-bold text-emerald-600">
                    ₹{selectedFacility?.hourlyRate * 2 || 0} (2 hours)
                  </span>
                </div>
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
                Confirm Booking
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
      <Footer/>
    </div>
  );
}

export default PayAndPlayPage;