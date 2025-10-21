'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Calendar,
  Award,
  MapPin,
  Mail,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Search,
  X,
  Save,
  FileText
} from 'lucide-react';
import useStore from '../stores';

// ======================
// MOCK DATA — Cloudinary-ready URLs
// ======================

const mockCoaches = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Head Cricket Coach",
    qualifications: "MSc Sports Science, Level 3 Cricket Coach",
    specialties: ["Cricket", "Mental Conditioning"],
    experience: "12 years",
    image: "https://res.cloudinary.com/yohansports/image/upload/v1712345678/coaches/alex_johnson.jpg",
    bio: "Former national player with 12+ years of coaching experience specializing in youth development and mental resilience.",
    phone: "+91 98765 43210",
    email: "alex@yohansports.com",
    sports: ["Cricket"]
  }
];

const mockEvents = [
  {
    id: 1,
    title: "Annual Sports Championship",
    slug: "annual-sports-championship-2025",
    description: "A premier inter-school tournament featuring top talent from across the region.",
    startDate: "2025-06-15T09:00:00Z",
    endDate: "2025-06-17T18:00:00Z",
    date: "June 15–17, 2025",
    time: "9:00 AM – 6:00 PM",
    location: "Central Sports Complex, Mumbai",
    venueId: 1,
    images: [
      "https://res.cloudinary.com/yohansports/image/upload/v1712345679/events/championship_main.jpg",
      "https://res.cloudinary.com/yohansports/image/upload/v1712345680/events/championship_action.jpg"
    ],
    price: 0,
    capacity: 500,
    enrolledCount: 320,
    participants: "500+",
    tags: ["Tournament", "Cricket", "Youth"],
    category: "Tournament",
    type: "featured",
    highlights: "National-level competition with certified referees and live scoring.",
    registrationOpen: true,
    organizer: { name: "Yohan Sports", phone: "+91 98765 43210" },
    isFeatured: true
  }
];

const mockPrograms = [
  {
    id: 1,
    name: "Cricket Academy",
    slug: "cricket-academy",
    features: ["Personalized coaching", "Video analysis", "Fitness training", "Mental conditioning"],
    sports: ["Cricket"],
    ageGroup: "U16",
    shortDesc: "Elite cricket training for young talents.",
    duration: "Weekly sessions over 12 weeks",
    durationWeeks: 12,
    description: "Our flagship program combines technical skill development with strategic gameplay and physical conditioning.",
    price: 8000,
    seats: 30,
    tags: ["Cricket", "Youth", "Academy"],
    images: [
      "https://res.cloudinary.com/yohansports/image/upload/v1712345681/programs/cricket_academy1.jpg",
      "https://res.cloudinary.com/yohansports/image/upload/v1712345682/programs/cricket_academy2.jpg"
    ],
    isActive: true
  }
];

const mockVenues = [
  {
    id: 1,
    name: "Main Sports Complex",
    slug: "main-sports-complex",
    description: "Professional sports facility with modern amenities, floodlights, and certified turf.",
    address: {
      line1: "123 Sports Avenue",
      line2: "Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400053",
      country: "India"
    },
    location: { coordinates: [72.8567, 19.1136] },
    phone: "+91 98765 43210",
    email: "venue@yohansports.com",
    images: [
      "https://res.cloudinary.com/yohansports/image/upload/v1712345683/venues/complex_exterior.jpg",
      "https://res.cloudinary.com/yohansports/image/upload/v1712345684/venues/complex_field.jpg"
    ],
    hourlyRate: 1500,
    dailyRate: 10000,
    facilities: ["Cricket Pitch", "Football Field", "Gym", "Changing Rooms"],
    features: ["Floodlights", "Parking", "Cafeteria", "First Aid"],
    availability: "6:00 AM - 10:00 PM",
    bookingRequired: true,
    capacity: 500
  }
];

const mockEnquiries = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    type: "individual",
    sport: "Cricket",
    age: 14,
    institution: "",
    subject: "Cricket Coaching",
    message: "Interested in enrolling my son in the summer cricket camp.",
    status: "new",
    createdAt: "2025-04-15T10:00:00Z"
  }
];

const mockBlogs = [
  {
    id: 1,
    title: "The Future of Youth Sports",
    slug: "future-of-youth-sports",
    excerpt: "How modern training is shaping the next generation of athletes.",
    content: "In today's fast-evolving sports landscape, early specialization and holistic development are key to nurturing champions. At Yohan Sports, we blend science, passion, and discipline to create programs that go beyond the game.",
    author: "Dr. Priya Mehta",
    category: "Insights",
    tags: ["Youth", "Training", "Development", "Coaching"],
    featuredImage: "https://res.cloudinary.com/yohansports/image/upload/v1712345685/blogs/youth_sports_future.jpg",
    isPublished: true,
    publishedAt: "2025-04-10T00:00:00Z",
    readTime: "5 min"
  }
];

// ======================
// HELPER: Format Date
// ======================
const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// ======================
// DETAIL VIEW MODAL
// ======================
const DetailViewModal = ({ item, isOpen, onClose, type }) => {
  if (!item || !isOpen) return null;

  const renderField = (label, value, isList = false, isImage = false) => {
    if (value === null || value === undefined || value === '') return null;
    return (
      <div className="mb-3">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {isImage ? (
            <img
              src={value}
              alt={label}
              className="rounded-lg max-w-full h-auto border object-cover"
              loading="lazy"
            />
          ) : isList ? (
            Array.isArray(value) ? value.join(', ') : String(value)
          ) : typeof value === 'object' && value !== null ? (
            JSON.stringify(value, null, 2)
          ) : (
            String(value)
          )}
        </dd>
      </div>
    );
  };

  const renderImages = (images, label) => {
    if (!images || images.length === 0) return null;
    return (
      <div className="mb-4">
        <dt className="text-sm font-medium text-gray-500 mb-2">{label}</dt>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${label} ${idx + 1}`}
              className="h-24 w-auto rounded-md object-cover border flex-shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Details</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {type === 'coaches' && (
                <>
                  <div className="flex items-start gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{item.name}</h4>
                      <p className="text-gray-600">{item.role}</p>
                    </div>
                  </div>
                  {renderField('Email', item.email)}
                  {renderField('Phone', item.phone)}
                  {renderField('Qualifications', item.qualifications)}
                  {renderField('Experience', item.experience)}
                  {renderField('Sports', item.sports, true)}
                  {renderField('Specialties', item.specialties, true)}
                  {renderField('Bio', item.bio)}
                </>
              )}

              {type === 'events' && (
                <>
                  <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                  {renderImages(item.images, 'Event Photos')}
                  {renderField('Date', item.date)}
                  {renderField('Time', item.time)}
                  {renderField('Location', item.location)}
                  {renderField('Category', item.category)}
                  {renderField('Price', item.price === 0 ? 'Free' : `₹${item.price}`)}
                  {renderField('Capacity', `${item.enrolledCount}/${item.capacity} enrolled`)}
                  {renderField('Highlights', item.highlights)}
                  {renderField('Organizer', `${item.organizer?.name} (${item.organizer?.phone})`)}
                  {renderField('Registration', item.registrationOpen ? 'Open' : 'Closed')}
                </>
              )}

              {type === 'programs' && (
                <>
                  <h4 className="text-xl font-bold text-gray-900">{item.name}</h4>
                  {renderImages(item.images, 'Program Photos')}
                  {renderField('Age Group', item.ageGroup)}
                  {renderField('Duration', item.duration)}
                  {renderField('Price', `₹${item.price}`)}
                  {renderField('Seats Available', item.seats)}
                  {renderField('Sports', item.sports, true)}
                  {renderField('Features', item.features, true)}
                  {renderField('Description', item.description)}
                </>
              )}

              {type === 'venues' && (
                <>
                  <h4 className="text-xl font-bold text-gray-900">{item.name}</h4>
                  {renderImages(item.images, 'Venue Photos')}
                  {renderField('Address', `${item.address?.line1}, ${item.address?.city}, ${item.address?.state} ${item.address?.pincode}`)}
                  {renderField('Phone', item.phone)}
                  {renderField('Email', item.email)}
                  {renderField('Capacity', item.capacity)}
                  {renderField('Hourly Rate', `₹${item.hourlyRate}`)}
                  {renderField('Daily Rate', `₹${item.dailyRate}`)}
                  {renderField('Facilities', item.facilities, true)}
                  {renderField('Features', item.features, true)}
                  {renderField('Availability', item.availability)}
                </>
              )}

              {type === 'blogs' && (
                <>
                  <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                  {renderField('Featured Image', item.featuredImage, false, true)}
                  {renderField('Author', item.author)}
                  {renderField('Category', item.category)}
                  {renderField('Published', formatDate(item.publishedAt))}
                  {renderField('Read Time', item.readTime)}
                  {renderField('Excerpt', item.excerpt)}
                  {renderField('Content', item.content)}
                </>
              )}

              {type === 'enquiries' && (
                <>
                  <h4 className="text-xl font-bold text-gray-900">{item.subject}</h4>
                  {renderField('Name', item.name)}
                  {renderField('Email', item.email)}
                  {renderField('Phone', item.phone)}
                  {renderField('Type', item.type)}
                  {renderField('Sport', item.sport)}
                  {renderField('Age', item.age)}
                  {renderField('Institution', item.institution)}
                  {renderField('Message', item.message)}
                  {renderField('Status', item.status)}
                  {renderField('Received', formatDate(item.createdAt))}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ======================
// MAIN COMPONENT
// ======================

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('coaches');
  const [items, setItems] = useState(mockCoaches);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({});
  const { blogs, fetchBlogs, fetchEvents, events, programs, fetchPrograms, coaches, fetchCoaches, venues, fetchVenues, enquiries, fetchEnquiries,
    createCoach, updateCoach, deleteCoach, createEvent, updateEvent, deleteEvent, createProgram, updateProgram, deleteProgram, createVenue, updateVenue, deleteVenue,
    createBlog, updateBlog, deleteBlog } = useStore();

  const resourceMap = {
    coaches: { list: coaches, fetch: fetchCoaches, create: createCoach, update: updateCoach, remove: deleteCoach, mock: mockCoaches },
    events: { list: events, fetch: fetchEvents, create: createEvent, update: updateEvent, remove: deleteEvent, mock: mockEvents },
    programs: { list: programs, fetch: fetchPrograms, create: createProgram, update: updateProgram, remove: deleteProgram, mock: mockPrograms },
    venues: { list: venues, fetch: fetchVenues, create: createVenue, update: updateVenue, remove: deleteVenue, mock: mockVenues },
    enquiries: { list: enquiries, fetch: fetchEnquiries, mock: mockEnquiries },
    blogs: { list: blogs, fetch: fetchBlogs, create: createBlog, update: updateBlog, remove: deleteBlog, mock: mockBlogs }
  };

  //  const items = resourceMap[activeTab]?.list && resourceMap[activeTab].list.length > 0
  //   ? resourceMap[activeTab].list
  //   : resourceMap[activeTab]?.mock || [];



  useEffect(() => {
    const tabData = {
      coaches: mockCoaches,
      events: mockEvents,
      programs: mockPrograms,
      venues: mockVenues,
      enquiries: mockEnquiries,
      blogs: mockBlogs
    };

    const r = resourceMap[activeTab];
    if (r && typeof r.fetch === 'function') {
      r.fetch().catch(() => { }); // ignore errors here — your store will hold errors if needed
    }
    console.log(resourceMap[activeTab].list);
    setItems(resourceMap[activeTab]?.list && resourceMap[activeTab].list.list.length > 0
      ? resourceMap[activeTab].list.list
      : resourceMap[activeTab]?.mock || []);
    setSearchTerm('');
    setFilterStatus('all');
    resetForm();
  }, [activeTab]);

  const resetForm = () => {
    const base = {
      name: '',
      email: '',
      phone: '',
      status: 'active'
    };

    const forms = {
      coaches: {
        ...base,
        role: '',
        qualifications: '',
        specialties: '',
        experience: '',
        image: '',
        bio: '',
        sports: ''
      },
      events: {
        title: '',
        slug: '',
        description: '',
        startDate: '',
        endDate: '',
        date: '',
        time: '',
        location: '',
        venueId: '',
        images: '',
        price: 0,
        capacity: 0,
        enrolledCount: 0,
        participants: '',
        tags: '',
        category: '',
        type: '',
        highlights: '',
        registrationOpen: true,
        'organizer.name': '',
        'organizer.phone': '',
        isFeatured: false
      },
      programs: {
        name: '',
        slug: '',
        features: '',
        sports: '',
        ageGroup: '',
        shortDesc: '',
        duration: '',
        durationWeeks: 0,
        description: '',
        price: 0,
        seats: 0,
        tags: '',
        images: '',
        isActive: true
      },
      venues: {
        name: '',
        slug: '',
        description: '',
        'address.line1': '',
        'address.line2': '',
        'address.city': '',
        'address.state': '',
        'address.pincode': '',
        'address.country': 'India',
        'location.coordinates': '',
        phone: '',
        email: '',
        images: '',
        hourlyRate: 1000,
        dailyRate: 7000,
        facilities: '',
        features: '',
        availability: '6:00 AM - 10:00 PM',
        bookingRequired: true,
        capacity: 0
      },
      enquiries: {
        ...base,
        type: 'general',
        sport: '',
        age: '',
        institution: '',
        subject: '',
        message: '',
        status: 'new'
      },
      blogs: {
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: 'Admin',
        category: '',
        tags: '',
        featuredImage: '',
        isPublished: true,
        publishedAt: new Date().toISOString().split('T')[0],
        readTime: ''
      }
    };

    setFormData(forms[activeTab] || base);
  };

  const handleCreate = () => {
    setEditingItem(null);
    resetForm();
    setShowEditModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    const mapToForm = (obj, prefix = '') => {
      let form = {};
      for (let key in obj) {
        if (obj[key] === null || obj[key] === undefined) continue;
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null && !(obj[key] instanceof Date)) {
          Object.assign(form, mapToForm(obj[key], fullKey));
        } else {
          form[fullKey] = Array.isArray(obj[key]) ? obj[key].join(', ') : obj[key];
        }
      }
      return form;
    };
    setFormData(mapToForm(item));
    setShowEditModal(true);
  };

  const handleView = (item) => {
    setViewingItem(item);
    setShowDetailModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const r = resourceMap[activeTab];
      if (r && typeof r.remove === 'function') {
        await r.remove(id);
        await r.fetch();
      } else {
        // fallback local removal (if store not wired)
        // no-op: store already uses list from backend
      }
    } catch (err) {
      console.error('delete error', err);
      alert('Delete failed: ' + (err.message || 'unknown'));
    }
  };

  const getId = (item) => item?._id || item?.id || item?.uuid;

  const handleInputChange = (e) => {
    const { name, value, type, checked, files, multiple } = e.target;

    if (type === 'file') {
      // ✅ Handle single & multiple file uploads
      if (multiple) {
        setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
      } else {
        setFormData(prev => ({ ...prev, [name]: files[0] || null }));
      }
      return;
    }

    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const buildNestedObject = (flatData) => {
      const result = {};
      for (let key in flatData) {
        const value = flatData[key];
        if (value === undefined || value === null) continue;
        const keys = key.split('.');
        let current = result;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {};
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
      }
      return result;
    };


    // ✅ If any file exists, build FormData
    const hasFiles = Object.values(formData).some(
    v => v instanceof File || (Array.isArray(v) && v.some(f => f instanceof File))
  );

  
  
  let payload = hasFiles ? formData : buildNestedObject(formData);

    if (hasFiles) {
    const fd = new FormData();

    Object.entries(payload).forEach(([key, val]) => {
      if (val instanceof File) {
        fd.append(key, val);
      } else if (Array.isArray(val) && val.some(f => f instanceof File)) {
        val.forEach(f => fd.append(key, f)); // multiple files, e.g. images[]
      } else if (typeof val === 'object' && !(val instanceof File)) {
        fd.append(key, JSON.stringify(val));
      } else if (val !== undefined && val !== null) {
        fd.append(key, val);
      }
    });

    payload = fd;
  }

    try {
      const r = resourceMap[activeTab];
      if (editingItem) {
        const id = editingItem._id || editingItem.id;
        if (r && typeof r.update === 'function') await r.update(id, payload);
      } else {
        if (r && typeof r.create === 'function') await r.create(payload);
      }
      await r.fetch();
      setShowEditModal(false);
    } catch (err) {
      console.error('submit error:', err);
      alert('Save failed: ' + (err.message || 'Unknown error'));
    }
  };


  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = Object.values(item).some(val => {
        if (typeof val === 'string') return val.toLowerCase().includes(searchTerm.toLowerCase());
        if (Array.isArray(val)) return val.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()));
        if (typeof val === 'object' && val !== null) {
          return Object.values(val).some(v => typeof v === 'string' && v.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return false;
      });

      let matchesStatus = true;
      if (filterStatus !== 'all') {
        if (activeTab === 'enquiries') {
          matchesStatus = item.status === filterStatus;
        } else if (activeTab === 'programs') {
          matchesStatus = item.isActive === (filterStatus === 'active');
        } else if (activeTab === 'blogs') {
          matchesStatus = item.isPublished === (filterStatus === 'published');
        } else if (activeTab === 'events') {
          matchesStatus = item.registrationOpen === (filterStatus === 'open');
        }
      }

      return matchesSearch && matchesStatus;
    });
  }, [items, searchTerm, filterStatus, activeTab]);

  const getFormFields = () => {
    const common = (fields) => fields.map(f => ({ ...f, required: f.required !== false }));
    switch (activeTab) {
      case 'coaches':
        return common([
          { name: 'name', label: 'Full Name', type: 'text' },
          { name: 'role', label: 'Role', type: 'text' },
          { name: 'qualifications', label: 'Qualifications', type: 'text' },
          { name: 'experience', label: 'Experience (e.g. "12 years")', type: 'text' },
          { name: 'sports', label: 'Sports (comma separated)', type: 'text' },
          { name: 'specialties', label: 'Specialties (comma separated)', type: 'text' },
          { name: 'bio', label: 'Bio', type: 'textarea' },
          { name: 'images', label: 'Upload Coach Image', type: 'file' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'phone', label: 'Phone', type: 'text' }
        ]);
      case 'events':
        return common([
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'slug', label: 'Slug (URL-friendly)', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'startDate', label: 'Start Date', type: 'datetime-local' },
          { name: 'endDate', label: 'End Date', type: 'datetime-local' },
          { name: 'date', label: 'Display Date (e.g. June 15–17, 2025)', type: 'text' },
          { name: 'time', label: 'Time (e.g. 9:00 AM – 6:00 PM)', type: 'text' },
          { name: 'location', label: 'Location', type: 'text' },
          { name: 'venueId', label: 'Venue ID', type: 'text' },
          { name: 'images', label: 'Upload Event Images', type: 'file', multiple: true  },
          { name: 'price', label: 'Price (₹)', type: 'number' },
          { name: 'capacity', label: 'Capacity', type: 'number' },
          { name: 'participants', label: 'Participants Display (e.g. "500+")', type: 'text' },
          { name: 'tags', label: 'Tags (comma separated)', type: 'text' },
          { name: 'category', label: 'Category', type: 'text' },
          { name: 'type', label: 'Type', type: 'text' },
          { name: 'highlights', label: 'Highlights', type: 'textarea' },
          { name: 'registrationOpen', label: 'Registration Open', type: 'checkbox' },
          { name: 'organizer.name', label: 'Organizer Name', type: 'text' },
          { name: 'organizer.phone', label: 'Organizer Phone', type: 'text' },
          { name: 'isFeatured', label: 'Featured', type: 'checkbox' }
        ]);
      case 'programs':
        return common([
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'slug', label: 'Slug', type: 'text' },
          { name: 'shortDesc', label: 'Short Description', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'features', label: 'Features (comma separated)', type: 'text' },
          { name: 'sports', label: 'Sports (comma separated)', type: 'text' },
          { name: 'ageGroup', label: 'Age Group', type: 'text' },
          { name: 'duration', label: 'Duration', type: 'text' },
          { name: 'durationWeeks', label: 'Duration (Weeks)', type: 'number' },
          { name: 'price', label: 'Price (₹)', type: 'number' },
          { name: 'seats', label: 'Seats', type: 'number' },
          { name: 'tags', label: 'Tags (comma separated)', type: 'text' },
          { name: 'images', label: 'Upload Program Images', type: 'file', multiple: true },
          { name: 'isActive', label: 'Active', type: 'checkbox' }
        ]);
      case 'venues':
        return common([
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'slug', label: 'Slug', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'address.line1', label: 'Address Line 1', type: 'text' },
          { name: 'address.line2', label: 'Address Line 2', type: 'text' },
          { name: 'address.city', label: 'City', type: 'text' },
          { name: 'address.state', label: 'State', type: 'text' },
          { name: 'address.pincode', label: 'Pincode', type: 'text' },
          { name: 'address.country', label: 'Country', type: 'text' },
          { name: 'location.coordinates', label: 'Coordinates (lng, lat)', type: 'text' },
          { name: 'phone', label: 'Phone', type: 'text' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'images', label: 'Upload Venues Images', type: 'file', multiple: true },
          { name: 'hourlyRate', label: 'Hourly Rate (₹)', type: 'number' },
          { name: 'dailyRate', label: 'Daily Rate (₹)', type: 'number' },
          { name: 'facilities', label: 'Facilities (comma separated)', type: 'text' },
          { name: 'features', label: 'Features (comma separated)', type: 'text' },
          { name: 'availability', label: 'Availability', type: 'text' },
          { name: 'bookingRequired', label: 'Booking Required', type: 'checkbox' },
          { name: 'capacity', label: 'Capacity', type: 'number' }
        ]);
      case 'enquiries':
        return common([
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'phone', label: 'Phone', type: 'text' },
          { name: 'type', label: 'Type', type: 'select', options: ['general', 'program', 'event', 'venue'] },
          { name: 'sport', label: 'Sport', type: 'text' },
          { name: 'age', label: 'Age', type: 'number' },
          { name: 'institution', label: 'Institution', type: 'text' },
          { name: 'subject', label: 'Subject', type: 'text' },
          { name: 'message', label: 'Message', type: 'textarea' },
          { name: 'status', label: 'Status', type: 'select', options: ['new', 'open', 'responded', 'resolved', 'closed'] }
        ]);
      case 'blogs':
        return common([
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'slug', label: 'Slug', type: 'text' },
          { name: 'excerpt', label: 'Excerpt', type: 'text' },
          { name: 'content', label: 'Content', type: 'textarea' },
          { name: 'author', label: 'Author', type: 'text' },
          { name: 'category', label: 'Category', type: 'text' },
          { name: 'tags', label: 'Tags (comma separated)', type: 'text' },
          { name: 'images', label: 'Upload Blog Images', type: 'file' },
          { name: 'isPublished', label: 'Published', type: 'checkbox' },
          { name: 'publishedAt', label: 'Published At', type: 'date' },
          { name: 'readTime', label: 'Read Time (e.g. "5 min")', type: 'text' }
        ]);
      default:
        return [];
    }
  };

  const getTableHeaders = () => {
    switch (activeTab) {
      case 'coaches': return ['Name', 'Role', 'Sports', 'Experience', 'Actions'];
      case 'events': return ['Title', 'Date', 'Category', 'Status', 'Actions'];
      case 'programs': return ['Name', 'Sports', 'Age Group', 'Status', 'Actions'];
      case 'venues': return ['Name', 'City', 'Capacity', 'Actions'];
      case 'enquiries': return ['Name', 'Subject', 'Type', 'Status', 'Actions'];
      case 'blogs': return ['Title', 'Category', 'Status', 'Published', 'Actions'];
      default: return [];
    }
  };

  const renderTableRow = (item) => {
    const getStatusBadge = (status, active = true) => {
      const config = {
        coaches: { active: 'bg-green-100 text-green-800' },
        events: {
          open: item.registrationOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
          label: item.registrationOpen ? 'Open' : 'Closed'
        },
        programs: {
          active: item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
          label: item.isActive ? 'Active' : 'Inactive'
        },
        blogs: {
          active: item.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800',
          label: item.isPublished ? 'Published' : 'Draft'
        },
        enquiries: {
          new: 'bg-yellow-100 text-yellow-800',
          open: 'bg-blue-100 text-blue-800',
          responded: 'bg-purple-100 text-purple-800',
          resolved: 'bg-green-100 text-green-800',
          closed: 'bg-gray-100 text-gray-800'
        }
      };

      const type = activeTab;
      if (type === 'coaches') return <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">Active</span>;
      if (type === 'events') return <span className={`px-2 py-1 text-xs rounded ${config.events.open}`}>{config.events.label}</span>;
      if (type === 'programs') return <span className={`px-2 py-1 text-xs rounded ${config.programs.active}`}>{config.programs.label}</span>;
      if (type === 'blogs') return <span className={`px-2 py-1 text-xs rounded ${config.blogs.active}`}>{config.blogs.label}</span>;
      if (type === 'enquiries') return <span className={`px-2 py-1 text-xs rounded ${config.enquiries[status] || 'bg-gray-100'}`}>{status}</span>;
      return null;
    };

    switch (activeTab) {
      case 'coaches':
        return (
          <>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full object-cover" src={item.image || "https://res.cloudinary.com/yohansports/image/upload/v1712345678/placeholder.jpg"} alt={item.name} />
                <div className="ml-4">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.email}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">{item.role}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{Array.isArray(item.sports) ? item.sports.join(', ') : item.sports}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{item.experience}</td>
            <td className="px-6 py-4 text-sm font-medium">
              <button onClick={() => handleView(item)} className="text-blue-600 hover:text-blue-900 mr-3"><Eye className="w-4 h-4" /></button>
              <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:text-emerald-900 mr-3"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
            </td>
          </>
        );
      case 'events':
        return (
          <>
            <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
            <td className="px-6 py-4">{getStatusBadge(null, item.registrationOpen)}</td>
            <td className="px-6 py-4 text-sm font-medium">
              <button onClick={() => handleView(item)} className="text-blue-600 hover:text-blue-900 mr-3"><Eye className="w-4 h-4" /></button>
              <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:text-emerald-900 mr-3"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
            </td>
          </>
        );
      case 'programs':
        return (
          <>
            <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{Array.isArray(item.sports) ? item.sports.join(', ') : item.sports}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{item.ageGroup}</td>
            <td className="px-6 py-4">{getStatusBadge(null, item.isActive)}</td>
            <td className="px-6 py-4 text-sm font-medium">
              <button onClick={() => handleView(item)} className="text-blue-600 hover:text-blue-900 mr-3"><Eye className="w-4 h-4" /></button>
              <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:text-emerald-900 mr-3"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
            </td>
          </>
        );
      case 'venues':
        return (
          <>
            <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{item.address?.city}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{item.capacity}</td>
            <td className="px-6 py-4 text-sm font-medium">
              <button onClick={() => handleView(item)} className="text-blue-600 hover:text-blue-900 mr-3"><Eye className="w-4 h-4" /></button>
              <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:text-emerald-900 mr-3"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
            </td>
          </>
        );
      case 'enquiries':
        return (
          <>
            <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{item.subject}</td>
            <td className="px-6 py-4 text-sm text-gray-500 capitalize">{item.type}</td>
            <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
            <td className="px-6 py-4 text-sm font-medium">
              <button onClick={() => handleView(item)} className="text-blue-600 hover:text-blue-900 mr-3"><Eye className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
            </td>
          </>
        );
      case 'blogs':
        return (
          <>
            <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
            <td className="px-6 py-4">{getStatusBadge(null, item.isPublished)}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{formatDate(item.publishedAt)}</td>
            <td className="px-6 py-4 text-sm font-medium">
              <button onClick={() => handleView(item)} className="text-blue-600 hover:text-blue-900 mr-3"><Eye className="w-4 h-4" /></button>
              <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:text-emerald-900 mr-3"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
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
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                <Award className="text-white w-5 h-5" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">yohansports Admin</span>
            </div>
            <div className="text-sm text-gray-600">Admin User</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex flex-wrap gap-4">
            {[
              { id: 'coaches', name: 'Coaches', icon: Users },
              { id: 'events', name: 'Events', icon: Calendar },
              { id: 'programs', name: 'Programs', icon: Award },
              { id: 'venues', name: 'Venues', icon: MapPin },
              { id: 'enquiries', name: 'Enquiries', icon: Mail },
              { id: 'blogs', name: 'Blogs', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === tab.id
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
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full"
              />
            </div>

            {(activeTab === 'enquiries' || activeTab === 'programs' || activeTab === 'blogs' || activeTab === 'events') && (
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">All</option>
                {activeTab === 'enquiries' && ['new', 'open', 'responded', 'resolved', 'closed'].map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
                {activeTab === 'programs' && (
                  <>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </>
                )}
                {activeTab === 'blogs' && (
                  <>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </>
                )}
                {activeTab === 'events' && (
                  <>
                    <option value="open">Registration Open</option>
                    <option value="closed">Registration Closed</option>
                  </>
                )}
              </select>
            )}
          </div>

          <motion.button
            onClick={handleCreate}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {activeTab === 'enquiries' ? 'Enquiry' : activeTab.slice(0, -1)}
          </motion.button>
        </div>

        {/* Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {getTableHeaders().map((header, idx) => (
                    <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredItems.map((item) => (
                    <motion.tr
                      key={item._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
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
                {activeTab === 'blogs' && <FileText className="w-8 h-8 text-gray-400" />}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No {activeTab} found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search.' : `Add a new ${activeTab.slice(0, -1)}.`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingItem ? `Edit ${activeTab.slice(0, -1)}` : `Add ${activeTab === 'enquiries' ? 'Enquiry' : activeTab.slice(0, -1)}`}
                </h3>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                {getFormFields().map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required !== false && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        // required={field.required !== false}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                      />
                    ) : 
                     field.type === 'file' ? (
                      <input
                        type="file"
                        name={field.name}
                        onChange={handleInputChange}
                        multiple={field.multiple || false}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        // required={field.required !== false}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                      >
                        {field.options.map(opt => (
                          <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                        ))}
                      </select>
                    ) : field.type === 'checkbox' ? (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name={field.name}
                          checked={!!formData[field.name]}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-emerald-600 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">{field.label}</label>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        // required={field.required !== false}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                      />
                    )}
                  </div>
                ))}

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 flex items-center"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail View Modal */}
      <DetailViewModal
        item={viewingItem}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        type={activeTab}
      />
    </div>
  );
};

export default DashboardPage;