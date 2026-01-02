import { Upload, FileText, Download } from "lucide-react";

export function SRSDocument() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">
          Software Requirements Specification (SRS)
        </h1>
        <p className="page-description">Submit and track your SRS document</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Upload SRS Document</h2>
          <p className="card-description">Due Date: December 20, 2025</p>
        </div>
        <div className="card-content">
          <div style={{ marginBottom: "1.5rem" }}>
            <label className="form-label">Document Version</label>
            <input
              type="text"
              placeholder="e.g., v1.0"
              className="form-input"
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label className="form-label">Upload Document</label>
            <div
              style={{
                border: "2px dashed #d1d5db",
                borderRadius: "0.5rem",
                padding: "2rem",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Upload
                className="w-12 h-12"
                style={{ margin: "0 auto", color: "#9ca3af" }}
              />
              <p style={{ marginTop: "0.5rem", color: "#6b7280" }}>
                Click to upload or drag and drop
              </p>
              <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                PDF, DOC, DOCX (Max 10MB)
              </p>
            </div>
          </div>

          <button className="btn btn-primary">
            <FileText className="w-4 h-4" />
            Submit SRS
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Submission History</h2>
        </div>
        <div className="card-content">
          <p style={{ color: "#6b7280", textAlign: "center", padding: "2rem" }}>
            No submissions yet
          </p>
        </div>
      </div>
    </div>
  );
}
