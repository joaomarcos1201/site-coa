package com.coa.backend.controller;

import com.coa.backend.entity.Contato;
import com.coa.backend.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ContatoController {
    
    @Autowired
    private ContatoRepository contatoRepository;
    
    @PostMapping("/contato")
    public ResponseEntity<Map<String, String>> salvarContato(@RequestBody Contato contato) {
        try {
            Contato contatoSalvo = contatoRepository.save(contato);
            System.out.println("Contato salvo com ID: " + contatoSalvo.getId());
            return ResponseEntity.ok(Map.of("message", "Contato salvo com sucesso!", "id", contatoSalvo.getId().toString()));
        } catch (Exception e) {
            System.err.println("Erro ao salvar contato: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", "Erro ao salvar contato: " + e.getMessage()));
        }
    }
    
    @GetMapping("/contatos")
    public ResponseEntity<List<Contato>> listarContatos() {
        try {
            List<Contato> contatos = contatoRepository.findAll();
            return ResponseEntity.ok(contatos);
        } catch (Exception e) {
            System.err.println("Erro ao listar contatos: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}