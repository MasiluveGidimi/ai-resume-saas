import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  credits: { type: Number, default: 5 },
  resumes: [
    {
      name: String,
      skills: String,
      experience: String,
      content: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model("User", userSchema);