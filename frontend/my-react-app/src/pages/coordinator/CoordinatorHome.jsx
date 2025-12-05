import { Users, FileCheck, Clock, AlertCircle } from 'lucide-react';

export function CoordinatorHome({ user }) {
  const pendingReviews = [
    { id: 1, student: 'John Doe', document: 'Project Proposal', submittedOn: '2025-12-01', priority: 'high' },
    { id: 2, student: 'Jane Smith', document: 'SRS Document', submittedOn: '2025-12-02', priority: 'medium' },
    { id: 3, student: 'Mike Johnson', document: 'SDD Document', submittedOn: '2025-12-03', priority: 'low' }
  ];

  const advisedTeams = [
    { id: 1, teamName: 'Team Alpha', members: 4, project: 'IntelliTrack System', status: 'on-track' },
    { id: 2, teamName: 'Team Beta', members: 3, project: 'Library Management', status: 'at-risk' },
    { id: 3, teamName: 'Team Gamma', members: 4, project: 'Inventory System', status: 'on-track' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Welcome back, {user.name}!</h1>
        <p className="page-description">
          Overview of student projects and submissions
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon maroon">
            <Users className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Advised Teams</p>
            <p className="stat-value">3</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon gold">
            <Clock className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Pending Reviews</p>
            <p className="stat-value">8</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <FileCheck className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Reviewed This Week</p>
            <p className="stat-value">12</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">At-Risk Projects</p>
            <p className="stat-value">1</p>
          </div>
        </div>
      </div>

      {/* Pending Reviews */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Pending Reviews</h2>
          <p className="card-description">Student submissions awaiting your feedback</p>
        </div>
        <div className="card-content">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Document</th>
                  <th>Submitted On</th>
                  <th>Priority</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingReviews.map((review) => (
                  <tr key={review.id}>
                    <td>{review.student}</td>
                    <td>{review.document}</td>
                    <td>{review.submittedOn}</td>
                    <td>
                      <span className={`badge ${
                        review.priority === 'high' ? 'danger' :
                        review.priority === 'medium' ? 'warning' :
                        'info'
                      }`}>
                        {review.priority}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-primary">Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Advised Teams */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Advised Teams</h2>
          <p className="card-description">Teams under your supervision</p>
        </div>
        <div className="card-content">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Members</th>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {advisedTeams.map((team) => (
                  <tr key={team.id}>
                    <td>{team.teamName}</td>
                    <td>{team.members} students</td>
                    <td>{team.project}</td>
                    <td>
                      <span className={`badge ${
                        team.status === 'on-track' ? 'success' : 'warning'
                      }`}>
                        {team.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary">View Details</button>
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
