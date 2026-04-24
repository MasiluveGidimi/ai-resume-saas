import { useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";

export default function Home() {
  const [data, setData] = useState({});

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <ResumeForm setData={setData} />
      <ResumePreview data={data} />
    </div>
  );
}