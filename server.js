import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

app.listen(process.env.PORT || 5000);