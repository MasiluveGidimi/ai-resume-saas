import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./server/app.js";

dotenv.config();


console.log("MONGO_URL:", process.env.MONGO_URL);


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB error:", err));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});