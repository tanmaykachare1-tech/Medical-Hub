import { useState } from "react";
import "./Reports.css";

function Reports({ reports, setReports }) {
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [zoom, setZoom] = useState(1);

  const filteredReports = reports.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  // DELETE
  const handleDelete = (index) => {
    const updated = reports.filter((_, i) => i !== index);
    setReports(updated);
    setSelectedReport(null);
  };

  // DOWNLOAD
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedReport.fileData;
    link.download = selectedReport.name;
    link.click();
  };

  // FULLSCREEN
  const handleFullScreen = () => {
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head>
          <title>${selectedReport.name}</title>
        </head>
        <body style="margin:0">
          <iframe 
            src="${selectedReport.fileData}" 
            width="100%" 
            height="100%" 
            style="border:none"
          ></iframe>
        </body>
      </html>
    `);
  };

  return (
    <div className="main-container">
      <div className="reports-wrapper">

        {/* LEFT PANEL */}
        <div className="left-panel">
          <h2>Medical Reports 📁</h2>

          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="report-list">
            {filteredReports.map((report, index) => (
              <div
                key={index}
                className="report-card"
                onClick={() => setSelectedReport(report)}
              >
                <h4>{report.name}</h4>
                <p>{report.date}</p>

                <span className="type">{report.type}</span>
                <span className="user">{report.uploadedBy}</span>

                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(index);
                  }}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          {selectedReport ? (
            <>
              <h2>{selectedReport.name}</h2>

              <p><b>Type:</b> {selectedReport.type}</p>
              <p><b>Uploaded By:</b> {selectedReport.uploadedBy}</p>
              <p><b>Date:</b> {selectedReport.date}</p>

              {/* ACTION BUTTONS */}
              <div className="button-group">
                <button onClick={handleDownload}>⬇ Download</button>
                <button onClick={() => setZoom(zoom + 0.2)}>➕ Zoom</button>
                <button onClick={() => setZoom(1)}>🔄 Reset</button>
                <button onClick={handleFullScreen}>🔳 Full Screen</button>
              </div>

              {/* PREVIEW */}
              <div className="preview-box">
                {selectedReport.fileType === "application/pdf" ? (
                  <iframe
                    src={selectedReport.fileData}
                    title="PDF"
                    className="preview-frame"
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: "0 0"
                    }}
                  />
                ) : selectedReport.fileType.startsWith("image/") ? (
                  <img
                    src={selectedReport.fileData}
                    alt="report"
                    style={{ width: `${zoom * 100}%` }}
                  />
                ) : (
                  <p>Preview not supported</p>
                )}
              </div>
            </>
          ) : (
            <div className="empty">
              <h3>Select a report to view</h3>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Reports;