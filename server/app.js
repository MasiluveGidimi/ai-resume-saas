import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();


app.use(express.json());

app.use(cors({
  origin: "https://your-frontend.vercel.app",
  credentials: true
}));


app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;