import React from "react";
import { motion } from 'framer-motion';
import { Award, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin} from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl"
                >
                  <Award className="text-white w-7 h-7" />
                </motion.div>
                <span className="ml-4 text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">YohanSports</span>
              </div>
              <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                Professional sports training programs for schools, colleges, and individuals. 
                Certified coaches, proven curriculum, and measurable results since 2011.
              </p>
              <div className="flex space-x-6">
                {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, index) => (
                  <motion.a 
                    key={index} 
                    href="#" 
                    className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
                    whileHover={{ y: -5, scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-8 text-emerald-400">Quick Links</h3>
              <ul className="space-y-4">
                {['Explore', 'About', 'Programs', 'Coaches', 'Success', 'Contact'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 5 }}>
                    <button
                      onClick={() => scrollToSection(
                        item === 'Explore' ? 'explore' : 
                        item === 'About' ? 'about' :
                        item === 'Programs' ? 'programs' :
                        item === 'Coaches' ? 'coaches' :
                        item === 'Success' ? 'success' : 'contact',
                        item === 'Explore' ? exploreRef : 
                        item === 'About' ? aboutRef :
                        item === 'Programs' ? programsRef :
                        item === 'Coaches' ? coachesRef :
                        item === 'Success' ? successRef : contactRef
                      )}
                      className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-lg"
                    >
                      {item}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-8 text-emerald-400">Contact Us</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-lg">123 Sports Avenue, Athletic City, AC 12345</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-4 flex-shrink-0" />
                  <span className="text-lg">(123) 456-7890</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-4 flex-shrink-0" />
                  <span className="text-lg">info@yohanSports.com</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-8 text-emerald-400">Newsletter</h3>
              <p className="text-gray-400 mb-6 text-lg">Subscribe for updates and offers</p>
              <form className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-lg">
            <p>© {new Date().getFullYear()} YohanSports. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
}

export default Footer;