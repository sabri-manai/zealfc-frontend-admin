// src/components/GameCreation/DateSelection.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from '../../store/slices/dateSelectionSlice';
import { nextPhase, previousPhase } from '../../store/slices/gamePhaseSlice';
import './DateSelection.css';
import Button from '../../components/Button/Button';

const DateSelection = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.dateSelection.selectedDate);
  const selectedStadium = useSelector((state) => state.stadiumSelection.selectedStadium);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Get available dates based on slots
  const availableDates = selectedStadium?.slots
    ? selectedStadium.slots
        .map((slot) => {
          const slotDate = new Date(slot.startDate);
          // Adjust the slotDate to match the local time zone and remove time components
          slotDate.setHours(0, 0, 0, 0);
          if (slotDate.getFullYear() === currentYear && slotDate.getMonth() === currentMonth) {
            return slotDate.getDate();
          }
          return null;
        })
        .filter((day) => day !== null)
    : [];

    const handleDateSelect = (day) => {
      const selected = new Date(Date.UTC(currentYear, currentMonth, day));
      dispatch(setSelectedDate(selected.toISOString()));
    };
    

    const isDateSelected = (day) => {
      const dateToCheck = new Date(Date.UTC(currentYear, currentMonth, day));
      return selectedDate === dateToCheck.toISOString();
    };

  return (
    <div className="date-selection-container">
      <div className="date-selection-header">
        <p>{selectedStadium ? selectedStadium.name : 'Select a Stadium'}</p>
        <div className="date-selection-month">
          <button
            className="month-button"
            onClick={() => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))}
          >
            {'<'}
          </button>
          <span>
            {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' }).toUpperCase()}
          </span>
          <button
            className="month-button"
            onClick={() => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))}
          >
            {'>'}
          </button>
        </div>
      </div>

      <div className="date-grid">
        {dates.map((day) => {
          const isAvailable = availableDates.includes(day);
          return (
            <div
              key={day}
              className={`date-item ${isAvailable ? '' : 'disabled'} ${isDateSelected(day) ? 'selected' : ''}`}
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
