package com.example.backend.repository;

import com.example.backend.entity.ChapterStatus;
import com.example.backend.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChapterStatusRepository extends JpaRepository<ChapterStatus, Integer> {
     ChapterStatus findByChapterId(Integer chapterId);
}