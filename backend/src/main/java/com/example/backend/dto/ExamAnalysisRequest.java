package com.example.backend.dto;

public class ExamAnalysisRequest {
    private String examName;
    private Double dailyStudyHours;

    public ExamAnalysisRequest() {}

    public ExamAnalysisRequest(String examName, Double dailyStudyHours) {
        this.examName = examName;
        this.dailyStudyHours = dailyStudyHours;
    }

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public Double getDailyStudyHours() {
        return dailyStudyHours;
    }

    public void setDailyStudyHours(Double dailyStudyHours) {
        this.dailyStudyHours = dailyStudyHours;
    }
}
