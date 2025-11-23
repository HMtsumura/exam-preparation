CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_name VARCHAR(255) NOT NULL,
    exam_id INT NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES exams(id)
);
