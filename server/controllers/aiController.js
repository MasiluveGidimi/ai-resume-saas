import OpenAI from "openai";
import User from "../models/User.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateResume = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    
    if (!user || user.credits <= 0) {
      return res.status(403).json({ error: "No credits left" });
    }

    const { name, skills, experience } = req.body;

    const prompt = `
   Generate a professional resume for:

      Name: ${name}
      Skills: ${skills}
      Experience: ${experience}

      Make it:
      - ATS-friendly
      - Well formatted
      - Job-winning
      - Modern and concise
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    const resumeContent = completion.choices[0].message.content;

    
    if (!user.resumes) {
      user.resumes = [];
    }

    user.resumes.push({
      content: resumeContent
    });

    
    user.credits -= 1;

    await user.save();

    res.json({
      resume: resumeContent,
      remainingCredits: user.credits
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};