package com.example.backend.controller;

import com.example.backend.dto.BookResponse;
import com.example.backend.dto.ExamCreateRequest;
import com.example.backend.entity.Book;
import com.example.backend.entity.Exam;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.ExamRepository;
import com.example.backend.service.BookService;
import com.example.backend.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/exams")
public class ExamController {
    private final ExamService examService;

    private final BookService bookService;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private BookRepository bookRepository;

    public ExamController(ExamService examService, BookService bookService) {
        this.examService = examService;
        this.bookService = bookService;
    }

    // 全試験取得
    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    // IDで試験取得
    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Integer id) {
        System.out.println("Request received for exam id: " + id);

        Optional<Exam> examOpt = examRepository.findById(id);

        // 試験が存在しない場合は 404
        return examOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{examId}/books")
    public List<BookResponse> getBooksByExamId(@PathVariable Integer examId) {
        return bookService.getBooksByExamId(examId);
    }

    @PostMapping
    @CrossOrigin(origins = "*")
    public ResponseEntity<Exam> addExam(
            @RequestBody ExamCreateRequest request
    ) throws IOException {
        Exam exam = new Exam();
        exam.setExamName(request.getExamName());
        exam.setExamDate(request.getExamDate());
        exam.setUserId(1);
        examRepository.save(exam);

        return ResponseEntity.ok(exam);
    };
}
