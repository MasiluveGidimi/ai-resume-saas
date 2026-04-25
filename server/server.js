import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/user.js";
import resumeRoutes from "./routes/resume.js";

const app = express();


app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});


app.use("/api/user", userRoutes);
app.use("/api/resume", resumeRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});