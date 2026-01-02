import { LogOut } from 'lucide-react';
import { NotificationCenter } from './NotificationCenter';

export function Navbar({ title, icon: Icon, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {Icon && <Icon className="navbar-icon" />}
          <span className="navbar-title">{title}</span>
        </div>
        <div className="navbar-right">
          <NotificationCenter userRole={user?.role} />
          <button onClick={onLogout} className="navbar-logout">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
