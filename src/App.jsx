import React, { useState, useEffect } from "react";
import DrumPad from "./components/drumPad/DrumPad.jsx";
import VolumeSlider from "./components/volume-slider/VolumeSlider.jsx";
import ToggleSwitch from "./components/toggle-switch/ToggleSwitch.jsx";
import GoldenDust from "./components/animated/GoldenDast.jsx";

import "./app.css";

function App() {
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(0.2);
  const [volumeDisplay, setVolumeDisplay] = useState("");
  const [isToggled, setToggle] = useState(false);
  const [isBankToggled, setBankToggle] = useState(false);
  const colors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#8B00FF",
    "#8A2BE2",
    "#00FFFF",
    "#800080",
  ];

  const bankToggleClick = () => {
    setBankToggle(!isBankToggled);
  };

  const toggleClick = () => {
    setToggle(!isToggled);
  };

  useEffect(() => {
    if (isBankToggled) {
      setDisplay("Smooth Piano Kit");
    } else {
      setDisplay("Heater Kit");
    }
  }, [isBankToggled]);

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    if (!isToggled) {
      setVolumeDisplay(`Volume: ${Math.round(event.target.value * 100)}`);
      setDisplay("");
      setTimeout(() => {
        setVolumeDisplay("");
      }, 1000);
    }
  };

  useEffect(() => {
    const audios = document.querySelectorAll("audio");
    audios.forEach((audio) => {
      audio.volume = isToggled ? 0 : volume;
    });
  }, [isToggled, volume]);

  useEffect(() => {
    const drumPads = document.querySelectorAll(".drum-pad");
    drumPads.forEach((pad) => {
      pad.addEventListener("mousedown", playDrum);
      pad.addEventListener("mouseup", stopDrum);
      pad.style.backgroundColor = isToggled ? "var(--black)" : "";
    });
    window.addEventListener("keydown", playDrumKey);
    window.addEventListener("keyup", stopDrumKey);
    return () => {
      drumPads.forEach((pad) => {
        pad.removeEventListener("mousedown", playDrum);
        pad.removeEventListener("mouseup", stopDrum);
      });
      window.removeEventListener("keydown", playDrumKey);
      window.removeEventListener("keyup", stopDrumKey);
    };
  }, [isToggled]);

  const playDrum = (event) => {
    if (!isToggled) {
      const audio = event.target.querySelector("audio");
      audio.currentTime = 0;
      audio.play();
      setDisplay(event.target.id);
      event.target.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      document.querySelectorAll("span").forEach((span) => {
        span.style.color = colors[Math.floor(Math.random() * colors.length)];
      });
      document.querySelectorAll("p").forEach((span) => {
        span.style.color = colors[Math.floor(Math.random() * colors.length)];
      });
      document.querySelector("#display").style.boxShadow = `0 0 15px ${
        colors[Math.floor(Math.random() * colors.length)]
      }`;
      setTimeout(() => {
        event.target.style.backgroundColor = "";
      }, 200);
    }
  };

  const stopDrum = (event) => {
    if (isToggled) {
      event.target.style.backgroundColor = "";
    }
  };

  const playDrumKey = (event) => {
    const audio = document.getElementById(event.key.toUpperCase());
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      if (!isToggled) {
        setDisplay(audio.parentElement.id);
        audio.parentElement.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        document.querySelectorAll("span").forEach((span) => {
          span.style.color = colors[Math.floor(Math.random() * colors.length)];
        });
        document.querySelectorAll("p").forEach((span) => {
          span.style.color = colors[Math.floor(Math.random() * colors.length)];
        });
        document.querySelector("#display").style.boxShadow = `0 0 15px ${
          colors[Math.floor(Math.random() * colors.length)]
        }`;
      }
      setTimeout(() => {
        audio.parentElement.style.backgroundColor = "";
      }, 200);
    }
  };

  const stopDrumKey = (event) => {
    const audio = document.getElementById(event.key.toUpperCase());
    if (audio) {
      audio.parentElement.style.backgroundColor = "";
    }
  };

  const drumPads = [
    {
      id: isBankToggled ? "Chord-1" : "Heater-1",
      audioSrc: isBankToggled
        ? "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
        : "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      keyTrigger: "Q",
    },
    {
      id: isBankToggled ? "Chord-2" : "Heater-2",
      audioSrc: isBankToggled
        ? "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
        : "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      keyTrigger: "W",
    },
    {
      id: isBankToggled ? "Chord-3" : "Heater-3",
      audioSrc: isBankToggled
        ? "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
        : "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      keyTrigger: "E",
    },
    {
      id: isBankToggled ? "Shaker" : "Heater-4",
      audioSrc: isBankToggled
        ? "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
        : "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      keyTrigger: "A",
    },
    {
      id: isBankToggled ? "Open-HH" : "Clap",
      audioSrc: isBankToggled
        ? "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
        : "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      keyTrigger: "S",
    },
    {
      id: isBankToggled ? "Closed-HH" : "Open-HH",
      audioSrc: isBankToggled
        ? "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
        : "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      keyTrigger: "D",
    },
    {
      id: isBankToggled ? "Punchy-Kick" : "Kick-n'-Hat",
      audioSrc: isBankToggled
        ? "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
        : "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      keyTrigger: "Z",
    },
    {
      id: isBankToggled ? "Side-Stick" : "Kick",
      audioSrc: isBankToggled
        ? "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
        : "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      keyTrigger: "X",
    },
    {
      id: isBankToggled ? "Snare" : "Closed-HH",
      audioSrc: isBankToggled
        ? "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
        : "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      keyTrigger: "C",
    },
  ];

  return (
    <div className="wrapper">
      <GoldenDust />
      <div className="container-inner" id="drum-machine">
        <div className="pad-bank">
          {drumPads.map((pad) => (
            <DrumPad
              key={pad.keyTrigger}
              id={pad.id}
              isBankToggled={isBankToggled}
              playDrum={playDrum}
              stopDrum={stopDrum}
              stopDrumKey={stopDrumKey}
              audioSrc={pad.audioSrc}
              keyTrigger={pad.keyTrigger}
            />
          ))}
        </div>
        <div className="logo">
          <div className="inner-logo">FCC&nbsp;</div>
          <i className="inner-logo fab fa-free-code-camp"></i>
        </div>
        <div className="controls-container">
          <ToggleSwitch
            isToggled={isToggled}
            toggleClick={toggleClick}
            label="Power"
          />
          <p id="display">
            {volumeDisplay}
            {!toggleClick ? "" : display}&nbsp;
          </p>
          <VolumeSlider
            volume={volume}
            isToggled={isToggled}
            handleVolumeChange={handleVolumeChange}
          />
          <ToggleSwitch
            isToggled={isBankToggled}
            toggleClick={isToggled ? null : bankToggleClick}
            label="Bank"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
