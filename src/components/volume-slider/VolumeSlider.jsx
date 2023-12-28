import React from "react";
import "./volume-slider.css";

const VolumeSlider = ({ volume, isToggled, handleVolumeChange }) => {
  return (
    <div className="volume-slider">
      <input
        max="1"
        min="0"
        step="0.01"
        type="range"
        value={volume}
        onChange={handleVolumeChange}
        disabled={isToggled}
      />
    </div>
  );
};

export default VolumeSlider;
