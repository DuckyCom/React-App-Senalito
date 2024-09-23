// cardp.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Cardp = ({ title, buttonText, link, image }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      {/* Agregar una clase CSS para la imagen */}
      {image && <img src={image} alt={title} className="card-image" />}
   
    </div>
  );
};

export default Cardp;
