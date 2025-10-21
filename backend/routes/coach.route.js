import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { allCoach, createCoach, deleteCoach, updateCoach } from "../controllers/coach.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, upload.fields([{ name: 'images', maxCount: 10 }]), createCoach);
router.put("/:id", protectRoute, adminRoute, updateCoach);
router.delete("/:id", protectRoute, adminRoute, deleteCoach);
router.get("/", allCoach);


export default router;