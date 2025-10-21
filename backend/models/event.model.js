import mongoose from "mongoose";

const ImageSubSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  caption: { type: String, default: '' },
}, { _id: false });


const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true, unique: true },
  description: String,
  startDate: { type: Date, index: true },
  endDate: Date,
  date: { type: String }, // e.g. "June 15–17, 2024"
  time: { type: String }, // e.g. "9:00 AM – 6:00 PM"
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  location: { type: String },
  images: [ImageSubSchema],

  price: { type: Number, default: 0 },
  capacity: Number,
  enrolledCount: { type: Number, default: 0 },
  participants: { type: String, default: "" }, // e.g. "500+"
  tags: [String],
  category: { type: String, default: "" }, // e.g. "Tournament"
  type: { type: String, default: "" }, // e.g. "featured"
  highlights: { type: String, default: "" }, // e.g. "National-level competition..."
  registrationOpen: { type: Boolean, default: true },
  organizer: { name: String, phone: String },
  isFeatured: { type: Boolean, default: false },
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const Event = mongoose.model("Event", EventSchema);

export default Event;