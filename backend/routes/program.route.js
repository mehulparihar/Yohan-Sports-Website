import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { allPrograms, createProgram, deleteProgram, updateProgram } from "../controllers/program.controller.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, createProgram);
router.put("/:id", protectRoute, adminRoute, updateProgram);
router.delete("/:id", protectRoute, adminRoute, deleteProgram);
router.get("/", allPrograms);

export default router;