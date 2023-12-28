import React from "react";
import "./drum-pad.css";

const DrumPad = ({ id, playDrum, stopDrum, audioSrc, keyTrigger }) => {
  return (
    <div
      className="drum-pad"
      id={id}
      onMouseDown={playDrum}
      onMouseUp={stopDrum}
    >
      <audio className="clip" id={keyTrigger} src={audioSrc}></audio>
      <span>{keyTrigger}</span>
    </div>
  );
};

export default DrumPad;
