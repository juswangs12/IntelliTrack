import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { StatsCard } from './dashboard-widgets/StatsCard';
import { UserTable } from './dashboard-widgets/UserTable';
import { DeadlineTable } from './dashboard-widgets/DeadlineTable';
import { SystemSettings } from './dashboard-widgets/SystemSettings';
import { Users, Shield, Calendar } from 'lucide-react';

export function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = [
    { title: 'Total Users', value: '5', icon: Users, iconColor: 'text-[#800020]', borderColor: 'border-l-[#FFD700]' },
    { title: 'Students', value: '3', icon: Users, iconColor: 'text-blue-600', borderColor: 'border-l-blue-500' },
    { title: 'Advisers', value: '2', icon: Shield, iconColor: 'text-green-600', borderColor: 'border-l-green-500' },
    { title: 'Deadlines', value: '3', icon: Calendar, iconColor: 'text-purple-600', borderColor: 'border-l-purple-500' },
  ];

  const users = [
    { id: '1', name: 'Jane Doe', email: 'jane.doe@university.edu', role: 'Student', group: 'G-001', status: 'Active' },
    { id: '2', name: 'John Smith', email: 'john.smith@university.edu', role: 'Student', group: 'G-001', status: 'Active' },
    { id: '3', name: 'Dr. Robert Johnson', email: 'r.johnson@university.edu', role: 'Adviser', status: 'Active' },
    { id: '4', name: 'Sarah Williams', email: 'sarah.w@university.edu', role: 'Student', group: 'G-002', status: 'Active' },
    { id: '5', name: 'Prof. Emily Davis', email: 'e.davis@university.edu', role: 'Adviser', status: 'Active' },
  ];

  const deadlines = [
    { id: '1', title: 'Project Proposal', date: '2025-12-15', category: 'Proposal', description: 'Submit initial project proposal' },
    { id: '2', title: 'System Requirements Specification', date: '2025-12-20', category: 'Documentation', description: 'Complete SRS documentation' },
    { id: '3', title: 'Midterm Presentation', date: '2026-01-25', category: 'Presentation', description: 'Present project progress' },
  ];

  const settings = {
    academicYear: '2025-2026',
    semester: '1',
    reminderDays: 7,
    maxFileSize: 50,
  };

  const handleAddUser = () => {
    console.log('Add user');
  };

  const handleEditUser = (user) => {
    console.log('Edit user:', user);
  };

  const handleDeleteUser = (user) => {
    console.log('Delete user:', user);
  };

  const handleAddDeadline = () => {
    console.log('Add deadline');
  };

  const handleEditDeadline = (deadline) => {
    console.log('Edit deadline:', deadline);
  };

  const handleDeleteDeadline = (deadline) => {
    console.log('Delete deadline:', deadline);
  };

  const handleSaveSettings = () => {
    console.log('Save settings');
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout} activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#800020] to-[#9B1B30] rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-lg text-[#FFD700]">
            Manage users, deadlines, and system settings
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* User Management */}
        <UserTable 
          users={users} 
          onAdd={handleAddUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />

        {/* Deadline Management */}
        <DeadlineTable 
          deadlines={deadlines}
          onAdd={handleAddDeadline}
          onEdit={handleEditDeadline}
          onDelete={handleDeleteDeadline}
        />

        {/* System Settings */}
        <SystemSettings 
          settings={settings}
          onSave={handleSaveSettings}
        />
      </div>
    </DashboardLayout>
  );
}
