import { useState } from 'react';
"import { LogOut, Users, Settings, Calendar, Bell, User, Home, Shield, Database, FileText } from 'lucide-react';"

export function AdminDashboard({ user, onLogout }) {
  const [activeModule, setActiveModule] = useState('home');

  const modules = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'system', name: 'System Config', icon: Settings },
    { id: 'deadlines', name: 'Deadlines', icon: Calendar },
    { id: 'analytics', name: 'Analytics', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-gradient-to-r from-[#800020] via-[#9a1c34] to-[#800020] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#FFD700]" />
              <span className="text-xl">Capstone Management System - Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-[calc(100vh-4rem)] border-r border-gray-200">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-[#800020]/10 to-[#FFD700]/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-[#800020] to-[#9a1c34] rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">Administrator</p>
              </div>
            </div>
          </div>

          {/* Navigation Modules */}
          <nav className="p-4">
            <p className="text-xs text-gray-500 px-3 mb-2">ADMIN MODULES</p>
            <div className="space-y-1">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      activeModule === module.id
                        ? 'bg-gradient-to-r from-[#800020] to-[#9a1c34] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{module.name}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeModule === 'home' && (
            <>
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-[#800020] to-[#9a1c34] rounded-2xl p-8 text-white mb-8 shadow-xl">
                <h1 className="mb-2 text-white">Welcome, {user.name}!</h1>
                <p className="text-white/90">Administrator Dashboard - Manage the entire capstone system</p>
              </div>

              {/* System Overview Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#800020]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600">Total Students</h3>
                    <Users className="w-6 h-6 text-[#800020]" />
                  </div>
                  <p className="text-[#800020]">156</p>
                  <p className="text-xs text-gray-500 mt-1">Across 12 groups</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#FFD700]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600">Total Advisers</h3>
                    <Users className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <p className="text-[#800020]">8</p>
                  <p className="text-xs text-gray-500 mt-1">Active faculty</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600">Active Projects</h3>
                    <FileText className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-[#800020]">12</p>
                  <p className="text-xs text-gray-500 mt-1">In progress</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-600">Pending Reviews</h3>
                    <FileText className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-[#800020]">24</p>
                  <p className="text-xs text-gray-500 mt-1">Awaiting feedback</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="mb-4 text-[#800020]">Recent System Activity</h2>
                <div className="space-y-3">
                  {[
                    { action: 'New submission from Group 5', time: '5 minutes ago', type: 'submission' },
                    { action: 'Adviser Dr. Smith approved Group 2 proposal', time: '1 hour ago', type: 'approval' },
                    { action: 'New user registered: John Doe', time: '2 hours ago', type: 'registration' },
                    { action: 'Deadline reminder sent to all students', time: '3 hours ago', type: 'notification' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'submission'
                            ? 'bg-blue-500'
                            : activity.type === 'approval'
                            ? 'bg-green-500'
                            : activity.type === 'registration'
                            ? 'bg-purple-500'
                            : 'bg-yellow-500'
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeModule === 'users' && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="mb-6 text-[#800020]">User Management</h2>
              <div className="space-y-4">
                <div className="flex gap-4 mb-6">
                  <button className="px-6 py-3 bg-gradient-to-r from-[#800020] to-[#9a1c34] text-white rounded-lg hover:from-[#9a1c34] hover:to-[#800020] transition-all">
                    Add New User
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Import Users
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Export List
                  </button>
                </div>
                <div className="text-center text-gray-500 py-12">
                  User management interface coming soon...
                </div>
              </div>
            </div>
          )}

          {activeModule === 'system' && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="mb-6 text-[#800020]">System Configuration</h2>
              <div className="space-y-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="text-gray-900 mb-3">Grading Rubrics</h3>
                  <button className="px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#9a1c34] transition-colors">
                    Configure Rubrics
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="text-gray-900 mb-3">Academic Year Settings</h3>
                  <button className="px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#9a1c34] transition-colors">
                    Manage Settings
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="text-gray-900 mb-3">Notification Rules</h3>
                  <button className="px-4 py-2 bg-[#800020] text-white rounded-lg hover:bg-[#9a1c34] transition-colors">
                    Configure Notifications
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeModule === 'deadlines' && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="mb-6 text-[#800020]">Deadline Management</h2>
              <div className="mb-6">
                <button className="px-6 py-3 bg-gradient-to-r from-[#800020] to-[#9a1c34] text-white rounded-lg hover:from[#9a1c34] hover:to-[#800020] transition-all">
                  Add New Deadline
                </button>
              </div>
              <div className="text-center text-gray-500 py-12">
                Deadline configuration interface coming soon...
              </div>
            </div>
          )}

          {activeModule === 'analytics' && (
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="mb-6 text-[#800020]">System Analytics</h2>
              <div className="text-center text-gray-500 py-12">
                Advanced analytics dashboard coming soon...
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
