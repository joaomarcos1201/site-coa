import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Sobre from './components/Sobre.jsx';
import Contato from './components/Contato.jsx';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="logo">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>COA</h2>
            </Link>
          </div>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {menuOpen && (
            <nav className="menu">
              <Link to="/sobre" onClick={() => setMenuOpen(false)}>Sobre</Link>
              <Link to="/contato" onClick={() => setMenuOpen(false)}>Contato</Link>
            </nav>
          )}
        </header>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;