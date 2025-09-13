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
  title: { type: String, required: true },
  slug: { type: String, index: true, unique: true, required: true },
  sport: { type: String, index: true }, // e.g., 'Football'
  ageGroup: String, // 'U12', 'Adults', etc.
  shortDesc: String,
  description: String, // rich text / markdown
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