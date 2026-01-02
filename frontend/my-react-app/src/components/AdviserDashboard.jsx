import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { StatsCard } from './dashboard-widgets/StatsCard';
import { CalendarView } from './dashboard-widgets/CalendarView';
import { SubmissionList } from './dashboard-widgets/SubmissionList';
import { Users, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export function AdviserDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = [
    { title: 'Total Groups', value: '5', icon: Users, iconColor: 'text-[#800020]', borderColor: 'border-l-[#FFD700]' },
    { title: 'Approved', value: '1', icon: CheckCircle, iconColor: 'text-green-600', borderColor: 'border-l-green-500' },
    { title: 'Pending Review', value: '3', icon: AlertCircle, iconColor: 'text-yellow-600', borderColor: 'border-l-yellow-500' },
    { title: 'Rejected', value: '1', icon: XCircle, iconColor: 'text-red-600', borderColor: 'border-l-red-500' },
  ];

  const submissions = [
    { id: '1', groupNumber: 'G-001', groupName: 'AI Innovators', title: 'System Requirements Specification', status: 'Pending', submittedDate: 'Dec 4, 2025' },
    { id: '2', groupNumber: 'G-002', groupName: 'Code Crafters', title: 'Project Proposal', status: 'Approved', submittedDate: 'Dec 3, 2025', feedback: 'Well structured proposal.' },
    { id: '3', groupNumber: 'G-003', groupName: 'Tech Titans', title: 'System Requirements Specification', status: 'Pending', submittedDate: 'Dec 5, 2025' },
    { id: '4', groupNumber: 'G-004', groupName: 'Digital Dynamos', title: 'Literature Review', status: 'Rejected', submittedDate: 'Dec 2, 2025', feedback: 'Needs more recent references.' },
    { id: '5', groupNumber: 'G-005', groupName: 'Software Squad', title: 'Project Proposal', status: 'Pending', submittedDate: 'Dec 4, 2025' },
  ];

  const deadlines = {
    '2025-12-15': [{ id: '1', title: 'Project Proposal', groups: ['G-001', 'G-005'], type: 'Proposal' }],
    '2025-12-20': [{ id: '2', title: 'System Requirements Specification', groups: ['G-001', 'G-002', 'G-003'], type: 'Documentation' }],
    '2025-12-25': [{ id: '3', title: 'System Design Document', groups: ['G-004'], type: 'Design' }],
    '2026-01-10': [{ id: '4', title: 'Midterm Presentation Prep', groups: ['G-001', 'G-002', 'G-003', 'G-004', 'G-005'], type: 'Presentation' }],
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout} activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#800020] to-[#9B1B30] rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-lg text-[#FFD700]">
            Monitor and evaluate your assigned capstone groups
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Calendar and Submissions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CalendarView deadlines={deadlines} />
          </div>
          <div>
            <SubmissionList submissions={submissions} showActions={false} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
