import { Upload, FileText, Download } from 'lucide-react';

export function ProjectProposal() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Project Proposal</h1>
        <p className="page-description">Submit and track your project proposal</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Upload Project Proposal</h2>
          <p className="card-description">Due Date: December 15, 2025</p>
        </div>
        <div className="card-content">
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Project Title</label>
            <input
              type="text"
              placeholder="Enter your project title"
              className="form-input"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Team Members</label>
            <textarea
              rows="3"
              placeholder="List team members"
              className="form-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Upload Document</label>
            <div
              style={{
                border: '2px dashed #d1d5db',
                borderRadius: '0.5rem',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Upload className="w-12 h-12" style={{ margin: '0 auto', color: '#9ca3af' }} />
              <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
                Click to upload or drag and drop
              </p>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                PDF, DOC, DOCX (Max 10MB)
              </p>
            </div>
          </div>

          <button className="btn btn-primary">
            <FileText className="w-4 h-4" />
            Submit Proposal
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Submission History</h2>
        </div>
        <div className="card-content">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Feedback</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Version 1</td>
                  <td>2025-12-01</td>
                  <td>
                    <span className="badge info">Under Review</span>
                  </td>
                  <td>Waiting for feedback</td>
                  <td>
                    <button className="btn btn-secondary">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
