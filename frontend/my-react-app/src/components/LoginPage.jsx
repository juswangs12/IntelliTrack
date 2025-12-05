import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { GraduationCap, Lock, Mail } from 'lucide-react';

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple demo authentication
    let role = '';
    let name = '';
    
    if (email.includes('student@')) {
      role = 'student';
      name = 'Jane Doe';
    } else if (email.includes('adviser@')) {
      role = 'adviser';
      name = 'Dr. Robert Johnson';
    } else if (email.includes('admin@')) {
      role = 'admin';
      name = 'Admin User';
    }
    
    if (role) {
      onLogin({ email, role, name });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#800020] via-[#9B1B30] to-[#800020] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFD700] rounded-full mb-4 shadow-lg">
            <GraduationCap className="w-12 h-12 text-[#800020]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Capstone Project Management System</h1>
          <p className="text-xl text-[#FFD700] font-semibold">Track, Manage, and Excel</p>
        </div>

        {/* Login Card */}
        <Card className="border-2 border-[#FFD700]/20 shadow-2xl">
          <CardHeader className="space-y-1 bg-gradient-to-r from-[#800020] to-[#9B1B30] text-white rounded-t-lg">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
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
                className="w-full bg-[#800020] hover:bg-[#9B1B30] text-white font-semibold"
              >
                Sign In
              </Button>
            </form>

            {/* Demo Credentials Helper */}
            <div className="mt-6 p-4 bg-accent rounded-lg border border-[#FFD700]/30">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Demo Credentials:</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Student: student@university.edu</li>
                <li>• Adviser: adviser@university.edu</li>
                <li>• Admin: admin@university.edu</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <p className="text-center mt-6 text-white/80 text-sm">
          © 2025 Capstone Management System
        </p>
      </div>
    </div>
  );
}
