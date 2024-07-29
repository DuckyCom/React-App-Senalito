// src/components/EmergencyScreen.js
import React from 'react';
import './emergencia.css';

const EmergencyScreen = () => {
  return (
    <div className="emergency-container">
      <div className="header">
        <button className="back-button">←</button>
        <span className="location">Ubicación actual<br />Av. 9 de Julio, CABA</span>
        <button className="settings-button">Configuración</button>
      </div>
      <div className="content">
        <h1>¿Estás en una emergencia?</h1>
        <p>
          Presiona el botón de SOS por 3 segundos. Se avisará a tus contactos y al centro de emergencia más cercano.
        </p>
        <div className="image-container">
          <img src="your-image-path.png" alt="Emergency illustration" />
        </div>
        <div className="sos-button-container">
          <button className="sos-button">SOS<br /><span>Presionar por 3 segundos</span></button>
        </div>
      </div>
      <div className="footer">
        <button>Home</button>
        <button>Interprete</button>
        <button>Enseñanza</button>
        <button>Emergencia</button>
        <button>Perfil</button>
      </div>
    </div>
  );
};

export default EmergencyScreen;
