import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Reports from "./pages/Reports";
import Chatbot from "./pages/Chatbot";

function App() {
  // 🔥 LOAD DATA SAFELY
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem("reports");
    return saved ? JSON.parse(saved) : [];
  });

  // 🔥 SAVE DATA
  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/upload"
          element={<Upload reports={reports} setReports={setReports} />}
        />

        <Route
          path="/reports"
          element={<Reports reports={reports} setReports={setReports} />}
        />

        <Route
          path="/chatbot"
          element={<Chatbot reports={reports} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;