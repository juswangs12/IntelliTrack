import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

// Fixed credentials for simulation
const USERS = {
  student: {
    email: 'student@example.com',
    password: 'student123',
    name: 'John Doe',
    role: 'student'
  },
  coordinator: {
    email: 'coordinator@example.com',
    password: 'coordinator123',
    name: 'Dr. Jane Smith',
    role: 'coordinator'
  },
  admin: {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  }
};

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check if credentials match the selected role
    const user = USERS[role];
    
    if (email === user.email && password === user.password) {
      // Successful login
      onLogin({ name: user.name, role: user.role, email: user.email });
      
      // Navigate to appropriate dashboard
      if (role === 'student') {
        navigate('/student/home');
      } else if (role === 'coordinator') {
        navigate('/coordinator/home');
      } else if (role === 'admin') {
        navigate('/admin/home');
      }
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  const fillCredentials = (selectedRole) => {
    const user = USERS[selectedRole];
    setEmail(user.email);
    setPassword(user.password);
    setRole(selectedRole);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="login-title">IntelliTrack</h1>
          <p className="login-subtitle">Capstone Deliverable System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
            >
              <option value="student">Student</option>
              <option value="coordinator">Coordinator/Adviser</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        {/* Quick fill buttons for testing */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', textAlign: 'center' }}>
            Quick Login (for testing):
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => fillCredentials('student')}
              style={{ 
                flex: 1, 
                padding: '0.5rem', 
                fontSize: '0.75rem', 
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('coordinator')}
              style={{ 
                flex: 1, 
                padding: '0.5rem', 
                fontSize: '0.75rem', 
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              Coordinator
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('admin')}
              style={{ 
                flex: 1, 
                padding: '0.5rem', 
                fontSize: '0.75rem', 
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
