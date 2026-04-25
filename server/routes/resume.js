import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import PDFDocument from "pdfkit";

const router = express.Router();

router.post("/generate", auth, async (req, res) => {
  const { name, experience, skills } = req.body;

  const resume = `
NAME: ${name}

EXPERIENCE:
${experience}

SKILLS:
${skills}
`;

  res.json({ resume });
});

router.post("/pdf", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user || user.credits <= 0) {
    return res.status(403).json({ error: "No credits" });
  }

  user.credits -= 1;
  await user.save();

  const { content } = req.body;

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");

  doc.pipe(res);
  doc.text(content);
  doc.end();
});

export default router;