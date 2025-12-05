import { BarChart, TrendingUp, Users, FileText } from "lucide-react";

export function Analytics() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Analytics & Reports</h1>
        <p className="page-description">
          View system-wide statistics and insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon maroon">
            <Users className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Users</p>
            <p className="stat-value">172</p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#10b981",
                marginTop: "0.25rem",
              }}
            >
              ↑ 12% from last semester
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon gold">
            <FileText className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Submissions</p>
            <p className="stat-value">348</p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#10b981",
                marginTop: "0.25rem",
              }}
            >
              ↑ 8% from last month
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Completion Rate</p>
            <p className="stat-value">92%</p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#10b981",
                marginTop: "0.25rem",
              }}
            >
              ↑ 5% from last semester
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <BarChart className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Avg Response Time</p>
            <p className="stat-value">2.3 days</p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#10b981",
                marginTop: "0.25rem",
              }}
            >
              ↓ 15% improvement
            </p>
          </div>
        </div>
      </div>

      {/* Submission Status */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Submission Status Overview</h2>
          <p className="card-description">Current status of all submissions</p>
        </div>
        <div className="card-content">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <div
              style={{
                padding: "1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#10b981",
                }}
              >
                145
              </p>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Approved</p>
            </div>
            <div
              style={{
                padding: "1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#3b82f6",
                }}
              >
                24
              </p>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                Under Review
              </p>
            </div>
            <div
              style={{
                padding: "1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#eab308",
                }}
              >
                12
              </p>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                Revisions Needed
              </p>
            </div>
            <div
              style={{
                padding: "1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#ef4444",
                }}
              >
                8
              </p>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Performance by Document Type</h2>
        </div>
        <div className="card-content">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Document Type</th>
                  <th>Submitted</th>
                  <th>Approved</th>
                  <th>Pending</th>
                  <th>Success Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Project Proposal</td>
                  <td>45</td>
                  <td>42</td>
                  <td>3</td>
                  <td>
                    <span className="badge success">93%</span>
                  </td>
                </tr>
                <tr>
                  <td>SRS Document</td>
                  <td>38</td>
                  <td>35</td>
                  <td>3</td>
                  <td>
                    <span className="badge success">92%</span>
                  </td>
                </tr>
                <tr>
                  <td>SDD Document</td>
                  <td>32</td>
                  <td>28</td>
                  <td>4</td>
                  <td>
                    <span className="badge warning">88%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Submission Trends</h2>
        </div>
        <div className="card-content">
          <div
            style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}
          >
            <BarChart
              className="w-16 h-16"
              style={{ margin: "0 auto 1rem", color: "#9ca3af" }}
            />
            <p>Chart visualization coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
