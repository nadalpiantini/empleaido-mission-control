import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Sidebar from '../components/Sidebar';

describe('Sidebar', () => {
  it('renders all nav items', () => {
    render(<Sidebar activePage="dashboard" onNavigate={vi.fn()} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Pipeline')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('Agents')).toBeInTheDocument();
    expect(screen.getByText('Memory')).toBeInTheDocument();
  });

  it('marks active page with aria-current', () => {
    render(<Sidebar activePage="tasks" onNavigate={vi.fn()} />);
    const tasksBtn = screen.getByText('Tasks').closest('button');
    expect(tasksBtn).toHaveAttribute('aria-current', 'page');
  });

  it('calls onNavigate when clicking nav item', () => {
    const onNavigate = vi.fn();
    render(<Sidebar activePage="dashboard" onNavigate={onNavigate} />);
    fireEvent.click(screen.getByText('Calendar'));
    expect(onNavigate).toHaveBeenCalledWith('calendar');
  });
});
