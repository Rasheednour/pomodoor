import React from 'react';
import '../../App.css';

// a function that returns a <p> element of a task description
export default function Task({name}) {


    return (
            <p className='task-description'> 
              {name} 
            </p>
    );
  }
  