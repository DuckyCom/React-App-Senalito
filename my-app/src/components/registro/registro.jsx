import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from "../img/logo.png";
import Flecha from "../img/Shape.png";
import "../login/login.css";

const Register = () => {
  const [first_name, setFirstName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      setMessage({ text: 'Debes aceptar los Términos y Condiciones para registrarte.', type: 'error' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:7777/api/user/register', {
        first_name,
        phone_number,
        email,
        password
      });

      if (response.data.success) {
        setMessage({ text: 'Registro exitoso', type: 'success' });
        setTimeout(() => {
          setMessage({ text: 'Redirigiendo a la página de inicio de sesión...', type: 'success' });
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }, 2000);
      } else {
        setMessage({ text: 'Error al registrarse. Por favor intenta de nuevo.', type: 'error' });
      }
    } catch (error) {
      console.error('Error al mandar la request:', error);
      setMessage({ text: 'Error en el registro. Por favor verifica tus datos e intenta de nuevo.', type: 'error' });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-main">
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="login-center">
            <h2>Regístrate</h2>
            <p>Crea una nueva cuenta</p>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Nombre"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Número de Teléfono ej: +54 11 1234 5678"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="show-password-checkbox"
                  checked={showPassword}
                  onChange={toggleShowPassword}
                />
                <label htmlFor="show-password-checkbox">Mostrar contraseña</label>
              </div>

              <div className="login-center-options">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                  />
                  <label htmlFor="terms-checkbox">
                    Al seleccionar la casilla estás aceptando nuestros Términos y Condiciones.
                  </label>
                </div>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Registrarme <img className="Flechita" src={Flecha} alt="Flecha" /></button>
              </div>
            </form>

            {/* Mostrar mensaje de éxito o error */}
            {message.text && (
              <p className={message.type === 'error' ? 'error-message' : 'success-message'}>
                {message.text}
              </p>
            )}
          </div>

          <p className="login-bottom-p">
            ¿Ya tienes cuenta? <a href="#" onClick={() => navigate('/login')}>Iniciar sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
