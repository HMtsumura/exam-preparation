package com.example.backend.repository;

import com.example.backend.entity.Book;
import com.example.backend.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    Optional<Book> findById(Integer id);

    List<Book> findByExamId(Integer examId);
}