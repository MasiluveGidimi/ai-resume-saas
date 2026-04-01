import { useState, useEffect } from "react";
import API from "../api/axios";

function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/")
      .then((res) => setMessage(res.data))
      .catch((err) => setMessage("API not reachable"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>{message}</p>
      <a href="/resume">Go to Resume Builder →</a>
    </div>
  );
}

export default Dashboard;
