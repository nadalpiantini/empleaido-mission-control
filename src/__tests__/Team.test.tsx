import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Team from '../pages/Team';

describe('Team', () => {
  it('renders all 8 agent names', () => {
    render(<Team />);
    expect(screen.getByText('Fiscal Lead')).toBeInTheDocument();
    expect(screen.getByText('Doc Analyzer')).toBeInTheDocument();
    expect(screen.getByText('Validator')).toBeInTheDocument();
    expect(screen.getByText('Reporter')).toBeInTheDocument();
    expect(screen.getByText('Calendar Agent')).toBeInTheDocument();
    expect(screen.getByText('Conciliador')).toBeInTheDocument();
    expect(screen.getByText('NCF Manager')).toBeInTheDocument();
    expect(screen.getByText('Compliance Bot')).toBeInTheDocument();
  });

  it('renders page title', () => {
    render(<Team />);
    expect(screen.getByText('Team / Agents')).toBeInTheDocument();
  });
});
