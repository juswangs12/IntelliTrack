import { Home, Calendar, User, messageSquareText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './Layout';

export function CoordinatorDashboard({ user, onLogout }) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', name: 'Home', icon: Home, path: '/coordinator/home' },
    { id: 'calendar', name: 'Calendar', icon: Calendar, path: '/coordinator/calendar' },
    { id: 'profile', name: 'Profile', icon: User, path: '/coordinator/profile' },
    { id: 'feedback-evaluation', name: 'Feedback Evaluation', icon: messageSquareText, path: '/coordinator/feedback-evaluation' }
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Layout
      user={user}
      title="Capstone Management System - Coordinator"
      icon={Home}
      navItems={navItems}
      onLogout={handleLogout}
    />
  );
}
