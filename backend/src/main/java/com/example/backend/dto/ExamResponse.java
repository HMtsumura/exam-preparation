package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@Data
public class ExamResponse {
    private Integer id;
    private String examName;
    private Date examDate;
    private Double progressPercent;
    private Integer estimatedStudyHours;
    private String status;
}
