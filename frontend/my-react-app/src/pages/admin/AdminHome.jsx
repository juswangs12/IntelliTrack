import { Users, FileText, Clock, CheckCircle } from 'lucide-react';

export function AdminHome({ user }) {
  const recentActivity = [
    { id: 1, action: 'New submission from Group 5', time: '5 minutes ago', type: 'submission' },
    { id: 2, action: 'Adviser Dr. Smith approved Group 2 proposal', time: '1 hour ago', type: 'approval' },
    { id: 3, action: 'New user registered: John Doe', time: '2 hours ago', type: 'registration' },
    { id: 4, action: 'Deadline reminder sent to all students', time: '3 hours ago', type: 'notification' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Welcome, {user.name}!</h1>
        <p className="page-description">
          Administrator Dashboard - Manage the entire capstone system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon maroon">
            <Users className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Students</p>
            <p className="stat-value">156</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon gold">
            <Users className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Advisers</p>
            <p className="stat-value">8</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <FileText className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Active Projects</p>
            <p className="stat-value">12</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <Clock className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Pending Reviews</p>
            <p className="stat-value">24</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Recent System Activity</h2>
          <p className="card-description">Latest actions and events in the system</p>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem'
                }}
              >
                <div
                  style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '50%',
                    marginTop: '0.5rem',
                    backgroundColor:
                      activity.type === 'submission' ? '#3b82f6' :
                      activity.type === 'approval' ? '#10b981' :
                      activity.type === 'registration' ? '#8b5cf6' :
                      '#eab308',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.875rem', color: '#111827', marginBottom: '0.125rem' }}>
                    {activity.action}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">System Health</h2>
          <p className="card-description">Overall system status</p>
        </div>
        <div className="card-content">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Database Connection</span>
              <span className="badge success">Healthy</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>File Storage</span>
              <span className="badge success">Healthy</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Email Service</span>
              <span className="badge success">Healthy</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>API Response Time</span>
              <span className="badge info">142ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
