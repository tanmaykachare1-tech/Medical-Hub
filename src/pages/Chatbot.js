import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chatbot.css";

function Chatbot({ reports = [] }) {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedReport, setSelectedReport] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");

  const handleAsk = () => {
    setAnswer("AI Response: Please consult a doctor.");
  };

  const handleUpload = () => {
    let fileName = "";

    if (selectedFile) {
      fileName = selectedFile;
    } else if (selectedReport) {
      fileName = selectedReport;
    }

    setUploadedFile(fileName);

    setAnswer(
      "AI Summary: " +
        fileName +
        " analyzed successfully. Please consult doctor."
    );

    setShowPopup(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-box">
        <h1>AI Chatbot</h1>

        <textarea
          placeholder="Ask something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>

        <div className="file-section">
          <button
            className="choose-btn"
            onClick={() => setShowPopup(true)}
          >
            Choose File
          </button>
        </div>

        {uploadedFile && <p>Uploaded: {uploadedFile}</p>}

        <button className="ask-btn" onClick={handleAsk}>
          Ask AI
        </button>

        <p>{answer}</p>

        {/* ✅ BACK BUTTON (BLUE) */}
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      {/* 🔥 POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Select File Source</h3>

            <p>Upload from Device</p>
            <input
              type="file"
              onChange={(e) =>
                setSelectedFile(e.target.files[0]?.name || "")
              }
            />

            <p>Upload from Reports</p>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              <option value="">Select Report</option>

              {reports.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <button className="ask-btn" onClick={handleUpload}>
              Upload File
            </button>

            {/* ❌ CLOSE BUTTON (RED) */}
            <button
              className="close-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;