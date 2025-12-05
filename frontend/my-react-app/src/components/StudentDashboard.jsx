import { Home, FileText, User } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout } from './Layout';

export function StudentDashboard({ user, onLogout }) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', name: 'Home', icon: Home, path: '/student/home' },
    {
      id: 'submissions',
      name: 'Submissions',
      icon: FileText,
      dropdown: [
        { id: 'proposal', name: 'Project Proposal', path: '/student/submissions/proposal' },
        { id: 'srs', name: 'SRS', path: '/student/submissions/srs' },
        { id: 'sdd', name: 'SDD', path: '/student/submissions/sdd' }
      ]
    },
    { id: 'profile', name: 'Profile', icon: User, path: '/student/profile' }
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Layout
      user={user}
      title="Capstone Management System - Student"
      icon={Home}
      navItems={navItems}
      onLogout={handleLogout}
    />
  );
}
