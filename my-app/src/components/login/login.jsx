import React, { useState } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'; // Usar react-router para redireccionar
import axios from 'axios';
import Logo from "../img/logo.png";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();
    let response = ''
const handleLogin = async (e) => {
    e.preventDefault();
    try {
        // Puedes añadir más campos en el objeto de datos
        response = await axios.post('http://localhost:7777/api/user/login', {
            email,
            password,

        });

        // Convertir la cadena JSON en un objeto
        
        const {user, token} = JSON.parse(response.data.result);
  
        // Extraer los valores, incluyendo los adicionales
        const extractedEmail = user.email;
        const extractedPassword = user.password;

        console.log("Email extraído:", extractedEmail);
        console.log("Password extraído:", extractedPassword);

        if (response.data.success) {
            setMessage({ text: 'Inicio de sesión exitoso', type: 'success' });
            Cookies.set('token', token);
            Cookies.set('userId', "HARDCODEO");
            Cookies.set('user', "");
            navigate('/home');
        }
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 401) {
            setMessage({ text: 'Credenciales inválidas', type: 'success' });
        } else {
            setMessage({ text: 'Error del servidor, inténtelo de nuevo más tarde', type: 'success' });
        }
        console.error('Error en login:', error);
    }
};


    // Función para alternar la visibilidad de la contraseña
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Función para manejar la redirección al registro
    const handleRegisterRedirect = () => {
        navigate('/register'); // Redirige a la página de registro
    };

    return (
        <div className="login-main">
            <div className="login-right">
                <div className="login-right-container">
                    <div className="login-logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="login-center">
                        <h2>Bienvenido</h2>
                        <p>Inicia sesión para continuar</p>
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
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
                                <label htmlFor="show-password-checkbox">
                                    Mostrar contraseña
                                </label>
                            </div>
                            <div className="login-center-options">
                                <div className="checkbox-container">
                                    <input type="checkbox" id="remember-checkbox" />
                                    <label htmlFor="remember-checkbox">
                                        No cerrar sesión
                                    </label>
                                </div>
                                <a href="#" className="forgot-pass-link">
                                    ¿Olvidaste la contraseña?
                                </a>
                            </div>
                            <div className="login-center-buttons">
                                <button type="submit">Iniciar sesión</button>
                            </div>
                        </form>

                        {/* Mostrar mensaje de éxito */}
                        {message.type === 'success' && (
                            <p className="success-message">{message.text}</p>
                        )}

                    </div>
                    <p className="login-bottom-p">
                        ¿No tienes cuenta? <a href="#" onClick={handleRegisterRedirect}>Regístrate ahora</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
