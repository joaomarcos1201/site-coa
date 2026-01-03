import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import './PostView.css';

function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPost();
  }, [id]);

  const carregarPost = async () => {
    try {
      console.log('Carregando post ID:', id);
      const result = await apiService.buscarPost(id);
      console.log('Post carregado:', result);
      setPost(result);
    } catch (error) {
      console.error('Erro ao carregar post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Carregando post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="page-container">
        <h1>Post não encontrado</h1>
        <Link to="/blog" className="back-link">← Voltar ao Blog</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/blog" className="back-link">← Voltar ao Blog</Link>
      
      <article className="post-view">
        <h1>{post.titulo}</h1>
        
        <div className="post-meta">
          <span className="post-author">Por: {post.autorNome || 'Anônimo'}</span>
          <span className="post-date">
            {new Date(post.dataPublicacao).toLocaleDateString('pt-BR')}
          </span>
        </div>

        {post.imagemUrl && (
          <img src={post.imagemUrl} alt={post.titulo} className="post-featured-image" />
        )}

        <div className="post-content">
          {post.conteudo.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

export default PostView;