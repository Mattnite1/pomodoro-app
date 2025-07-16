import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import ResetButton from "./ResetButton";

interface inputMinutes {
  inputMinutes: number;
  // TODO: Remove Function, like in Tabs.tsx
  onTimeEnd: Function;
}

const Timer = (props: inputMinutes) => {
  // TODO: change to minutes later
  const durationInSeconds = props.inputMinutes;
  const [time, setTime] = useState(props.inputMinutes);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (time === 0) {
      props.onTimeEnd();
    }
    if (isActive && time > 0) {
      var interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(durationInSeconds);
  };

  const calculateProgress = () => {
    return ((durationInSeconds - time) / durationInSeconds) * 100;
  };

  return (
    <div>
      <CircularProgressbar
        value={calculateProgress()}
        text={`${Math.floor(time / 60)}:${(time % 60)
          .toString()
          .padStart(2, "0")}`}
        styles={buildStyles({
          textSize: "20px",
          pathTransitionDuration: 1,
          textColor: "#fff",
          trailColor: "#ddd",
          backgroundColor: "#3e98c7",
        })}
      />
      <div>
        {isActive ? (
          <PauseButton name="endTime" onClick={pauseTimer} />
        ) : (
          <PlayButton name="startTime" onClick={startTimer} />
        )}
        <ResetButton name="resetTime" onClick={resetTimer} />
      </div>
    </div>
  );
};

export default Timer;
