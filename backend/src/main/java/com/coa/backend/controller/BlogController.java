package com.coa.backend.controller;

import com.coa.backend.entity.BlogPost;
import com.coa.backend.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/blog")
@CrossOrigin(origins = "http://localhost:3000")
public class BlogController {
    
    @Autowired
    private BlogPostRepository blogPostRepository;
    
    @GetMapping("/posts")
    public ResponseEntity<List<BlogPost>> listarPosts() {
        try {
            List<BlogPost> posts = blogPostRepository.findByAtivoOrderByDataPublicacaoDesc(true);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/posts")
    public ResponseEntity<Map<String, Object>> criarPost(@RequestBody BlogPost post) {
        try {
            BlogPost postSalvo = blogPostRepository.save(post);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Post criado com sucesso!",
                "post", postSalvo
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erro ao criar post: " + e.getMessage()
            ));
        }
    }
    
    @GetMapping("/posts/{id}")
    public ResponseEntity<BlogPost> buscarPost(@PathVariable Long id) {
        try {
            BlogPost post = blogPostRepository.findById(id).orElse(null);
            if (post != null && post.getAtivo()) {
                return ResponseEntity.ok(post);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Map<String, Object>> deletarPost(@PathVariable Long id) {
        try {
            BlogPost post = blogPostRepository.findById(id).orElse(null);
            if (post != null) {
                post.setAtivo(false);
                blogPostRepository.save(post);
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Post removido com sucesso!"
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Post não encontrado"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erro ao remover post: " + e.getMessage()
            ));
        }
    }
}