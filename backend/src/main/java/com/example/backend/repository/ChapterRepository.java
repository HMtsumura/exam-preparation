package com.example.backend.repository;

import com.example.backend.dto.ChapterWithStatusDto;
import com.example.backend.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Integer> {
    @Query("""
        SELECT new com.example.backend.dto.ChapterWithStatusDto(
            c.id,
            c.chapterTitle,
            cs.progressPercent,
            COALESCE(SUM(sl.durationMinutes),0)
        )
        FROM Chapter c
        LEFT JOIN ChapterStatus cs
            ON c.id = cs.chapterId
        LEFT JOIN StudyLog sl
            ON c.id = sl.chapterId
        WHERE c.bookId = :bookId
        GROUP BY c.id, cs.progressPercent, c.chapterTitle
        ORDER BY c.id
        
        """)
    List<ChapterWithStatusDto> findChaptersWithStatus(
            @Param("bookId") Integer bookId
    );

    List<Chapter> findByBookId(Integer bookId);
}