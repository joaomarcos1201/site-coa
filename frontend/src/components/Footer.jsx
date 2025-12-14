import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <Link to="/sobre">Sobre</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/intercessor">Seja um Intercessor</Link>
        <Link to="/eventos">Eventos</Link>
        <Link to="/loja">Loja</Link>
      </nav>
    </footer>
  );
}

export default Footer;