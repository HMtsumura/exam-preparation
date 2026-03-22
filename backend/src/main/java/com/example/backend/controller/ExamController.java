package com.example.backend.controller;

import com.example.backend.dto.BookResponse;
import com.example.backend.dto.ExamCreateRequest;
import com.example.backend.dto.ExamResponse;
import com.example.backend.dto.ExamAnalysisRequest;
import com.example.backend.entity.Book;
import com.example.backend.entity.Exam;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.ExamRepository;
import com.example.backend.service.BookService;
import com.example.backend.service.ExamService;
import com.example.backend.service.ExamAnalysisService;
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

    private final ExamAnalysisService examAnalysisService;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private BookRepository bookRepository;

    public ExamController(ExamService examService, BookService bookService, ExamAnalysisService examAnalysisService) {
        this.examService = examService;
        this.bookService = bookService;
        this.examAnalysisService = examAnalysisService;
    }

    // 全試験取得 TODO: user毎に取得できるように
    @GetMapping
    public List<ExamResponse> getAllExams() {
        System.out.print("test");
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
    public ResponseEntity<ExamResponse> addExam(
            @RequestBody ExamCreateRequest request
    ) throws IOException {
        Exam exam = new Exam();
        exam.setExamName(request.getExamName());
        exam.setExamDate(request.getExamDate());
        exam.setEstimatedDailyStudyHours(request.getEstimatedDailyStudyHours());
        // exam analyzerで取得した必要勉強時間を使用
        exam.setEstimatedStudyHours(request.getEstimatedStudyHours() != null ? request.getEstimatedStudyHours() : 100);
        // TODO: ユーザー機能追加したら正しい値に変更
        exam.setUserId(1);
        exam.setStatus("scheduled");  // デフォルトステータスを設定
        Exam savedExam = examRepository.save(exam);

        // ExamResponse を返す（progressPercent を含む）
        ExamResponse response = new ExamResponse(
                savedExam.getId(),
                savedExam.getExamName(),
                savedExam.getExamDate(),
                0.0,  // 新規作成時は進捗0%
                savedExam.getEstimatedStudyHours(),
                savedExam.getStatus()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/analyze")
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> analyzeExam(@RequestBody ExamAnalysisRequest request) {
        try {
            var result = examAnalysisService.analyzeExam(request.getExamName(), request.getDailyStudyHours());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error analyzing exam: " + e.getMessage());
        }
    }
}

