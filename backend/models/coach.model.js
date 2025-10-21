import mongoose from "mongoose";

const ImageSubSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  caption: { type: String, default: '' }
}, { _id: false });

const CoachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // e.g., "Head Cricket Coach"
  qualifications: { type: String, default: '' }, // e.g., "Former International Player, Level 3 Certified"
  specialties: [{ type: String }], // e.g., ["Batting", "Mental Conditioning"]
  experience: { type: String, default: '' }, // e.g., "12+ years"
  images: [ImageSubSchema], // simple image URL if not using Cloudinary
  bio: String,
  phone: String,
  email: String,
  certifications: [String],
  sports: [String],
  avatar: [ImageSubSchema], // if using multiple Cloudinary images
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Coach = mongoose.model("Coach", CoachSchema);

export default Coach;