package com.example.backend.repository;

import com.example.backend.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Integer> {
    // 特定のユーザーの試験一覧
    List<Exam> findByUserId(Integer userId);

    Optional<Exam> findById(Integer id);

}