import React from 'react';
import FotoP from '../img/juan.png'

const Header = () => (
  <header className="header">
    <img src={FotoP} alt="profile" className="profile-img" />
    <div>
      <h1>Hola, Juan!</h1>
      <p className="juancito">juancito@gmail.com</p>
    </div>
    <div className="notification-icon"></div>
  </header>
);

export default Header;
