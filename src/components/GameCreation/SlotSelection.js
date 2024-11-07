// src/components/GameCreation/SlotSelection.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSlot } from '../../store/slices/slotSelectionSlice';
import { nextPhase, previousPhase } from '../../store/slices/gamePhaseSlice';
import './SlotSelection.css';
import Button from '../../components/Button/Button';

const SlotSelection = () => {
  const dispatch = useDispatch();
  const selectedSlot = useSelector((state) => state.slotSelection.selectedSlot);
  const selectedDate = useSelector((state) => state.dateSelection.selectedDate);
  const selectedStadium = useSelector((state) => state.stadiumSelection.selectedStadium);
  const slots = selectedStadium?.slots || []; // Use slots directly from selectedStadium

  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    if (slots.length > 0) {
      dispatch(setSelectedSlot(slots[sliderValue]));
    }
  }, [sliderValue, slots, dispatch]);

  return (
    <div className="slot-selection-layout">
      <h2 className="slot-selection-title">{selectedStadium?.name || 'Select a Stadium'}</h2>
      <p className="slot-selection-date">
        {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : 'Select a date'}
      </p>

      {slots.length > 0 ? (
        <div className="slot-picker">
          <input
            type="range"
            min="0"
            max={slots.length - 1}
            value={sliderValue}
            onChange={(e) => setSliderValue(parseInt(e.target.value))}
            className="slot-slider"
          />
          <div className="slot-time-display">
            {`${slots[sliderValue]?.startTime} - ${slots[sliderValue]?.endTime} (${slots[sliderValue]?.dayOfWeek})`}
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
