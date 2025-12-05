import { Plus, Calendar, Edit, Trash2 } from 'lucide-react';

export function Deadlines() {
  const deadlines = [
    { id: 1, title: 'Project Proposal Submission', date: '2025-12-15', type: 'Submission', status: 'Active' },
    { id: 2, title: 'SRS Document Submission', date: '2025-12-20', type: 'Submission', status: 'Active' },
    { id: 3, title: 'SDD Document Submission', date: '2025-12-28', type: 'Submission', status: 'Active' },
    { id: 4, title: 'Proposal Defense', date: '2025-12-18', type: 'Defense', status: 'Active' },
    { id: 5, title: 'Final Defense', date: '2026-01-15', type: 'Defense', status: 'Upcoming' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Deadline Management</h1>
        <p className="page-description">Manage submission deadlines and important dates</p>
      </div>

      <div className="card">
        <div className="card-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <button className="btn btn-primary">
              <Plus className="w-4 h-4" />
              Add New Deadline
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deadlines.map((deadline) => (
                  <tr key={deadline.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar className="w-4 h-4" style={{ color: '#800020' }} />
                        {deadline.title}
                      </div>
                    </td>
                    <td>{deadline.date}</td>
                    <td>
                      <span className={`badge ${
                        deadline.type === 'Submission' ? 'info' : 'warning'
                      }`}>
                        {deadline.type}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        deadline.status === 'Active' ? 'success' : 'info'
                      }`}>
                        {deadline.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-secondary">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="btn btn-danger">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Upcoming Deadlines Calendar</h2>
        </div>
        <div className="card-content">
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            <Calendar className="w-16 h-16" style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
            <p>Calendar view coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
