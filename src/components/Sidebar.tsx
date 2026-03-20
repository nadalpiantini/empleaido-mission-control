import React from 'react';
import { PageKey } from '../App';

interface SidebarProps {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
}

interface NavItem {
  key: PageKey;
  icon: string;
  label: string;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { key: 'dashboard', icon: '⬡', label: 'Dashboard' },
  { key: 'tasks', icon: '☰', label: 'Tasks', badge: 12 },
  { key: 'pipeline', icon: '⟳', label: 'Pipeline', badge: 5 },
  { key: 'calendar', icon: '◫', label: 'Calendar' },
];

const teamNavItems: NavItem[] = [
  { key: 'team', icon: '◈', label: 'Agents', badge: 8 },
  { key: 'memory', icon: '◉', label: 'Memory' },
];

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const renderNavItem = (item: NavItem) => (
    <button
      key={item.key}
      className={`mc-nav-item ${activePage === item.key ? 'active' : ''}`}
      onClick={() => onNavigate(item.key)}
      aria-current={activePage === item.key ? 'page' : undefined}
    >
      <span className="nav-icon">{item.icon}</span>
      <span>{item.label}</span>
      {item.badge != null && item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
    </button>
  );

  return (
    <nav className="mc-sidebar">
      <div className="mc-sidebar-header">
        <div className="mc-sidebar-logo">E</div>
        <div>
          <div className="mc-sidebar-title">Empleaido</div>
          <div className="mc-sidebar-subtitle">Mission Control</div>
        </div>
      </div>

      <div className="mc-sidebar-nav">
        <div className="mc-sidebar-section">
          <div className="mc-sidebar-section-title">General</div>
          {mainNavItems.map(renderNavItem)}
        </div>

        <div className="mc-sidebar-section">
          <div className="mc-sidebar-section-title">Intelligence</div>
          {teamNavItems.map(renderNavItem)}
        </div>
      </div>

      <div className="mc-sidebar-footer">
        <div className="mc-sidebar-status">
          <span className="mc-status-dot"></span>
          <span>Sistema Activo</span>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
