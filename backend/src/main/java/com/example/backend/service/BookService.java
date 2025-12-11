package com.example.backend.service;

import com.example.backend.dto.BookResponse;
import com.example.backend.dto.ChapterWithStatusDto;
import com.example.backend.entity.Book;
import com.example.backend.entity.Chapter;
import com.example.backend.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepository bookRepository;

    private final ChapterService chapterService;

    public BookService(BookRepository bookRepository, ChapterService chapterService) {
        this.bookRepository = bookRepository;
        this.chapterService = chapterService;
    }

    public Optional<Book> getBookById(Integer bookId) {
        return bookRepository.findById(bookId);
    }

    public List<BookResponse> getBooksByExamId(Integer examId) {
        List<Book> books = bookRepository.findByExamId(examId);

        return books.stream().map(book -> {
            BookResponse res = new BookResponse();
            res.setId(book.getId());
            res.setBookName(book.getBookName());
            res.setImageUrl(book.getImageUrl());
            res.setExamId(book.getExamId());

            List<ChapterWithStatusDto> chapters = chapterService.getChaptersWithStatus(book.getId());

            int avg = (int) Math.round(chapters.stream()
                    .mapToDouble(ch -> ch.getProgressPercent() != null ? ch.getProgressPercent() : 0.0)
                    .average()
                    .orElse(0.0));

            long total = chapters.stream()
                    .mapToLong(ChapterWithStatusDto::getTotalStudyTime)
                    .sum();

            res.setProgressPercent(avg);
            res.setTotalStudyMinutes(total);

            return res;
        }).collect(Collectors.toList());
    }
}
