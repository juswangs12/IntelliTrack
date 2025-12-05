import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { StatsCard } from './dashboard-widgets/StatsCard';
import { DeadlineCard } from './dashboard-widgets/DeadlineCard';
import { SubmissionList } from './dashboard-widgets/SubmissionList';
import { ProjectProgress } from './dashboard-widgets/ProjectProgress';
import { Calendar, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export function StudentDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = [
    { title: 'Upcoming Deadlines', value: '4', icon: Calendar, iconColor: 'text-[#800020]', borderColor: 'border-l-[#FFD700]' },
    { title: 'Approved', value: '1', icon: CheckCircle, iconColor: 'text-green-600', borderColor: 'border-l-green-500' },
    { title: 'Pending Review', value: '2', icon: AlertCircle, iconColor: 'text-yellow-600', borderColor: 'border-l-yellow-500' },
    { title: 'Need Revision', value: '1', icon: XCircle, iconColor: 'text-red-600', borderColor: 'border-l-red-500' },
  ];

  const deadlines = [
    { id: '1', title: 'Project Proposal', description: 'Submit initial project proposal document', dueDate: 'Dec 15, 2025', daysLeft: 10, category: 'Proposal' },
    { id: '2', title: 'System Requirements Specification (SRS)', description: 'Complete SRS documentation', dueDate: 'Dec 20, 2025', daysLeft: 15, category: 'Documentation' },
    { id: '3', title: 'System Design Document (SDD)', description: 'Submit system design and architecture', dueDate: 'Jan 10, 2026', daysLeft: 36, category: 'Design' },
    { id: '4', title: 'Midterm Presentation', description: 'Present project progress to panel', dueDate: 'Jan 25, 2026', daysLeft: 51, category: 'Presentation' },
  ];

  const submissions = [
    { id: '1', title: 'Project Title and Abstract', submittedDate: 'Dec 1, 2025', status: 'Approved', feedback: 'Great start! The abstract clearly defines the problem statement.', version: 2 },
    { id: '2', title: 'Literature Review', submittedDate: 'Dec 3, 2025', status: 'Pending', version: 1 },
    { id: '3', title: 'Initial Wireframes', submittedDate: 'Nov 28, 2025', status: 'Rejected', feedback: 'Please add more detail to the user flow diagrams.', version: 1 },
    { id: '4', title: 'Technology Stack Proposal', submittedDate: 'Dec 4, 2025', status: 'Pending', version: 1 },
  ];

  const phases = [
    { name: 'Proposal Phase', progress: 75 },
    { name: 'Development Phase', progress: 30 },
    { name: 'Documentation', progress: 45 },
  ];

  return (
    <DashboardLayout user={user} onLogout={onLogout} activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#800020] to-[#9B1B30] rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-lg text-[#FFD700]">
            Track your capstone project progress and stay on top of deadlines
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Deadlines and Submissions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DeadlineCard deadlines={deadlines} />
          <SubmissionList submissions={submissions} />
        </div>

        {/* Project Progress */}
        <ProjectProgress phases={phases} />
      </div>
    </DashboardLayout>
  );
}
