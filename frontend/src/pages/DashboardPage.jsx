import React from 'react'
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const MOCK_DATA = {
  coaches: [
    {
      id: "c1",
      name: "Amit Sharma",
      role: "Head Cricket Coach",
      bio: "Former Ranji Trophy player...",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200",
      achievements: "Coached 15+ national-level players",
    },
  ],
  events: [
    {
      id: "e1",
      title: "🏆 Inter-school Tournament Finals",
      date: "2025-10-04",
      location: "Wadala Stadium, Mumbai",
      category: "tournament",
    },
  ],
  programs: [
    {
      id: "p1",
      title: "In-School Physical Education",
      desc: "Comprehensive curriculum-aligned PE programs...",
      age: "6–17",
      icon: "🎓",
      color: "from-blue-500 to-cyan-400",
    },
  ],
  venues: [
    {
      id: "v1",
      name: "Wadala – Mumbai",
      address: "Bhakti Park, Wadala",
      phone: "+91 9004-200-200",
    },
  ],
  enquiries: [
    {
      id: "enq1",
      name: "Rahul Mehta",
      email: "rahul@school.edu",
      phone: "+91 9876543210",
      program: "Cricket Academy",
      message: "Interested in school partnership.",
      status: "new",
    },
  ],
}

const CATEGORIES = ["coaches", "events", "programs", "venues", "enquiries"]
const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("coaches")
  const [data, setData] = useState(MOCK_DATA)
  const [editingItem, setEditingItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newItem, setNewItem] = useState({})

  // Simulate API save
  const saveItem = (item, isNew = false) => {
    const updated = { ...data }
    if (isNew) {
      item.id = `${Date.now()}`
      updated[activeTab].push(item)
    } else {
      const index = updated[activeTab].findIndex((i) => i.id === item.id)
      if (index !== -1) updated[activeTab][index] = item
    }
    setData(updated)
    setIsModalOpen(false)
    setEditingItem(null)
    setNewItem({})
  }

  const deleteItem = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const updated = { ...data }
      updated[activeTab] = updated[activeTab].filter((item) => item.id !== id)
      setData(updated)
    }
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setNewItem({ ...item })
    setIsModalOpen(true)
  }

  const openCreate = () => {
    setEditingItem(null)
    setNewItem({})
    setIsModalOpen(true)
  }

  // Render form fields based on active tab
  const renderFormFields = () => {
    switch (activeTab) {
      case "coaches":
        return (
          <>
            <input
              type="text"
              placeholder="Name"
              value={newItem.name || ""}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              required
            />
            <input
              type="text"
              placeholder="Role"
              value={newItem.role || ""}
              onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              required
            />
            <textarea
              placeholder="Bio"
              value={newItem.bio || ""}
              onChange={(e) => setNewItem({ ...newItem, bio: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              rows="3"
            />
            <input
              type="text"
              placeholder="Achievements"
              value={newItem.achievements || ""}
              onChange={(e) => setNewItem({ ...newItem, achievements: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newItem.image || ""}
              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
            />
          </>
        )
      case "events":
        return (
          <>
            <input
              type="text"
              placeholder="Title"
              value={newItem.title || ""}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              required
            />
            <input
              type="date"
              value={newItem.date || ""}
              onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newItem.location || ""}
              onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              required
            />
            <select
              value={newItem.category || ""}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
            >
              <option value="">Select Category</option>
              <option value="tournament">Tournament</option>
              <option value="workshop">Workshop</option>
              <option value="scholarship">Scholarship</option>
            </select>
          </>
        )
      case "programs":
        return (
          <>
            <input
              type="text"
              placeholder="Title"
              value={newItem.title || ""}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              required
            />
            <textarea
              placeholder="Description"
              value={newItem.desc || ""}
              onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              rows="3"
            />
            <input
              type="text"
              placeholder="Age Group (e.g., 6–17)"
              value={newItem.age || ""}
              onChange={(e) => setNewItem({ ...newItem, age: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
            />
            <input
              type="text"
              placeholder="Icon (e.g., 🏏)"
              value={newItem.icon || ""}
              onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
            />
            <input
              type="text"
              placeholder="Color (e.g., from-blue-500 to-cyan-400)"
              value={newItem.color || ""}
              onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
            />
          </>
        )
      case "venues":
        return (
          <>
            <input
              type="text"
              placeholder="Name"
              value={newItem.name || ""}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={newItem.address || ""}
              onChange={(e) => setNewItem({ ...newItem, address: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={newItem.phone || ""}
              onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
            />
          </>
        )
      case "enquiries":
        return (
          <>
            <input
              type="text"
              placeholder="Name"
              value={newItem.name || ""}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newItem.email || ""}
              onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newItem.phone || ""}
              onChange={(e) => setNewItem({ ...newItem, phone: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
            />
            <input
              type="text"
              placeholder="Program"
              value={newItem.program || ""}
              onChange={(e) => setNewItem({ ...newItem, program: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
            />
            <textarea
              placeholder="Message"
              value={newItem.message || ""}
              onChange={(e) => setNewItem({ ...newItem, message: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50"
              rows="3"
            />
            <select
              value={newItem.status || "new"}
              onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </>
        )
      default:
        return null
    }
  }

  const renderTable = () => {
    const items = data[activeTab]
    if (!items || items.length === 0) {
      return (
        <div className="text-center py-12 text-white/60">
          No {activeTab} found. <button onClick={openCreate} className="text-indigo-400 hover:underline">Add one?</button>
        </div>
      )
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-white/20">
              {activeTab === "coaches" && <th className="py-3 text-left">Name</th>}
              {activeTab === "events" && <th className="py-3 text-left">Event</th>}
              {activeTab === "programs" && <th className="py-3 text-left">Program</th>}
              {activeTab === "venues" && <th className="py-3 text-left">Venue</th>}
              {activeTab === "enquiries" && <th className="py-3 text-left">Name / Email</th>}
              <th className="py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-4">
                  {activeTab === "coaches" && (
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                      )}
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-white/60">{item.role}</div>
                      </div>
                    </div>
                  )}
                  {activeTab === "events" && (
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-white/60">{item.date} • {item.location}</div>
                    </div>
                  )}
                  {activeTab === "programs" && (
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-white/60">{item.age}</div>
                    </div>
                  )}
                  {activeTab === "venues" && (
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-white/60">{item.address}</div>
                    </div>
                  )}
                  {activeTab === "enquiries" && (
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-white/60">{item.email} • {item.status}</div>
                    </div>
                  )}
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="px-3 py-1 bg-indigo-600/30 text-indigo-300 rounded-lg text-sm hover:bg-indigo-600/50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="px-3 py-1 bg-red-600/30 text-red-300 rounded-lg text-sm hover:bg-red-600/50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-white/70">Manage coaches, events, programs, venues, and enquiries</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Coaches", value: data.coaches.length },
          { label: "Events", value: data.events.length },
          { label: "Programs", value: data.programs.length },
          { label: "Venues", value: data.venues.length },
          { label: "Enquiries", value: data.enquiries.length },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gradient-to-br from-black/40 to-black/20 p-4 rounded-2xl border border-white/10 backdrop-blur-sm text-center"
          >
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-white/70">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                : "bg-white/10 text-white/80 hover:bg-white/20"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex justify-end mb-6">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={openCreate}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium shadow-lg hover:shadow-xl"
        >
          ➕ Add {activeTab.slice(0, -1)}
        </motion.button>
      </div>

      {/* Table */}
      <div className="bg-gradient-to-br from-black/40 to-black/20 p-6 rounded-3xl border border-white/10 backdrop-blur-sm shadow-xl">
        {renderTable()}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-gradient-to-br from-black/60 to-black/40 border border-white/20 rounded-3xl p-6 backdrop-blur-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {editingItem ? "Edit" : "Add"} {activeTab.slice(0, -1)}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  saveItem(newItem, !editingItem)
                }}
                className="space-y-4"
              >
                {renderFormFields()}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium"
                  >
                    {editingItem ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DashboardPage