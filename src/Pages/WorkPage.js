import React from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import { useState } from 'react';
import CountdownTimer from './CountdownTimer';

function WorkPage() {

  const [name, setName] = useState(''); 
  const location = useLocation();

  const THREE_DAYS_IN_MS = 0 *25 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <>

        <div className='work-title'>
        <h1>{location.state.name}</h1>
        </div>

        <div className='work-timer'>

            <div className='timer'>
            <CountdownTimer targetDate={dateTimeAfterThreeDays} />
              </div>

            <div className='work-start-pause'>
            <button className='home-create-button' onClick={e => {
                setName(e.target.value);
                }}>START</button>
            </div>
        </div>

        

        <div className='work-current-task'>
          <h1>CURRENT TASK</h1>
        </div>

        <div className='work-add-task'>
          <h1>add task</h1>
        </div>
        

        <div>
          <button className='home-create-button'>
          <Link to="/"> finish session </Link></button>
        </div>

    </>
  );
}

export default WorkPage;