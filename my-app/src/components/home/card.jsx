import React from 'react';

const Card = ({ title, description, buttonText, link }) => (
  <div className="card">
    <h2>{title}</h2>
    <p>{description}</p>
    <button className="botonCard" onClick={() => window.location.href = link}>{buttonText}</button>
  </div>
);

export default Card;
