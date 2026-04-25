import React, { useState, useEffect } from "react";

const API = "https://ai-resume-saas-zysj.onrender.com";

function App() {
  const [form, setForm] = useState({
    name: "",
    experience: "",
    skills: ""
  });

  const [preview, setPreview] = useState("");
  const [credits, setCredits] = useState(0);

  const token = "Bearer token";
  
  
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await fetch(`${API}/api/user/me`, {
          headers: {
            Authorization: token
          }
        });

        if (!res.ok) {
          console.log("Failed to load credits");
          return;
        }

        const data = await res.json();
        console.log("Credits loaded:", data);

        setCredits(data.credits);
      } catch (err) {
        console.error("Error fetching credits:", err);
      }
    };

    fetchCredits();
  }, []);

  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
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

    if (data.error) {
      alert(data.error);
      return;
    }

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
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>AI Resume Builder</h1>

      <h3>Credits: {credits}</h3>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <br /><br />

      <textarea
        name="experience"
        placeholder="Experience"
        onChange={handleChange}
      />
      <br /><br />

      <textarea
        name="skills"
        placeholder="Skills (comma separated)"
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={generateResume}>
        Generate Preview
      </button>

      {/* PREVIEW */}
      {preview && (
        <div style={{ marginTop: 20 }}>
          <h2>Preview</h2>

          <div style={{
            background: "#f4f4f4",
            padding: 15,
            whiteSpace: "pre-wrap",
            borderRadius: 8
          }}>
            {preview}
          </div>

          <br />

          <button onClick={downloadPDF}>
            Download PDF (-1 credit)
          </button>
        </div>
      )}
    </div>
  );
}

export default App;