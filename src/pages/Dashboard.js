import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

      <div className="dashboard-box">
        <h1>Dashboard</h1>

        {/* ✅ FIXED */}
        <p className="welcome-text">
          Welcome {user?.name || "User"}
        </p>

        <button onClick={() => navigate("/upload")}>
          Upload Report
        </button>

        <button onClick={() => navigate("/reports")}>
          View Reports
        </button>

        <button onClick={() => navigate("/chatbot")}>
          AI Chatbot
        </button>
      </div>
    </div>
  );
}

export default Dashboard;