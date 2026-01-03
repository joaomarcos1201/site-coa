package com.coa.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blog_posts")
public class BlogPost {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String titulo;
    
    @Column(columnDefinition = "NTEXT")
    private String conteudo;
    
    @Column(name = "imagem_url", columnDefinition = "NTEXT")
    private String imagemUrl;
    
    @Column(name = "autor_nome", length = 100)
    private String autorNome;
    
    @Column(name = "data_publicacao")
    private LocalDateTime dataPublicacao;
    
    @Column(name = "autor_id")
    private Long autorId;
    
    private Boolean ativo = true;
    
    // Construtores
    public BlogPost() {
        this.dataPublicacao = LocalDateTime.now();
    }
    
    public BlogPost(String titulo, String conteudo, String imagemUrl, String autorNome, Long autorId) {
        this();
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.imagemUrl = imagemUrl;
        this.autorNome = autorNome;
        this.autorId = autorId;
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    
    public String getConteudo() { return conteudo; }
    public void setConteudo(String conteudo) { this.conteudo = conteudo; }
    
    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }
    
    public String getAutorNome() { return autorNome; }
    public void setAutorNome(String autorNome) { this.autorNome = autorNome; }
    
    public LocalDateTime getDataPublicacao() { return dataPublicacao; }
    public void setDataPublicacao(LocalDateTime dataPublicacao) { this.dataPublicacao = dataPublicacao; }
    
    public Long getAutorId() { return autorId; }
    public void setAutorId(Long autorId) { this.autorId = autorId; }
    
    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
}