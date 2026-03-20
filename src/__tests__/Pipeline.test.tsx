import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Pipeline from '../pages/Pipeline';

describe('Pipeline', () => {
  it('renders pipeline stage overview', () => {
    render(<Pipeline />);
    // Stage counts are unique to the overview section
    expect(screen.getByText('Documentos en Proceso')).toBeInTheDocument();
  });

  it('renders pipeline items', () => {
    render(<Pipeline />);
    expect(screen.getByText('Factura NCF B0100045623')).toBeInTheDocument();
    expect(screen.getByText('IR-17 Marzo 2026')).toBeInTheDocument();
  });

  it('renders page title', () => {
    render(<Pipeline />);
    expect(screen.getByRole('heading', { level: 1, name: 'Pipeline' })).toBeInTheDocument();
  });
});
