import mongoose from "mongoose";

const CoachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  phone: String,
  email: String,
  certifications: [String],
  sports: [String],
  avatar: String,
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // optional link
}, { timestamps: true });

const Coach = mongoose.model("Coach", CoachSchema);

export default Coach;