import React from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import { useState } from 'react';
import Timer from './components/timer';
import Task from './components/task';
import '../App.css';

const start_task_endpoint = 'https://pomodoro-microservice-2.herokuapp.com/tasks';
const stop_task_endpoint = 'https://pomodoro-microservice-2.herokuapp.com/task/';

let tasksList = {};


function WorkPage() {
  // state variable to keep track of pending tasks list
  const [tasks, setTasks] = useState([]);
  // state variable to keep track of current task
  const [currentTask, setCurrentTask] = useState(null);
  // state variable to keep track of task_id
  const [id, setID] = useState(1200);
  const location = useLocation();
  // state variable to keep track of current input values in the task input box
  const [input, setInput] = useState('');
  // state variable to keep track of finished tasks list
  const [finishedTasks, setFinishedTasks] = useState([]);

  // logic to handle change of input in the tasks input box
  const handleInputChange = event => {
    setInput(event.target.value);
  }

// start a timer for the current task
  function startTask(id) {

    // automatically start count-down timer when a task is started
    document.getElementById('start-timer').click();

    // get current time in seconds
    const currentTime = new Date().getTime() / 1000;
  
    // save current time for this task in the tasksList
    tasksList[id] = currentTime;


    // API microservice

    // const requestOptions = {
    //   method: 'post',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({"id": id, "action": "start"})
    // };
    // fetch(start_task_endpoint, requestOptions)
    // .then(response => response.json())
    // .then(response => {
    //   console.log(response)
    // })
    // .catch((err)=>console.error(err));

  }

  function stopTask(id) {

    // stop count-down timer when a task is finished
    document.getElementById('stop-timer').click();

    // get current time
    const endTime = new Date().getTime() / 1000;
    const startTime = tasksList[id];
    // get elapsed time in decimals
    const elapsedTime = Math.floor( endTime - startTime );
    return elapsedTime;

    // // API microservice to stopping a task
    // const end_point = stop_task_endpoint + id;
    // const requestOptions = {
    //   method: 'get',
    // };
    // return fetch(end_point, requestOptions)
    // .then(response=>response.json());
  }

  // function that auto increments the current task_id to a new value which can be used for the next added task
  function incrementID() {
    setID(new_id=>{
      return id + 1
    })
  }

  // fuction that adds a new task to the list of pending tasks
  const addTask = () => {
    // get the value of the input box
    const value = document.getElementById('task-input-box').value;
    incrementID();
    const task = {
      "id": id,
      "description": value
        }
    setInput('')
    setTasks(existingTasks => {
      return [...existingTasks, task]
    });
  }

  // function that adds a task to the list of finished tasks
  function addFinishedTask(id, description, duration) {
    const task = {"id": id, "description": description, "duration": duration};
    setFinishedTasks(existingTasks => {
      return [...existingTasks, task];
    });
  }

  // retrieve the user's timer settings from the location state variable
  const time = {pomoTime: location.state.pomodoroTime, breakTime: location.state.breakTime, recessTime: location.state.recessTime};

  return (
    <div className='work-page-container'>

        {/* title */}

        <div className='session-title-container'>
            <h1>{location.state.name}</h1>
        </div>


        {/* timer */}

        <div className='session-timer-container'>
            <Timer WORK_TIME={time.pomoTime} BREAK_TIME={time.breakTime} RECESS_TIME={time.recessTime}/>
            {currentTask === null ? 
              <div className='current-task-box'> 
              <p>start a task below</p> 
              </div>
              :
              <ul className='current-task-list'>
                <li className='current-task-item'>
                  <p className='task-description'>{currentTask.description}</p>
                  <button className='finish-task-button' onClick={e=>{
                    

                    // API implementation

                    // (async() => {
                    //   const response = await stopTask(currentTask.id);
                    //   while(true) {
                    //     if (response !== undefined) {
                    //       break;
                    //     }
                    //   }
                    //   console.log("response is ", response);
                      
                    //   const duration = response.total_duration;
                    //   // add task to list of finished tasks
                    //   addFinishedTask(currentTask.id, currentTask.description, duration);
                    //   // reset current task to null
                    //   setCurrentTask(null);
                    // })();

                    // local implementation
                    const duration = stopTask(currentTask.id);
                    addFinishedTask(currentTask.id, currentTask.description, duration);
                    setCurrentTask(null);
                  }}>
                        FINISH
                  </button>
                </li>
              </ul>
            }
        </div>      
        
        {/* create tasks */}

        <div className='pending-tasks-container'>
          <hr></hr>
          <div className='pending-tasks-ribbon'>
            <h3 className='pending-tasks-title'>Pending Tasks</h3>
            <button className='clear-tasks-button' title='clear tasks' onClick={()=>{
                                if (window.confirm('Are you sure you want to clear the list of pending tasks?')){
                                  setTasks([]);}}}> -
            </button>
          </div>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                  <Task name={task.description}/>
                  <button className='start-task-button' onClick={e=>{
                    // send a POST request to the microservice to start tracking task duration
                    startTask(task.id);

                    // delete task from list of pending tasks
                    for (let i=0; i < tasks.length; i++) {
                      if (tasks[i]["id"] === task.id) {
                        tasks.splice(i, 1);
                        break;
                      }
                    }
                    // set current task from NULL to the current task
                    setCurrentTask({"id": task.id, "description": task.description});
                  }}>
                    START
                  </button>
                  <button className='delete-task-button' title='delete task' onClick={()=>{
                                setTasks((current) =>
                                current.filter((item) => item.id !== task.id)
                              );
                              }}> - </button>
              </li>
            ))}
          </ul>
          <div className='new-task-container'>
            <input  type="text" id='task-input-box' placeholder="Add new tasks" value={input} onChange={handleInputChange}></input>
            <button className='add-button'title='add task' onClick={addTask}>+</button>
          </div>
          <hr></hr>

          {/* finished tasks sesction */}

          <div className='pending-tasks-ribbon'>
          <h3 className='pending-tasks-title'>Finished Tasks</h3>
          <button className='clear-tasks-button' title='clear tasks' onClick={()=>{
                                if (window.confirm('Are you sure you want to clear the list of finished tasks?')){
                                  setFinishedTasks([]);
                                }
                              }}> - </button>
          </div>
          <ul>
          {finishedTasks.map(task => (
              <li key={task.id} className='finished-task-item'>
                  <Task name={task.description}/>
                  <button className='finished-task-duration'>
                    {task.duration} sec.
                  </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* finish session */}

        <div className='session-finish-container'>
          <button className='home-create-button'>
          <Link to="/" className='finish-link'> finish session </Link></button>
        </div>
    </div>
  );
}

export default WorkPage;