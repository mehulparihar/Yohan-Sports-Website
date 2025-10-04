import React from 'react'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("") // Clear error on input
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Mock validation
      if (formData.email === "admin@yohansports.com" && formData.password === "password123") {
        // Redirect or set auth state
        alert("✅ Login successful! Redirecting...")
        window.location.href = "/dashboard" // or use router.push('/dashboard')
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Navbar/>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo & Title */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              YS
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Yohan Sports
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/70">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-black/40 to-black/20 p-8 rounded-3xl border border-white/10 backdrop-blur-sm shadow-xl"
          noValidate
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-all duration-300"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-white/80 text-sm font-medium">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me + Submit */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-500 focus:ring-indigo-400 bg-white/10 border-white/20"
                />
                <span className="text-white/80 text-sm">Remember me</span>
              </label>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </div>
          </div>
        </motion.form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-white/20"></div>
          <div className="px-4 text-white/60 text-sm">OR</div>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Alternative Actions */}
        <div className="text-center space-y-4">
          <p className="text-white/70 text-sm">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-300"
            >
              Create one
            </Link>
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-all duration-300"
              aria-label="Sign in with Google"
            >
              <span className="text-sm">G</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-all duration-300"
              aria-label="Sign in with Microsoft"
            >
              <span className="text-sm">M</span>
            </motion.button>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center text-white/60 text-sm">
          © {new Date().getFullYear()} Yohan Sports. All rights reserved.
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage