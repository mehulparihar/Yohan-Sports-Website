import React from "react";
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

function ProgramsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PROGRAMS.map((p, index) => (
        <motion.article
          key={p.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{
            y: -10,
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
          className="group bg-gradient-to-br from-black/50 to-black/30 p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/30 hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
        >
          {/* Background image overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            style={{ backgroundImage: `url(${p.image})` }}
          ></div>
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-white/5 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-transparent to-white/5 rounded-tr-full"></div>
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl shadow-lg`}
              >
                {p.icon}
              </div>
              <div className="flex-1">
                <div className="font-bold text-white text-lg mb-1">{p.title}</div>
                <div className="text-sm text-white/70 leading-relaxed">{p.desc}</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <div className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">Age: {p.age}</div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-indigo-400 hover:text-indigo-300 font-medium text-sm flex items-center transition-colors duration-300"
              >
                Learn more →
              </motion.button>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  )
}

export default ProgramsGrid;