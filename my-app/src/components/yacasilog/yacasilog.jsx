import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './yacasir.css';

const VerificationSuccess = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate('/home'); // Redirige a la pantalla principal
  };

  return (
    <div className="verification-container">
      <div className={`verification-icon ${animationComplete ? 'stop-animation' : ''}`}>
        <svg height="100" width="100" viewBox="0 0 100 100">
          <circle className="circle" cx="50" cy="50" r="45" strokeWidth="5" fill="none" />
          <path d="M30 50 L45 65 L70 35" stroke="green" strokeWidth="5" fill="none" />
        </svg>
      </div>
      <h2>Bienvenido!</h2>
      <p>Queremos hacerte algunas preguntas para conocerte mejor...</p>
      <button className="continue-button" onClick={handleContinue}>Continuar</button>
    </div>
  );
};

export default VerificationSuccess;
