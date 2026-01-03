import React, { useState } from 'react';
import { apiService } from '../services/apiService';
import './AdminLogin.css';

function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Tentando login com:', credentials);
      const result = await apiService.login(credentials);
      console.log('Resultado do login:', result);
      if (result.success) {
        localStorage.setItem('admin_user', JSON.stringify(result.usuario));
        onLogin(result.usuario);
      } else {
        alert(result.message || 'Erro no login');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro no login. Verifique sua conexão.');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h1>Administração COA</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={credentials.senha}
            onChange={handleChange}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;