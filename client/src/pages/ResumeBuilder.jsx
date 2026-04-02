import { useState, useEffect } from "react";
import API from "../api/axios";
import { jsPDF } from "jspdf";
import "./ResumeBuilder.css";

function ResumeBuilder() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(0);

  
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/resume/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCredits(res.data.credits);
      } catch (err) {
        console.error("Error fetching credits:", err);
      }
    };

    fetchCredits();
  }, []);

  
  const handleGenerate = async () => {
    if (credits <= 0) return alert("⚠️ No credits left!");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/ai/generate/resume",
        { name, skills, experience },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      setResult(res.data.resume);

      
      setCredits(res.data.remainingCredits);

    } catch (error) {
      console.error("Error generating resume:", error);
      setResult("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    const lines = doc.splitTextToSize(result, 180);
    doc.text(lines, 10, 10);
    doc.save(`${name || "resume"}.pdf`);
  };

  return (
    <div className="resume-container">
      <h1 className="resume-title">AI Resume Builder</h1>

      
      <p>Credits left: {credits}</p>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <textarea
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "⚡ Generate Resume"}
      </button>

      {result && (
        <>
          <pre>{result}</pre>
          <button onClick={downloadPDF}>📄 Download PDF</button>
        </>
      )}
    </div>
  );
}

export default ResumeBuilder;