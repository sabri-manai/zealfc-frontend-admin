// src/components/GameCreation/DateSelection.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from '../../store/slices/dateSelectionSlice';
import { nextPhase, previousPhase } from '../../store/slices/gamePhaseSlice';
import './DateSelection.css';
import Button from '../../components/Button/Button';

const DateSelection = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.dateSelection.selectedDate);
  const selectedStadium = useSelector(
    (state) => state.stadiumSelection.selectedStadium
  );
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  function getDayOfWeekNumber(dayName) {
    const daysOfWeek = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    return daysOfWeek[dayName];
  }

  // Generate available dates based on slots
  const availableDates = selectedStadium?.slots
    ? selectedStadium.slots
        .flatMap((slot) => {
          const start = new Date(slot.startDate);
          const end = new Date(slot.endDate || slot.startDate);
          start.setHours(0, 0, 0, 0);
          end.setHours(0, 0, 0, 0);

          const dayOfWeekNumber = getDayOfWeekNumber(slot.dayOfWeek);

          const datesInSlot = [];
          let currentDate = new Date(start);

          while (currentDate <= end) {
            if (currentDate.getDay() === dayOfWeekNumber) {
              if (
                currentDate.getFullYear() === currentYear &&
                currentDate.getMonth() === currentMonth
              ) {
                datesInSlot.push(currentDate.getDate());
              }
            }
            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
          }
          return datesInSlot;
        })
        .filter((day, index, self) => self.indexOf(day) === index) // Remove duplicates
    : [];

  const handleDateSelect = (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    dispatch(setSelectedDate(selected.toISOString()));
  };

  const isDateSelected = (day) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);
    return selectedDate === dateToCheck.toISOString();
  };

  // Add day labels
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Calculate the day of the week for the first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className="date-selection-container">
      <div className="date-selection-header">
        <p>{selectedStadium ? selectedStadium.name : 'Select a Stadium'}</p>
        <div className="date-selection-month">
          <button
            className="month-button"
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear((prevYear) => prevYear - 1);
              } else {
                setCurrentMonth((prevMonth) => prevMonth - 1);
              }
            }}
          >
            {'<'}
          </button>
          <span>
            {new Date(currentYear, currentMonth)
              .toLocaleString('default', { month: 'long' })
              .toUpperCase()}{' '}
            {currentYear}
          </span>
          <button
            className="month-button"
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear((prevYear) => prevYear + 1);
              } else {
                setCurrentMonth((prevMonth) => prevMonth + 1);
              }
            }}
          >
            {'>'}
          </button>
        </div>
      </div>

      {/* Day Labels */}
      <div className="day-labels">
        {dayLabels.map((label, index) => (
          <div key={index} className="day-label">
            {label}
          </div>
        ))}
      </div>

      {/* Date Grid */}
      <div className="date-grid">
        {/* Empty cells for days before the first day of the month */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="date-item empty"></div>
        ))}

        {/* Render the dates */}
        {dates.map((day) => {
          const isAvailable = availableDates.includes(day);
          return (
            <div
              key={day}
              className={`date-item ${isAvailable ? '' : 'disabled'} ${
                isDateSelected(day) ? 'selected' : ''
              }`}
              onClick={() => isAvailable && handleDateSelect(day)}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="date-selection-footer">
        <Button text="Go Back" onClick={() => dispatch(previousPhase())} />
        <Button text="Next" onClick={() => dispatch(nextPhase())} />
      </div>
    </div>
  );
};

export default DateSelection;
