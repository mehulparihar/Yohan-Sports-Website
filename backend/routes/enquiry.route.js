import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { allEnquiry, getEnquiryById, createEnquiry } from "../controllers/enquiry.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, allEnquiry);
router.get("/:id", protectRoute, adminRoute, getEnquiryById);
router.post('/', createEnquiry);

export default router;