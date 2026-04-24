import { useState } from "react";
import API from "../api";

export default function ResumeForm({ setData }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    experience: ""
  });

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    setData(updated);
  };

  const downloadPDF = async () => {
    const res = await API.post("/resume/generate", form, {
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <h2>Resume Form</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <textarea name="skills" placeholder="Skills" onChange={handleChange} />
      <textarea name="experience" placeholder="Experience" onChange={handleChange} />

      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
}