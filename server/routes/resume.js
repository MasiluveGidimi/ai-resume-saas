import express from "express";
import PDFDocument from "pdfkit";

const router = express.Router();


router.post("/generate", (req, res) => {
  const { name, email, skills, experience } = req.body;

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");

  doc.pipe(res);

  doc.fontSize(20).text(name);
  doc.fontSize(12).text(email);

  doc.moveDown();
  doc.text("Skills:");
  doc.text(skills);

  doc.moveDown();
  doc.text("Experience:");
  doc.text(experience);

  doc.end();
});

export default router;