'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Users, Award, Calendar, Send, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useStore from '../stores';

// Mock data
const contactInfo = {
  address: "123 Sports Avenue, Athletic City, AC 12345",
  phone: "(123) 456-7890",
  email: "info@yohansports.com",
  hours: [
    { day: "Monday - Friday", time: "8:00 AM - 8:00 PM" },
    { day: "Saturday", time: "9:00 AM - 6:00 PM" },
    { day: "Sunday", time: "10:00 AM - 4:00 PM" }
  ]
};

const teamMembers = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    role: "Founder & CEO",
    email: "rajesh@yohansports.com",
    phone: "(123) 456-7891",
    image: "https://placehold.co/400x400/059669/white?text=RK"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Director of Operations",
    email: "priya@yohansports.com",
    phone: "(123) 456-7892",
    image: "https://placehold.co/400x400/dc2626/white?text=PS"
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Head of Coaching",
    email: "vikram@yohansports.com",
    phone: "(123) 456-7893",
    image: "https://placehold.co/400x400/7c3aed/white?text=VS"
  },
  {
    id: 4,
    name: "Ananya Patel",
    role: "Academy Director",
    email: "ananya@yohansports.com",
    phone: "(123) 456-7894",
    image: "https://placehold.co/400x400/0891b2/white?text=AP"
  }
];

const faqs = [
  {
    question: "What are your office hours?",
    answer: "We're open Monday to Friday from 8:00 AM to 8:00 PM, Saturday from 9:00 AM to 6:00 PM, and Sunday from 10:00 AM to 4:00 PM."
  },
  {
    question: "How can I schedule a trial session?",
    answer: "You can schedule a trial session by filling out the contact form on this page, calling us directly, or emailing us with your preferred date and time."
  },
  {
    question: "Do you offer programs for individuals?",
    answer: "Yes, we offer personalized one-on-one coaching sessions for individuals of all ages and skill levels."
  },
  {
    question: "What sports do you offer training for?",
    answer: "We currently offer training programs for cricket, football, basketball, swimming, tennis, and athletics."
  },
  {
    question: "Are your coaches certified?",
    answer: "Yes, all our coaches are certified professionals with extensive experience in their respective sports."
  },
  {
    question: "Do you provide equipment?",
    answer: "For school and college programs, we provide all necessary equipment. Individual trainees may need to bring their own gear depending on the sport."
  }
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    type: 'General',
    message: '',
    privacy: false
  });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [activeFaq, setActiveFaq] = useState(null);

  const { createEnquiry } = useStore();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        subject: formData.subject ? formData.subject.toLowerCase() : "",
        message: formData.message
      };

      // createEnquiry returns { ok: true/false, data or error } per your slice
      const resp = await createEnquiry(payload);
      if (resp && resp.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          type: 'individual',
          subject: '',
          message: ''
        });
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
              Get in <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Touch</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Have questions about our programs? Want to schedule a trial session? 
              Our team is here to help you every step of the way.
            </motion.p>
          </div>
        </div>
      </section>


      {/* Contact Form */}
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
                    Please try again or contact us directly at {contactInfo.email}
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

      {/* Team Directory */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with our leadership team directly
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-emerald-200 transition-all duration-500 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{member.phone}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our programs and services
            </p>
          </motion.div>

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
        </div>
      </section>

      {/* Location Map Placeholder */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find our main academy location
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-gray-200 border-2 border-dashed rounded-3xl w-full h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Interactive Map Coming Soon</p>
              <p className="text-gray-500 mt-2">123 Sports Avenue, Athletic City</p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default ContactUs