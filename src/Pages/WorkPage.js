import React from 'react';
import { Link } from 'react-router-dom';

function WorkPage() {
  return (
    <>
      <h1>Start your work session!</h1>
      <Link to="/"> finish work session </Link>
    </>
  );
}

export default WorkPage;