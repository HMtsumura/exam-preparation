package com.example.backend.controller;

import com.example.backend.dto.ChapterWithStatusDto;
import com.example.backend.entity.Book;
import com.example.backend.entity.Chapter;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.ChapterRepository;
import com.example.backend.service.BookService;
import com.example.backend.service.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class ChapterController {

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private ChapterService chapterService;



    @Autowired
    private BookRepository bookRepository;

    @GetMapping("/{bookId}/chapters")
    public List<ChapterWithStatusDto> getChaptersByBookId(@PathVariable Integer bookId) {
        return chapterService.getChaptersWithStatus(bookId);
    }

    @PostMapping("/{bookId}/chapters")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Chapter> addChapter(@PathVariable Integer bookId, @RequestBody Chapter request) {
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
}
