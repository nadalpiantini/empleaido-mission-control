import React from 'react';
import { PageKey } from '../App';

interface DashboardProps {
  onNavigate: (page: PageKey) => void;
}

const stats = [
  { icon: '📋', label: 'Tareas Activas', value: '12', change: '+3', positive: true, bg: 'var(--mc-blue-bg)' },
  { icon: '🤖', label: 'Agentes Activos', value: '8', change: '2 idle', positive: true, bg: 'var(--mc-green-bg)' },
  { icon: '📄', label: 'Documentos en Pipeline', value: '5', change: '+2', positive: true, bg: 'var(--mc-purple-bg)' },
  { icon: '⏰', label: 'Proxima Fecha Limite', value: '15', change: 'dias', positive: false, bg: 'var(--mc-orange-bg)' },
];

const recentActivity = [
  { icon: '✅', text: 'IR-17 procesado exitosamente para Empresa ABC', time: 'Hace 5 min', bg: 'var(--mc-green-bg)' },
  { icon: '🤖', text: 'Agente Fiscal inicio revision de IT-1 trimestral', time: 'Hace 12 min', bg: 'var(--mc-blue-bg)' },
  { icon: '📄', text: 'Nuevo documento recibido: NCF Serie B', time: 'Hace 25 min', bg: 'var(--mc-purple-bg)' },
  { icon: '⚠️', text: 'Alerta: Plazo DGII vence en 15 dias (IR-17 Marzo)', time: 'Hace 1 hora', bg: 'var(--mc-orange-bg)' },
  { icon: '🔄', text: 'Pipeline de conciliacion bancaria completado', time: 'Hace 2 horas', bg: 'var(--mc-green-bg)' },
  { icon: '📊', text: 'Reporte mensual generado: Febrero 2026', time: 'Hace 3 horas', bg: 'var(--mc-blue-bg)' },
];

const quickActions = [
  { label: 'Nueva Tarea', icon: '➕', page: 'tasks' as PageKey },
  { label: 'Ver Pipeline', icon: '⟳', page: 'pipeline' as PageKey },
  { label: 'Calendario', icon: '📅', page: 'calendar' as PageKey },
  { label: 'Ver Agentes', icon: '🤖', page: 'team' as PageKey },
];

const agentStatus = [
  { name: 'Fiscal Lead', status: 'active', task: 'Procesando IR-17' },
  { name: 'Doc Analyzer', status: 'active', task: 'Clasificando NCFs' },
  { name: 'Validator', status: 'busy', task: 'Verificando montos' },
  { name: 'Reporter', status: 'idle', task: 'En espera' },
];

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="mc-page-header">
        <h1 className="mc-page-title">Mission Control</h1>
        <p className="mc-page-subtitle">Vista general del sistema Empleaido</p>
      </div>

      {/* Stats Grid */}
      <div className="mc-stats-grid">
        {stats.map((stat, i) => (
          <div className="mc-stat-card" key={i}>
            <div className="mc-stat-icon" style={{ background: stat.bg }}>{stat.icon}</div>
            <div className="mc-stat-value">{stat.value}</div>
            <div className="mc-stat-label">{stat.label}</div>
            <div className={`mc-stat-change ${stat.positive ? 'positive' : 'negative'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="mc-grid-2" style={{ marginBottom: 24 }}>
        {/* Recent Activity */}
        <div className="mc-card">
          <div className="mc-section-header">
            <h3 className="mc-card-title">Actividad Reciente</h3>
            <button className="mc-btn" onClick={() => onNavigate('memory')}>Ver Todo</button>
          </div>
          <div className="mc-activity-feed">
            {recentActivity.map((item, i) => (
              <div className="mc-activity-item" key={i}>
                <div className="mc-activity-icon" style={{ background: item.bg }}>{item.icon}</div>
                <div className="mc-activity-content">
                  <div className="mc-activity-text">{item.text}</div>
                  <div className="mc-activity-time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Quick Actions */}
          <div className="mc-card">
            <h3 className="mc-card-title">Acciones Rapidas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  className="mc-btn"
                  onClick={() => onNavigate(action.page)}
                  style={{ justifyContent: 'center', padding: '12px' }}
                >
                  <span>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Agent Status */}
          <div className="mc-card">
            <div className="mc-section-header">
              <h3 className="mc-card-title">Estado de Agentes</h3>
              <button className="mc-btn" onClick={() => onNavigate('team')}>Ver Todos</button>
            </div>
            {agentStatus.map((agent, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < agentStatus.length - 1 ? '1px solid var(--mc-border)' : 'none' }}>
                <span className={`mc-agent-status ${agent.status}`} style={{ minWidth: 'auto' }}>
                  <span className="mc-status-dot" style={{ width: 6, height: 6, background: agent.status === 'active' ? 'var(--mc-green)' : agent.status === 'busy' ? 'var(--mc-orange)' : 'var(--mc-text-muted)', animation: agent.status === 'active' ? 'pulse 2s infinite' : 'none' }}></span>
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--mc-text-primary)' }}>{agent.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--mc-text-muted)' }}>{agent.task}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
