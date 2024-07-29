import React from 'react';
import Header from './header';
import Card from './card';
import EmergencyButton from './Emergencybutton';
import './home.css';

function Home() {
  return (
    <div className="Home">
      <Header />
      <main>
        <section className="interpretation">
          <h2>Interpretación en tiempo real</h2>
          <p>Comunícate de manera efectiva, rompiendo las barreras del lenguaje.</p>
          <button>Interpretar ahora</button>
        </section>
        <section className="cards">
          <Card 
            title="Enseñanza"
            description="Aprende lenguaje de señas argentina de la mano de los mejores."
            buttonText="Aprender ahora"
            link="#"
          />
          <Card 
            title="Enseñanza"
            description="Aprende todo sobre el español."
            buttonText="Aprender ahora"
            link="#"
          />
        </section>
        <EmergencyButton />
      </main>
    </div>
  );
}

export default Home;
