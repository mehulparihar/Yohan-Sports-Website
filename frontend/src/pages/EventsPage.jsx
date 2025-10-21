'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Calendar, Users, Trophy, Award, Star, MapPin, Clock, Play, CheckCircle, TrendingUp, Shield, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useStore from '../stores';


// Mock data for all event types
const FEATURED_EVENTS_MOCK = [
  {
    id: 1,
    title: "National Sports Championship 2024",
    date: "June 15-17, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Central Sports Complex, Athletic City",
    description: "Our flagship annual tournament featuring cricket, football, basketball, and swimming competitions with participants from 50+ schools.",
    image: "https://placehold.co/800x500/059669/white?text=National+Championship",
    category: "Tournament",
    type: "featured",
    registrationOpen: true,
    participants: "500+",
    highlights: "National-level competition, professional referees, live streaming"
  }
];

const TOURNAMENTS_MOCK = [
  {
    id: 2,
    title: "Inter-School Cricket League",
    date: "July 5-20, 2024",
    time: "4:00 PM - 7:00 PM",
    location: "yohansports Cricket Ground",
    description: "Weekly cricket matches between top school teams in the region.",
    image: "https://placehold.co/600x400/dc2626/white?text=Cricket+League",
    category: "Tournament",
    type: "tournament",
    registrationOpen: true,
    teams: 16,
    price: "₹2,000 per team"
  },
  {
    id: 3,
    title: "Youth Football Cup",
    date: "August 10-12, 2024",
    time: "8:00 AM - 6:00 PM",
    location: "City Football Stadium",
    description: "Age-group football tournament for U-14, U-16, and U-19 categories.",
    image: "https://placehold.co/600x400/7c3aed/white?text=Football+Cup",
    category: "Tournament",
    type: "tournament",
    registrationOpen: true,
    teams: 24,
    price: "₹1,500 per team"
  }
];

const CAMPS_MOCK = [
  {
    id: 5,
    title: "Summer Sports Camp",
    date: "July 1-15, 2024",
    time: "8:00 AM - 2:00 PM",
    location: "yohansports Academy, Main Campus",
    description: "Intensive 2-week summer camp focusing on skill development, fitness, and team building for ages 8-16.",
    image: "https://placehold.co/600x400/f59e0b/white?text=Summer+Camp",
    category: "Camp",
    type: "camp",
    registrationOpen: true,
    spotsAvailable: 120,
    price: "₹8,000 per participant"
  }
];

const WORKSHOPS_MOCK = [
  {
    id: 7,
    title: "Coaching Certification Workshop",
    date: "August 5-7, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "yohansports Training Center",
    description: "Professional development workshop for aspiring sports coaches. Learn modern coaching techniques and methodologies.",
    image: "https://placehold.co/600x400/8b5cf6/white?text=Coaching+Workshop",
    category: "Workshop",
    type: "workshop",
    registrationOpen: true,
    spotsAvailable: 50,
    price: "₹12,000 per participant"
  }
];

const COMMUNITY_MOCK = [
  {
    id: 9,
    title: "Community Sports Day",
    date: "October 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "City Park Grounds",
    description: "Free community event promoting sports participation and healthy living for all ages with fun games and activities.",
    image: "https://placehold.co/600x400/059669/white?text=Community+Day",
    category: "Community",
    type: "community",
    registrationOpen: true,
    price: "Free"
  }
];

const PAST_EVENTS_MOCK = [
  {
    id: 11,
    title: "Winter Sports Festival 2023",
    date: "December 10-12, 2023",
    location: "yohansports Academy",
    description: "Annual winter festival featuring indoor sports, workshops, and family activities.",
    image: "https://placehold.co/600x400/f59e0b/white?text=Winter+Festival+2023",
    participants: "350+",
    highlights: "Swimming championships, basketball finals, coaching clinics",
    type: "past"
  }
];

const eventStats = [
  { number: 45, label: "Events Organized", icon: Calendar },
  { number: 5000, label: "Participants", icon: Users },
  { number: 150, label: "Schools Involved", icon: Trophy },
  { number: 12, label: "Years of Excellence", icon: Award }
];


const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formStatus, setFormStatus] = useState('idle');
  const eventsRef = useRef(null);

  const { events, fetchEvents, createEnquiry } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    type: 'General',
    program: '',
    age: '',
    institution: '',
    event: '',
    message: '',
    privacy: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnroll = (event) => {
    setSelectedEvent(event);
    setFormData(prev => ({ ...prev, event: event.name }));
    setShowRegistrationModal(true);
  };
  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      type: 'General',
      program: '',
      age: '',
      institution: '',
      event: '',
      message: '',
      privacy: false
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
        type: formData.type ? formData.type.toLowerCase() : 'general',
        sport: formData.sport ? formData.sport : 'Not Defined',
        eventId: selectedEvent?._id || selectedEvent?.id || null,
        age: formData.age ? parseInt(formData.age) : null,
        institution: formData.institution ? formData.institution : '',
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

  // Fetch events on mount if store is empty (defensive)
  useEffect(() => {
    const list = events && events.list;
    const hasArray = Array.isArray(list) && list.length > 0;
    const wrapped = list && list.data && Array.isArray(list.data) && list.data.length > 0;
    const dataArray = events && events.data && Array.isArray(events.data) && events.data.length > 0;
    if (!hasArray && !wrapped && !dataArray) {
      if (typeof fetchEvents === 'function') fetchEvents();
    }
  }, []);

  // Helpers to normalize store shapes and fallback to mocks
  const getEventsByType = (type) => {
    // Try to extract arrays from multiple possible shapes
    if (!events) return null;

    if (Array.isArray(events.list) && events.list.length > 0) return events.list;
    if (events.list && Array.isArray(events.list.data) && events.list.data.length > 0) return events.list.data;
    if (Array.isArray(events.data) && events.data.length > 0) return events.data;
    if (events.data && Array.isArray(events.data.data) && events.data.data.length > 0) return events.data.data;

    return null;
  };

  const normalizeEvent = (e) => ({
    id: e.id || e._id || Math.random().toString(36).slice(2),
    title: e.title || e.name || 'Untitled Event',
    date: e.date || e.dates || '',
    time: e.time || e.timeslot || '',
    location: e.location || e.venue || 'TBA',
    description: e.description || e.summary || '',
    image: e.image || e.banner || 'https://placehold.co/600x400/059669/white?text=Event',
    category: e.category || e.type || 'Event',
    type: e.type || (e.category && e.category.toLowerCase()) || 'event',
    registrationOpen: typeof e.registrationOpen === 'boolean' ? e.registrationOpen : true,
    participants: e.participants || e.attendees || '',
    highlights: e.highlights || e.notes || '',
    price: e.price || e.fee || '',
    spotsAvailable: e.spotsAvailable || e.capacity || null,
    teams: e.teams || null
  });

  // Build lists per type: prefer store data; otherwise mock fallback
  const storeEvents = getEventsByType();
  const allEventsList = storeEvents ? storeEvents.map(normalizeEvent) : [
    ...TOURNAMENTS_MOCK,
    ...CAMPS_MOCK,
    ...WORKSHOPS_MOCK,
    ...COMMUNITY_MOCK
  ];

  const featuredEvents = storeEvents ? storeEvents.filter(ev => (ev.type === 'featured' || ev.isFeatured)).map(normalizeEvent) : FEATURED_EVENTS_MOCK;
  const tournaments = storeEvents ? storeEvents.filter(ev => (ev.type === 'tournament' || (ev.category && ev.category.toLowerCase() === 'tournament'))).map(normalizeEvent) : TOURNAMENTS_MOCK;
  const camps = storeEvents ? storeEvents.filter(ev => (ev.type === 'camp' || (ev.category && ev.category.toLowerCase() === 'camp'))).map(normalizeEvent) : CAMPS_MOCK;
  const workshops = storeEvents ? storeEvents.filter(ev => (ev.type === 'workshop' || (ev.category && ev.category.toLowerCase() === 'workshop'))).map(normalizeEvent) : WORKSHOPS_MOCK;
  const communityEvents = storeEvents ? storeEvents.filter(ev => (ev.type === 'community' || (ev.category && ev.category.toLowerCase() === 'community'))).map(normalizeEvent) : COMMUNITY_MOCK;
  const pastEvents = storeEvents ? storeEvents.filter(ev => (ev.type === 'past' || (ev.past === true))).map(normalizeEvent) : PAST_EVENTS_MOCK;

  const getCurrentEvents = () => {
    switch (activeTab) {
      case 'tournaments':
        return tournaments;
      case 'camps':
        return camps;
      case 'workshops':
        return workshops;
      case 'community':
        return communityEvents;
      case 'past':
        return pastEvents;
      default:
        return allEventsList;
    }
  };

  const currentEvents = getCurrentEvents();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };



  // Counter hook (kept as-is if you want to enable stats later)
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

  // Get all events based on active tab
  const getAllEvents = () => {
    switch (activeTab) {
      case 'tournaments':
        return tournaments;
      case 'camps':
        return camps;
      case 'workshops':
        return workshops;
      case 'community':
        return communityEvents;
      case 'past':
        return pastEvents;
      default:
        return [...tournaments, ...camps, ...workshops, ...communityEvents];
    }
  };


  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
              Sports <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Events</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover our comprehensive calendar of tournaments, camps, workshops,
              community events, and past highlights that make us the premier sports education provider.
            </motion.p>
          </div>
        </div>
      </section>



      {/* Featured Event */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Event
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our flagship annual championship
            </p>
          </motion.div>

          {featuredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-96 lg:h-auto">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 text-white">
                  <div className="mb-4">
                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-bold">
                      Featured Event
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{event.title}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-3" />
                      <span>{event.participants} participants expected</span>
                    </div>
                  </div>
                  <p className="mb-8 opacity-90 leading-relaxed">{event.description}</p>
                  <div className="mb-8 p-4 bg-white/10 rounded-xl">
                    <h4 className="font-bold mb-2">Event Highlights:</h4>
                    <p className="text-sm opacity-90">{event.highlights}</p>
                  </div>
                  <motion.button
                    onClick={() => handleEnroll(event)}
                    className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Events Navigation Tabs */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'all', name: 'All Events' },
              { id: 'tournaments', name: 'Tournaments' },
              { id: 'camps', name: 'Camps' },
              { id: 'workshops', name: 'Workshops' },
              { id: 'community', name: 'Community' },
              { id: 'past', name: 'Past Events' }
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

          {/* Events Grid */}
          {currentEvents.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className={`grid grid-cols-1 ${activeTab === 'past' ? 'md:grid-cols-2 lg:grid-cols-3' : 'lg:grid-cols-2'
                } gap-12`}
            >
              {currentEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
                >
                  <div className={`h-64 overflow-hidden relative ${event.type === 'past' ? 'h-48' : ''}`}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${event.category === 'Tournament' ? 'bg-red-500 text-white' :
                        event.category === 'Camp' ? 'bg-blue-500 text-white' :
                          event.category === 'Workshop' ? 'bg-purple-500 text-white' :
                            event.category === 'Community' ? 'bg-green-500 text-white' :
                              'bg-gray-500 text-white'
                        }`}>
                        {event.category}
                      </span>
                    </div>
                    {event.type !== 'past' && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                        <div className="flex items-center text-white/90 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {event.date}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    {event.type === 'past' ? (
                      <>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        <div className="flex items-center text-gray-600 mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-emerald-600 mr-2" />
                            <span className="text-sm text-gray-700">{event.participants} participants</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-amber-500 mr-2" />
                            <span className="text-sm text-gray-700">{event.highlights}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 text-emerald-600 mr-3" />
                            <span className="text-gray-700">{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 text-emerald-600 mr-3" />
                            <span className="text-gray-700 truncate">{event.location}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            <div className="text-sm">
                              <span className="text-gray-600">Price:</span>
                              <span className="font-semibold text-gray-900 ml-2">{event.price}</span>
                            </div>
                            {event.spotsAvailable && event.spotsAvailable > 0 && (
                              <div className="text-sm">
                                <span className="text-gray-600">Spots:</span>
                                <span className="font-semibold text-emerald-600 ml-2">{event.spotsAvailable} available</span>
                              </div>
                            )}
                            {event.teams && (
                              <div className="text-sm">
                                <span className="text-gray-600">Teams:</span>
                                <span className="font-semibold text-gray-900 ml-2">{event.teams}</span>
                              </div>
                            )}
                          </div>

                          {event.registrationOpen ? (
                            <motion.button
                              onClick={() => handleEnroll(event)}
                              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Register Now
                            </motion.button>
                          ) : (
                            <span className="px-4 py-2 bg-gray-200 text-gray-600 rounded-xl font-medium">
                              Registration Closed
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-600">Try selecting a different category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Our Events */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Events?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Exceptional experiences that go beyond just competition
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                title: "Professional Organization",
                description: "Meticulously planned events with attention to every detail",
                icon: Shield
              },
              {
                title: "Expert Coaching",
                description: "Learn from certified coaches and industry professionals",
                icon: Award
              },
              {
                title: "Skill Development",
                description: "Focus on improvement and personal growth in a supportive environment",
                icon: TrendingUp
              },
              {
                title: "Community Building",
                description: "Connect with like-minded athletes, coaches, and families",
                icon: Users
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="opacity-90 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Register for {selectedEvent?.title}</h3>
              <button
                onClick={() => {
                  setShowRegistrationModal(false);
                  resetFormData();
                  setSelectedEvent(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 p-4 bg-emerald-50 rounded-xl">
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="font-medium text-emerald-800">{selectedEvent?.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="text-emerald-800">{selectedEvent?.time}</span>
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                <p className="text-gray-600">Thank you for registering. We’ll contact you soon.</p>
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
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
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
                    <label className="block text-lg font-medium text-gray-700 mb-3">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="16"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">School/Institution (if applicable)</label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Lincoln High School"
                  />
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
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-xl font-medium text-lg transition-all duration-300"
                  whileHover={{ scale: formStatus !== 'submitting' ? 1.02 : 1 }}
                  whileTap={{ scale: formStatus !== 'submitting' ? 0.98 : 1 }}
                >
                  {formStatus === 'submitting' ? 'Submitting...' : 'Complete Registration'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      )}

    </div>
  );
}

export default EventsPage