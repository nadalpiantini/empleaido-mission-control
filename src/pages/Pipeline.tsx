import React from 'react';

interface PipelineStage {
  name: string;
  icon: string;
  count: number;
}

interface PipelineItem {
  id: string;
  name: string;
  stage: string;
  icon: string;
  iconBg: string;
  meta: string;
  progress: number;
  progressColor: string;
}

const stages: PipelineStage[] = [
  { name: 'Recepcion', icon: '📥', count: 3 },
  { name: 'Clasificacion', icon: '🏷️', count: 5 },
  { name: 'Validacion', icon: '✓', count: 4 },
  { name: 'Procesamiento', icon: '⚙️', count: 2 },
  { name: 'Revision', icon: '👁️', count: 1 },
  { name: 'Completado', icon: '✅', count: 12 },
];

const pipelineItems: PipelineItem[] = [
  {
    id: 'p1', name: 'Factura NCF B0100045623',
    stage: 'Clasificacion', icon: '🧾', iconBg: 'var(--mc-blue-bg)',
    meta: 'Proveedor: Distribuidora Nacional SRL • RD$45,000',
    progress: 35, progressColor: 'var(--mc-blue)',
  },
  {
    id: 'p2', name: 'NCF B0100045624 - Servicios',
    stage: 'Clasificacion', icon: '📋', iconBg: 'var(--mc-blue-bg)',
    meta: 'Proveedor: Consultores Asociados • RD$22,500',
    progress: 40, progressColor: 'var(--mc-blue)',
  },
  {
    id: 'p3', name: 'IR-17 Marzo 2026',
    stage: 'Procesamiento', icon: '🏛️', iconBg: 'var(--mc-purple-bg)',
    meta: 'Retenciones del mes • 15 empleados • En calculo',
    progress: 65, progressColor: 'var(--mc-purple)',
  },
  {
    id: 'p4', name: 'Extracto Banco Popular Feb',
    stage: 'Validacion', icon: '🏦', iconBg: 'var(--mc-green-bg)',
    meta: '142 transacciones • Cuenta #4521 • Conciliando',
    progress: 55, progressColor: 'var(--mc-green)',
  },
  {
    id: 'p5', name: 'NCF E310000000124',
    stage: 'Validacion', icon: '⚠️', iconBg: 'var(--mc-red-bg)',
    meta: 'Error: RNC no coincide con DGII • En cuarentena',
    progress: 30, progressColor: 'var(--mc-red)',
  },
  {
    id: 'p6', name: 'Reporte Cierre Febrero',
    stage: 'Revision', icon: '📊', iconBg: 'var(--mc-orange-bg)',
    meta: 'Cierre contable del mes • Esperando aprobacion',
    progress: 85, progressColor: 'var(--mc-orange)',
  },
  {
    id: 'p7', name: 'Factura NCF B0100045620',
    stage: 'Recepcion', icon: '📥', iconBg: 'var(--mc-blue-bg)',
    meta: 'Nuevo documento escaneado • Pendiente OCR',
    progress: 10, progressColor: 'var(--mc-text-muted)',
  },
  {
    id: 'p8', name: 'NCF Serie B - Lote 15',
    stage: 'Clasificacion', icon: '🏷️', iconBg: 'var(--mc-blue-bg)',
    meta: '8 comprobantes del lote • Auto-clasificando',
    progress: 45, progressColor: 'var(--mc-blue)',
  },
  {
    id: 'p9', name: 'IT-1 Q1 2026 - Datos',
    stage: 'Procesamiento', icon: '📄', iconBg: 'var(--mc-purple-bg)',
    meta: 'Recopilacion de datos para informe trimestral',
    progress: 20, progressColor: 'var(--mc-purple)',
  },
];

const Pipeline: React.FC = () => {
  return (
    <div>
      <div className="mc-page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 className="mc-page-title">Pipeline</h1>
            <p className="mc-page-subtitle">Flujo de documentos fiscales y procesos</p>
          </div>
          <button className="mc-btn primary">+ Nuevo Documento</button>
        </div>
      </div>

      {/* Pipeline Stages Overview */}
      <div className="mc-pipeline">
        <div className="mc-pipeline-stages">
          {stages.map((stage, i) => (
            <div className="mc-pipeline-stage" key={i}>
              <div className="mc-pipeline-stage-icon">{stage.icon}</div>
              <div className="mc-pipeline-stage-name">{stage.name}</div>
              <div className="mc-pipeline-stage-count">{stage.count}</div>
            </div>
          ))}
        </div>

        {/* Pipeline Items */}
        <div>
          <div className="mc-section-header">
            <h3 className="mc-section-title">Documentos en Proceso</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="mc-btn">Todos</button>
              <button className="mc-btn">En Riesgo</button>
            </div>
          </div>
          <div className="mc-pipeline-items">
            {pipelineItems.map((item) => (
              <div className="mc-pipeline-item" key={item.id}>
                <div className="mc-pipeline-item-icon" style={{ background: item.iconBg }}>
                  {item.icon}
                </div>
                <div className="mc-pipeline-item-info">
                  <div className="mc-pipeline-item-name">{item.name}</div>
                  <div className="mc-pipeline-item-meta">{item.meta}</div>
                  <div className="mc-pipeline-item-progress">
                    <div
                      className="mc-pipeline-item-progress-bar"
                      style={{ width: `${item.progress}%`, background: item.progressColor }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: 'var(--mc-text-muted)' }}>{item.stage}</span>
                    <span style={{ fontSize: 10, color: 'var(--mc-text-muted)' }}>{item.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
