package com.coa.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contatos")
public class Contato {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nome;
    
    @Column(nullable = false, length = 150)
    private String email;
    
    @Column(nullable = false, columnDefinition = "NTEXT")
    private String mensagem;
    
    @Column(name = "data_envio")
    private LocalDateTime dataEnvio;
    
    private Boolean lido = false;
    
    // Construtores
    public Contato() {
        this.dataEnvio = LocalDateTime.now();
    }
    
    public Contato(String nome, String email, String mensagem) {
        this();
        this.nome = nome;
        this.email = email;
        this.mensagem = mensagem;
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }
    
    public LocalDateTime getDataEnvio() { return dataEnvio; }
    public void setDataEnvio(LocalDateTime dataEnvio) { this.dataEnvio = dataEnvio; }
    
    public Boolean getLido() { return lido; }
    public void setLido(Boolean lido) { this.lido = lido; }
}