import React from 'react';
import FlechaA from '../img/arrow-left.png';
import Navbar from '../navbar/navbar.jsx';
import { useNavigate } from 'react-router-dom';
import Cardp from './cardp.jsx';
import './diccionario.css';

// Importa las imágenes
import Abuela from './img/Abuela_img.png';
import Abuelo from './img/Abuelo_img.png';
import Papa from './img/Papa_img.png';
import Mama from './img/Mama_img.png';
import Hijo from './img/Hijo_img.png';
import Hija from './img/Hija_img.png';

const Diccionario = () => {
  const navigate = useNavigate();
  return (
    <div className="container"> 
      <div className='header'>
        <h2> 
          <img
            src={FlechaA}
            alt="atras"
            onClick={() => navigate('/home')}
          /> 
          Familia
        </h2>
      </div>
      
      <div className="card-container">
        <Cardp
          title="Papá"
          image={Papa} // Imagen para "Papá"
        />
        <Cardp
          title="Mamá"
          
          image={Mama} // Imagen para "Mamá"
        />
        <Cardp
          title="Abuela"
         
          image={Abuela} // Imagen para "Abuela"
        />
        <Cardp
          title="Abuelo"
          
          image={Abuelo} // Imagen para "Abuelo"
        />
        <Cardp
          title="Hijo"
          
          image={Hijo} // Imagen para "Hijo"
        />
        <Cardp
          title="Hija"
         
          image={Hija} // Imagen para "Hija"
        />
      </div>
      <Navbar/>
    </div>
  );
};

export default Diccionario;
