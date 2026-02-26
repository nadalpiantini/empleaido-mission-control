import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TasksBoard from './pages/TasksBoard';
import Memory from './pages/Memory';
import Team from './pages/Team';
import Calendar from './pages/Calendar';
import Pipeline from './pages/Pipeline';

export type PageKey = 'dashboard' | 'tasks' | 'memory' | 'team' | 'calendar' | 'pipeline';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageKey>('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard onNavigate={setActivePage} />;
      case 'tasks': return <TasksBoard />;
      case 'memory': return <Memory />;
      case 'team': return <Team />;
      case 'calendar': return <Calendar />;
      case 'pipeline': return <Pipeline />;
      default: return <Dashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="mc-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="mc-content">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
