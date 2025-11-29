package com.example.backend.repository;

import com.example.backend.dto.ChapterWithStatusDto;
import com.example.backend.entity.Chapter;
import com.example.backend.entity.StudyLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyLogRepository extends JpaRepository<StudyLog, Integer> {
    @Query("SELECT COALESCE(SUM(sl.durationMinutes), 0) FROM StudyLog sl WHERE sl.chapterId = :chapterId")
    Long sumDurationsByChapterId(@Param("chapterId") Integer chapterId);
}