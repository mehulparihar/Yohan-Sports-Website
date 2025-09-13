import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  type: { type: String, enum: ['general','program','event','corporate','sponsorship','other'], default: 'general' },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  message: { type: String, required: true },
  status: { type: String, enum: ['new','open','responded','resolved','closed'], default: 'new', index: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // admin handling
  response: { // admin response record (optional)
    body: String,
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    respondedAt: Date
  },
  meta: mongoose.Schema.Types.Mixed, // e.g., utm, ip, userAgent
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // if logged-in user created it
  resolvedAt: Date
}, { timestamps: true });


const Enquiry = mongoose.model("Enquiry", EnquirySchema);

export default Enquiry;