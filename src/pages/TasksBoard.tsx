import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  tags: { label: string; type: string }[];
  assignee: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'recurring',
    title: 'Recurrente',
    color: 'var(--mc-purple)',
    tasks: [
      { id: 't1', title: 'Declaracion IR-17 Mensual', description: 'Retencion de asalariados - proceso mensual DGII', tags: [{ label: 'fiscal', type: 'fiscal' }, { label: 'auto', type: 'auto' }], assignee: 'FL', date: 'Dia 10 c/mes', priority: 'high' },
      { id: 't2', title: 'Envio IT-1 Trimestral', description: 'Informacion de compras y ventas trimestral', tags: [{ label: 'fiscal', type: 'fiscal' }], assignee: 'DA', date: 'Trimestral', priority: 'medium' },
      { id: 't3', title: 'Conciliacion Bancaria', description: 'Comparar registros contables vs extractos bancarios', tags: [{ label: 'docs', type: 'docs' }], assignee: 'VA', date: 'Mensual', priority: 'medium' },
    ],
  },
  {
    id: 'backlog',
    title: 'Backlog',
    color: 'var(--mc-text-muted)',
    tasks: [
      { id: 't4', title: 'Configurar NCF Electronico', description: 'Implementar sistema e-NCF segun normativa DGII', tags: [{ label: 'fiscal', type: 'fiscal' }, { label: 'urgent', type: 'urgent' }], assignee: 'FL', date: 'Mar 2026', priority: 'high' },
      { id: 't5', title: 'Audit Trail Automatizado', description: 'Sistema de trazabilidad para todas las transacciones', tags: [{ label: 'ai', type: 'ai' }], assignee: 'SE', date: 'Q2 2026', priority: 'low' },
      { id: 't6', title: 'Dashboard Gerencial', description: 'Reportes ejecutivos con graficos interactivos', tags: [{ label: 'review', type: 'review' }], assignee: 'RE', date: 'Q2 2026', priority: 'medium' },
    ],
  },
  {
    id: 'in-progress',
    title: 'En Progreso',
    color: 'var(--mc-blue)',
    tasks: [
      { id: 't7', title: 'Procesamiento IR-17 Marzo', description: 'Calcular retenciones y generar formulario para DGII', tags: [{ label: 'fiscal', type: 'fiscal' }, { label: 'ai', type: 'ai' }], assignee: 'FL', date: '10 Mar 2026', priority: 'high' },
      { id: 't8', title: 'Clasificacion NCFs Febrero', description: 'Categorizar comprobantes fiscales del mes anterior', tags: [{ label: 'docs', type: 'docs' }, { label: 'auto', type: 'auto' }], assignee: 'DA', date: '5 Mar 2026', priority: 'medium' },
    ],
  },
  {
    id: 'review',
    title: 'Revision',
    color: 'var(--mc-orange)',
    tasks: [
      { id: 't9', title: 'Reporte Febrero Completo', description: 'Revision final del cierre contable de febrero', tags: [{ label: 'review', type: 'review' }, { label: 'docs', type: 'docs' }], assignee: 'RE', date: '28 Feb 2026', priority: 'medium' },
    ],
  },
  {
    id: 'done',
    title: 'Completado',
    color: 'var(--mc-green)',
    tasks: [
      { id: 't10', title: 'IR-17 Febrero Presentado', description: 'Declaracion enviada a DGII exitosamente', tags: [{ label: 'fiscal', type: 'fiscal' }], assignee: 'FL', date: '10 Feb 2026', priority: 'high' },
      { id: 't11', title: 'Cierre Enero 2026', description: 'Todos los procesos contables de enero completados', tags: [{ label: 'docs', type: 'docs' }], assignee: 'VA', date: '31 Ene 2026', priority: 'medium' },
      { id: 't12', title: 'Backup Fiscal Q4 2025', description: 'Respaldo de documentos fiscales del trimestre', tags: [{ label: 'docs', type: 'docs' }, { label: 'auto', type: 'auto' }], assignee: 'SE', date: '15 Ene 2026', priority: 'low' },
    ],
  },
];

const TasksBoard: React.FC = () => {
  const [columns] = useState<Column[]>(initialColumns);

  return (
    <div>
      <div className="mc-page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 className="mc-page-title">Tasks Board</h1>
            <p className="mc-page-subtitle">Gestion de tareas fiscales y operativas</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="mc-btn">Filtrar</button>
            <button className="mc-btn primary">+ Nueva Tarea</button>
          </div>
        </div>
      </div>

      <div className="mc-kanban">
        {columns.map((column) => (
          <div className="mc-kanban-column" key={column.id}>
            <div className="mc-kanban-header">
              <div className="mc-kanban-title">
                <span className="mc-kanban-dot" style={{ background: column.color }}></span>
                {column.title}
              </div>
              <span className="mc-kanban-count">{column.tasks.length}</span>
            </div>
            <div className="mc-kanban-body">
              {column.tasks.map((task) => (
                <div className="mc-task-card" key={task.id}>
                  <div className="mc-task-card-title">{task.title}</div>
                  <div className="mc-task-card-desc">{task.description}</div>
                  <div className="mc-task-card-footer">
                    <div className="mc-task-card-tags">
                      {task.tags.map((tag, i) => (
                        <span key={i} className={`mc-tag ${tag.type}`}>{tag.label}</span>
                      ))}
                    </div>
                    <div className="mc-task-card-avatar">{task.assignee}</div>
                  </div>
                  <div className="mc-task-card-date" style={{ marginTop: 8 }}>{task.date}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksBoard;
