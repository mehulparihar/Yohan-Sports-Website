import mongoose from "mongoose";

const ImageSubSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  caption: { type: String, default: '' }
}, { _id: false });

const VenueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, index: true, unique: true },
  description: {
    type: String,
    default: "Professional sports facility with modern amenities."
  },
  address: {
    line1: String, line2: String, city: String, state: String, pincode: String, country: String,
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number] } // [lng, lat]
  },
  phone: String,
  email: String,
  images: [ImageSubSchema],
  hourlyRate: { type: Number, default: 1000 },
  dailyRate: { type: Number, default: 7000 },

  facilities: [{ type: String }],
  features: [{ type: String }],

  availability: { type: String, default: "6:00 AM - 10:00 PM" },
  bookingRequired: { type: Boolean, default: true },

  capacity: Number,
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const Venue = mongoose.model("Venue", VenueSchema);

export default Venue;