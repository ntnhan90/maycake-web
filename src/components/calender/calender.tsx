'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import './calendar.css';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const startDay = startOfMonth.day(); // 0 = Sunday
  const daysInMonth = currentDate.daysInMonth();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));
  dayjs.extend(localeData);
  // tạo danh sách ngày (bao gồm padding)
  const generateDays = () => {
    const days: (number | null)[] = [];

    // padding đầu tháng
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // ngày trong tháng
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const days = generateDays();

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4">Calendar #08</h2>

      <div className="calendar-wrapper p-4 shadow-sm">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="nav-btn" onClick={prevMonth}>{'<'}</span>
          <h3>{currentDate.format('YYYY')}</h3>
          <span className="nav-btn" onClick={nextMonth}>{'>'}</span>
        </div>

        {/* Months */}
        <div className="months mb-3">
          {dayjs.monthsShort().map((m, i) => (
            <span
              key={i}
              className={i === currentDate.month() ? 'active' : ''}
            >
              {m}
            </span>
          ))}
        </div>

        {/* Weekdays */}
        <div className="calendar-grid fw-semibold text-muted mb-2">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="calendar-grid">
          {days.map((day, index) => {
            const isSelected =
              day &&
              selectedDate.date() === day &&
              selectedDate.month() === currentDate.month();

            return (
              <div key={index} className="cell">
                {day && (
                  <div
                    onClick={() =>
                      setSelectedDate(currentDate.date(day))
                    }
                    className={`day ${isSelected ? 'active' : ''}`}
                  >
                    {day}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="footer mt-3">
        There are no events planned for{' '}
        {selectedDate.format('MMMM D')}.
      </div>
    </div>
  );
}