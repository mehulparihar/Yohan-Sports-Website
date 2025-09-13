import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { allCoach, createCoach, deleteCoach, updateCoach } from "../controllers/coach.controller.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, createCoach);
router.put("/:id", protectRoute, adminRoute, updateCoach);
router.delete("/:id", protectRoute, adminRoute, deleteCoach);
router.get("/", allCoach);


export default router;