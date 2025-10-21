import Event from "../models/event.model.js";
import upload from "../middleware/upload.js";
import Program from "../models/program.model.js";
import { deleteFromCloudinary, uploadBufferToCloudinary } from "../lib/cloudinary.js";


export const createEvent = async (req, res) => {
    try {
        
        const payload = req.body;
        console.log('Received createEvent payload:', payload);
        if (!payload.title) return res.status(400).json({ error: 'title required' });

        payload.createdBy = req.user.id;

        if (!payload.title || !payload.slug) return res.status(400).json({ error: 'title and slug required' });

        // thumbnail
        if (req.files?.thumbnail?.[0]) {
            const buf = req.files.thumbnail[0].buffer;
            const publicId = `${process.env.CLOUDINARY_FOLDER || 'sports-gurukul'}/events/${payload.slug}/thumb-${Date.now()}`;
            const result = await uploadBufferToCloudinary(buf, {
                public_id: publicId,
                folder: `${process.env.CLOUDINARY_FOLDER || 'sports-gurukul'}/events/${payload.slug}`,
                resource_type: 'image',
                transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }]
            });
            payload.thumbnail = { url: result.secure_url, publicId: result.public_id, caption: payload.thumbnailCaption || '' };
        }

        // gallery
        const images = [];
        if (req.files?.images?.length) {
            for (const file of req.files.images) {
                const buf = file.buffer;
                const publicId = `${process.env.CLOUDINARY_FOLDER || 'sports-gurukul'}/events/${payload.slug}/img-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
                const result = await uploadBufferToCloudinary(buf, {
                    public_id: publicId,
                    folder: `${process.env.CLOUDINARY_FOLDER || 'sports-gurukul'}/events/${payload.slug}`,
                    resource_type: 'image',
                    transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }]
                });
                images.push({ url: result.secure_url, publicId: result.public_id, caption: '' });
            }
            payload.images = images;
        }

        const ev = new Event(payload);
        await ev.save();
        res.status(201).json({ data: ev });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const update = req.body;
        update.updatedBy = req.user.id;
        const ev = await Event.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!ev) return res.status(404).json({ error: 'not found' });
        res.json({ data: ev });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const ev = await Event.findByIdAndDelete(req.params.id);
        if (!ev) return res.status(404).json({ error: 'not found' });
        if (ev.thumbnail?.publicId) {
            try { await deleteFromCloudinary(ev.thumbnail.publicId, { resource_type: 'image' }); } catch (e) { console.warn('thumb del err', e.message); }
        }
        for (const img of ev.images || []) {
            try { await deleteFromCloudinary(img.publicId, { resource_type: 'image' }); } catch (e) { console.warn('img del err', e.message); }
        }

        res.json({ data: ev });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const allEvents = async (req, res) => {
    try {
        const q = {};
        if (req.query.sport) q.sport = req.query.sport;
        const events = await Event.find(q).sort({ startDate: -1 }).limit(200);
        res.json({ data: events });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}