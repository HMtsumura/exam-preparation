package com.example.backend.controller;

import com.example.backend.entity.Book;
import com.example.backend.entity.Chapter;
import com.example.backend.repository.BookRepository;
import com.example.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    @CrossOrigin(origins = "*")
    public ResponseEntity<Book> addBook(@RequestBody Book request) {
        Book saved = bookRepository.save(request);
        return ResponseEntity.ok(saved);
    };

    // IDで参考書取得
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Integer id) {

        Optional<Book> bookOpt = bookRepository.findById(id);

        // 参考書が存在しない場合は 404
        return bookOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
