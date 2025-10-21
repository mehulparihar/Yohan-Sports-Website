import Enquiry from "../models/enquiry.model.js";

export const createEnquiry = async (req, res) => {
    try {
        
        const payload = { ...req.body };
        if (!payload.name || !payload.message) return res.status(400).json({ error: 'name and message are required' });

        payload.meta = {
            ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            userAgent: req.get('User-Agent'),
            referer: req.get('Referer') || null,
        };

        const enquiry = new Enquiry(payload);
        await enquiry.save();

        // optional: send email to admin inbox and auto-reply to user
        if (process.env.SENDGRID_API_KEY) {
            try {
                await sendEnquiryNotification(enquiry);
            } catch (err) {
                console.error('Enquiry email failed', err);
            }
        }

        res.status(201).json({ data: enquiry });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const allEnquiry = async (req, res) => {
    console.log('Fetching all enquiries with query:', req.query);
    try {
        const q = {};
        if (req.query.status) q.status = req.query.status;
        if (req.query.type) q.type = req.query.type;
        if (req.query.programId) q.programId = req.query.programId;
        const page = Math.max(1, parseInt(req.query.page || '1'));
        const limit = Math.min(100, parseInt(req.query.limit || '25'));
        const skip = (page - 1) * limit;
        const items = await Enquiry.find(q).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('createdBy', 'name email').populate('assignedTo', 'name email');
        res.json({ data: items });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getEnquiryById = async (req, res) => {
    try {
        const e = await Enquiry.findById(req.params.id).populate('createdBy', 'name email').populate('assignedTo', 'name email');
        if (!e) return res.status(404).json({ error: 'not found' });
        res.json({ data: e });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

