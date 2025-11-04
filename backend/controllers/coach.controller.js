import { deleteFromCloudinary, uploadBufferToCloudinary } from "../lib/cloudinary.js";
import Coach from "../models/coach.model.js";

export const createCoach = async (req, res) => {
    try {
        const payload = req.body;
        payload.createdBy = req.user.id;
    
        if (!req.body.name) return res.status(400).json({ error: 'name required' });
        if (req.files?.avatar?.[0]) {
            const buf = req.files.avatar[0].buffer;
            const publicId = `${process.env.CLOUDINARY_FOLDER || 'yohan-sports'}/coaches/${payload.name.replace(/\s+/g, '-').toLowerCase()}/avatar-${Date.now()}`;
            const r = await uploadBufferToCloudinary(buf, {
                public_id: publicId,
                folder: `${process.env.CLOUDINARY_FOLDER || 'yohan-sports'}/coaches/${payload.name.replace(/\s+/g, '-').toLowerCase()}`,
                resource_type: 'image',
                transformation: [{ width: 600, height: 600, crop: 'limit' }, { quality: 'auto' }, { fetch_format: 'auto' }]
            });
            payload.avatar = { url: r.secure_url, publicId: r.public_id, caption: payload.avatarCaption || '' };
        }

        // images
        const images = [];
        if (req.files?.images?.length) {
            for (const file of req.files.images) {
                const buf = file.buffer;
                const publicId = `${process.env.CLOUDINARY_FOLDER || 'yohan-sports'}/coaches/${payload.name.replace(/\s+/g, '-').toLowerCase()}/img-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
                const r = await uploadBufferToCloudinary(buf, {
                    public_id: publicId,
                    folder: `${process.env.CLOUDINARY_FOLDER || 'yohan-sports'}/coaches/${payload.name.replace(/\s+/g, '-').toLowerCase()}`,
                    resource_type: 'image',
                    transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }]
                });
                images.push({ url: r.secure_url, publicId: r.public_id, caption: '' });
            }
            payload.images = images;
        }

        const coach = new Coach(payload);
        await coach.save();
        res.status(201).json({ data: coach });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateCoach = async (req, res) => {
    try {
        const update = req.body; update.updatedBy = req.user.id;
        const coach = await Coach.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!coach) return res.status(404).json({ error: 'not found' });
        res.json({ data: coach });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteCoach = async (req, res) => {
    try {
        const coach = await Coach.findByIdAndDelete(req.params.id);
        if (!coach) return res.status(404).json({ error: 'not found' });

        if (coach.avatar?.publicId) {
            try { await deleteFromCloudinary(coach.avatar.publicId, { resource_type: 'image' }); } catch (e) { console.warn('avatar del', e.message); }
        }
        for (const img of coach.images || []) {
            try { await deleteFromCloudinary(img.publicId, { resource_type: 'image' }); } catch (e) { console.warn('img del', e.message); }
        }
        res.json({ data: coach });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const allCoach = async (req, res) => {
    try {
        const coaches = await Coach.find({}).sort({ name: 1 });
        res.json({ data: coaches });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

