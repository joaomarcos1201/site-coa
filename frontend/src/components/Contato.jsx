import React, { useState } from 'react';
import './Contato.css';

function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
  };

  return (
    <section id="contato" className="contato">
      <div className="container">
        <h2>Entre em Contato</h2>
        <form onSubmit={handleSubmit} className="contato-form">
          <input
            type="text"
            name="nome"
            placeholder="Seu nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Seu email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="mensagem"
            placeholder="Sua mensagem"
            rows="5"
            value={formData.mensagem}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Enviar Mensagem</button>
        </form>
      </div>
    </section>
  );
}

export default Contato;