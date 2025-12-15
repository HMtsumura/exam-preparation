package com.example.backend.service;

import com.example.backend.dto.ChapterWithStatusDto;
import com.example.backend.dto.ExamResponse;
import com.example.backend.entity.Book;
import com.example.backend.entity.Chapter;
import com.example.backend.entity.Exam;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.ChapterRepository;
import com.example.backend.repository.ExamRepository;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class ExamService {

    private final ExamRepository examRepository;
    private final BookRepository bookRepository;
    private final ChapterRepository chapterRepository;

    public ExamService(
            ExamRepository examRepository,
            BookRepository bookRepository,
            ChapterRepository chapterRepository
    ) {
        this.examRepository = examRepository;
        this.bookRepository = bookRepository;
        this.chapterRepository = chapterRepository;
    }

    public List<ExamResponse> getAllExams() {
        return examRepository.findAll().stream()
                .map(exam -> new ExamResponse(
                        exam.getId(),
                        exam.getExamName(),
                        exam.getExamDate(),
                        calculateExamProgress(exam.getId())
                ))
                .toList();

    }

    private double calculateExamProgress(Integer examId) {
        List<ChapterWithStatusDto> chapters =
                chapterRepository.findChaptersWithStatusByExamId(examId);

        if (chapters.isEmpty()) return 0.0;

        return chapters.stream()
                .mapToDouble(c -> c.getProgressPercent() == null ? 0 : c.getProgressPercent())
                .average()
                .orElse(0.0);
    }

    public Optional<Exam> getExamById(Integer examId) {
        return examRepository.findById(examId);
    }
}
