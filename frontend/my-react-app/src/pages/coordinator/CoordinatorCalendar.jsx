import { useState } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react';

export function CoordinatorCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 2));
  const [selectedDate, setSelectedDate] = useState(null);

  const upcomingEvents = [
    { id: 1, title: 'Proposal Defense - Team Alpha', date: '2026-01-10', time: '10:00 AM', type: 'defense' },
    { id: 2, title: 'SRS Review - Team Beta', date: '2026-01-12', time: '2:00 PM', type: 'review' },
    { id: 3, title: 'Progress Meeting - Team Gamma', date: '2026-01-15', time: '1:00 PM', type: 'meeting' },
    { id: 4, title: 'Final Defense - Team Delta', date: '2026-01-18', time: '9:00 AM', type: 'defense' }
  ];

  const deadlines = [
    { id: 1, title: 'Project Proposal Deadline', date: '2026-01-15', status: 'upcoming', daysLeft: 13 },
    { id: 2, title: 'SRS Submission', date: '2026-01-20', status: 'upcoming', daysLeft: 18 },
    { id: 3, title: 'SDD Submission', date: '2026-01-28', status: 'upcoming', daysLeft: 26 }
  ];

  const submissions = [
    { teamName: 'Team Alpha', document: 'Proposal', date: '2026-01-08', status: 'on-time' },
    { teamName: 'Team Beta', document: 'Proposal', date: '2026-01-16', status: 'late' },
    { teamName: 'Team Gamma', document: 'SRS', date: '2026-01-12', status: 'on-time' },
    { teamName: 'Team Delta', document: 'Proposal', date: '2026-01-09', status: 'on-time' },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const getEventsForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const events = upcomingEvents.filter(e => e.date === dateStr);
    const deadlinesForDate = deadlines.filter(d => d.date === dateStr);
    const submissionsForDate = submissions.filter(s => s.date === dateStr);
    return { events, deadlines: deadlinesForDate, submissions: submissionsForDate };
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Calendar & Deadlines</h1>
        <p className="page-description">Manage your schedule, deadlines, and track submissions</p>
      </div>

      {/* Full Calendar View */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="card-title">Calendar View</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={previousMonth} className="btn btn-secondary" style={{ padding: '0.5rem' }}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span style={{ fontSize: '1.125rem', fontWeight: '600', minWidth: '150px', textAlign: 'center' }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button onClick={nextMonth} className="btn btn-secondary" style={{ padding: '0.5rem' }}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4" />
            New Event
          </button>
        </div>
        <div className="card-content">
          {/* Calendar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
            {/* Day Headers */}
            {dayNames.map(day => (
              <div key={day} style={{ padding: '0.75rem', textAlign: 'center', fontWeight: '600', color: '#800020', borderBottom: '2px solid #e5e7eb' }}>
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} style={{ padding: '0.75rem', minHeight: '100px', background: '#f9fafb' }} />;
              }
              
              const { events, deadlines: dayDeadlines, submissions: daySubmissions } = getEventsForDate(day);
              const hasItems = events.length > 0 || dayDeadlines.length > 0 || daySubmissions.length > 0;
              const isToday = day === 2 && currentDate.getMonth() === 0 && currentDate.getFullYear() === 2026;
              
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  style={{
                    padding: '0.5rem',
                    minHeight: '100px',
                    border: isToday ? '2px solid #800020' : '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    background: selectedDate === day ? '#fff7ed' : hasItems ? '#fef3f2' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.background = selectedDate === day ? '#fff7ed' : hasItems ? '#fef3f2' : 'white'}
                >
                  <div style={{ fontWeight: isToday ? 'bold' : '600', color: isToday ? '#800020' : '#111827', marginBottom: '0.5rem' }}>
                    {day}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {events.map(event => (
                      <div key={event.id} style={{ fontSize: '0.75rem', padding: '0.25rem', background: '#800020', color: 'white', borderRadius: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {event.title}
                      </div>
                    ))}
                    {dayDeadlines.map(deadline => (
                      <div key={deadline.id} style={{ fontSize: '0.75rem', padding: '0.25rem', background: '#FFD700', color: '#800020', borderRadius: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '600' }}>
                        📅 {deadline.title}
                      </div>
                    ))}
                    {daySubmissions.map((sub, idx) => (
                      <div key={idx} style={{ fontSize: '0.75rem', padding: '0.25rem', background: sub.status === 'late' ? '#fee2e2' : '#d1fae5', color: sub.status === 'late' ? '#dc2626' : '#059669', borderRadius: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {sub.teamName}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Upcoming Deadlines with Status */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Upcoming Deadlines</h2>
            <p className="card-description">Important submission dates</p>
          </div>
          <div className="card-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {deadlines.map((deadline) => {
                const isUrgent = deadline.daysLeft <= 7;
                return (
                  <div
                    key={deadline.id}
                    style={{
                      padding: '1rem',
                      border: isUrgent ? '2px solid #dc2626' : '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      background: isUrgent ? '#fef2f2' : 'white'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                      {isUrgent ? (
                        <AlertCircle className="w-5 h-5" style={{ color: '#dc2626', flexShrink: 0 }} />
                      ) : (
                        <CalendarIcon className="w-5 h-5" style={{ color: '#800020', flexShrink: 0 }} />
                      )}
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '600', marginBottom: '0.25rem', color: isUrgent ? '#dc2626' : '#111827' }}>{deadline.title}</p>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>{deadline.date}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span className={`badge ${deadline.status === 'upcoming' ? 'info' : 'warning'}`}>
                            {deadline.status}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: isUrgent ? '#dc2626' : '#6b7280', fontWeight: isUrgent ? '600' : 'normal' }}>
                            {deadline.daysLeft} days left
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 className="card-title">Upcoming Events</h2>
                <p className="card-description">Scheduled meetings and defenses</p>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <Clock className="w-5 h-5" style={{ color: '#800020' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{event.title}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <span className={`badge ${
                    event.type === 'defense' ? 'danger' :
                    event.type === 'review' ? 'warning' :
                    'info'
                  }`}>
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submission Status Tracker */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Submissions</h2>
            <p className="card-description">Document submission status</p>
          </div>
          <div className="card-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {submissions.map((submission, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>{submission.teamName}</p>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {submission.document} - {submission.date}
                    </p>
                  </div>
                  <span className={`badge ${submission.status === 'late' ? 'danger' : 'success'}`}>
                    {submission.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
