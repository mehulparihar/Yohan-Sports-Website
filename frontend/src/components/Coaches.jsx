import React from "react";
import { motion } from "framer-motion";

const COACHES = [
  {
    id: "c1",
    name: "Amit Sharma",
    role: "Head Cricket Coach",
    bio: "Former Ranji Trophy player with 10+ years coaching youth and academy teams to national championships.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200",
    achievements: "Coached 15+ national-level players",
  },
  {
    id: "c2",
    name: "Neha Patil",
    role: "Football Coach",
    bio: "Ex-Indian Women's National Team player focused on grassroots development and technical excellence.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200",
    achievements: "UEFA B License Holder",
  },
  {
    id: "c3",
    name: "Rajiv Mehta",
    role: "Basketball Director",
    bio: "NBA Academy certified coach with experience developing players for collegiate scholarships.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200",
    achievements: "Developed 8 NCAA scholarship recipients",
  },
  {
    id: "c4",
    name: "Priya Desai",
    role: "PE Curriculum Lead",
    bio: "Master's in Sports Science with 12 years designing school PE programs aligned to CBSE & ICSE.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200",
    achievements: "Designed curriculum for 50+ schools",
  },
]

function Coaches() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {COACHES.map((c, index) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="group bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/30 transition-all duration-500"
        >
          <div className="relative mb-5">
            <div className="w-full h-48 rounded-2xl overflow-hidden bg-white/5">
              <img
                src={c.image || "/placeholder.svg"}
                alt={c.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
          </div>
          <div>
            <div className="font-bold text-white text-lg mb-1">{c.name}</div>
            <div className="text-indigo-400 font-medium mb-3">{c.role}</div>
            <div className="text-sm text-white/70 mb-4 leading-relaxed">{c.bio}</div>
            <div className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full inline-block">
              {c.achievements}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Coaches;