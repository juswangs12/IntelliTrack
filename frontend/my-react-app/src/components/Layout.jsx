import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { NotificationCenter } from './NotificationCenter';
import { AIAssistant } from './AIAssistant';

export function Layout({ user, title, icon, navItems, onLogout }) {
  return (
    <div className="layout">
      <Navbar title={title} icon={icon} user={user} onLogout={onLogout} />
      <div className="layout-content">
        <Sidebar user={user} navItems={navItems} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <AIAssistant />
    </div>
  );
}
