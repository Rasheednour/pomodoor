import HomePage from './Pages/HomePage';
import WorkPage from './Pages/WorkPage';
import SetupPage from './Pages/SetupPage';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header" >
          <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/work" element={<WorkPage/>} />
          <Route path="/setup" element={<SetupPage/>} />
          </Routes>
        </header>
      </Router>
    </div>
  );
}

export default App;
