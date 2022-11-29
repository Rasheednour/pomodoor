import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useState } from 'react';

function HomePage() {

  // keep track of session name
  const [name, setName] = useState('session');  
  // logic to handle navigating to the setup page
  const navigate = useNavigate();
  const navigateToSession = () => {
    navigate('/setup', {state: {name: name}});
  };

  return (
        <div className='home-container'>
          <div className='title'>
              <h1 className='home-title'>POMODOOR</h1>
              <img alt='tomato' src={require('../Pics/tomato.png')}/>
          </div>
          <div className='sub-title'>
              <h2 className='home-subtitle'>TASK  .  TIME  .  TRACKER</h2>
          </div>
          <div className='home-form'>
              <form >
                  <fieldset className='home-fieldset'>
                      <label className='home-fieldset-label'>CREATE A NEW WORK SESSION
                      <input className='home-fieldset-input' placeholder="SESSION NAME" type="text"
                      onChange={e => setName(e.target.value)} />
                      </label>
                  </fieldset>
                  <button className='home-create-button' onClick={e => {
                  navigateToSession();
                  }}>CREATE</button>
              </form>
          </div>
        </div>
  );
}

export default HomePage;

