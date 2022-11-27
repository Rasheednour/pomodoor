import React from 'react';
import {useLocation} from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../App.css';


function SetupPage() {
    const [pomodoroTime, setPomodoroTime] = useState('25');  
    const [breakTime, setBreakTime] = useState('05');
    const [recessTime, setRecessTime] = useState('15');
    const location = useLocation();
    const navigate = useNavigate();
    const navigateToSession = () => {
        navigate('/work', {state: {name: location.state.name, pomodoroTime: pomodoroTime, breakTime:breakTime, recessTime:recessTime}});
    };
    return (
        <div className='setup-container'>

                <button className='home-create-button' onClick={e => {
                navigateToSession();
                }}>START SESSION</button>

        </div>
    );


}

export default SetupPage;