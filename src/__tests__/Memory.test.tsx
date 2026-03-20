import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Memory from '../pages/Memory';

describe('Memory', () => {
  it('renders entries for default date', () => {
    render(<Memory />);
    // Default activeDate is 2026-02-26, entries m1-m3 have that date
    expect(screen.getByText(/IR-17 de febrero procesado/)).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<Memory />);
    expect(screen.getByPlaceholderText(/Buscar en memorias/)).toBeInTheDocument();
  });

  it('filters by search query within active date', () => {
    render(<Memory />);
    const input = screen.getByPlaceholderText(/Buscar en memorias/);
    // Search for something in date 2026-02-26 entries
    fireEvent.change(input, { target: { value: 'tasa de retencion' } });
    expect(screen.getByText(/tasa de retencion del 27%/)).toBeInTheDocument();
    expect(screen.queryByText(/IR-17 de febrero procesado/)).not.toBeInTheDocument();
  });

  it('renders date sidebar', () => {
    render(<Memory />);
    expect(screen.getByText('Hoy')).toBeInTheDocument();
    expect(screen.getByText('25 Feb')).toBeInTheDocument();
  });
});
