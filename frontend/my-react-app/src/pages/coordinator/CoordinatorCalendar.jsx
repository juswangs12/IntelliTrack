import { Calendar as CalendarIcon, Plus } from 'lucide-react';

export function CoordinatorCalendar() {
  const upcomingEvents = [
    { id: 1, title: 'Proposal Defense - Team Alpha', date: '2025-12-10', time: '10:00 AM', type: 'defense' },
    { id: 2, title: 'SRS Review - Team Beta', date: '2025-12-12', time: '2:00 PM', type: 'review' },
    { id: 3, title: 'Progress Meeting - Team Gamma', date: '2025-12-15', time: '1:00 PM', type: 'meeting' },
    { id: 4, title: 'Final Defense - Team Delta', date: '2025-12-18', time: '9:00 AM', type: 'defense' }
  ];

  const deadlines = [
    { id: 1, title: 'Project Proposal Deadline', date: '2025-12-15' },
    { id: 2, title: 'SRS Submission', date: '2025-12-20' },
    { id: 3, title: 'SDD Submission', date: '2025-12-28' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Calendar</h1>
        <p className="page-description">Manage your schedule and important dates</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Upcoming Events */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 className="card-title">Upcoming Events</h2>
              <p className="card-description">Your scheduled meetings and defenses</p>
            </div>
            <button className="btn btn-primary">
              <Plus className="w-4 h-4" />
              New Event
            </button>
          </div>
          <div className="card-content">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingEvents.map((event) => (
                    <tr key={event.id}>
                      <td>{event.title}</td>
                      <td>{event.date}</td>
                      <td>{event.time}</td>
                      <td>
                        <span className={`badge ${
                          event.type === 'defense' ? 'danger' :
                          event.type === 'review' ? 'warning' :
                          'info'
                        }`}>
                          {event.type}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-secondary">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Important Deadlines */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Important Deadlines</h2>
            <p className="card-description">Upcoming submission deadlines</p>
          </div>
          <div className="card-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {deadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <CalendarIcon className="w-5 h-5" style={{ color: '#800020' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{deadline.title}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{deadline.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
