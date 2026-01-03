package com.coa.backend.controller;

import com.coa.backend.entity.Usuario;
import com.coa.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String senha = credentials.get("senha");
            
            Optional<Usuario> usuario = usuarioRepository.findByEmailAndAtivo(email, true);
            
            if (usuario.isPresent() && usuario.get().getSenha().equals(senha)) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Login realizado com sucesso!",
                    "usuario", Map.of(
                        "id", usuario.get().getId(),
                        "nome", usuario.get().getNome(),
                        "email", usuario.get().getEmail()
                    )
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email ou senha inválidos"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erro no login: " + e.getMessage()
            ));
        }
    }
}