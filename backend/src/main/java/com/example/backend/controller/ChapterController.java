package com.example.backend.controller;

import com.example.backend.entity.Book;
import com.example.backend.entity.Chapter;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.ChapterRepository;
import com.example.backend.service.BookService;
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
    private BookRepository bookRepository;

    @GetMapping("/{bookId}/chapters")
    public List<Chapter> getChaptersByBookId(@PathVariable Integer bookId) {
        return chapterRepository.findByBookId(bookId);
    }

    @PostMapping
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
