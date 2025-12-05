import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
"import { StudentDashboard } from './components/StudentDashboard';"
"import { AdviserDashboard } from './components/AdviserDashboard';"
import { AdminDashboard } from './components/AdminDashboard';

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
      role = 'adviser';
      name = 'Dr. John Smith';
    } else {
      role = 'student';
      name = 'Jane Doe';
    }

    setCurrentUser({
      name,
      email,
      role,
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentUser.role === 'student') {
    return <StudentDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser.role === 'adviser') {
    return <AdviserDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser.role === 'admin') {
    return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
  }

  return null;
}