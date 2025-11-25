package com.example.backend.controller;

import com.example.backend.entity.Book;
import com.example.backend.entity.Exam;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.ExamRepository;
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
@RequestMapping("/api/exams")
public class ExamController {
    private final ExamService examService;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private BookRepository bookRepository;

    public ExamController(ExamService examService) {
        this.examService = examService;
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
    public List<Book> getBooksByExamId(@PathVariable Integer examId) {
        return bookRepository.findByExamId(examId);
    }
}
