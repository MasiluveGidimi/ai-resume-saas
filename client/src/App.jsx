import React, { useState, useEffect } from "react";

const API = "https://ai-resume-saas-zysj.onrender.com";

function App() {
  const [form, setForm] = useState({
    name: "",
    experience: "",
    skills: ""
  });

  const [preview, setPreview] = useState("");
  const [credits, setCredits] = useState(5);

  const token = "Bearer token"; 
  
  useEffect(() => {
    const fetchCredits = async () => {
      const res = await fetch(`${API}/api/user/me`, {
        headers: {
          Authorization: token
        }
      });

      const data = await res.json();
      setCredits(data.credits);
    };

    fetchCredits();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateResume = async () => {
    const res = await fetch(`${API}/api/resume/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setPreview(data.resume);
  };

 
  const downloadPDF = async () => {
    const res = await fetch(`${API}/api/resume/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ content: preview })
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error);
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    a.click();

    
    setCredits(prev => prev - 1);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Resume Builder</h1>

      <h3>Credits: {credits}</h3>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <br />

      <textarea
        name="experience"
        placeholder="Experience"
        onChange={handleChange}
      />
      <br />

      <textarea
        name="skills"
        placeholder="Skills (comma separated)"
        onChange={handleChange}
      />
      <br />

      <button onClick={generateResume}>
        Generate Preview
      </button>

      {preview && (
        <div style={{ marginTop: 20 }}>
          <h2>Preview</h2>

          <pre style={{
            background: "#f5f5f5",
            padding: 10,
            whiteSpace: "pre-wrap"
          }}>
            {preview}
          </pre>

          <button onClick={downloadPDF}>
            Download PDF (-1 credit)
          </button>
        </div>
      )}
    </div>
  );
}

export default App;