import React from 'react';
import { Link } from 'react-router-dom';


const API_URL = 'http://localhost:5000/api';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">AI Integration Platform</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-ai">Add AI</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ai-manager">AI Manager</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;