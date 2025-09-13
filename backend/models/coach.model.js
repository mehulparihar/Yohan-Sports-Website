import mongoose from "mongoose";

const ImageSubSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  caption: { type: String, default: '' }
}, { _id: false });

const CoachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  phone: String,
  email: String,
  certifications: [String],
  sports: [String],
  avatar: [ImageSubSchema],
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // optional link
}, { timestamps: true });

const Coach = mongoose.model("Coach", CoachSchema);

export default Coach;