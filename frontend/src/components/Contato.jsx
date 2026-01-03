import React, { useState } from 'react';
import { apiService } from '../services/apiService';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.enviarContato(formData);
      alert('Mensagem enviada com sucesso!');
      setFormData({ nome: '', email: '', mensagem: '' });
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar mensagem. Verifique sua conexão.');
    }
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