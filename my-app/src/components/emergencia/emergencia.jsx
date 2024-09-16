import React from 'react';
import styles from './emergencia.module.css'; // Importar CSS como objeto
import ImgEm from '../img/Emergencia_image.png'; 
import Location from '../img/Location_image.png'; 
import FlechaA from '../img/arrow-left.png';
import Navbar from '../navbar/navbar.jsx';
import { useNavigate } from 'react-router-dom';

const EmergenciaScreen = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.todo}> 
      <div className={styles.header}>
        <h2> 
          <img
            src={FlechaA}
            alt="atras"
            className={styles['arrow-left']}
            onClick={() => navigate('/home')}
          /> 
          Emergencia
        </h2>
      </div>
      <div className={styles.direccion}> 
        <h2 className={styles.Ubi}>
          <img src={Location} alt="Location" className={styles.location}/> 
          Ubicación actual
        </h2>
        <h2 className={styles.dire}> {/* Cambié `Dire` por `dire` para que coincida con el CSS */}
          Av. 9 de Julio 8319, CABA
        </h2>
      </div>
    </div>
  );
};

export default EmergenciaScreen;
