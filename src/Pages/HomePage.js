import React from 'react';
import { Link } from 'react-router-dom';


function HomePage() {
  return (
    
    <div>
      <h1>HomePage</h1>
      <Link to="/tasks"> start creating tasks</Link>
    </div>
  );
}

export default HomePage;

