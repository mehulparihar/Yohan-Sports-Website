import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  dayOfWeek: { type: Number, min: 0, max: 6 }, // 0=Sunday
  startTime: String, // '16:00' or store as minutes from midnight
  endTime: String,
  capacity: { type: Number, default: 20 },
  enrolledCount: { type: Number, default: 0 }
}, { _id: false });

const ImageSubSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  caption: { type: String, default: '' },
}, { _id: false });

const ProgramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true, index: true },
  features: [{ type: String, required: true }], // key features / highlights
  sports: [ {type: String, index: true }], // e.g., 'Football'
  ageGroup: String, // 'U12', 'Adults', etc.
  shortDesc: String,
  duration: { type: String, required: true },
  schoolsPartnered: { type: Number, default: 0 },
  description: { type: String, required: true },
  coachIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coach' }],
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  price: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  durationWeeks: Number,
  schedule: [SlotSchema],
  tags: [String],
  thumbnail: String,
  images: [ImageSubSchema],
  isActive: { type: Boolean, default: true },
  seats: Number, // overall seats if needed
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });


const Program = mongoose.model("Program", ProgramSchema);

export default Program;