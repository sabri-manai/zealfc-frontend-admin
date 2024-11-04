import React from 'react';
import './CreateGameInit.css';
import CreateGameImage from "../../assets/images/home_background.png"; // Ensure this path is correct
import Button from "../../components/Button/Button"; // Import your Button component

const CreateGameInit = ({ userData }) => {
  return (
    <div className="game-info-container">
      {/* Left side for greeting and button */}
      <div className="game-info">
        <div className="greeting-text">
          Great to see you again,
          <br />
          <div className="username-text">

            {userData ? userData.first_name : "Loading..."}!
            </div>
        </div>
        <div className="action-prompt">Would you like to host <br/> another game?</div>
        {/* Use the custom Button component */}
        <Button text="Create" styleType="default" onClick={() => {}} />
      </div>

      {/* Right side for image */}
      <div className="game-image-container">
        <img src={CreateGameImage} alt="Game" className="game-image" />
        <div className="noiseeffect"></div> {/* Adding the noise effect */}
      </div>
    </div>
  );
};

export default CreateGameInit;
