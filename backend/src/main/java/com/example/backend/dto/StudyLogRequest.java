package com.example.backend.dto;

import lombok.Data;

@Data
public class StudyLogRequest {
    private Integer durationMinutes;
    private String notes;
}
