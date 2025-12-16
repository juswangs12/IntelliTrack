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
import { ProfileManagement } from './pages/student/ProfileManagement';
import { VersionControl } from './pages/student/VersionControl';
import { DocumentReview } from './pages/student/DocumentReview';

// Adviser Pages
import { AdviserFeedbackEvaluation } from './pages/adviser/AdviserFeedbackEvaluation';
import { SubmissionInsights } from './pages/adviser/SubmissionInsights';

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

  const handleLogin = (userData) => {
    // LoginPage passes user object with { name, role, email }
    setCurrentUser(userData);
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
          <Route path="profile-management" element={<ProfileManagement />} />
          <Route path="version-control" element={<VersionControl />} />
          <Route path="document-review" element={<DocumentReview />} />
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
          <Route path="feedback-evaluation" element={<AdviserFeedbackEvaluation />} />
          <Route path="submission-insights" element={<SubmissionInsights />} />
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
