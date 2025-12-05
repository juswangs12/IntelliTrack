import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { StudentDashboard } from './components/StudentDashboard';
import { CoordinatorDashboard } from './components/CoordinatorDashboard';
import { AdminDashboard } from './components/AdminDashboard';

// Student Pages
import { StudentHome } from './pages/student/StudentHome';
import { ProjectProposal } from './pages/student/ProjectProposal';
import { SRSDocument } from './pages/student/SRSDocument';
import { SDDDocument } from './pages/student/SDDDocument';
import { StudentProfile } from './pages/student/StudentProfile';

// Coordinator Pages
import { CoordinatorHome } from './pages/coordinator/CoordinatorHome';
import { CoordinatorCalendar } from './pages/coordinator/CoordinatorCalendar';
import { CoordinatorProfile } from './pages/coordinator/CoordinatorProfile';

// Admin Pages
import { AdminHome } from './pages/admin/AdminHome';
import { UserManagement } from './pages/admin/UserManagement';
import { SystemConfig } from './pages/admin/SystemConfig';
import { Deadlines } from './pages/admin/Deadlines';
import { Analytics } from './pages/admin/Analytics';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (email, password) => {
    // Mock login logic - determine role based on email pattern
    let role = 'student';
    let name = 'User';

    if (email.includes('admin')) {
      role = 'admin';
      name = 'Admin User';
    } else if (email.includes('adviser') || email.includes('teacher')) {
      role = 'coordinator';
      name = 'Dr. John Smith';
    } else {
      role = 'student';
      name = 'Jane Doe';
    }

    setCurrentUser({ name, email, role });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate
                to={
                  currentUser.role === 'student'
                    ? '/student/home'
                    : currentUser.role === 'coordinator'
                    ? '/coordinator/home'
                    : '/admin/home'
                }
                replace
              />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/*"
          element={
            currentUser?.role === 'student' ? (
              <StudentDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="home" element={<StudentHome user={currentUser} />} />
          <Route path="submissions/proposal" element={<ProjectProposal />} />
          <Route path="submissions/srs" element={<SRSDocument />} />
          <Route path="submissions/sdd" element={<SDDDocument />} />
          <Route path="profile" element={<StudentProfile user={currentUser} />} />
          <Route path="*" element={<Navigate to="/student/home" replace />} />
        </Route>

        {/* Coordinator Routes */}
        <Route
          path="/coordinator/*"
          element={
            currentUser?.role === 'coordinator' ? (
              <CoordinatorDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="home" element={<CoordinatorHome user={currentUser} />} />
          <Route path="calendar" element={<CoordinatorCalendar />} />
          <Route path="profile" element={<CoordinatorProfile user={currentUser} />} />
          <Route path="*" element={<Navigate to="/coordinator/home" replace />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            currentUser?.role === 'admin' ? (
              <AdminDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="home" element={<AdminHome user={currentUser} />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="system" element={<SystemConfig />} />
          <Route path="deadlines" element={<Deadlines />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/admin/home" replace />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
