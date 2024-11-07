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
          return slotDate.getMonth() === currentMonth ? slotDate.getDate() : null;
        })
        .filter((day) => day !== null) // Filter out nulls for dates outside the current month
    : [];

  const handleDateSelect = (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    dispatch(setSelectedDate(selected.toDateString()));
  };

  return (
    <div className="date-selection-container">
      <div className="date-selection-header">
        <p>{selectedStadium ? selectedStadium.name : 'Select a Stadium'}</p>
        <div className="date-selection-month">
          <button onClick={() => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))}>{'<'}</button>
          <span>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' }).toUpperCase()}</span>
          <button onClick={() => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))}>{'>'}</button>
        </div>
      </div>
      
      <div className="date-grid">
        {dates.map((day) => {
          const isAvailable = availableDates.includes(day);
          return (
            <div
              key={day}
              className={`date-item ${isAvailable ? '' : 'disabled'} ${selectedDate === new Date(currentYear, currentMonth, day).toDateString() ? 'selected' : ''}`}
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
