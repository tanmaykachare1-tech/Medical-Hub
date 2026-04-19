import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

function Upload({ reports, setReports }) {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  // ✅ GET LOGGED USER
  const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const handleUpload = () => {
    if (!file || !type) {
      setMessage("Please select file and type ❗");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const newReport = {
        name: file.name,
        type: type,

        // 🔥 FINAL FIX
        uploadedBy: currentUser?.name || "Unknown",

        date: new Date().toLocaleDateString(),
        fileData: reader.result,
        fileType: file.type,
      };

      setReports([...reports, newReport]);

      setMessage("File uploaded successfully ✅");

      setShowPopup(false);
      setFile(null);
      setType("");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h1>Upload Report</h1>

        <button
          className="choose-btn"
          onClick={() => setShowPopup(true)}
        >
          Upload File
        </button>

        {message && <p>{message}</p>}

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Upload Medical Report</h3>

            <p>Report Type</p>

            {/* ✅ BOTH SELECT + INPUT */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Blood Test">Blood Test</option>
              <option value="X-Ray">X-Ray</option>
              <option value="MRI">MRI</option>
              <option value="Prescription">Prescription</option>
            </select>

            <input
              type="text"
              placeholder="Or type custom report type..."
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <p>Upload File</p>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button className="ask-btn" onClick={handleUpload}>
              Upload
            </button>

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

export default Upload;