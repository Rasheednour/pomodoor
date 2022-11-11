import React from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import { useState } from 'react';
import Timer from './components/timer';
import '../App.css';




function WorkPage() {
  const [name, setName] = useState('');
  const [count_down, startCountDown] = useState(0);
  const [serviceList, setServiceList] = useState([{service: ""}]);
  const location = useLocation();


  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  return (
    <>



        <div className='work-title'>
        <h1>{location.state.name}</h1>
        </div>




        <div className='work-block'>



            <div className='work-timer'>

              <div className='timer'>
                
                <Timer />

              </div>


        </div>







        <div className='work-add-task'>
        <form className="App" autoComplete="off">
        <div className="form-field">
        <label className='work-subtitle' htmlFor="service">Add Tasks</label>
        {serviceList.map((singleService, index) => (
          <div key={index} className="services">
            <div className="first-division">
              <input
                className='work-input-box'
                name="service"
                type="text"
                id="service"
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
              {serviceList.length - 1 === index && serviceList.length < 4 && (
                <button
                  className="work-input-button"
                  type="button"
                  onClick={handleServiceAdd}
                >
                  <span>Add</span>
                </button>
              )}
            </div>
            <div className="second-division">
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>




      
      <div className="output">
        <h2 className='work-subtitle'>Pending Tasks</h2>
        {serviceList &&
          serviceList.map((singleService, index) => (
            <ul key={index} className="pending-tasks">
              {singleService.service && <li>{singleService.service}</li>}
            </ul>
          ))}
      </div>
    </form>
    </div >


    


        <div>
          <button className='home-create-button'>
          <Link to="/"> finish session </Link></button>
        </div>
        </div>







    </>
  );
}

export default WorkPage;