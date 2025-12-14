-- Criação do banco de dados COA
CREATE DATABASE COA_DB;
GO

USE COA_DB;
GO

-- Tabela de usuários
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(150) UNIQUE NOT NULL,
    senha NVARCHAR(255) NOT NULL,
    data_criacao DATETIME DEFAULT GETDATE(),
    ativo BIT DEFAULT 1
);

-- Tabela de contatos (formulário do site)
CREATE TABLE contatos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(150) NOT NULL,
    mensagem NTEXT NOT NULL,
    data_envio DATETIME DEFAULT GETDATE(),
    lido BIT DEFAULT 0
);

-- Tabela de configurações do site
CREATE TABLE configuracoes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    chave NVARCHAR(50) UNIQUE NOT NULL,
    valor NTEXT,
    descricao NVARCHAR(255),
    data_atualizacao DATETIME DEFAULT GETDATE()
);

-- Inserindo configurações iniciais
INSERT INTO configuracoes (chave, valor, descricao) VALUES
('site_titulo', 'COA', 'Título do site'),
('site_descricao', 'Soluções profissionais e inovadoras para o seu negócio', 'Descrição do site'),
('email_contato', 'contato@coa.com.br', 'Email de contato'),
('telefone_contato', '(11) 99999-9999', 'Telefone de contato');

-- Índices para melhor performance
CREATE INDEX IX_contatos_data_envio ON contatos(data_envio);
CREATE INDEX IX_contatos_lido ON contatos(lido);
CREATE INDEX IX_usuarios_email ON usuarios(email);
CREATE INDEX IX_usuarios_ativo ON usuarios(ativo);