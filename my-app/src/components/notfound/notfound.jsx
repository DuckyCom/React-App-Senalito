import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './notfound.css';
import Cookies from 'js-cookie';

const NotFound = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Función para comprobar si el usuario está logeado
        const checkLogin = () => {
            // Comprobar la cookie 'user'
            const user = Cookies.get('user');
            setIsLoggedIn(!!user);
        };

        checkLogin();
    }, []);

    const handleHomeClick = () => {
        if (isLoggedIn) {
            navigate('/home');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="not-found">
            <h1>Página no encontrada</h1>
            {isLoggedIn ? (
                <p>Parece que te has perdido. ¿Quieres volver a la página principal?</p>
            ) : (
                <p>No hemos encontrado la página que buscas. ¿Quieres iniciar sesión o registrarte?</p>
            )}
            <button onClick={handleHomeClick}>
                {isLoggedIn ? 'Ir a Inicio' : 'Iniciar Sesión / Registrarse'}
            </button>
        </div>
    );
};

export default NotFound;
