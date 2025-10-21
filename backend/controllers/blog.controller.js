import { deleteFromCloudinary, uploadBufferToCloudinary } from "../lib/cloudinary.js";
import upload from "../middleware/upload.js";
import Blog from "../models/blog.model.js";


export const createBlog = async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.title || !payload.slug) return res.status(400).json({ error: "title and slug required" });

        // thumbnail upload
        if (req.files?.thumbnail?.[0]) {
            const buf = req.files.thumbnail[0].buffer;
            const publicId = `${process.env.CLOUDINARY_FOLDER || "sports-gurukul"}/blogs/${payload.slug}/thumb-${Date.now()}`;
            const result = await uploadBufferToCloudinary(buf, {
                public_id: publicId,
                folder: `${process.env.CLOUDINARY_FOLDER || "sports-gurukul"}/blogs/${payload.slug}`,
                resource_type: "image",
                transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
            });
            payload.thumbnail = { url: result.secure_url, publicId: result.public_id, caption: payload.thumbnailCaption || "" };
        }

        // multiple images
        const images = [];
        if (req.files?.images?.length) {
            for (const file of req.files.images) {
                const buf = file.buffer;
                const publicId = `${process.env.CLOUDINARY_FOLDER || "sports-gurukul"}/blogs/${payload.slug}/img-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
                const result = await uploadBufferToCloudinary(buf, {
                    public_id: publicId,
                    folder: `${process.env.CLOUDINARY_FOLDER || "sports-gurukul"}/blogs/${payload.slug}`,
                    resource_type: "image",
                    transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
                });
                images.push({ url: result.secure_url, publicId: result.public_id, caption: "" });
            }
            payload.images = images;
        }

        const blog = new Blog(payload);
        await blog.save();
        res.status(201).json({ data: blog });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const update = req.body;
        const blog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!blog) return res.status(404).json({ error: "not found" });
        res.json({ data: blog });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ error: "not found" });

        // delete images from Cloudinary
        if (blog.thumbnail?.publicId) {
            try {
                await deleteFromCloudinary(blog.thumbnail.publicId, { resource_type: "image" });
            } catch (e) {
                console.warn("thumb del err", e.message);
            }
        }
        for (const img of blog.images || []) {
            try {
                await deleteFromCloudinary(img.publicId, { resource_type: "image" });
            } catch (e) {
                console.warn("img del err", e.message);
            }
        }

        res.json({ data: blog });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const allBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json({ data: blogs });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
