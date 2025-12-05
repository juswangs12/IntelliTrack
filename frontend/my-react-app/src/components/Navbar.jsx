import { Bell, LogOut } from 'lucide-react';

export function Navbar({ title, icon: Icon, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {Icon && <Icon className="navbar-icon" />}
          <span className="navbar-title">{title}</span>
        </div>
        <div className="navbar-right">
          <button className="navbar-notification">
            <Bell className="w-5 h-5" />
            <span className="notification-badge">3</span>
          </button>
          <button onClick={onLogout} className="navbar-logout">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
