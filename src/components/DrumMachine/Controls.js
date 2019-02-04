import React from 'react';

const Controls = props => {
  const { displayText, volume, handleToggle, handleVolume } = props;
  return (
    <div className="controls">
      <div className="toggle-container">
        <span>Bank</span>
        <label className="toggle">
          <input type="checkbox" onChange={handleToggle} />
          <span className="slider round" />
        </label>
      </div>
      <div id="display" className="display">
        <span>{displayText}</span>
      </div>
      <div className="slide-container">
        <span>Volume</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          className="slider"
          onChange={handleVolume}
        />
      </div>
    </div>
  );
};

export default Controls;
