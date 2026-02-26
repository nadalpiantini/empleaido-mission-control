import React, { useState, useMemo } from 'react';

interface MemoryEntry {
  id: string;
  time: string;
  type: 'decision' | 'action' | 'learning' | 'error' | 'context';
  content: string;
  context?: string;
  agent?: string;
}

interface DateGroup {
  date: string;
  label: string;
  count: number;
}

const typeStyles: Record<string, { bg: string; color: string; label: string }> = {
  decision: { bg: 'var(--mc-purple-bg)', color: 'var(--mc-purple)', label: 'Decision' },
  action: { bg: 'var(--mc-blue-bg)', color: 'var(--mc-blue)', label: 'Accion' },
  learning: { bg: 'var(--mc-green-bg)', color: 'var(--mc-green)', label: 'Aprendizaje' },
  error: { bg: 'var(--mc-red-bg)', color: 'var(--mc-red)', label: 'Error' },
  context: { bg: 'var(--mc-orange-bg)', color: 'var(--mc-orange)', label: 'Contexto' },
};

const allEntries: MemoryEntry[] = [
  { id: 'm1', time: '14:32', type: 'action', content: 'IR-17 de febrero procesado y enviado a DGII. Monto total de retenciones: RD$45,230.00. Verificacion exitosa con codigo de confirmacion #DGII-2026-0847.', context: 'Empresa ABC S.R.L. - Periodo Febrero 2026', agent: 'Fiscal Lead' },
  { id: 'm2', time: '14:15', type: 'decision', content: 'Se decidio aplicar la tasa de retencion del 27% para dividendos segun Art. 308 del Codigo Tributario, en lugar del 10% que se venia aplicando incorrectamente.', context: 'Revision de politica de retenciones', agent: 'Fiscal Lead' },
  { id: 'm3', time: '13:48', type: 'learning', content: 'Patron detectado: Las facturas de proveedores de zona franca requieren un NCF tipo B15 especial. Se actualizo la regla de clasificacion automatica para futuros documentos.', context: 'Clasificacion automatica de NCFs', agent: 'Doc Analyzer' },
  { id: 'm4', time: '12:20', type: 'error', content: 'Error de validacion en NCF E310000000124: El RNC del proveedor (130-45678-1) no coincide con el registrado en DGII. Se puso en cuarentena para revision manual.', context: 'Pipeline de validacion NCF', agent: 'Validator' },
  { id: 'm5', time: '11:45', type: 'context', content: 'Recordatorio: El plazo para presentacion del IT-1 del primer trimestre 2026 vence el 28 de abril. Faltan 61 dias. Se programo recordatorio para 30 dias antes.', context: 'Calendario fiscal DGII', agent: 'Calendar Agent' },
  { id: 'm6', time: '10:30', type: 'action', content: 'Conciliacion bancaria de enero completada. 3 discrepancias encontradas y resueltas: 2 depositos en transito y 1 cheque pendiente de cobro por RD$12,500.', context: 'Banco Popular - Cuenta Corriente #4521', agent: 'Validator' },
  { id: 'm7', time: '09:15', type: 'learning', content: 'El nuevo formato de exportacion DGII para 2026 requiere campos adicionales de tipo de pago. Se actualizo el template de generacion para incluir codigo de metodo de pago.', context: 'Actualizacion normativa DGII 2026', agent: 'Fiscal Lead' },
  { id: 'm8', time: '08:00', type: 'context', content: 'Inicio de sesion del sistema. 5 tareas pendientes, 2 en progreso. Proxima fecha limite: IR-17 Marzo (10 de marzo). Estado general: operativo.', context: 'Boot del sistema', agent: 'System' },
];

const dateGroups: DateGroup[] = [
  { date: '2026-02-26', label: 'Hoy', count: 8 },
  { date: '2026-02-25', label: '25 Feb', count: 12 },
  { date: '2026-02-24', label: '24 Feb', count: 6 },
  { date: '2026-02-23', label: '23 Feb', count: 9 },
  { date: '2026-02-22', label: '22 Feb', count: 4 },
  { date: '2026-02-21', label: '21 Feb', count: 7 },
  { date: '2026-02-20', label: '20 Feb', count: 11 },
  { date: '2026-02-19', label: '19 Feb', count: 5 },
];

const Memory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDate, setActiveDate] = useState('2026-02-26');
  const [activeType, setActiveType] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    return allEntries.filter((entry) => {
      const matchesSearch = searchQuery === '' ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (entry.context && entry.context.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = !activeType || entry.type === activeType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, activeType]);

  return (
    <div>
      <div className="mc-page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 className="mc-page-title">Memory</h1>
            <p className="mc-page-subtitle">Long-Term Memory - Journal de decisiones y acciones</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {Object.entries(typeStyles).map(([key, style]) => (
              <button
                key={key}
                className="mc-btn"
                onClick={() => setActiveType(activeType === key ? null : key)}
                style={{
                  background: activeType === key ? style.bg : undefined,
                  color: activeType === key ? style.color : undefined,
                  borderColor: activeType === key ? style.color : undefined,
                }}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mc-memory-layout">
        {/* Date Sidebar */}
        <div className="mc-memory-sidebar">
          <div style={{ marginBottom: 12 }}>
            <div className="mc-card-title" style={{ marginBottom: 0 }}>Fechas</div>
          </div>
          {dateGroups.map((group) => (
            <div
              key={group.date}
              className={`mc-memory-date-item ${activeDate === group.date ? 'active' : ''}`}
              onClick={() => setActiveDate(group.date)}
            >
              <div className="mc-memory-date-label">{group.label}</div>
              <div className="mc-memory-date-count">{group.count} entries</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="mc-memory-main">
          {/* Search */}
          <div className="mc-memory-search">
            <span className="mc-memory-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar en memorias... (ej: IR-17, NCF, DGII)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Entries */}
          <div className="mc-memory-entries">
            {filteredEntries.map((entry) => {
              const style = typeStyles[entry.type];
              return (
                <div className="mc-memory-entry" key={entry.id}>
                  <div className="mc-memory-entry-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className="mc-memory-entry-time">{entry.time}</span>
                      {entry.agent && (
                        <span style={{ fontSize: 11, color: 'var(--mc-text-muted)' }}>
                          by {entry.agent}
                        </span>
                      )}
                    </div>
                    <span
                      className="mc-memory-entry-type"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {style.label}
                    </span>
                  </div>
                  <div className="mc-memory-entry-content">{entry.content}</div>
                  {entry.context && (
                    <div className="mc-memory-entry-context">📎 {entry.context}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memory;
