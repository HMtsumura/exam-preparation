package com.example.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class BulkChapterRequest {
    private Integer bookId;
    private List<String> titles;

    // getters and setters
}
