import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { allEvents, createEvent, deleteEvent, updateEvent } from "../controllers/event.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute,  upload.fields([{ name: 'images', maxCount: 10 }]),createEvent);
router.put("/:id", protectRoute, adminRoute, updateEvent);
router.delete("/:id", protectRoute, adminRoute, deleteEvent);
router.get("/", allEvents);

export default router;