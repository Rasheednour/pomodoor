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
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [id, setID] = useState(1200);
  const location = useLocation();
  const [input, setInput] = useState('');
  const [finishedTasks, setFinishedTasks] = useState([]);


  const handleInputChange = event => {
    setInput(event.target.value);
  }

// start a timer for the current task
  function startTask(id) {

    // start count-down timer when a task is started
    document.getElementById('start-timer').click();

    // local subsitute to timing a task

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

    // local subsitute for stopping a task and calculating elapsed time
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

  function incrementID() {
    setID(new_id=>{
      return id + 1
    })
  }

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

  function addFinishedTask(id, description, duration) {
    const task = {"id": id, "description": description, "duration": duration};
    setFinishedTasks(existingTasks => {
      return [...existingTasks, task];
    });
  }

  return (
    <div className='work-page-container'>

        {/* title */}

        <div className='session-title-container'>
            <h1>{location.state.name}</h1>
        </div>


        {/* timer */}

        <div className='session-timer-container'>
            <Timer START_MINUTES={'25'} START_SECOND={'00'} />
            <h3 className='current-task-text'>CURRENT TASK</h3>

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



        {/* current task */}
      
        


        {/* create tasks */}

       

        
        <div className='pending-tasks-container'>
          <hr></hr>
          <ul>
            <h3 className='pending-tasks-title'>Pending Tasks</h3>
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
              </li>
            ))}
          </ul>
          <div className='new-task-container'>
            <input  type="text" id='task-input-box' placeholder="Add new tasks" value={input} onChange={handleInputChange}></input>
            <button className='add-button' onClick={addTask}>+</button>
          </div>
          <hr></hr>



          {/* finished tasks sesction */}
          <h3 className='finished-tasks-title'>Finished Tasks</h3>
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
          <Link to="/"> finish session </Link></button>
        </div>



    </div>
  );
}

export default WorkPage;