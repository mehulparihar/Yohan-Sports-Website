import mongoose from "mongoose";

const ImageSubSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  caption: { type: String, default: '' }
}, { _id: false });

const VenueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, index: true, unique: true },
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
  capacity: Number,
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const Venue = mongoose.model("Venue", VenueSchema);

export default Venue;