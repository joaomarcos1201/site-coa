-- Tabela para posts do blog
CREATE TABLE blog_posts (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(200) NOT NULL,
    conteudo NTEXT,
    data_publicacao DATETIME DEFAULT GETDATE(),
    autor_id INT,
    ativo BIT DEFAULT 1
);

-- Inserindo usuário administrador padrão
INSERT INTO usuarios (nome, email, senha, data_criacao, ativo) VALUES
('Administrador', 'admin@coa.com.br', 'admin123', GETDATE(), 1);

-- Índices para melhor performance
CREATE INDEX IX_blog_posts_data_publicacao ON blog_posts(data_publicacao);
CREATE INDEX IX_blog_posts_ativo ON blog_posts(ativo);
CREATE INDEX IX_blog_posts_autor ON blog_posts(autor_id);