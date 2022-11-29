import '../../../src/App.css';
import React, { useState, useEffect, Fragment } from 'react';
const START_DERATION = 10;
// Set up a counter to keep track of the number of finished Pomodoros
let pomodoroCount = 0;

// function params:
//  WORK_TIME, BREAK_TIME, RECESS_TIME: A list of two values, the first is the time in minutes, the second is the time in seconds.

export default function Timer({WORK_TIME, BREAK_TIME, RECESS_TIME}) {
  // keep track of current time in minutes
  const [currentMinutes, setMinutes] = useState(WORK_TIME[0]);
  // keep track of current time in seconds
  const [currentSeconds, setSeconds] = useState(WORK_TIME[1]);
  // keep track of state of timer if stopped
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DERATION);
  // keep track of state o timer if running
  const [isRunning, setIsRunning] = useState(false);
  // set session type (work, break, or recess)
  const [sessionType, setSessionType] = useState('-work time-');
  // keep track of session type if Pomodoro
  const [isPomodoro, setIsPomodoro] = useState(true)
  // set timer background color
  const [background, setBackground] = useState('timer-background-red');
  
  // set variable to store timer text color
  let textColor = 'time';
  
  // logic to handle starting a timer
  const startHandler = () => {
    setDuration(parseInt(currentSeconds, 10) + 60 * parseInt(currentMinutes, 10));
    setIsRunning(true);
  };

  // logic to handle stopping a timer
  const stopHandler = () => {
    // stop timer
    setIsStop(true);
    setIsRunning(false);
  };

  // logic to handle resetting a timer
  const resetHandler = () => {
    setMinutes(currentMinutes);
    setSeconds(currentSeconds);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DERATION);
  };

  // logic to handle switching between different timers (work -> break -> recess)
  const switchTimer = () => {
    // check current session to decide which timer to switch to
    if (!isPomodoro) {
      setBackground('timer-background-red');
      setIsPomodoro(true);
      setMinutes(WORK_TIME[0]);
      setSeconds(WORK_TIME[1]);
      setSessionType('-work time-');

    } else {
      pomodoroCount += 1;
      setIsPomodoro(false);
      if ((pomodoroCount % 3 === 0) && (pomodoroCount !== 0)) {
        setBackground('timer-background-green')
        setMinutes(RECESS_TIME[0]);
        setSeconds(RECESS_TIME[1]);
        setSessionType('-recess time-');
      } else {
        setBackground('timer-background-blue')
        setMinutes(BREAK_TIME[0]);
        setSeconds(BREAK_TIME[1]);
        setSessionType('-break time-');
      }
    }
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DERATION);
  }

  // logic to handle resuming a timer
  const resumeHandler = () => {
    let newDuration =
      parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10);
    setDuration(newDuration);

    setIsRunning(true);
    setIsStop(false);
  };

  // logic to handle timer countdown animation, and timer expiry actions
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
      <div className={background}>
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
        <h3 className='current-task-text'>CURRENT TASK</h3>
      </div>
    </Fragment>
  );
}
