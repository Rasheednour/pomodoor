import React from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';

function WorkPage() {
  const location = useLocation();
  return (
    <>

        <div className='work-title'>
        <h1>{location.state.name}</h1>
        </div>

        <div className='work-timer'>
            <h1>25:00</h1>
            <div className='work-start-pause'>
            <h1>start timer pause timer</h1>
            </div>
        </div>

        

        <div className='work-current-task'>
          <h1>CURRENT TASK</h1>
        </div>

        <div className='work-add-task'>
          <h1>add task</h1>
        </div>

        <div className='work-pending-tasks'>
          <h1>pending tasks</h1>
        </div>
        

        <div>
          <Link to="/"> finish session </Link>
        </div>

    </>
  );
}

export default WorkPage;