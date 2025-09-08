import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true, unique: true },
  description: String,
  startDate: { type: Date, index: true },
  endDate: Date,
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  image: String,
  price: { type: Number, default: 0 },
  capacity: Number,
  enrolledCount: { type: Number, default: 0 },
  tags: [String],
  organizer: { name: String, phone: String },
  isFeatured: { type: Boolean, default: false },
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const Event = mongoose.model("Event", EventSchema);

export default Event;