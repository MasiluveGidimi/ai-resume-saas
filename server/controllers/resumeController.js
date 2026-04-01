import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateResume = async (req, res) => {
  const { name, skills, experience } = req.body;

  try {
    const prompt = `
    Create a professional resume for:

    Name: ${name}
    Skills: ${skills}
    Experience: ${experience}

    Format it cleanly with sections:
    - Summary
    - Skills
    - Experience
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const resumeContent = completion.choices[0].message.content;

    
    res.json({ resume: resumeContent });

  } catch (error) {
    console.error("Resume generation error:", error);
    res.status(500).json({ error: "Resume generation failed" });
  }
};
