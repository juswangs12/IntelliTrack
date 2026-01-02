import { Home, Users, Settings, Calendar, BarChart, UserPlus, UsersRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './Layout';

export function AdminDashboard({ user, onLogout }) {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', name: 'Home', icon: Home, path: '/admin/home' },
    { id: 'users', name: 'User Management', icon: Users, path: '/admin/users' },
    { id: 'groups', name: 'Group Management', icon: UsersRound, path: '/admin/groups' },
    { id: 'assignments', name: 'Group Assignments', icon: UserPlus, path: '/admin/assignments' },
    { id: 'system', name: 'System Config', icon: Settings, path: '/admin/system' },
    { id: 'deadlines', name: 'Deadlines', icon: Calendar, path: '/admin/deadlines' },
    { id: 'analytics', name: 'Analytics', icon: BarChart, path: '/admin/analytics' }
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Layout
      user={user}
      title="Capstone Management System - Admin"
      icon={Home}
      navItems={navItems}
      onLogout={handleLogout}
    />
  );
}

