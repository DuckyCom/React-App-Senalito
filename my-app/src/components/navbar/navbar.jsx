import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import Home from '../img/Home.png';
import interpretew from '../img/Interprete-white.png';
import enseñanza from '../img/Ensenanza-white.png';
import emergencia from '../img/Emergencia-white.png';
import perfil from '../img/Perfil-white.png';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="custom-navbar">
      <div className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
        <Link to="/home">
          <img src={Home} alt="home" className="Home" />
          <span className="nav-text">Home</span>
        </Link>
      </div>
      <div className={`nav-item ${location.pathname === '/interprete' ? 'active' : ''}`}>
        <Link to="/interprete">
          <img src={interpretew} alt="interprete" className="Interprete" />
          <span className="nav-text">Interprete</span>
        </Link>
      </div>
      <div className={`nav-item ${location.pathname === '/enseñanza' ? 'active' : ''}`}>
        <Link to="/enseñanza">
          <img src={enseñanza} alt="enseñanza" className="Enseñanza" />
          <span className="nav-text">Enseñanza</span>
        </Link>
      </div>
      <div className={`nav-item ${location.pathname === '/emergencia' ? 'active' : ''}`}>
        <Link to="/emergencia">
          <img src={emergencia} alt="emergencia" className="Emergencia" />
          <span className="nav-text">Emergencia</span>
        </Link>
      </div>
      <div className={`nav-item ${location.pathname === '/perfil' ? 'active' : ''}`}>
        <Link to="/perfil">
          <img src={perfil} alt="perfil" className="Perfil" />
          <span className="nav-text">Perfil</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
