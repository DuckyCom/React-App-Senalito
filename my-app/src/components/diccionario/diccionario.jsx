import React from 'react';
import FlechaA from '../img/arrow-left.png';
import Navbar from '../navbar/navbar.jsx';
import { useNavigate } from 'react-router-dom';
import CardFam from './card.jsx';
import './diccionario.css';

const Diccionario = () => {
  const navigate = useNavigate();
  return (
    <><div className="container">
      <div className='header'>
        <h2>
          <img
            src={FlechaA}
            alt="atras"
            onClick={() => navigate('/home')} />
          Diccionario LSA
        </h2>
      </div>

      <div className="card-container">
        <CardFam
          title="Familia"
          description="Aprende todas las palabras sobre la categoría familia."
          buttonText="Ver categoría"
          link="/catfam" />
        <CardFam
          title="Deportes"
          description="Aprende todas las palabras sobre la categoría deportes."
          buttonText="Ver categoría"
          link="#" />
        <CardFam
          title="Números"
          description="Aprende todas las palabras sobre la categoría números."
          buttonText="Ver categoría"
          link="#" />
        <CardFam
          title="Colores"
          description="Aprende todas las palabras sobre la categoría colores."
          buttonText="Ver categoría"
          link="#" />
        <CardFam
          title="Saludos"
          description="Aprende todas las palabras sobre la categoría saludos."
          buttonText="Ver categoría"
          link="#" />
        <CardFam
          title="Alimentos"
          description="Aprende todas las palabras sobre la categoría alimentos."
          buttonText="Ver categoría"
          link="#" />

      </div>

    </div>
    <Navbar /></>

  );
};

export default Diccionario;
