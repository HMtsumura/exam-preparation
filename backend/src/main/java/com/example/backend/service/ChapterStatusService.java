package com.example.backend.service;

import com.example.backend.dto.ChapterWithStatusDto;
import com.example.backend.dto.ProgressUpdateRequest;
import com.example.backend.dto.StudyLogRequest;
import com.example.backend.entity.ChapterStatus;
import com.example.backend.entity.StudyLog;
import com.example.backend.repository.ChapterRepository;
import com.example.backend.repository.ChapterStatusRepository;
import com.example.backend.repository.StudyLogRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ChapterStatusService {

    private final ChapterRepository chapterRepository;
    private final ChapterStatusRepository chapterStatusRepository;
    private final StudyLogRepository studyLogRepository;

    public ChapterStatusService(
            ChapterRepository chapterRepository,
            ChapterStatusRepository chapterStatusRepository,
            StudyLogRepository studyLogRepository
            ) {
        this.chapterRepository = chapterRepository;
        this.chapterStatusRepository = chapterStatusRepository;
        this.studyLogRepository = studyLogRepository;
    }
    public List<ChapterWithStatusDto> getChaptersWithStatus(Integer bookId) {
        return chapterRepository.findChaptersWithStatus(bookId);
    }

    public void updateProgress(Integer chapterId, ProgressUpdateRequest request) {

        // 既存のステータスを探す
        ChapterStatus status = chapterStatusRepository.findByChapterId(chapterId);

        // なければ新規作成
        if (status == null) {
            status = new ChapterStatus();
            status.setChapterId(chapterId);
            status.setUserId(1); //TODO dbから取得
            status.setCreatedAt(new Date());
        }

        status.setProgressPercent(request.getProgress());
        status.setLastStudied(new Date());
        status.setUpdatedAt(new Date());

        chapterStatusRepository.save(status);
    }
}
