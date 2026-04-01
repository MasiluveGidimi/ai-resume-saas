import express from "express";
import { register, login, changePassword } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.create({
      email,
      password, 
      credits: 5 
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/login", login);


router.put("/change-password", authMiddleware, changePassword);

export default router;