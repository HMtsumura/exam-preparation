package com.example.backend.service;

import com.example.backend.dto.ChapterWithStatusDto;
import com.example.backend.dto.ProgressUpdateRequest;
import com.example.backend.dto.StudyLogRequest;
import com.example.backend.entity.Book;
import com.example.backend.entity.Chapter;
import com.example.backend.entity.ChapterStatus;
import com.example.backend.entity.StudyLog;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.ChapterRepository;
import com.example.backend.repository.ChapterStatusRepository;
import com.example.backend.repository.StudyLogRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ChapterService {

    private final ChapterRepository chapterRepository;

    private final ChapterStatusRepository chapterStatusRepository;

    private final StudyLogRepository studyLogRepository;

    public ChapterService(
            ChapterRepository chapterRepository, ChapterStatusRepository chapterStatusRepository, StudyLogRepository studyLogRepository
    ) {
        this.chapterRepository = chapterRepository;
        this.chapterStatusRepository = chapterStatusRepository;
        this.studyLogRepository = studyLogRepository;
    }

    public List<ChapterWithStatusDto> getChaptersWithStatus(Integer bookId) {
        return chapterRepository.findChaptersWithStatus(bookId);
    }

    public ChapterWithStatusDto getChapterWithStatus(Integer chapterId) {
        Chapter c = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new RuntimeException("Chapter not found"));

        ChapterStatus status = chapterStatusRepository.findByChapterId(chapterId);
        Integer progressPercent = status != null ? status.getProgressPercent() : 0;
        String lastStudied = status != null && status.getLastStudied() != null
                ? status.getLastStudied().toString()
                : null;

        Long totalMinutes = studyLogRepository.sumDurationsByChapterId(chapterId);
        if (totalMinutes == null) totalMinutes = 0L;

        String formatted = formatStudyTime(totalMinutes);

        return new ChapterWithStatusDto(
                c.getId(),
                c.getChapterTitle(),
                progressPercent,
                totalMinutes,
                formatted
        );
    }

    private String formatStudyTime(Long minutes) {
        if (minutes == null || minutes == 0) return "0分";

        int hours = Math.toIntExact(minutes / 60);
        int mins = Math.toIntExact(minutes % 60);

        if (hours == 0) {
            return mins + "分";
        } else if (mins == 0) {
            return hours + "時間";
        } else {
            return hours + "時間" + mins + "分";
        }
    }

    public List<Chapter> createChaptersBulk(Integer bookId, List<String> titles) {
        List<Chapter> list = new ArrayList<>();

        for (String title : titles) {
            Chapter c = new Chapter();
            c.setBookId(bookId);
            c.setChapterTitle(title);
            list.add(c);
        }

        return chapterRepository.saveAll(list);
    }


    public void deleteChapterById(Integer chapterId) {
        if (!chapterRepository.existsById(chapterId)) {
            throw new EntityNotFoundException("Chapter not found with id = " + chapterId);
        }

        chapterRepository.deleteById(chapterId);
    }
}
