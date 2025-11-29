package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "chapter_status")
@Data
public class ChapterStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "chapter_id")
    private Integer chapterId;

    @Column(name = "progress_percent")
    private Integer progressPercent;

    @Column(name = "last_studied")
    private Date lastStudied;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;
}
