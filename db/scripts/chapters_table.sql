CREATE TABLE chapters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    chapter_title VARCHAR(255) NOT NULL,
    order_no INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id)
);