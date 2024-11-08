// SlotSelection.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSlot } from '../../store/slices/slotSelectionSlice';
import { nextPhase, previousPhase } from '../../store/slices/gamePhaseSlice';
import './SlotSelection.css';
import Button from '../../components/Button/Button';

const SlotSelection = ({ slots }) => {
  const dispatch = useDispatch();
  const selectedSlot = useSelector((state) => state.slotSelection.selectedSlot);
  const selectedDate = useSelector((state) => state.dateSelection.selectedDate);
  const selectedStadium = useSelector((state) => state.stadiumSelection.selectedStadium);

  const [sliderValue, setSliderValue] = useState(0);
  useEffect(() => {
    console.log('Selected Stadium:', selectedStadium);
  }, [selectedStadium]);
  
  useEffect(() => {
    if (slots.length > 0) {
      dispatch(setSelectedSlot(slots[sliderValue]));
    }
  }, [sliderValue, slots, dispatch]);

  // Helper function to convert time string to minutes
  const timeStringToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Get earliest start time and latest end time
  const minStartTime = Math.min(...slots.map((slot) => timeStringToMinutes(slot.startTime)));
  const maxEndTime = Math.max(...slots.map((slot) => timeStringToMinutes(slot.endTime)));

  // Generate time labels at hourly intervals
  const startHour = Math.floor(minStartTime / 60);
  const endHour = Math.ceil(maxEndTime / 60);

  const timeLabels = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    const timeLabel = `${hour.toString().padStart(2, '0')}:00`;
    timeLabels.push(timeLabel);
  }

  return (
    <div className="slot-selection-layout">
      <p className="slot-selection-title">{selectedStadium?.name || 'Select a Stadium'}</p>
      <p className="slot-selection-date">
        {selectedDate
          ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
          : 'Select a date'}
      </p>

      {slots.length > 0 ? (
        <div className="slot-picker">
          {/* Time Display Above Slider */}
          <div className="slot-time-display">
            {`${slots[sliderValue]?.startTime} - ${slots[sliderValue]?.endTime}`}
          </div>

          {/* Slider */}
          <input
            type="range"
            min="0"
            max={slots.length - 1}
            value={sliderValue}
            onChange={(e) => setSliderValue(parseInt(e.target.value))}
            className="slot-slider"
          />

          {/* Time Labels Below Slider */}
          <div className="slot-labels">
            {timeLabels.map((time, index) => (
              <div key={index} className="slot-label">
                {time}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No available slots for the selected stadium.</p>
      )}

      <div className="slot-buttons">
        <Button text="Go Back" onClick={() => dispatch(previousPhase())} />
        <Button text="Next" onClick={() => dispatch(nextPhase())} />
      </div>
    </div>
  );
};

export default SlotSelection;
