import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import programRoutes from "./routes/program.route.js";
import eventRoutes from "./routes/event.route.js";
import venueRoutes from "./routes/venue.route.js";
import coachRoutes from "./routes/coach.route.js";
import enquiryRoutes from "./routes/enquiry.route.js";
import blogRoutes from "./routes/blog.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // frontend
  credentials: true,               // allow cookies
}));

app.use("/api/admin/auth", authRoutes);
app.use("/api/admin/programs", programRoutes);
app.use("/api/admin/events", eventRoutes);
app.use("/api/admin/venues", venueRoutes);
app.use("/api/admin/coach", coachRoutes);
app.use("/api/admin/enquiries", enquiryRoutes);
app.use("/api/admin/blogs", blogRoutes);


app.use("/api/programs", programRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/coach", coachRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use("/api/blogs", blogRoutes);

app.listen(PORT, () => {
    console.log("Server is running " + PORT);
    connectDB();
});