import React from 'react';
import Cookies from 'js-cookie';
import FotoP from '../img/juan.png';

const Header = () => {
  // Leer la cookie llamada "user"
  
  const userCookie = Cookies.get('user');
  const emailCookie = Cookies.get('email')
  const IdCookie = Cookies.get('userId')
  console.log("La cookie", userCookie)  

  return (
    <header className="custom-header">
      <img src={FotoP} alt="profile" className="custom-profile-img" />
      <div className="custom-text-container">
         <h1>Hola, {userCookie || 'Usuario'}!</h1>
         <p className="custom-email">{emailCookie || 'Correo no disponible'}</p>
      </div>
    </header>
  );
};

export default Header;
