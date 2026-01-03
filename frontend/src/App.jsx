import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Sobre from './components/Sobre.jsx';
import Contato from './components/Contato.jsx';
import Blog from './components/Blog.jsx';
import PostView from './components/PostView.jsx';
import Intercessor from './components/Intercessor.jsx';
import Eventos from './components/Eventos.jsx';
import Loja from './components/Loja.jsx';
import Admin from './components/Admin.jsx';

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
          
          <nav className="main-nav">
            <Link to="/sobre">Sobre</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/intercessor">Seja um Intercessor</Link>
            <Link to="/eventos">Eventos</Link>
            <Link to="/loja">Loja</Link>
          </nav>
          
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {menuOpen && (
            <nav className="mobile-menu">
              <Link to="/sobre" onClick={() => setMenuOpen(false)}>Sobre</Link>
              <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
              <Link to="/intercessor" onClick={() => setMenuOpen(false)}>Seja um Intercessor</Link>
              <Link to="/eventos" onClick={() => setMenuOpen(false)}>Eventos</Link>
              <Link to="/loja" onClick={() => setMenuOpen(false)}>Loja</Link>
              <Link to="/contato" onClick={() => setMenuOpen(false)}>Contato</Link>
            </nav>
          )}
        </header>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/post/:id" element={<PostView />} />
          <Route path="/intercessor" element={<Intercessor />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;