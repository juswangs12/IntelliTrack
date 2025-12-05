import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function Layout({ user, title, icon, navItems, onLogout }) {
  return (
    <div className="layout">
      <Navbar title={title} icon={icon} onLogout={onLogout} />
      <div className="layout-content">
        <Sidebar user={user} navItems={navItems} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
