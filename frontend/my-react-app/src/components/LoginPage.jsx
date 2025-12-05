import { useState } from 'react';
<<<<<<< HEAD
"import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';"
"import { Input } from './ui/input';"
"import { Button } from './ui/button';"
"import { Label } from './ui/label';"
import { GraduationCap, Lock, Mail } from 'lucide-react';
=======
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
>>>>>>> 583f3deb8b7529370503d190c197e4fa602bfa84

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#800020] via-[#9B1B30] to-[#800020] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFD700] rounded-full mb-4">
            <GraduationCap className="w-12 h-12 text-[#800020]" />
          </div>
          <h1 className="text-white mb-2">Capstone Project Management System</h1>
          <p className="text-[#FFD700]">Track, Manage, and Excel</p>
        </div>

        {/* Login Card */}
        <Card className="border-2 border-[#FFD700]/20 shadow-2xl">
          <CardHeader className="space-y-1 bg-gradient-to-r from-[#800020] to-[#9B1B30] text-white rounded-t-lg">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription className="text-[#FFD700]">
              Sign in with your institutional email
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-[#800020]/30 focus:border-[#FFD700] focus:ring-[#FFD700]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-[#800020]/30 focus:border-[#FFD700] focus:ring-[#FFD700]"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#800020] hover:bg-[#9B1B30] text-white"
              >
                Sign In
              </Button>
            </form>

            {/* Demo Credentials Helper */}
            <div className="mt-6 p-4 bg-accent rounded-lg border border-[#FFD700]/30">
              <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Student: student@university.edu</li>
                <li>• Adviser: adviser@university.edu</li>
                <li>• Admin: admin@university.edu</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <p className="text-center mt-6 text-white/80">
          © 2025 Capstone Management System
        </p>
=======
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
>>>>>>> 583f3deb8b7529370503d190c197e4fa602bfa84
      </div>
    </div>
  );
}
