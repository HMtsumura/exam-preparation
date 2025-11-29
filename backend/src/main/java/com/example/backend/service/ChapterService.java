package com.example.backend.service;

import com.example.backend.dto.ChapterWithStatusDto;
import com.example.backend.entity.Book;
import com.example.backend.repository.BookRepository;
import com.example.backend.repository.ChapterRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChapterService {

    private final ChapterRepository chapterRepository;

    public ChapterService(ChapterRepository chapterRepository) {
        this.chapterRepository = chapterRepository;
    }
    public List<ChapterWithStatusDto> getChaptersWithStatus(Integer bookId) {
        return chapterRepository.findChaptersWithStatus(bookId);
    }
}
