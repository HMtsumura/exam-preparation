package com.example.backend.controller;

import com.example.backend.entity.Book;
import com.example.backend.entity.Chapter;
import com.example.backend.entity.Exam;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.ChapterRepository;
import com.example.backend.repository.ExamRepository;
import com.example.backend.service.BookService;
import com.example.backend.service.ExamService;
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
public class BookController {
    private final BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ChapterRepository chapterRepository;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // IDで参考書取得
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Integer id) {

        Optional<Book> bookOpt = bookRepository.findById(id);

        // 参考書が存在しない場合は 404
        return bookOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{bookId}/chapters")
    public List<Chapter> getChaptersByBookId(@PathVariable Integer bookId) {
        return chapterRepository.findByBookId(bookId);
    }
}
