import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { useState } from 'react';

function HomePage() {

  const [name, setName] = useState('');  

  const navigate = useNavigate();
  const navigateToSession = () => {
    navigate('/work', {state: {name: name}});
  };

  return (
        <>
        <div className='title'>
            <h1 className='home-title'>POMODOOR</h1>
            <h2 className='home-subtitle'>TASK  .  TIME  .  TRACKER</h2>
        </div>
        <div className='tomato-img'><img src={require('../Pics/tomato.png')}/></div>
        <div className='home-form'>

            <form >

                <fieldset className='home-fieldset'>
                    <label className='home-fieldset-label'>CREATE A NEW WORK SESSION
                    <input className='home-fieldset-input' placeholder="SESSION NAME" type="text" value={name}
                    onChange={e => setName(e.target.value)} />
                    </label>
                </fieldset>

                <button className='home-create-button' onClick={e => {
                setName(e.target.value);
                navigateToSession();
                }}>CREATE</button>

            </form>
            {/*
            <Link to="/tasks"> CREATE</Link>
            */}
        </div>

        
        </>
  );
}

export default HomePage;

