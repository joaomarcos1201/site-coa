const API_BASE_URL = 'http://localhost:5000/api';

// Mock temporário para testes
const MOCK_MODE = false;

export const apiService = {
  // Health check
  checkHealth: async () => {
    if (MOCK_MODE) {
      return { message: 'Backend funcionando! (MOCK)' };
    }
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },

  // Contatos
  enviarContato: async (contato) => {
    if (MOCK_MODE) {
      console.log('Contato enviado (MOCK):', contato);
      return { message: 'Contato salvo com sucesso! (MOCK)' };
    }
    const response = await fetch(`${API_BASE_URL}/contato`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contato)
    });
    return response.json();
  },

  listarContatos: async () => {
    if (MOCK_MODE) {
      return [];
    }
    const response = await fetch(`${API_BASE_URL}/contatos`);
    return response.json();
  },

  // Autenticação
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  // Blog
  listarPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/blog/posts`);
    return response.json();
  },

  buscarPost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`);
    return response.json();
  },

  criarPost: async (post) => {
    const response = await fetch(`${API_BASE_URL}/blog/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    });
    return response.json();
  },

  deletarPost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Upload
  uploadImage: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  }
};