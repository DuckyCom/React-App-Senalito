import React, { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import Flecha from "../img/Shape.png";
import GoogleSvg from "../img/icons8-google.svg";
// import { FaEye } from "react-icons/fa6";
// import { FaEyeSlash } from "react-icons/fa6";
import User from "../img/user.png";
import axios from 'axios';

const Login = () => {
    const [first_name, setfirst_name] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7777/api/user/login', {
                first_name,
                password
            });

            if (response.data.success) {
                setSuccessMessage('Inicio de sesión exitoso');
                console.log('Token:', response.data.token);
                // Aquí podrías guardar el token en el estado o en localStorage
            } else {
                setLoginError(response.data.message);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setLoginError('Error al iniciar sesión');
        }
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
                                placeholder="Nombre de usuario"
                                value={first_name}
                                onChange={(e) => setfirst_name(e.target.value)}
                            />
                            <div className="pass-input-div">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {/* Opcional: Agrega íconos para mostrar/ocultar contraseña */}
                            </div>

                            <div className="login-center-options">
                                <div className="remember-div">
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
                        {loginError && <p className="error-message">{loginError}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </div>
                    <p className="login-bottom-p">
                        ¿No tienes cuenta? <a href="#">Regístrate ahora</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;