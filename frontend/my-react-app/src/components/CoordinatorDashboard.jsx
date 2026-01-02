import { Home, Calendar, User, FileText, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './Layout';

export function CoordinatorDashboard({ user, onLogout }) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', name: 'Home', icon: Home, path: '/coordinator/home' },
    { id: 'document-review', name: 'Document Review', icon: FileText, path: '/coordinator/document-review' },
    { id: 'submission-insights', name: 'Submission Insights', icon: BarChart, path: '/coordinator/submission-insights' },
    { id: 'calendar', name: 'Calendar', icon: Calendar, path: '/coordinator/calendar' },
    { id: 'profile', name: 'Profile', icon: User, path: '/coordinator/profile' }
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
