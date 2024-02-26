package com.codeVerse.ecommerce.dao;

import com.codeVerse.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    //This is the same as using. SELECT * FROM Product p WHERE p.name LIKE CONCAT('%', :name , '%')
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
