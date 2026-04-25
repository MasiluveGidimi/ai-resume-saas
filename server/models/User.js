import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  credits: {
    type: Number,
    default: 5
  }
});

export default mongoose.model("User", userSchema);