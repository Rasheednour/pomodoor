import React from 'react';
import { Link } from 'react-router-dom';

function TasksPage() {
  return (
    <>
      <h1>Create Your Tasks!</h1>
      <Link to="/work"> start work session</Link>
    </>
  );
}

export default TasksPage;