export default function ResumePreview({ data }) {
  return (
    <div style={{ border: "1px solid black", padding: "20px", width: "400px" }}>
      <h1>{data.name}</h1>
      <p>{data.email}</p>

      <h3>Skills</h3>
      <p>{data.skills}</p>

      <h3>Experience</h3>
      <p>{data.experience}</p>
    </div>
  );
}