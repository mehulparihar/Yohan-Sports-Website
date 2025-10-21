import mongoose from 'mongoose';

const ImageSubSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  caption: { type: String, default: '' }
}, { _id: false });

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: { type: String, default: '' }, // short summary
  content: { type: String, default: '' }, // rich text / markdown

  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional
  authorName: { type: String }, // denormalized author name
  authorRole: { type: String, default: '' }, // e.g., "Founder & CEO"
  authorImage: { type: String, default: '' }, // e.g., profile picture

  date: { type: String, default: '' }, // e.g., "May 15, 2024"
  readTime: { type: String, default: '' }, // e.g., "8 min read"

  categories: [String], // free-text categories or pick a Category model later
  category: { type: String, default: '' },
  tags: [String],
  thumbnail: ImageSubSchema, // single thumbnail image (optional)
  images: [ImageSubSchema], // gallery
  published: { type: Boolean, default: false, index: true },
  publishedAt: { type: Date, index: true },
  featured: { type: Boolean, default: false, index: true },
  views: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;