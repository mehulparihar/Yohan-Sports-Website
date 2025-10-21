import { deleteFromCloudinary, uploadBufferToCloudinary } from "../lib/cloudinary.js";
import Venue from "../models/venue.model.js";


export const createVenue = async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.name) return res.status(400).json({ error: 'name required' });
        payload.createdBy = req.user.id;

        // thumbnail
        if (req.files?.thumbnail?.[0]) {
            const buf = req.files.thumbnail[0].buffer;
            const publicId = `${process.env.CLOUDINARY_FOLDER || 'sports-gurukul'}/venues/${payload.slug}/thumb-${Date.now()}`;
            const r = await uploadBufferToCloudinary(buf, {
                public_id: publicId,
                folder: `${process.env.CLOUDINARY_FOLDER || 'sports-gurukul'}/venues/${payload.slug}`,
                resource_type: 'image',
                transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }]
            });
            payload.thumbnail = { url: r.secure_url, publicId: r.public_id, caption: payload.thumbnailCaption || '' };
        }

        // images
        const images = [];
        if (req.files?.images?.length) {
            for (const file of req.files.images) {
                const buf = file.buffer;
                const publicId = `${process.env.CLOUDINARY_FOLDER || 'sports-gurukul'}/venues/${payload.slug}/img-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
                const r = await uploadBufferToCloudinary(buf, {
                    public_id: publicId,
                    folder: `${process.env.CLOUDINARY_FOLDER || 'sports-gurukul'}/venues/${payload.slug}`,
                    resource_type: 'image',
                    transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }]
                });
                images.push({ url: r.secure_url, publicId: r.public_id, caption: '' });
            }
            payload.images = images;
        }
        const v = new Venue(payload);
        await v.save();
        res.status(201).json({ data: v });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateVenue = async (req, res) => {
    try {
        const update = req.body;
        update.updatedBy = req.user.id;
        const v = await Venue.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!v) return res.status(404).json({ error: 'not found' });
        res.json({ data: v });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteVenue = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndDelete(req.params.id);
        if (!venue) return res.status(404).json({ error: 'Venue not found' });

        if (venue.thumbnail?.publicId) {
            try { await deleteFromCloudinary(venue.thumbnail.publicId, { resource_type: 'image' }); } catch (e) { console.warn('thumb del', e.message); }
        }
        for (const img of venue.images || []) {
            try { await deleteFromCloudinary(img.publicId, { resource_type: 'image' }); } catch (e) { console.warn('img del', e.message); }
        }

        res.json({ data: venue});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const allVenue = async (req, res) => {
    try {
        const venues = await Venue.find({}).sort({ name: 1 });
        res.json({ data: venues });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
