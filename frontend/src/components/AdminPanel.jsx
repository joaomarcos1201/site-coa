import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import './AdminPanel.css';

function AdminPanel({ user, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    titulo: '',
    conteudo: '',
    imagemUrl: '',
    autorNome: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    carregarPosts();
  }, []);

  const carregarPosts = async () => {
    try {
      const result = await apiService.listarPosts();
      setPosts(result);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    }
  };

  const handleChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Converter para base64 para preview e envio
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        setNewPost({
          ...newPost,
          imagemUrl: base64 // Preview e dados da imagem
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return null;
    
    setUploading(true);
    try {
      console.log('Fazendo upload da imagem:', selectedImage.name);
      const formData = new FormData();
      formData.append('file', selectedImage);
      
      const result = await apiService.uploadImage(formData);
      console.log('Resultado do upload:', result);
      
      if (result.success) {
        return result.imageUrl;
      } else {
        alert('Erro ao fazer upload da imagem: ' + result.message);
        return null;
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload da imagem: ' + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        titulo: newPost.titulo,
        conteudo: newPost.conteudo,
        imagemUrl: newPost.imagemUrl, // Pode ser URL ou base64
        autorNome: newPost.autorNome,
        autorId: user.id
      };
      
      console.log('Criando post:', { ...postData, imagemUrl: postData.imagemUrl ? 'Imagem presente' : 'Sem imagem' });
      const result = await apiService.criarPost(postData);
      console.log('Resultado:', result);
      
      if (result.success) {
        alert('Post criado com sucesso!');
        setNewPost({ titulo: '', conteudo: '', imagemUrl: '', autorNome: '' });
        setSelectedImage(null);
        carregarPosts();
      } else {
        alert(result.message || 'Erro ao criar post');
      }
    } catch (error) {
      console.error('Erro ao criar post:', error);
      alert('Erro ao criar post. Verifique se todos os campos estão preenchidos.');
    }
  };

  const deletarPost = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este post?')) {
      try {
        const result = await apiService.deletarPost(id);
        if (result.success) {
          alert('Post removido com sucesso!');
          carregarPosts();
        } else {
          alert(result.message);
        }
      } catch (error) {
        alert('Erro ao remover post');
      }
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Painel Administrativo</h1>
        <div className="admin-user">
          <span>Olá, {user.nome}</span>
          <button onClick={onLogout} className="logout-btn">Sair</button>
        </div>
      </header>

      <div className="admin-content">
        <section className="create-post">
          <h2>Criar Novo Post</h2>
          <form onSubmit={handleSubmit} className="post-form">
            <input
              type="text"
              name="titulo"
              placeholder="Título do post"
              value={newPost.titulo}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="autorNome"
              placeholder="Nome do autor"
              value={newPost.autorNome}
              onChange={handleChange}
              required
            />
            
            <div className="image-upload">
              <label>Imagem de Capa:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              <input
                type="url"
                name="imagemUrl"
                placeholder="Ou cole URL da imagem"
                value={selectedImage ? '' : (newPost.imagemUrl && !newPost.imagemUrl.startsWith('data:') ? newPost.imagemUrl : '')}
                onChange={handleChange}
                disabled={selectedImage}
              />
              {newPost.imagemUrl && (
                <img src={newPost.imagemUrl} alt="Preview" className="image-preview" />
              )}
              {selectedImage && (
                <p className="file-selected">Arquivo selecionado: {selectedImage.name}</p>
              )}
            </div>
            <textarea
              name="conteudo"
              placeholder="Conteúdo do post"
              rows="6"
              value={newPost.conteudo}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">
              Publicar Post
            </button>
          </form>
        </section>

        <section className="posts-list">
          <h2>Posts Publicados ({posts.length})</h2>
          <div className="posts-grid">
            {posts.map(post => (
              <div key={post.id} className="post-card">
                {post.imagemUrl && (
                  <img src={post.imagemUrl} alt={post.titulo} className="post-image" />
                )}
                <h3>{post.titulo}</h3>
                <p className="post-author">Por: {post.autorNome || 'Anônimo'}</p>
                <p>{post.conteudo.substring(0, 100)}...</p>
                <div className="post-actions">
                  <span className="post-date">
                    {new Date(post.dataPublicacao).toLocaleDateString('pt-BR')}
                  </span>
                  <button 
                    onClick={() => deletarPost(post.id)}
                    className="delete-btn"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminPanel;