'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, Award, MapPin, Mail, Plus, Edit3, Trash2, Eye, Search, Filter, X, Save, UserPlus, CalendarDays, Building, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

// Mock data
const mockCoaches = [
  { id: 1, name: "Alex Johnson", role: "Head Cricket Coach", email: "alex@sportedu.com", phone: "1234567890", specialties: ["Cricket", "Mental Conditioning"], image: "https://placehold.co/100x100/059669/white?text=AJ" },
  { id: 2, name: "Sarah Williams", role: "Football Director", email: "sarah@sportedu.com", phone: "1234567891", specialties: ["Football", "Youth Development"], image: "https://placehold.co/100x100/dc2626/white?text=SW" },
  { id: 3, name: "Michael Chen", role: "Basketball Coach", email: "michael@sportedu.com", phone: "1234567892", specialties: ["Basketball", "Game Strategy"], image: "https://placehold.co/100x100/7c3aed/white?text=MC" }
];

const mockEvents = [
  { id: 1, title: "Annual Sports Championship", date: "2024-06-15", location: "Central Sports Complex", category: "Tournament", status: "upcoming" },
  { id: 2, title: "Summer Sports Camp", date: "2024-07-01", location: "SportEdu Academy", category: "Camp", status: "upcoming" },
  { id: 3, title: "Coaching Workshop", date: "2024-08-05", location: "Training Center", category: "Workshop", status: "upcoming" }
];

const mockPrograms = [
  { id: 1, name: "Cricket Academy", duration: "Weekly/Monthly", price: 8000, category: "Sports", status: "active" },
  { id: 2, name: "Football Training", duration: "Term-based", price: 12000, category: "Sports", status: "active" },
  { id: 3, name: "Swimming Excellence", duration: "Session-based", price: 5000, category: "Aquatic", status: "active" }
];

const mockVenues = [
  { id: 1, name: "Main Sports Complex", address: "123 Sports Avenue", capacity: 500, facilities: ["Cricket", "Football", "Basketball"] },
  { id: 2, name: "Aquatic Center", address: "456 Pool Street", capacity: 200, facilities: ["Swimming", "Water Polo"] },
  { id: 3, name: "Indoor Arena", address: "789 Court Road", capacity: 300, facilities: ["Basketball", "Tennis", "Badminton"] }
];

const mockEnquiries = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", type: "individual", message: "Interested in cricket coaching", status: "pending", date: "2024-05-15" },
  { id: 2, name: "Lincoln High School", email: "principal@lhs.edu", phone: "1234567891", type: "school", message: "Inquiry about in-school program", status: "pending", date: "2024-05-14" },
  { id: 3, name: "Jane Smith", email: "jane@example.com", phone: "1234567892", type: "individual", message: "Want to book trial session", status: "resolved", date: "2024-05-13" }
];


const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('coaches');
  const [items, setItems] = useState(mockCoaches);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    specialties: '',
    image: '',
    date: '',
    location: '',
    category: '',
    status: 'active',
    duration: '',
    price: '',
    address: '',
    capacity: '',
    facilities: '',
    type: 'individual',
    message: ''
  });

  // Update items when tab changes
  useEffect(() => {
    switch (activeTab) {
      case 'coaches':
        setItems(mockCoaches);
        break;
      case 'events':
        setItems(mockEvents);
        break;
      case 'programs':
        setItems(mockPrograms);
        break;
      case 'venues':
        setItems(mockVenues);
        break;
      case 'enquiries':
        setItems(mockEnquiries);
        break;
      default:
        setItems(mockCoaches);
    }
    setSearchTerm('');
    setFilterStatus('all');
  }, [activeTab]);

  const handleCreate = () => {
    setEditingItem(null);
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      ...item,
      specialties: Array.isArray(item.specialties) ? item.specialties.join(', ') : item.specialties || '',
      facilities: Array.isArray(item.facilities) ? item.facilities.join(', ') : item.facilities || ''
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      email: '',
      phone: '',
      specialties: '',
      image: '',
      date: '',
      location: '',
      category: '',
      status: activeTab === 'enquiries' ? 'pending' : 'active',
      duration: '',
      price: '',
      address: '',
      capacity: '',
      facilities: '',
      type: 'individual',
      message: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      id: editingItem ? editingItem.id : Date.now(),
      specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s),
      facilities: formData.facilities.split(',').map(f => f.trim()).filter(f => f)
    };

    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? newItem : item));
    } else {
      setItems([...items, newItem]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (id, newStatus) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  // Filter items based on search and status
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.message?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
                         (item.status && item.status === filterStatus) ||
                         (!item.status && filterStatus === 'active');
    
    return matchesSearch && matchesStatus;
  });

  // Get form fields based on active tab
  const getFormFields = () => {
    switch (activeTab) {
      case 'coaches':
        return [
          { name: 'name', label: 'Full Name', type: 'text', required: true },
          { name: 'role', label: 'Role/Position', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'text', required: true },
          { name: 'specialties', label: 'Specialties (comma separated)', type: 'text', required: false },
          { name: 'image', label: 'Image URL', type: 'text', required: false }
        ];
      case 'events':
        return [
          { name: 'title', label: 'Event Title', type: 'text', required: true },
          { name: 'date', label: 'Date', type: 'date', required: true },
          { name: 'location', label: 'Location', type: 'text', required: true },
          { name: 'category', label: 'Category', type: 'text', required: true },
          { name: 'status', label: 'Status', type: 'select', options: ['upcoming', 'completed', 'cancelled'], required: true }
        ];
      case 'programs':
        return [
          { name: 'name', label: 'Program Name', type: 'text', required: true },
          { name: 'duration', label: 'Duration', type: 'text', required: true },
          { name: 'price', label: 'Price (₹)', type: 'number', required: true },
          { name: 'category', label: 'Category', type: 'text', required: true },
          { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'], required: true }
        ];
      case 'venues':
        return [
          { name: 'name', label: 'Venue Name', type: 'text', required: true },
          { name: 'address', label: 'Address', type: 'text', required: true },
          { name: 'capacity', label: 'Capacity', type: 'number', required: true },
          { name: 'facilities', label: 'Facilities (comma separated)', type: 'text', required: false }
        ];
      case 'enquiries':
        return [
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'text', required: true },
          { name: 'type', label: 'Type', type: 'select', options: ['individual', 'school', 'college'], required: true },
          { name: 'message', label: 'Message', type: 'textarea', required: true },
          { name: 'status', label: 'Status', type: 'select', options: ['pending', 'resolved', 'closed'], required: true }
        ];
      default:
        return [];
    }
  };

  const getTableHeaders = () => {
    switch (activeTab) {
      case 'coaches':
        return ['Name', 'Role', 'Email', 'Phone', 'Specialties', 'Actions'];
      case 'events':
        return ['Title', 'Date', 'Location', 'Category', 'Status', 'Actions'];
      case 'programs':
        return ['Name', 'Duration', 'Price', 'Category', 'Status', 'Actions'];
      case 'venues':
        return ['Name', 'Address', 'Capacity', 'Facilities', 'Actions'];
      case 'enquiries':
        return ['Name', 'Email', 'Type', 'Status', 'Date', 'Actions'];
      default:
        return [];
    }
  };

  const renderTableRow = (item) => {
    switch (activeTab) {
      case 'coaches':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full" src={item.image} alt={item.name} />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.role}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.phone}</td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {Array.isArray(item.specialties) ? item.specialties.join(', ') : item.specialties}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:text-emerald-900 mr-3">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                <Trash2 className="w-4 h-4" />
              </button>
            </td>
          </>
        );
      case 'events':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                item.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                item.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {item.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:text-emerald-900 mr-3">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                <Trash2 className="w-4 h-4" />
              </button>
            </td>
          </>
        );
      case 'programs':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.duration}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.price}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {item.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:text-emerald-900 mr-3">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                <Trash2 className="w-4 h-4" />
              </button>
            </td>
          </>
        );
      case 'venues':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{item.address}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.capacity}</td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {Array.isArray(item.facilities) ? item.facilities.join(', ') : item.facilities}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:text-emerald-900 mr-3">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                <Trash2 className="w-4 h-4" />
              </button>
            </td>
          </>
        );
      case 'enquiries':
        return (
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{item.type}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <select 
                value={item.status} 
                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                className={`text-xs font-semibold rounded px-2 py-1 ${
                  item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  item.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}
              >
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:text-emerald-900 mr-3">
                <Eye className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                <Trash2 className="w-4 h-4" />
              </button>
            </td>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
  
       <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                <Award className="text-white w-5 h-5" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">SportEdu Admin</span>
            </div>
            <div className="flex items-center">
              <div className="text-sm text-gray-600">Admin User</div>
            </div>
          </div>
        </div>
      </header>
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'coaches', name: 'Coaches', icon: Users },
              { id: 'events', name: 'Events', icon: Calendar },
              { id: 'programs', name: 'Programs', icon: Award },
              { id: 'venues', name: 'Venues', icon: MapPin },
              { id: 'enquiries', name: 'Enquiries', icon: Mail }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-64"
              />
            </div>
            
            {activeTab !== 'venues' && (
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">All Status</option>
                {activeTab === 'events' && (
                  <>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </>
                )}
                {activeTab === 'programs' && (
                  <>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </>
                )}
                {activeTab === 'enquiries' && (
                  <>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </>
                )}
              </select>
            )}
          </div>
          
          <motion.button
            onClick={handleCreate}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {activeTab.slice(0, -1)}
          </motion.button>
        </div>

        {/* Data Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {getTableHeaders().map((header, index) => (
                    <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredItems.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderTableRow(item)}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'coaches' && <Users className="w-8 h-8 text-gray-400" />}
                {activeTab === 'events' && <Calendar className="w-8 h-8 text-gray-400" />}
                {activeTab === 'programs' && <Award className="w-8 h-8 text-gray-400" />}
                {activeTab === 'venues' && <MapPin className="w-8 h-8 text-gray-400" />}
                {activeTab === 'enquiries' && <Mail className="w-8 h-8 text-gray-400" />}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No {activeTab} found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search criteria.' : `Get started by adding a new ${activeTab.slice(0, -1)}.`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingItem ? `Edit ${activeTab.slice(0, -1)}` : `Add ${activeTab.slice(0, -1)}`}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {getFormFields().map((field) => (
                  <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        required={field.required}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || (field.options ? field.options[0] : '')}
                        onChange={handleInputChange}
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        {field.options?.map((option) => (
                          <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    )}
                  </div>
                ))}
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <Save className="w-4 h-4 inline mr-1" />
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DashboardPage