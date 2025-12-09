package com.example.backend.controller;

import com.example.backend.entity.Book;
import com.example.backend.entity.Chapter;
import com.example.backend.repository.BookRepository;
import com.example.backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

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
    public ResponseEntity<Book> addBook(
            @RequestParam Integer examId,
            @RequestParam String bookName,
            @RequestParam(required = false) MultipartFile file
    ) throws IOException {
        String imageUrl = null;

        // 画像がアップロードされていたら保存
        if (file != null && !file.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get("uploads/" + fileName);

            Path uploadDir = Paths.get("uploads/books");
            Files.createDirectories(uploadDir);
            Files.write(filePath, file.getBytes());

            imageUrl = "/uploads/" + fileName;  // フロントがアクセスできる URL
        }
        Book book = new Book();
        book.setBookName(bookName);
        book.setExamId(examId);
        book.setImageUrl(imageUrl);
        bookRepository.save(book);

        return ResponseEntity.ok(book);
    };

    // IDで参考書取得
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Integer id) {

        Optional<Book> bookOpt = bookRepository.findById(id);

        // 参考書が存在しない場合は 404
        return bookOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
