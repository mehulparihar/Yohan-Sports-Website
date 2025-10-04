import React, { useState } from "react";
import { motion } from "framer-motion";

const PROGRAMS = [
  {
    id: "p1",
    title: "In-School Physical Education",
    desc: "Comprehensive curriculum-aligned PE programs designed for K-12 schools with certified instructors.",
    age: "6–17",
    icon: "🎓",
    color: "from-blue-500 to-cyan-400",
    image: "https://images.unsplash.com/photo-1549060279-7e16338922a7?auto=format&fit=crop&w=400",
  },
  {
    id: "p2",
    title: "Cricket Academy",
    desc: "Professional skill development, match simulations, and tournament preparation with ex-international coaches.",
    age: "8–18",
    icon: "🏏",
    color: "from-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1518608055487-1baca02035f5?auto=format&fit=crop&w=400",
  },
  {
    id: "p3",
    title: "Football Training",
    desc: "Tactical & technical mastery programs with UEFA-certified coaches and performance analytics.",
    age: "6–18",
    icon: "⚽",
    color: "from-green-500 to-emerald-400",
    image: "https://images.unsplash.com/photo-1546551373-84025920336?auto=format&fit=crop&w=400",
  },
  {
    id: "p4",
    title: "Basketball Academy",
    desc: "Elite court skills, strength conditioning, and game IQ development with NCAA-style training.",
    age: "8–18",
    icon: "🏀",
    color: "from-yellow-500 to-orange-400",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=400",
  },
]

function EnrollmentForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    program: PROGRAMS[0].id,
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    alert(
      `Thank you, ${form.name}! We'll contact you soon about ${PROGRAMS.find((p) => p.id === form.program)?.title}.`,
    )
    onSubmit && onSubmit(form)
    setIsSubmitting(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-3xl border border-white/10 backdrop-blur-sm shadow-xl"
      aria-label="Enrollment form"
    >
      <h4 className="text-white font-bold text-xl mb-4 flex items-center">
        <span className="mr-2">📝</span> Enquire / Enroll Today
      </h4>
      <div className="space-y-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-1">Full Name</label>
          <input
            className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none transition-all duration-300"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-1">Phone</label>
            <input
              className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none transition-all duration-300"
              placeholder="+91 XXXX-XXXXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none transition-all duration-300"
              placeholder="your.email@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-white/80 text-sm font-medium mb-1">Program of Interest</label>
          <select
            className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white focus:border-indigo-400 focus:outline-none transition-all duration-300"
            value={form.program}
            onChange={(e) => setForm({ ...form, program: e.target.value })}
          >
            {PROGRAMS.map((p) => (
              <option key={p.id} value={p.id} className="bg-slate-800">
                {p.title} ({p.age})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-white/80 text-sm font-medium mb-1">Message (Optional)</label>
          <textarea
            rows="3"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-indigo-400 focus:outline-none transition-all duration-300 resize-none"
            placeholder="Tell us more about your goals or questions..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            "🚀 Request Callback"
          )}
        </motion.button>
      </div>
    </form>
  )
}

export default EnrollmentForm;