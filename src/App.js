import HomePage from './Pages/HomePage';
import TasksPage from './Pages/TasksPage';
import WorkPage from './Pages/WorkPage';
import './App.css';
import React from 'react';
import { ReactDOM } from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/tasks" element={<TasksPage/>} />
          <Route path="/work" element={<WorkPage/>} />
          </Routes>
        </header>
      </Router>
    </div>
  );
}

export default App;
