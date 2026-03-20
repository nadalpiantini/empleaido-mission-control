import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Calendar from '../pages/Calendar';

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

describe('Calendar', () => {
  it('renders current month and year in header', () => {
    render(<Calendar />);
    const now = new Date();
    const expectedText = `${months[now.getMonth()]} ${now.getFullYear()}`;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('has navigation buttons', () => {
    render(<Calendar />);
    expect(screen.getByLabelText('Mes anterior')).toBeInTheDocument();
    expect(screen.getByLabelText('Mes siguiente')).toBeInTheDocument();
  });

  it('navigates to next month', () => {
    render(<Calendar />);
    const now = new Date();
    const nextBtn = screen.getByLabelText('Mes siguiente');
    fireEvent.click(nextBtn);

    const nextMonthIdx = (now.getMonth() + 1) % 12;
    const nextYear = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
    const expectedText = `${months[nextMonthIdx]} ${nextYear}`;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
