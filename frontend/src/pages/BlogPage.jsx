'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Users, Award, TrendingUp, BookOpen, GraduationCap, Target, Heart,
  ChevronLeft, Clock, Tag, User, MessageCircle, Star, Share2, Linkedin, Twitter, Facebook,
  Mail, Copy, Check, ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useStore from '../stores';
import { Link, useParams } from "react-router-dom";


const BlogPage = () => {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // Get blogs from Zustand store
  const { blogs, fetchBlogs } = useStore();

  // Find the current blog post
  const currentPost = blogs.list.find(post =>
    post.slug === slug ||
    (typeof post._id === 'string' && post._id === slug) ||
    post.id === slug
  );

  // Fetch blogs if not loaded
  useEffect(() => {
    if (blogs.list.length === 0) {
      fetchBlogs();
    }
  }, [fetchBlogs, blogs.list.length, slug]);

  // Handle share functionality
  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = currentPost?.title || 'YohanSports Blog Post';

    try {
      if (platform === 'copy') {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else if (platform === 'email') {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
      } else if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
      } else if (platform === 'linkedin') {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      }
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  // Handle reading time calculation
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading state
  if (blogs.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (blogs.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load article</h3>
          <p className="text-gray-600 mb-6">{blogs.error}</p>
          <button
            onClick={() => fetchBlogs()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Not found state
  if (!currentPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Article Not Found</h3>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Extract content safely
  const content = currentPost.content || currentPost.excerpt || '';
  const readingTime = currentPost.readTime || `${calculateReadingTime(content)} min read`;

  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero/Header Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back to Blog */}
            <motion.button
              onClick={() => window.history.back()}
              className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6 group"
              whileHover={{ x: -5 }}
            >
              <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Articles
            </motion.button>

            {/* Category Tag */}
            <div className="mb-4">
              <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                {currentPost.category || 'General'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {currentPost.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span className="font-medium">
                  {currentPost.authorName || 'YohanSports Team'}
                </span>
              </div>

              {currentPost.date && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{currentPost.date}</span>
                </div>
              )}

              {currentPost.publishedAt && !currentPost.date && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(currentPost.publishedAt)}</span>
                </div>
              )}

              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{readingTime}</span>
              </div>

              {currentPost.views > 0 && (
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>{currentPost.views.toLocaleString()} views</span>
                </div>
              )}
            </div>

            {/* Share Button */}
            <div className="mt-6">
              <button
                onClick={() => setShowShare(!showShare)}
                className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </button>

              <AnimatePresence>
                {showShare && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-4 top-24 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50"
                  >
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShare('twitter')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="Share on Twitter"
                      >
                        <Twitter className="w-5 h-5 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="Share on LinkedIn"
                      >
                        <Linkedin className="w-5 h-5 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="Share on Facebook"
                      >
                        <Facebook className="w-5 h-5 text-blue-800" />
                      </button>
                      <button
                        onClick={() => handleShare('email')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="Share via Email"
                      >
                        <Mail className="w-5 h-5 text-red-500" />
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="Copy Link"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {(currentPost.thumbnail?.url || currentPost.images?.[0]?.url) && (
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src={currentPost.thumbnail?.url || currentPost.images?.[0]?.url}
                alt={currentPost.title}
                className="w-full h-96 object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Author Bio */}
            {(currentPost.authorName || currentPost.authorImage || currentPost.authorRole) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gray-50 rounded-2xl p-8 mb-12"
              >
                <div className="flex items-center mb-4">
                  {currentPost.authorImage ? (
                    <img
                      src={currentPost.authorImage}
                      alt={currentPost.authorName}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                      <User className="w-8 h-8 text-emerald-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {currentPost.authorName || 'YoahnSports Team'}
                    </h3>
                    {currentPost.authorRole && (
                      <p className="text-gray-600">{currentPost.authorRole}</p>
                    )}
                  </div>
                </div>
                {currentPost.authorBio && (
                  <p className="text-gray-700">{currentPost.authorBio}</p>
                )}
              </motion.div>
            )}

            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="prose prose-lg max-w-none"
            >
              {content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </motion.article>

            {/* Tags */}
            {currentPost.tags && currentPost.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {currentPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Comments ({currentPost.comments || 0})
                </h3>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium">
                  Add Comment
                </button>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-600 text-center py-8">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Related Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover more insights and expert advice
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {blogs.list
              .filter(post =>
                post.id !== currentPost.id &&
                post._id !== currentPost._id &&
                post.category === currentPost.category
              )
              .slice(0, 3)
              .map((post, index) => (
                <motion.article
                  key={post.id || post._id || index}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    }
                  }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.thumbnail?.url || post.images?.[0]?.url || "https://placehold.co/600x400/059669/white?text=Blog+Post"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                        {post.category || 'General'}
                      </span>
                      <div className="ml-auto flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime || '5 min read'}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt || post.content?.substring(0, 100) + '...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {post.authorImage && (
                          <img
                            src={post.authorImage}
                            alt={post.authorName}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                        )}
                        <span className="text-sm text-gray-700">
                          {post.authorName || 'YohanSports Team'}
                        </span>
                      </div>
                      <Link
                        to={`/blogs/${post.slug || post._id}`}
                        className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center text-sm"
                      >
                        Read More
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default BlogPage;