import React from "react";
import "./toggle-switch.css";

const ToggleSwitch = ({ isToggled, toggleClick, label }) => {
  return (
    <div className="control">
      <p>{label}</p>
      <div className="select">
        <div
          className="inner"
          onClick={toggleClick}
          style={{
            transform: isToggled ? "translateX(20px)" : "translateX(0px)",
            backgroundColor: isToggled ? "var(--lime)" : "",
            transition: "transform 0.3s ease, background-color 0.3s ease",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
