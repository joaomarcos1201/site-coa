package com.coa.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:3000")
public class UploadController {
    
    private final String UPLOAD_DIR = "uploads/images/";
    
    @PostMapping("/image")
    public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Arquivo não selecionado"
                ));
            }
            
            // Criar diretório se não existir
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            
            // Gerar nome único para o arquivo
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String filename = UUID.randomUUID().toString() + extension;
            
            // Salvar arquivo
            Path filePath = Paths.get(UPLOAD_DIR + filename);
            Files.write(filePath, file.getBytes());
            
            // Retornar URL da imagem
            String imageUrl = "/api/images/" + filename;
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Imagem enviada com sucesso!",
                "imageUrl", imageUrl
            ));
            
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erro ao salvar imagem: " + e.getMessage()
            ));
        }
    }
}