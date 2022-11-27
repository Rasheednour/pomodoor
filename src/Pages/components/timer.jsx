import '../../../src/App.css';
import React, { useState, useEffect, Fragment } from 'react';
const START_DERATION = 10;
let pomodoroCount = 0;

export default function Timer({WORK_TIME, BREAK_TIME, RECESS_TIME}) {
  const [currentMinutes, setMinutes] = useState(WORK_TIME[0]);
  const [currentSeconds, setSeconds] = useState(WORK_TIME[1]);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DERATION);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('-work time-');
  const [isPomodoro, setIsPomodoro] = useState(true)

  let textColor = 'time';

  const startHandler = () => {
    setDuration(parseInt(currentSeconds, 10) + 60 * parseInt(currentMinutes, 10));
    // setMinutes(60 * 5);
    // setSeconds(0);
    setIsRunning(true);
  };
  const stopHandler = () => {
    // stop timer
    setIsStop(true);
    setIsRunning(false);
  };
  const resetHandler = () => {
    setMinutes(currentMinutes);
    setSeconds(currentSeconds);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DERATION);
  };
  const switchTimer = () => {
    if (!isPomodoro) {
      setIsPomodoro(true);
      setMinutes(WORK_TIME[0]);
      setSeconds(WORK_TIME[1]);
      setSessionType('-work time-');

    } else {
      pomodoroCount += 1;
      setIsPomodoro(false);
      if ((pomodoroCount % 3 === 0) && (pomodoroCount !== 0)) {
        setMinutes(RECESS_TIME[0]);
        setSeconds(RECESS_TIME[1]);
        setSessionType('-recess time-');
      } else {
        setMinutes(BREAK_TIME[0]);
        setSeconds(BREAK_TIME[1]);
        setSessionType('-break time-');
      }
    }
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DERATION);
  }

  const resumeHandler = () => {
    let newDuration =
      parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10);
    setDuration(newDuration);

    setIsRunning(true);
    setIsStop(false);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      var minutes, seconds;
      const interval = setInterval(function () {
        if (--timer <= 0) {
          switchTimer();
        } else {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          setMinutes(minutes);
          setSeconds(seconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <Fragment>
      <div className="App">
        <div className={sessionType}><p>{sessionType}</p></div>
        <div className={textColor}>
          
          {currentMinutes}
          <span>:</span>
          {currentSeconds}
        </div>
        {!isRunning && !isStop && (
          <button
            id='start-timer'
            onClick={startHandler}
            className='session-start-button'
          >
            START
          </button>
        )}
        {isRunning && (
          <button
            id='stop-timer'
            onClick={stopHandler}
            className='session-start-button'
          >
            PAUSE
          </button>
        )}

        {isStop && (
          <button
            id='start-timer'
            onClick={resumeHandler}
            className='session-start-button'
          >
            RESUME
          </button>
        )}

        <button
          onClick={resetHandler}
          className='session-start-button'
          disabled={!isRunning && !isStop}
        >
          RESET
        </button>
      </div>
    </Fragment>
  );
}
