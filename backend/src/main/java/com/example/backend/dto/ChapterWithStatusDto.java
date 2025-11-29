package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChapterWithStatusDto {
    private Integer id;
    private String chapterTitle;
    private Integer progressPercent;
}
