import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeHistory from "./pages/ResumeHistory";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <h2>🚀 SaaS App</h2>
          <Link to="/">Home</Link>
          <Link to="/resume">Resume Builder</Link>
          <Link to="/history">History</Link>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<h1>Welcome 👋</h1>} />
            <Route path="/resume" element={<ResumeBuilder />} />
            <Route path="/history" element={<ResumeHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;