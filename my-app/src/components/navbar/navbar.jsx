import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import Home from '../img/Home.png';
import interpretew from '../img/Interprete-white.png';
import enseñanza from '../img/Ensenanza-white.png';
import emergencia from '../img/Emergencia-white.png';
import perfil from '../img/Perfil-white.png';
const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <div className="nav-item">
        <Link to="/home">
      <img src={Home} alt="profile" className="Home" />
        <span className="nav-text active">Home</span>
        </Link>
      </div>
      <div className="nav-item">
      <Link to="/interprete">
      <img src={interpretew} alt="profile" className="Interprete" />
        <span className="nav-text">Interprete</span>
        </Link>
      </div>
      <div className="nav-item">
      <img src={enseñanza} alt="profile" className="Enseñanza" />
        <span className="nav-text">Enseñanza</span>
      </div>
      <div className="nav-item">
      <img src={emergencia} alt="profile" className="Emergencia" />
        <span className="nav-text">Emergencia</span>
      </div>
      <div className="nav-item">
      <img src={perfil} alt="profile" className="Perfil" />
        <span className="nav-text">Perfil</span>
      </div>
    </nav>
  );
};

export default Navbar;
