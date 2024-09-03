import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddAIPage from './components/AddAIPage';
import AIManagerPage from './components/AIManagerPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
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
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-ai" element={<AddAIPage />} />
            <Route path="/ai-manager" element={<AIManagerPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;