import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { GraduationCap, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authAPI } from '../services/api';

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authAPI.login(email, password);
      // Assuming response has { id, name, email, role, token }
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role
      }));

      onLogin({
        id: response.id,
        name: response.name,
        role: response.role,
        email: response.email
      });

      // Navigate to appropriate dashboard
      if (response.role === "STUDENT") {
        navigate("/student/home");
      } else if (response.role === "COORDINATOR") {
        navigate("/coordinator/home");
      } else if (response.role === "ADMIN") {
        navigate("/admin/home");
      }
    } catch (err) {
      setError("Invalid credentials. Please check your email and password.");
    }
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
        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "#6b7280",
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            Quick Login (for testing):
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => fillCredentials("student")}
              style={{
                flex: 1,
                padding: "0.5rem",
                fontSize: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                background: "white",
                cursor: "pointer",
              }}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => fillCredentials("coordinator")}
              style={{
                flex: 1,
                padding: "0.5rem",
                fontSize: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                background: "white",
                cursor: "pointer",
              }}
            >
              Coordinator
            </button>
            <button
              type="button"
              onClick={() => fillCredentials("admin")}
              style={{
                flex: 1,
                padding: "0.5rem",
                fontSize: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                background: "white",
                cursor: "pointer",
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
