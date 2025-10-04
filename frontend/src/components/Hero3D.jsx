import React, { useState } from "react";
import { motion } from "framer-motion";


function Hero3D({ onItemClick, programs }) {
  const [paused, setPaused] = useState(false)
  const isSmall = typeof window !== "undefined" && window.innerWidth < 768

  // Mobile: clean grid
  if (isSmall) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-black/20 to-transparent p-6">
        <div className="text-center text-white/90 max-w-md w-full">
          <div className="text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent">
            Yohan Sports
          </div>
          <p className="text-lg mb-6">Academy • School Programs • Coaching</p>
          <div className="grid grid-cols-2 gap-3">
            {programs.map((program, index) => (
              <motion.button
                key={program.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl bg-gradient-to-br ${program.color} text-white font-semibold text-sm shadow-lg`}
                onClick={() => onItemClick(program)}
              >
                <span className="text-2xl block mb-1">{program.icon}</span>
                {program.title.split(" ")[0]}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-[600px] md:h-[700px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900/40 via-black/20 to-slate-800/40 border border-white/10 shadow-2xl">
      {/* Animated radial pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.6), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Program cards in orbit — no GSAP, no Three.js, pure Framer Motion */}
      <div className="absolute inset-0 flex items-center justify-center">
        {programs.map((program, index) => {
          const total = programs.length
          const angle = (index / total) * Math.PI * 2
          const radius = paused ? 150 : 160
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <motion.div
              key={program.id}
              className="absolute origin-center cursor-pointer"
              style={{ x, y }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.2 + index * 0.15,
                type: "spring",
                stiffness: 280,
                damping: 20,
              }}
              whileHover={{
                scale: 1.35,
                y: y - 60,
                zIndex: 30,
                transition: { type: "spring", stiffness: 400, damping: 18 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onItemClick(program)}
            >
              <div
                className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center text-3xl shadow-xl border-2 backdrop-blur-md bg-gradient-to-br ${program.color} border-white/30`}
              >
                {program.icon}
              </div>
              <motion.div
                className="mt-3 text-white text-center font-medium text-sm max-w-[130px] leading-tight whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.15 }}
              >
                {program.title}
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Center title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center"
      >
        <div className="text-2xl font-bold text-white mb-1">Yohan Sports</div>
        <div className="text-xs text-white/60">Click a program to explore</div>
      </motion.div>

      {/* Soft glow */}
      <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 bg-gradient-to-r from-indigo-500 via-cyan-400 to-yellow-400 blur-3xl" />

      {/* Controls */}
      <div className="absolute left-6 bottom-6 z-40 flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-medium shadow-lg"
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? "▶️ Resume" : "⏸️ Pause"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/20"
          onClick={() => alert("Explore our programs to learn more!")}
        >
          ℹ️ Learn More
        </motion.button>
      </div>

      {/* Stats */}
      {/* <div className="absolute right-6 top-6 z-40 grid grid-cols-2 gap-3">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center"
          >
            <div className="text-2xl font-bold text-white">{stat.number}</div>
            <div className="text-xs text-white/70">{stat.label}</div>
          </motion.div>
        ))}
      </div> */}
    </div>
  )
}

export default Hero3D;