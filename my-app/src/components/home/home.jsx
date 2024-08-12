import React from 'react';
import Header from './header';
import Card from './card.jsx';
import Cookies from 'js-cookie';
import EmergencyButton from './Emergencybutton.jsx';
import './home.css';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar.jsx';

function Home() {
  return (
    <div className="Home">
      <Header />
      <main>
      <Link to="/home">
        <section className="interpretation">
          <h2>Interpretación en tiempo real</h2>
          <p>Comunícate de manera efectiva, rompiendo las barreras del lenguaje.</p>
          <button>Interpretar ahora</button>
        </section>
        </Link>
        <section className="cards">
          <Card 
            title="Enseñanza"
            description="Aprende lenguaje de señas argentina de la mano de los mejores."
            buttonText="Aprender ahora"
            link="#"
          />
          <Card 
            title="Enseñanza"
            description="Aprende todo sobre el español de una forma creativa e inclusiva."
            buttonText="Aprender ahora"
            link="#"
          />
        </section>
        <EmergencyButton />
      </main>
      <Navbar/>
    </div>
  );
}

export default Home;
