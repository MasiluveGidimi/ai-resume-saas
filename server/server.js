import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";


import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);


app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));