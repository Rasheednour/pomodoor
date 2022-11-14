import React from 'react';
import '../../App.css';

export default function Task({name}) {


    return (
            <p className='task-description'> 
              {name} 
            </p>
    );
  }
  