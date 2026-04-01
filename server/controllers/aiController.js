import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateResume = async (req, res) => {
  try {
    const { name, skills, experience } = req.body;
    const prompt = `
    Create a professional resume for:
    Name: ${name}
    Skills: ${skills}
    Experience: ${experience}
    Format with Summary, Skills, Experience
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({ resume: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};