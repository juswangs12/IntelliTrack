import { useState, useEffect } from 'react';
import { Bell, BellRing, X, Clock, AlertCircle, Info, CheckCircle } from 'lucide-react';

export function NotificationCenter({ userRole }) {
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulated AI-powered deadline notifications
  useEffect(() => {
    // Generate intelligent notifications based on deadlines
    const aiGeneratedNotifications = generateAINotifications(userRole);
    setNotifications(aiGeneratedNotifications);
    setUnreadCount(aiGeneratedNotifications.filter(n => !n.read).length);

    // Simulate real-time AI analysis every 30 seconds
    const interval = setInterval(() => {
      const newNotifications = generateAINotifications(userRole);
      setNotifications(newNotifications);
      setUnreadCount(newNotifications.filter(n => !n.read).length);
    }, 30000);

    return () => clearInterval(interval);
  }, [userRole]);

  const generateAINotifications = (role) => {
    const now = new Date();
    const notifications = [];

    if (role === 'student') {
      // AI-generated student notifications
      notifications.push({
        id: 1,
        type: 'deadline-urgent',
        title: 'Urgent: Chapter 3 Deadline Tomorrow',
        message: 'AI Analysis: Chapter 3 submission is due tomorrow at 11:59 PM. You haven\'t submitted yet. Recommend starting immediately.',
        priority: 'high',
        timestamp: new Date(now - 1000 * 60 * 15).toISOString(), // 15 minutes ago
        read: false,
        action: { label: 'Submit Now', link: '/submissions' },
        icon: AlertCircle,
        color: '#dc2626'
      });

      notifications.push({
        id: 2,
        type: 'deadline-warning',
        title: 'Reminder: Final Defense in 3 Days',
        message: 'AI Recommendation: Prepare your presentation slides. Based on your progress, allocate 2 hours for final review.',
        priority: 'medium',
        timestamp: new Date(now - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        read: false,
        action: { label: 'View Schedule', link: '/calendar' },
        icon: Clock,
        color: '#f59e0b'
      });

      notifications.push({
        id: 3,
        type: 'review-complete',
        title: 'Adviser Reviewed Your Chapter 2',
        message: 'Dr. Garcia has completed reviewing your Chapter 2 submission. Overall score: 85/100. View detailed feedback.',
        priority: 'medium',
        timestamp: new Date(now - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
        read: false,
        action: { label: 'View Feedback', link: '/feedback' },
        icon: CheckCircle,
        color: '#10b981'
      });

      notifications.push({
        id: 4,
        type: 'deadline-info',
        title: 'Upcoming: Chapter 4 Due Next Week',
        message: 'AI Insight: Start working on Chapter 4 now to avoid last-minute rush. Estimated completion time: 3-4 days.',
        priority: 'low',
        timestamp: new Date(now - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
        read: true,
        action: { label: 'View Requirements', link: '/requirements' },
        icon: Info,
        color: '#3b82f6'
      });
    } else if (role === 'adviser') {
      // AI-generated adviser notifications
      notifications.push({
        id: 5,
        type: 'submission',
        title: 'New Submission from Team Alpha',
        message: 'Team Alpha submitted Chapter 3 for review. AI Pre-Analysis: Document structure is complete. Similarity check: 92% original.',
        priority: 'high',
        timestamp: new Date(now - 1000 * 60 * 10).toISOString(), // 10 minutes ago
        read: false,
        action: { label: 'Review Now', link: '/review' },
        icon: BellRing,
        color: '#800020'
      });

      notifications.push({
        id: 6,
        type: 'deadline-alert',
        title: 'Reminder: Team Beta Review Due Today',
        message: 'AI Alert: Team Beta is waiting for your feedback on their Chapter 2 submission. Submitted 3 days ago.',
        priority: 'high',
        timestamp: new Date(now - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        read: false,
        action: { label: 'Start Review', link: '/pending-reviews' },
        icon: Clock,
        color: '#dc2626'
      });
    } else if (role === 'coordinator') {
      // AI-generated coordinator notifications
      notifications.push({
        id: 7,
        type: 'submission',
        title: '3 New Group Submissions Today',
        message: 'AI Summary: Teams Alpha, Beta, and Gamma submitted deliverables today. Priority review recommended for Team Alpha (deadline closest).',
        priority: 'high',
        timestamp: new Date(now - 1000 * 60 * 20).toISOString(), // 20 minutes ago
        read: false,
        action: { label: 'View All', link: '/submissions' },
        icon: BellRing,
        color: '#800020'
      });

      notifications.push({
        id: 8,
        type: 'deadline-alert',
        title: 'Deadline Alert: 5 Groups Due Tomorrow',
        message: 'AI Risk Analysis: 2 groups haven\'t submitted yet. Consider sending reminder notifications.',
        priority: 'medium',
        timestamp: new Date(now - 1000 * 60 * 60).toISOString(), // 1 hour ago
        read: false,
        action: { label: 'Send Reminders', link: '/notifications' },
        icon: AlertCircle,
        color: '#f59e0b'
      });

      notifications.push({
        id: 9,
        type: 'review-pending',
        title: 'Pending Adviser Reviews: 8 Documents',
        message: 'AI Insight: Average review time is 2.5 days. 3 documents exceed this threshold. Consider follow-up with advisers.',
        priority: 'low',
        timestamp: new Date(now - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
        read: true,
        action: { label: 'View Details', link: '/analytics' },
        icon: Info,
        color: '#3b82f6'
      });
    }

    return notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMinutes = Math.floor((now - past) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return { label: 'Urgent', class: 'danger' };
      case 'medium': return { label: 'Important', class: 'warning' };
      case 'low': return { label: 'Info', class: 'info' };
      default: return { label: 'Info', class: 'info' };
    }
  };

  return (
    <>
      {/* Notification Bell Icon */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowPanel(!showPanel)}
          style={{
            position: 'relative',
            padding: '0.5rem',
            background: 'transparent',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <Bell className="w-6 h-6" style={{ color: '#800020' }} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '0.25rem',
              right: '0.25rem',
              background: '#dc2626',
              color: 'white',
              fontSize: '0.65rem',
              fontWeight: 'bold',
              borderRadius: '9999px',
              width: '1.25rem',
              height: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white'
            }}>
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification Panel */}
      {showPanel && (
        <div style={{
          position: 'fixed',
          top: '4.5rem',
          right: '1rem',
          width: '420px',
          maxHeight: '600px',
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#111827' }}>
                Notifications
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                AI-powered smart alerts
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  padding: '0.25rem 0.75rem',
                  background: '#800020',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                <Bell className="w-12 h-12" style={{ margin: '0 auto 1rem', color: '#d1d5db' }} />
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = notification.icon;
                const priority = getPriorityLabel(notification.priority);
                
                return (
                  <div
                    key={notification.id}
                    style={{
                      padding: '1rem',
                      borderBottom: '1px solid #f3f4f6',
                      background: notification.read ? 'white' : '#fef3f2',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = notification.read ? 'white' : '#fef3f2'}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <div style={{
                        flexShrink: 0,
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.5rem',
                        background: `${notification.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon className="w-5 h-5" style={{ color: notification.color }} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.25rem' }}>
                          <p style={{ fontWeight: '600', fontSize: '0.875rem', color: '#111827' }}>
                            {notification.title}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            style={{
                              padding: '0.25rem',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              borderRadius: '0.25rem',
                              flexShrink: 0
                            }}
                          >
                            <X className="w-4 h-4" style={{ color: '#9ca3af' }} />
                          </button>
                        </div>

                        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                          {notification.message}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.65rem', color: '#9ca3af' }}>
                            {getTimeAgo(notification.timestamp)}
                          </span>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span className={`badge ${priority.class}`} style={{ fontSize: '0.65rem' }}>
                              {priority.label}
                            </span>
                            {notification.action && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle navigation
                                  alert(`Navigate to: ${notification.action.link}`);
                                }}
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  background: '#800020',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '0.25rem',
                                  fontSize: '0.65rem',
                                  cursor: 'pointer',
                                  fontWeight: '500'
                                }}
                              >
                                {notification.action.label}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showPanel && (
        <div
          onClick={() => setShowPanel(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
        />
      )}
    </>
  );
}
