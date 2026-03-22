package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class BulkChapterRequest {
    private Integer bookId;
    private List<String> titles;
    private List<ChapterData> chapters;

    @Data
    public static class ChapterData {
        @JsonProperty("chapter_number")
        private String chapterNumber;
        
        private String title;
        
        @JsonProperty("page_number")
        private Integer pageNumber;
    }

    // getters and setters
}
