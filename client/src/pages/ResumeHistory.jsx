import { useEffect, useState } from "react";
import API from "../api/axios";
import { jsPDF } from "jspdf";
import "./ResumeBuilder.css";

function ResumeHistory() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/resume/history");
        setResumes(res.data.resumes || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  const downloadPDF = (resume) => {
    const doc = new jsPDF();
    doc.text(resume.content, 10, 10);
    doc.save(`${resume.name || "resume"}.pdf`);
  };

  return (
    <div className="resume-container">
      <h1 className="resume-title">Resume History</h1>

      {resumes.length === 0 ? (
        <p>No resumes generated yet.</p>
      ) : (
        resumes.map((resume, i) => (
          <div key={i} className="resume-card">
            <pre>{resume.content}</pre>
            <button
              className="btn-download"
              onClick={() => downloadPDF(resume)}
            >
              📄 Download
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ResumeHistory;