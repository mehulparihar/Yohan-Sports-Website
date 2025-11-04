import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { allBlogs, createBlog, deleteBlog, updateBlog } from "../controllers/blog.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/",protectRoute, adminRoute , upload.fields([{ name: 'images', maxCount: 10 }]),createBlog);
router.put("/:id",protectRoute, adminRoute, updateBlog);
router.delete("/:id",protectRoute, adminRoute,deleteBlog);
router.get("/", allBlogs);

export default router;