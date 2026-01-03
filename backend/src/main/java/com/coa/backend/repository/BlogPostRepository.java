package com.coa.backend.repository;

import com.coa.backend.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    List<BlogPost> findByAtivoOrderByDataPublicacaoDesc(Boolean ativo);
}