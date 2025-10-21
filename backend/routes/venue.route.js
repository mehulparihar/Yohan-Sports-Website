import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { allVenue, createVenue, deleteVenue, updateVenue } from "../controllers/venue.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, upload.fields([{ name: 'images', maxCount: 10 }]), createVenue);
router.put("/:id", protectRoute, adminRoute, updateVenue);
router.delete("/:id", protectRoute, adminRoute, deleteVenue);
router.get("/", allVenue);

export default router;