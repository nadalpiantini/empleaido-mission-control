import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('shows Dashboard by default', () => {
    render(<App />);
    expect(screen.getByText('Vista general del sistema Empleaido')).toBeInTheDocument();
  });

  it('renders the sidebar', () => {
    render(<App />);
    expect(screen.getByText('Empleaido')).toBeInTheDocument();
  });
});
