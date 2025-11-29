package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChapterWithStatusDto {
    private Integer id;
    private String chapterTitle;
    private Integer progressPercent;
    private Long totalStudyTime;
    private String formattedTime;

    public ChapterWithStatusDto(Integer id, String chapterTitle, Integer progressPercent, Long totalStudyTime) {
        this.id = id;
        this.chapterTitle = chapterTitle;
        this.progressPercent = progressPercent;
        this.totalStudyTime = totalStudyTime;
        this.formattedTime = formatTime(totalStudyTime);
    }

    private String formatTime(Long minutes) {
        if (minutes == null) return "0分";
        long hours = minutes / 60;
        long mins = minutes % 60;

        if (hours > 0) {
            return hours + "時間" + mins + "分";
        } else {
            return mins + "分";
        }
    }
}
