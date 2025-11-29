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
public class StudyLogService {

    private final StudyLogRepository studyLogRepository;

    public StudyLogService(
            StudyLogRepository studyLogRepository
            ) {
        this.studyLogRepository = studyLogRepository;
    }

    public void addStudyLog(Integer chapterId, StudyLogRequest request) {

        StudyLog log = new StudyLog();
        log.setChapterId(chapterId);
        log.setUserId(1);  // TODO DBから取得
        log.setDurationMinutes(request.getDurationMinutes());
        log.setNotes(request.getNotes());
        log.setStudyDate(new Date());

        studyLogRepository.save(log);
    }

}
