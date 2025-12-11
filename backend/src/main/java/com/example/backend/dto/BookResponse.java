package com.example.backend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class BookResponse {
    private Integer id;

    private String bookName;

    private String imageUrl;

    private Integer examId;

    private int progressPercent;

    private long totalStudyMinutes;
}
