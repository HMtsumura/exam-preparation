package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "books")
@Data // getter, setter, toString, hashCode, equals など自動生成
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "book_name")
    private String bookName;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "exam_id")
    private Integer examId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", insertable = false, updatable = false)
    private Exam exam;
}
