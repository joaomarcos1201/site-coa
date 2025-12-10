import React from 'react';
import './Sobre.css';

function Sobre() {
  return (
    <section id="sobre" className="sobre">
      <div className="container">
        <h2>Sobre Nós</h2>
        <div className="sobre-content">
          <p>
            A COA é uma empresa dedicada a fornecer soluções inovadoras e de alta qualidade 
            para nossos clientes. Com anos de experiência no mercado, nossa equipe está 
            comprometida em entregar resultados excepcionais.
          </p>
          <p>
            Nossa missão é transformar ideias em realidade, oferecendo serviços personalizados 
            que atendem às necessidades específicas de cada projeto.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sobre;