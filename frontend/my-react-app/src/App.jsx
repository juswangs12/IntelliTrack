import { useState } from 'react';
"import { LoginPage } from './components/LoginPage';"
"import { StudentDashboard } from './components/StudentDashboard';"
"import { AdviserDashboard } from './components/AdviserDashboard';"
"import { AdminDashboard } from './components/AdminDashboard';"

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (name, role, email) => {
    setCurrentUser({ name, role, email });
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
