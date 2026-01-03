import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import './Blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPosts();
  }, []);

  const carregarPosts = async () => {
    try {
      const result = await apiService.listarPosts();
      setPosts(result);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <h1>Blog</h1>
        <p>Carregando posts...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <p>Nenhum post publicado ainda.</p>
      ) : (
        <div className="blog-posts">
          {posts.map(post => (
            <article key={post.id} className="blog-post">
              {post.imagemUrl && (
                <img src={post.imagemUrl} alt={post.titulo} className="blog-post-image" />
              )}
              <div className="blog-post-content">
                <h2>{post.titulo}</h2>
                <div className="post-meta">
                  <span className="post-author">Por: {post.autorNome || 'Anônimo'}</span>
                  <span className="post-date">{new Date(post.dataPublicacao).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="post-excerpt">
                  {post.conteudo.substring(0, 200)}...
                </div>
                <Link to={`/blog/post/${post.id}`} className="read-more-btn">
                  Leia na íntegra
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;