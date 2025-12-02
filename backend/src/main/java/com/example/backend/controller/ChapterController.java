package com.example.backend.controller;

import com.example.backend.dto.ChapterWithStatusDto;
import com.example.backend.dto.ProgressUpdateRequest;
import com.example.backend.dto.StudyLogRequest;
import com.example.backend.entity.Book;
import com.example.backend.entity.Chapter;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.ChapterRepository;
import com.example.backend.service.BookService;
import com.example.backend.service.ChapterService;
import com.example.backend.service.ChapterStatusService;
import com.example.backend.service.StudyLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ChapterController {

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private ChapterService chapterService;

    @Autowired
    private ChapterStatusService chapterStatusService;

    @Autowired
    private StudyLogService studyLogService;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping("/books/{bookId}/chapters")
    public List<ChapterWithStatusDto> getChaptersByBookId(@PathVariable Integer bookId) {
        return chapterService.getChaptersWithStatus(bookId);
    }

    @GetMapping("/books/{bookId}/chapters/{chapterId}")
    public ChapterWithStatusDto getChapter(@PathVariable Integer chapterId) {
        return chapterService.getChapterWithStatus(chapterId);
    }

    @PostMapping("/books/{bookId}/chapters")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Chapter> addChapter(@PathVariable Integer bookId, @RequestBody Chapter request) {
        // TODO Serviceに移動
        Optional<Book> bookOpt = bookRepository.findById(bookId);
        if (bookOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Chapter chapter = new Chapter();
        chapter.setChapterTitle(request.getChapterTitle());
        chapter.setBookId(bookId);
        chapter.setOrderNo(6);

        Chapter saved = chapterRepository.save(chapter);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/chapters/{chapterId}")
    public ResponseEntity<Void> deleteChapter(@PathVariable Integer chapterId) {
        chapterService.deleteChapterById(chapterId);
        return ResponseEntity.noContent().build();
    }
}
