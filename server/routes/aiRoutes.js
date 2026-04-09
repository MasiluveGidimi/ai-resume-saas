import express from "express";
import client from "../services/openai.js";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/generate-resume", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    
    if (user.credits <= 0) {
      return res.status(403).json({ error: "No credits left" });
    }

    const { name, skills, experience, jobTitle } = req.body;

    const prompt = `
    Create a professional resume for:

    Name: ${name}
    Job Title: ${jobTitle}
    Skills: ${skills}
    Experience: ${experience}
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional resume writer." },
        { role: "user", content: prompt },
      ],
    });

    const resume = response.choices[0].message.content;

    
    user.credits -= 1;
    await user.save();

    res.json({
      resume,
      creditsLeft: user.credits
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI generation failed" });
  }
});

export default router;
