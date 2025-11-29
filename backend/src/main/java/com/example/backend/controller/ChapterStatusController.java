package com.example.backend.controller;

import com.example.backend.dto.ChapterWithStatusDto;
import com.example.backend.dto.ProgressUpdateRequest;
import com.example.backend.dto.StudyLogRequest;
import com.example.backend.entity.Book;
import com.example.backend.entity.Chapter;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.ChapterRepository;
import com.example.backend.service.ChapterService;
import com.example.backend.service.ChapterStatusService;
import com.example.backend.service.StudyLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chapters")
public class ChapterStatusController {

    @Autowired
    private ChapterStatusService chapterStatusService;

     @PatchMapping("/{chapterId}/progress")
    public String updateProgress(
            @PathVariable Integer chapterId,
            @RequestBody ProgressUpdateRequest request
    ) {
        chapterStatusService.updateProgress(chapterId, request);
        return "Progress updated";
    }
}
