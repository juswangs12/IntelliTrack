import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";

export function StudentHome({ user }) {
  const upcomingDeadlines = [
    {
      id: 1,
      title: "Project Proposal",
      dueDate: "2025-12-15",
      status: "pending",
    },
    {
      id: 2,
      title: "SRS Document",
      dueDate: "2025-12-20",
      status: "in-progress",
    },
    {
      id: 3,
      title: "SDD Document",
      dueDate: "2025-12-28",
      status: "not-started",
    },
  ];

  const recentSubmissions = [
    {
      id: 1,
      title: "Project Proposal - Draft 1",
      submittedOn: "2025-12-01",
      status: "reviewed",
    },
    {
      id: 2,
      title: "Team Formation",
      submittedOn: "2025-11-28",
      status: "approved",
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Welcome back, {user.name}!</h1>
        <p className="page-description">
          Here's an overview of your capstone project progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon maroon">
            <FileText className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Submissions</p>
            <p className="stat-value">8</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon gold">
            <Clock className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Pending Reviews</p>
            <p className="stat-value">2</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Approved</p>
            <p className="stat-value">5</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Revisions Needed</p>
            <p className="stat-value">1</p>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Upcoming Deadlines</h2>
          <p className="card-description">
            Stay on track with your submissions
          </p>
        </div>
        <div className="card-content">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {upcomingDeadlines.map((deadline) => (
                  <tr key={deadline.id}>
                    <td>{deadline.title}</td>
                    <td>{deadline.dueDate}</td>
                    <td>
                      <span
                        className={`badge ${
                          deadline.status === "pending"
                            ? "warning"
                            : deadline.status === "in-progress"
                            ? "info"
                            : "danger"
                        }`}
                      >
                        {deadline.status.replace("-", " ")}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-primary">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Recent Submissions</h2>
          <p className="card-description">Your latest submitted work</p>
        </div>
        <div className="card-content">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Submitted On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((submission) => (
                  <tr key={submission.id}>
                    <td>{submission.title}</td>
                    <td>{submission.submittedOn}</td>
                    <td>
                      <span
                        className={`badge ${
                          submission.status === "approved"
                            ? "success"
                            : submission.status === "reviewed"
                            ? "info"
                            : "warning"
                        }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
