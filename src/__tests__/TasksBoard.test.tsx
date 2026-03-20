import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TasksBoard from '../pages/TasksBoard';

describe('TasksBoard', () => {
  it('renders all 5 column headers', () => {
    render(<TasksBoard />);
    expect(screen.getByText('Recurrente')).toBeInTheDocument();
    expect(screen.getByText('Backlog')).toBeInTheDocument();
    expect(screen.getByText('En Progreso')).toBeInTheDocument();
    expect(screen.getByText('Revision')).toBeInTheDocument();
    expect(screen.getByText('Completado')).toBeInTheDocument();
  });

  it('renders task cards', () => {
    render(<TasksBoard />);
    expect(screen.getByText('Declaracion IR-17 Mensual')).toBeInTheDocument();
  });
});
