// src/components/GameCreation/HostSelection.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextPhase, previousPhase } from '../../store/slices/gamePhaseSlice';
import { setSelectedHost } from '../../store/slices/hostSelectionSlice';
import Button from '../../components/Button/Button';
import './HostSelection.css';

const HostSelection = () => {
  const dispatch = useDispatch();
  const selectedStadium = useSelector((state) => state.stadiumSelection.selectedStadium);
  const selectedHost = useSelector((state) => state.hostSelection.selectedHost);
  const hosts = selectedStadium?.hosts || [];
  const [selectedHostId, setSelectedHostId] = useState(selectedHost ? selectedHost._id : null);

  const handleSelectHost = (host) => {
    setSelectedHostId(host._id);
    dispatch(setSelectedHost(host));
  };

  return (
    <div className="host-selection-container">
      <h2 className="host-selection-title">Select a Host</h2>
      <ul className="host-list">
        {hosts.map((host) => (
          <li key={host._id} className="host-item">
            <label className="host-label">
              <input
                type="radio"
                name="host"
                value={host._id}
                checked={selectedHostId === host._id}
                onChange={() => handleSelectHost(host)}
              />
              <span className="custom-radio"></span>
              {`${host.first_name} ${host.last_name} - ${host.email}`}
            </label>
          </li>
        ))}
      </ul>
      <div className="host-selection-buttons">
        <Button text="Go Back" onClick={() => dispatch(previousPhase())} />
        <Button text="Next" onClick={() => dispatch(nextPhase())} disabled={!selectedHostId} />
      </div>
    </div>
  );
};

export default HostSelection;
