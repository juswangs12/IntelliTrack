import { NavLink } from 'react-router-dom';
import { User, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function Sidebar({ user, navItems }) {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <aside className="sidebar">
      {/* User Profile Section */}
      <div className="sidebar-profile">
        <div className="profile-avatar">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="profile-name">{user.name}</p>
          <p className="profile-role">{user.role}</p>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div key={item.id}>
            {item.dropdown ? (
              <>
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="sidebar-item sidebar-dropdown-toggle"
                >
                  <div className="sidebar-item-content">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {expandedItems[item.id] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {expandedItems[item.id] && (
                  <div className="sidebar-dropdown">
                    {item.dropdown.map((subItem) => (
                      <NavLink
                        key={subItem.id}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `sidebar-subitem ${isActive ? 'active' : ''}`
                        }
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
