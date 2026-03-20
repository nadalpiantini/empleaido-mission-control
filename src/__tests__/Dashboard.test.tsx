import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from '../pages/Dashboard';

describe('Dashboard', () => {
  it('renders stat cards', () => {
    render(<Dashboard onNavigate={vi.fn()} />);
    expect(screen.getByText('Tareas Activas')).toBeInTheDocument();
    expect(screen.getByText('Agentes Activos')).toBeInTheDocument();
    expect(screen.getByText('Documentos en Pipeline')).toBeInTheDocument();
  });

  it('renders activity feed', () => {
    render(<Dashboard onNavigate={vi.fn()} />);
    expect(screen.getByText('Actividad Reciente')).toBeInTheDocument();
  });

  it('renders quick actions', () => {
    render(<Dashboard onNavigate={vi.fn()} />);
    expect(screen.getByText('Acciones Rapidas')).toBeInTheDocument();
    expect(screen.getByText('Nueva Tarea')).toBeInTheDocument();
  });
});
