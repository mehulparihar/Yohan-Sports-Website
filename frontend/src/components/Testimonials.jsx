import React from "react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    id: "t1",
    quote: "The Gurukul transformed our school's PE program. Student participation increased by 75% in just one year!",
    author: "Principal Mehta, St. Xavier's School",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100",
  },
  {
    id: "t2",
    quote:
      "My son went from never touching a cricket bat to representing our state in under 18 months. Incredible coaching!",
    author: "Mrs. Kapoor, Parent",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100",
  },
]

function Testimonials() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {TESTIMONIALS.map((t, index) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="bg-gradient-to-br from-black/30 to-black/10 p-6 rounded-3xl border border-white/10 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
              <img src={t.avatar || "/placeholder.svg"} alt={t.author} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-xl mb-3 text-white/80 relative">
                <span className="absolute -left-6 -top-2 text-4xl text-white/20">"</span>
                {t.quote}
                <span className="absolute -right-6 -bottom-4 text-4xl text-white/20">"</span>
              </div>
              <div className="font-semibold text-white">{t.author}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Testimonials;