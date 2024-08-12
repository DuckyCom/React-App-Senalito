import React from 'react';
import Cookies from 'js-cookie';
import FotoP from '../img/juan.png';

const Header = () => {
  // Leer la cookie llamada "user"
  
  const userCookie = Cookies.get('user');
  console.log("La cookie", userCookie)
  let user = {};

  return (
    <header className="custom-header">
      <img src={FotoP} alt="profile" className="custom-profile-img" />
      <div className="custom-text-container">
         <h1>Hola, {userCookie || 'Usuario'}!</h1> { /*haria falta que sea user.name que sale del user */}
        <p className="custom-email">{user.email || 'Correo no disponible'}</p>
      </div>
    </header>
  );
};

export default Header;
