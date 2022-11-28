import React from 'react';
import {useLocation} from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../App.css';


function SetupPage() {
    const [pomodoroTime, setPomodoroTime] = useState(['25', '00']);  
    const [breakTime, setBreakTime] = useState(['05', '00']);
    const [recessTime, setRecessTime] = useState(['15', '00']);
    const location = useLocation();
    const navigate = useNavigate();
    const navigateToSession = () => {
        navigate('/work', {state: {name: location.state.name, pomodoroTime: pomodoroTime, breakTime: breakTime, recessTime: recessTime}});
    };
    return (
        <div className='setup-container'>
                <h1>Setup Timers</h1>
                <form>
                <fieldset className='home-fieldset'>

                    <label className='home-fieldset-label'>POMODORO TIME                       <div className='setup-input'>
                            <input className='home-fieldset-input' placeholder="00" type="text" value={pomodoroTime[0]}
                            onChange={e => setPomodoroTime([e.target.value, pomodoroTime[1]])} />
                            <p>:</p>
                            <input className='home-fieldset-input' placeholder="00" type="text" value={pomodoroTime[1]}
                            onChange={e => setPomodoroTime([pomodoroTime[0], e.target.value])} />
                        </div>
                    </label>

                    <label className='home-fieldset-label'>BREAK TIME 
                        <div className='setup-input'>
                            <input className='home-fieldset-input' placeholder="00" type="text" value={breakTime[0]}
                            onChange={e => setBreakTime([e.target.value, breakTime[1]])} />
                            <p>:</p>
                            <input className='home-fieldset-input' placeholder="00" type="text" value={breakTime[1]}
                            onChange={e => setBreakTime([breakTime[0], e.target.value])} />
                        </div>
                    </label>

                    <label className='home-fieldset-label'>RECESS TIME 
                        <div className='setup-input'>
                            <input className='home-fieldset-input' placeholder="00" type="text" value={recessTime[0]}
                            onChange={e => setRecessTime([e.target.value, recessTime[1]])} />
                            <p>:</p>
                            <input className='home-fieldset-input' placeholder="00" type="text" value={recessTime[1]}
                            onChange={e => setRecessTime([recessTime[0], e.target.value])} />
                        </div>
                    </label>

                </fieldset>

                <button className='home-create-button' onClick={e => {
                navigateToSession();
                }}>START SESSION</button>
                </form>

        </div>
    );


}

export default SetupPage;