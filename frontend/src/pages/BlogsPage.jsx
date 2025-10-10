'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Calendar, Users, Award, TrendingUp, BookOpen, Clock, Tag, User, MessageCircle, Share2, Search, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "The Science Behind Effective Sports Training",
    excerpt: "Discover how modern sports science is revolutionizing athlete development and performance optimization.",
    content: "Sports training has evolved significantly over the past decade, with scientific research playing a crucial role in optimizing athlete performance...",
    author: "Dr. Rajesh Kumar",
    authorRole: "Founder & CEO",
    authorImage: "https://placehold.co/400x400/059669/white?text=RK",
    date: "May 15, 2024",
    readTime: "8 min read",
    category: "Sports Science",
    tags: ["Training", "Performance", "Science"],
    image: "https://placehold.co/800x400/059669/white?text=Sports+Science",
    featured: true,
    views: 2450,
    comments: 32
  },
  {
    id: 2,
    title: "5 Essential Nutrition Tips for Young Athletes",
    excerpt: "Proper nutrition is crucial for young athletes. Here are 5 evidence-based tips to optimize their performance and recovery.",
    content: "Nutrition plays a vital role in athletic performance, especially for growing athletes who need proper fuel for both sports and development...",
    author: "Priya Sharma",
    authorRole: "Nutrition Specialist",
    authorImage: "https://placehold.co/400x400/dc2626/white?text=PS",
    date: "May 10, 2024",
    readTime: "6 min read",
    category: "Nutrition",
    tags: ["Nutrition", "Youth", "Health"],
    image: "https://placehold.co/800x400/dc2626/white?text=Nutrition+Tips",
    featured: false,
    views: 1890,
    comments: 24
  },
  {
    id: 3,
    title: "Building Mental Resilience in Competitive Sports",
    excerpt: "Mental toughness is often the difference between good and great athletes. Learn strategies to build psychological resilience.",
    content: "In high-pressure competitive environments, mental resilience can be the deciding factor between victory and defeat...",
    author: "Vikram Singh",
    authorRole: "Sports Psychologist",
    authorImage: "https://placehold.co/400x400/7c3aed/white?text=VS",
    date: "May 5, 2024",
    readTime: "10 min read",
    category: "Mental Training",
    tags: ["Mental Toughness", "Psychology", "Competition"],
    image: "https://placehold.co/800x400/7c3aed/white?text=Mental+Resilience",
    featured: false,
    views: 2100,
    comments: 41
  },
  {
    id: 4,
    title: "How Technology is Transforming Sports Coaching",
    excerpt: "From wearable tech to AI analytics, discover how technology is revolutionizing the way coaches train athletes.",
    content: "The integration of technology in sports coaching has opened up new possibilities for performance analysis and personalized training...",
    author: "Ananya Patel",
    authorRole: "Technology Director",
    authorImage: "https://placehold.co/400x400/0891b2/white?text=AP",
    date: "April 28, 2024",
    readTime: "7 min read",
    category: "Technology",
    tags: ["Technology", "Coaching", "Innovation"],
    image: "https://placehold.co/800x400/0891b2/white?text=Sports+Tech",
    featured: false,
    views: 1650,
    comments: 18
  },
  {
    id: 5,
    title: "The Importance of Rest and Recovery in Athletic Training",
    excerpt: "Rest is not the opposite of training—it's a crucial part of it. Learn why recovery matters and how to optimize it.",
    content: "Many athletes focus solely on training intensity while neglecting the equally important aspect of recovery and rest...",
    author: "Dr. Rajesh Kumar",
    authorRole: "Founder & CEO",
    authorImage: "https://placehold.co/400x400/059669/white?text=RK",
    date: "April 22, 2024",
    readTime: "5 min read",
    category: "Recovery",
    tags: ["Recovery", "Rest", "Performance"],
    image: "https://placehold.co/800x400/f59e0b/white?text=Recovery",
    featured: false,
    views: 1420,
    comments: 27
  },
  {
    id: 6,
    title: "Developing Leadership Skills Through Team Sports",
    excerpt: "Team sports provide a unique environment for developing leadership qualities that extend beyond the playing field.",
    content: "Leadership development through sports goes beyond just being a team captain. It encompasses communication, decision-making, and responsibility...",
    author: "Priya Sharma",
    authorRole: "Leadership Coach",
    authorImage: "https://placehold.co/400x400/dc2626/white?text=PS",
    date: "April 15, 2024",
    readTime: "9 min read",
    category: "Leadership",
    tags: ["Leadership", "Team Sports", "Development"],
    image: "https://placehold.co/800x400/10b981/white?text=Leadership",
    featured: false,
    views: 1780,
    comments: 35
  }
];

const categories = [
  { name: "Sports Science", count: 12, icon: Award },
  { name: "Nutrition", count: 8, icon: TrendingUp },
  { name: "Mental Training", count: 15, icon: Users },
  { name: "Technology", count: 6, icon: BookOpen },
  { name: "Recovery", count: 10, icon: Clock },
  { name: "Leadership", count: 9, icon: User }
];

const popularTags = ["Training", "Performance", "Nutrition", "Youth", "Mental Toughness", "Technology", "Recovery", "Leadership", "Competition", "Health"];



const BlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

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
              Sports <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Insights</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Expert articles, research insights, and practical tips on sports training, 
              nutrition, mental conditioning, and athlete development.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Blog Stats */}
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
              Our Knowledge Hub
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sharing expertise and insights from our team of sports professionals
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
              { number: 50, label: "Articles Published", icon: BookOpen },
              { number: 15, label: "Expert Contributors", icon: Users },
              { number: 25000, label: "Monthly Readers", icon: TrendingUp },
              { number: 8, label: "Topic Categories", icon: Award }
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

      {/* Featured Post */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Article
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our most popular and insightful content
            </p>
          </motion.div>

          {blogPosts.filter(post => post.featured)[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-96 lg:h-auto">
                  <img 
                    src={blogPosts.filter(post => post.featured)[0].image} 
                    alt={blogPosts.filter(post => post.featured)[0].title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 text-white">
                  <div className="mb-4">
                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-bold">
                      Featured
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{blogPosts.filter(post => post.featured)[0].title}</h3>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-6">
                      <User className="w-4 h-4 mr-2" />
                      <span>{blogPosts.filter(post => post.featured)[0].author}</span>
                    </div>
                    <div className="flex items-center mr-6">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{blogPosts.filter(post => post.featured)[0].date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{blogPosts.filter(post => post.featured)[0].readTime}</span>
                    </div>
                  </div>
                  <p className="mb-8 opacity-90 leading-relaxed text-lg">
                    {blogPosts.filter(post => post.featured)[0].excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {blogPosts.filter(post => post.featured)[0].tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Full Article
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section> */}

      {/* Blog Filters and Search */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
                    selectedCategory === category.name
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                    <category.icon className="text-emerald-600 w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm">{category.name}</span>
                  <div className="text-xs text-gray-500 mt-1">{category.count} articles</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Popular Tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Tags</h3>
            <div className="flex flex-wrap gap-3">
              {popularTags.map((tag, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSearchTerm(tag)}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-700 rounded-full font-medium transition-all duration-300"
                >
                  #{tag}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          {currentPosts.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                        {post.category}
                      </span>
                      <div className="ml-auto flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <img 
                          src={post.authorImage} 
                          alt={post.author} 
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author}</p>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.views}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </div>
                      </div>
                      
                      <motion.button
                        className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center text-sm"
                        whileHover={{ x: 5 }}
                      >
                        Read More
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Articles Found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mt-12 space-x-2"
            >
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 border border-gray-300'
                }`}
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 border border-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 border border-gray-300'
                }`}
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      </section>
        
      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with Our Insights
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Subscribe to our newsletter and receive the latest articles, research, 
              and expert tips directly in your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <motion.button
                type="submit"
                className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
            
            <p className="text-sm opacity-75 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default BlogsPage