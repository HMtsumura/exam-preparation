package com.example.backend.controller;

import com.example.backend.entity.Book;
import com.example.backend.entity.Chapter;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.ChapterRepository;
import com.example.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class ChapterController {

    @Autowired
    private ChapterRepository chapterRepository;

    @GetMapping("/{bookId}/chapters")
    public List<Chapter> getChaptersByBookId(@PathVariable Integer bookId) {
        return chapterRepository.findByBookId(bookId);
    }
}
