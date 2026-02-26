import React, { useState, useMemo } from 'react';

interface CalendarEvent {
  day: number;
  title: string;
  type: 'deadline' | 'filing' | 'meeting' | 'reminder';
}

interface UpcomingEvent {
  day: number;
  month: string;
  title: string;
  description: string;
  type: 'deadline' | 'filing' | 'meeting' | 'reminder';
}

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const weekdays = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

const events2026: Record<string, CalendarEvent[]> = {
  '2026-2': [
    { day: 10, title: 'IR-17 Marzo', type: 'deadline' },
    { day: 15, title: 'Revision NCFs', type: 'filing' },
    { day: 20, title: 'Reunion DGII', type: 'meeting' },
    { day: 28, title: 'Cierre Feb', type: 'reminder' },
  ],
  '2026-3': [
    { day: 10, title: 'IR-17 Abril', type: 'deadline' },
    { day: 15, title: 'IT-1 Q1', type: 'deadline' },
    { day: 20, title: 'Auditoria Interna', type: 'meeting' },
    { day: 28, title: 'Prep IT-1', type: 'filing' },
    { day: 31, title: 'Cierre Mar', type: 'reminder' },
  ],
  '2026-4': [
    { day: 10, title: 'IR-17 Mayo', type: 'deadline' },
    { day: 28, title: 'IT-1 Q1 Envio', type: 'deadline' },
    { day: 30, title: 'Cierre Abr', type: 'reminder' },
  ],
};

const upcomingEvents: UpcomingEvent[] = [
  { day: 10, month: 'Mar', title: 'IR-17 Marzo', description: 'Fecha limite declaracion retenciones DGII', type: 'deadline' },
  { day: 15, month: 'Mar', title: 'Revision NCFs', description: 'Revision y clasificacion de comprobantes fiscales del trimestre', type: 'filing' },
  { day: 20, month: 'Mar', title: 'Reunion DGII', description: 'Reunion virtual con representante DGII zona norte', type: 'meeting' },
  { day: 28, month: 'Mar', title: 'Cierre Febrero', description: 'Cierre contable del mes y generacion de reportes', type: 'reminder' },
  { day: 10, month: 'Abr', title: 'IR-17 Abril', description: 'Siguiente fecha limite de retenciones mensuales', type: 'deadline' },
  { day: 15, month: 'Abr', title: 'IT-1 Q1 Prep', description: 'Preparacion del informe trimestral de transacciones', type: 'filing' },
  { day: 28, month: 'Abr', title: 'IT-1 Q1 Envio', description: 'Fecha limite para envio IT-1 primer trimestre 2026', type: 'deadline' },
];

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(1); // 0-indexed, Feb = 1
  const [currentYear] = useState(2026);

  const today = 26; // Feb 26, 2026

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Mon = 0
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days: { day: number; isCurrentMonth: boolean; events: CalendarEvent[] }[] = [];
    const monthKey = `${currentYear}-${currentMonth}`;
    const monthEvents = events2026[monthKey] || [];

    // Previous month days
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, events: [] });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        day: d,
        isCurrentMonth: true,
        events: monthEvents.filter(e => e.day === d),
      });
    }

    // Next month days to fill grid
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push({ day: d, isCurrentMonth: false, events: [] });
    }

    return days;
  }, [currentMonth, currentYear]);

  const prevMonth = () => setCurrentMonth(m => m === 0 ? 11 : m - 1);
  const nextMonth = () => setCurrentMonth(m => m === 11 ? 0 : m + 1);

  return (
    <div>
      <div className="mc-page-header">
        <h1 className="mc-page-title">Calendar</h1>
        <p className="mc-page-subtitle">Fechas limites fiscales y eventos importantes</p>
      </div>

      <div className="mc-calendar-layout">
        {/* Calendar Grid */}
        <div className="mc-calendar-grid">
          <div className="mc-calendar-month-header">
            <button className="mc-calendar-nav-btn" onClick={prevMonth}>←</button>
            <div className="mc-calendar-month-title">
              {months[currentMonth]} {currentYear}
            </div>
            <button className="mc-calendar-nav-btn" onClick={nextMonth}>→</button>
          </div>

          <div className="mc-calendar-weekdays">
            {weekdays.map(day => (
              <div className="mc-calendar-weekday" key={day}>{day}</div>
            ))}
          </div>

          <div className="mc-calendar-days">
            {calendarDays.map((day, i) => (
              <div
                key={i}
                className={`mc-calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${day.isCurrentMonth && day.day === today && currentMonth === 1 ? 'today' : ''}`}
              >
                <div className="mc-calendar-day-number">{day.day}</div>
                {day.events.map((event, j) => (
                  <div key={j} className={`mc-calendar-event ${event.type}`}>
                    {event.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mc-calendar-upcoming">
          <div className="mc-upcoming-title">Proximos Eventos</div>
          {upcomingEvents.map((event, i) => (
            <div className="mc-upcoming-item" key={i}>
              <div className="mc-upcoming-date">
                <div className="mc-upcoming-date-day">{event.day}</div>
                <div className="mc-upcoming-date-month">{event.month}</div>
              </div>
              <div className="mc-upcoming-info">
                <div className="mc-upcoming-name">{event.title}</div>
                <div className="mc-upcoming-desc">{event.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
