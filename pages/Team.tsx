import React from 'react';

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  type: 'lead' | 'dev' | 'analyst' | 'writer' | 'security';
  status: 'active' | 'idle' | 'busy';
  currentTask: string;
  stats: { tasks: number; accuracy: string; speed: string };
  skills: string[];
  avatarBg: string;
}

const agents: Agent[] = [
  {
    id: 'a1', name: 'Fiscal Lead', role: 'Director Fiscal AI',
    icon: '🏛️', type: 'lead', status: 'active',
    currentTask: 'Procesando IR-17 Marzo 2026',
    stats: { tasks: 156, accuracy: '99.2%', speed: '2.3s' },
    skills: ['IR-17', 'IT-1', 'IR-2', 'DGII API', 'Codigo Tributario'],
    avatarBg: 'linear-gradient(135deg, var(--mc-accent), #8b5cf6)',
  },
  {
    id: 'a2', name: 'Doc Analyzer', role: 'Analista de Documentos',
    icon: '📄', type: 'analyst', status: 'active',
    currentTask: 'Clasificando NCFs Serie B del mes',
    stats: { tasks: 2340, accuracy: '97.8%', speed: '0.8s' },
    skills: ['OCR', 'NCF Parsing', 'Clasificacion', 'PDF Extract'],
    avatarBg: 'linear-gradient(135deg, var(--mc-green), #10b981)',
  },
  {
    id: 'a3', name: 'Validator', role: 'Verificador de Datos',
    icon: '✓', type: 'security', status: 'busy',
    currentTask: 'Verificando montos de retenciones vs DGII',
    stats: { tasks: 892, accuracy: '99.9%', speed: '1.5s' },
    skills: ['RNC Lookup', 'Monto Validation', 'Cross-Reference', 'DGII Check'],
    avatarBg: 'linear-gradient(135deg, var(--mc-red), #ef4444)',
  },
  {
    id: 'a4', name: 'Reporter', role: 'Generador de Reportes',
    icon: '📊', type: 'writer', status: 'idle',
    currentTask: 'En espera de datos procesados',
    stats: { tasks: 67, accuracy: '98.5%', speed: '4.2s' },
    skills: ['Excel Export', 'PDF Reports', 'Charts', 'DGII Format'],
    avatarBg: 'linear-gradient(135deg, var(--mc-orange), #f59e0b)',
  },
  {
    id: 'a5', name: 'Calendar Agent', role: 'Gestor de Plazos',
    icon: '📅', type: 'dev', status: 'active',
    currentTask: 'Monitoreando fechas limites DGII Q1',
    stats: { tasks: 48, accuracy: '100%', speed: '0.3s' },
    skills: ['DGII Calendar', 'Alerts', 'Scheduling', 'Reminders'],
    avatarBg: 'linear-gradient(135deg, var(--mc-blue), #3b82f6)',
  },
  {
    id: 'a6', name: 'Conciliador', role: 'Agente de Conciliacion',
    icon: '🏦', type: 'analyst', status: 'idle',
    currentTask: 'Esperando extractos bancarios de marzo',
    stats: { tasks: 24, accuracy: '98.1%', speed: '5.1s' },
    skills: ['Bank Matching', 'Transaction Parsing', 'Discrepancy Detection'],
    avatarBg: 'linear-gradient(135deg, var(--mc-green), #059669)',
  },
  {
    id: 'a7', name: 'NCF Manager', role: 'Gestor de Comprobantes',
    icon: '🧾', type: 'dev', status: 'active',
    currentTask: 'Validando secuencias NCF activas',
    stats: { tasks: 3120, accuracy: '99.7%', speed: '0.5s' },
    skills: ['e-NCF', 'NCF Sequences', 'DGII Validation', 'B-Series'],
    avatarBg: 'linear-gradient(135deg, var(--mc-purple), #8b5cf6)',
  },
  {
    id: 'a8', name: 'Compliance Bot', role: 'Monitor de Cumplimiento',
    icon: '🛡️', type: 'security', status: 'active',
    currentTask: 'Auditando transacciones del mes',
    stats: { tasks: 445, accuracy: '99.4%', speed: '1.8s' },
    skills: ['Audit Trail', 'Risk Assessment', 'Compliance Check', 'DGII Rules'],
    avatarBg: 'linear-gradient(135deg, var(--mc-red), #dc2626)',
  },
];

const statusCounts = {
  active: agents.filter(a => a.status === 'active').length,
  busy: agents.filter(a => a.status === 'busy').length,
  idle: agents.filter(a => a.status === 'idle').length,
};

const Team: React.FC = () => {
  return (
    <div>
      <div className="mc-page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 className="mc-page-title">Team / Agents</h1>
            <p className="mc-page-subtitle">Agentes AI del ecosistema Empleaido</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="mc-agent-status active" style={{ fontSize: 12 }}>
              <span className="mc-status-dot" style={{ width: 6, height: 6 }}></span>
              {statusCounts.active} Activos
            </div>
            <div className="mc-agent-status busy" style={{ fontSize: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mc-orange)', display: 'inline-block' }}></span>
              {statusCounts.busy} Ocupados
            </div>
            <div className="mc-agent-status idle" style={{ fontSize: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mc-text-muted)', display: 'inline-block' }}></span>
              {statusCounts.idle} Inactivos
            </div>
          </div>
        </div>
      </div>

      <div className="mc-team-grid">
        {agents.map((agent) => (
          <div className={`mc-agent-card ${agent.type}`} key={agent.id}>
            <div className="mc-agent-header">
              <div className="mc-agent-avatar" style={{ background: agent.avatarBg }}>
                {agent.icon}
              </div>
              <div className="mc-agent-info">
                <div className="mc-agent-name">{agent.name}</div>
                <div className="mc-agent-role">{agent.role}</div>
              </div>
              <div className={`mc-agent-status ${agent.status}`}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: agent.status === 'active' ? 'var(--mc-green)' : agent.status === 'busy' ? 'var(--mc-orange)' : 'var(--mc-text-muted)', display: 'inline-block' }}></span>
                {agent.status === 'active' ? 'Activo' : agent.status === 'busy' ? 'Ocupado' : 'Inactivo'}
              </div>
            </div>

            <div style={{ fontSize: 12, color: 'var(--mc-text-secondary)', marginBottom: 14, padding: '8px 10px', background: 'var(--mc-bg-input)', borderRadius: 'var(--mc-radius-xs)' }}>
              {agent.currentTask}
            </div>

            <div className="mc-agent-stats">
              <div className="mc-agent-stat">
                <div className="mc-agent-stat-value">{agent.stats.tasks}</div>
                <div className="mc-agent-stat-label">Tareas</div>
              </div>
              <div className="mc-agent-stat">
                <div className="mc-agent-stat-value">{agent.stats.accuracy}</div>
                <div className="mc-agent-stat-label">Precision</div>
              </div>
              <div className="mc-agent-stat">
                <div className="mc-agent-stat-value">{agent.stats.speed}</div>
                <div className="mc-agent-stat-label">Velocidad</div>
              </div>
            </div>

            <div className="mc-agent-skills">
              {agent.skills.map((skill, i) => (
                <span key={i} className="mc-agent-skill">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
