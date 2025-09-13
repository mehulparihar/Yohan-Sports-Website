import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { allEvents, createEvent, deleteEvent, updateEvent } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, createEvent);
router.put("/:id", protectRoute, adminRoute, updateEvent);
router.delete("/:id", protectRoute, adminRoute, deleteEvent);
router.get("/", allEvents);

export default router;