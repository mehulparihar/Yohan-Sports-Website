import { deleteFromCloudinary, uploadBufferToCloudinary } from "../lib/cloudinary.js";
import upload from "../middleware/upload.js";
import Program from "../models/program.model.js";

export const createProgram = async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.title || !payload.slug) return res.status(400).json({ error: 'title and slug required' });
        const exists = await Program.findOne({ slug: payload.slug });
        if (exists) return res.status(409).json({ error: 'slug already taken' });

        if (req.files?.thumbnail?.[0]) {
            const buf = req.files.thumbnail[0].buffer;
            const originalName = req.files.thumbnail[0].originalname.replace(/\.[^/.]+$/, '') || 'thumbnail';
            const publicId = `${process.env.CLOUDINARY_FOLDER || 'sports-gurukul'}/programs/${payload.slug}/thumb-${Date.now()}`;
            const result = await uploadBufferToCloudinary(buf, {
                public_id: publicId,
                folder: `${process.env.CLOUDINARY_FOLDER || 'sports-gurukul'}/programs/${payload.slug}`,
                resource_type: 'image',
                transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }]
            });
            payload.thumbnail = { url: result.secure_url, publicId: result.public_id, caption: payload.thumbnailCaption || '' };
        }

        const images = [];
        if (req.files?.images?.length) {
            for (const file of req.files.images) {
                const buf = file.buffer;
                const publicId = `${process.env.CLOUDINARY_FOLDER || 'sports-gurukul'}/programs/${payload.slug}/img-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
                const result = await uploadBufferToCloudinary(buf, {
                    public_id: publicId,
                    folder: `${process.env.CLOUDINARY_FOLDER || 'sports-gurukul'}/programs/${payload.slug}`,
                    resource_type: 'image',
                    transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }]
                });
                images.push({ url: result.secure_url, publicId: result.public_id, caption: '' });
            }
            payload.images = images;
        }


        const program = new Program(payload);
        await program.save();
        res.status(201).json({ data: program });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateProgram = async (req, res) => {
    try {
        const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!program) return res.status(404).json({ error: 'Program not found' });
        res.json({ data: program });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

export const deleteProgram = async (req, res) => {
    try {
        const program = await Program.findByIdAndDelete(req.params.id);
        if (!program) return res.status(404).json({ error: 'Program not found' });

        // delete thumbnail
        if (program.thumbnail?.publicId) {
            try { await deleteFromCloudinary(program.thumbnail.publicId, { resource_type: 'image' }); } catch (e) { console.warn('thumb delete err', e.message); }
        }
        // delete gallery
        for (const img of program.images || []) {
            try { await deleteFromCloudinary(img.publicId, { resource_type: 'image' }); } catch (e) { console.warn('img delete err', e.message); }
        }

        res.json({ data: program });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const allPrograms = async (req, res) => {
    try {
        const program = await Program.find({});
        res.json({ data: program });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};