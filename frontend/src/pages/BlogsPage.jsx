import React from 'react'
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

// Mock Blog Data (structured like The Sports Gurukul)
const BLOG_POSTS = [
  {
    id: "b1",
    title: "Why Sports Should Be Mandatory in Every School Curriculum",
    excerpt: "Physical education isn't just about fitness—it builds discipline, teamwork, and mental resilience from an early age.",
    date: "2025-04-12",
    category: "education",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1549060279-7e16338922a7?auto=format&fit=crop&w=800",
    author: "Priya Desai",
    authorRole: "PE Curriculum Lead",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100",
  },
  {
    id: "b2",
    title: "From Backyard to National Team: A Parent’s Guide to Nurturing Talent",
    excerpt: "How to support your child’s athletic journey without pressure—and when to seek professional coaching.",
    date: "2025-03-28",
    category: "parents",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1518608055487-1baca02035f5?auto=format&fit=crop&w=800",
    author: "Amit Sharma",
    authorRole: "Head Cricket Coach",
    authorImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=100",
  },
  {
    id: "b3",
    title: "The Science Behind Youth Sports Development",
    excerpt: "How age-appropriate training, recovery, and skill progression prevent burnout and maximize potential.",
    date: "2025-03-15",
    category: "coaching",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1546551373-84025920336?auto=format&fit=crop&w=800",
    author: "Dr. Meera Kapoor",
    authorRole: "Sports Scientist",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100",
  },
  {
    id: "b4",
    title: "How We Transformed PE at St. Xavier’s: A Case Study",
    excerpt: "Partnering with schools to revamp physical education—results, challenges, and lessons learned.",
    date: "2025-02-20",
    category: "schools",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800",
    author: "Rajiv Mehta",
    authorRole: "Program Director",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100",
  },
  {
    id: "b5",
    title: "5 Myths About Youth Sports (Debunked by Coaches)",
    excerpt: "“Early specialization is best,” “More practice = better results,” and other common misconceptions.",
    date: "2025-02-05",
    category: "coaching",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800",
    author: "Neha Patil",
    authorRole: "Football Coach",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100",
  },
  {
    id: "b6",
    title: "Building Character Through Team Sports",
    excerpt: "How cricket, football, and basketball teach leadership, empathy, and resilience beyond the field.",
    date: "2025-01-18",
    category: "values",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800",
    author: "Yohan Singh",
    authorRole: "Founder",
    authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100",
  },
]

const CATEGORIES = [
  { id: "all", name: "All Articles", icon: "📰" },
  { id: "education", name: "For Schools", icon: "🏫" },
  { id: "parents", name: "For Parents", icon: "👨‍👩‍👧‍👦" },
  { id: "coaching", name: "Coaching Insights", icon: "👨‍🏫" },
  { id: "schools", name: "School Partnerships", icon: "🤝" },
  { id: "values", name: "Character & Values", icon: "❤️" },
]

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const BlogsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPost, setSelectedPost] = useState(null)

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen antialiased">
        <Navbar/>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-indigo-500/20 rounded-full border border-white/20 text-blue-300 text-sm font-medium mb-6"
          >
            📝 Insights & Inspiration
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight"
          >
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Thoughts on Sports,
            </span>
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mt-4">
              Education & Growth
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mt-8 leading-relaxed"
          >
            Expert perspectives, success stories, and practical advice for parents, schools, and young athletes.
          </motion.p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 flex-1">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </motion.button>
              ))}
            </div>
            {/* Search */}
            <div className="md:w-80">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No articles found</h3>
              <p className="text-white/70">Try a different category or search term.</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-500 overflow-hidden"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative rounded-2xl overflow-hidden mb-5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-500 to-cyan-400 text-white">
                      {CATEGORIES.find(c => c.id === post.category)?.name || "Article"}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm text-indigo-300 font-medium">{formatDate(post.date)} • {post.readTime}</div>
                    <h3 className="text-xl font-bold mt-1 group-hover:text-indigo-300 transition-colors duration-300 cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-medium text-sm">{post.author}</div>
                        <div className="text-white/60 text-xs">{post.authorRole}</div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-xl text-white/80 mb-8">
            Get the latest insights on youth sports, coaching, and school partnerships.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-indigo-400"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold hover:shadow-lg transition-all"
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </section>

      {/* Post Modal (Optional: for full article view) */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-60 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-black/60 to-black/40 border border-white/20 backdrop-blur-xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="prose prose-invert max-w-none">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={selectedPost.authorImage}
                    alt={selectedPost.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-bold">{selectedPost.author}</div>
                    <div className="text-white/70 text-sm">{selectedPost.authorRole} • {formatDate(selectedPost.date)}</div>
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
                <p className="text-xl text-white/80 mb-6">{selectedPost.excerpt}</p>
                <div className="space-y-4 text-white/80">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/20 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold"
                    onClick={() => alert("Full blog integration coming soon!")}
                  >
                    Read Full Article
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer CTA */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center text-white/60 text-sm">
          © {new Date().getFullYear()} Yohan Sports. All rights reserved.
        </div>
      </footer>
      <Footer/>
    </div>
  )
}

export default BlogsPage