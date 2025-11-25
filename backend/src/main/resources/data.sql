INSERT INTO users (user_name, email, password, is_active, created_at, updated_at)
VALUES
('alice', 'alice@example.com', 'password', TRUE, NOW(), NOW()),
('bob', 'bob@example.com', 'password', TRUE, NOW(), NOW());

INSERT INTO books (id, book_name, exam_id) VALUES
(1, '基本情報技術者試験 テキスト', 1),
(2, '応用情報技術者試験 問題集', 1),
(3, 'Java Silver テキスト', 2),
(4, 'AWS ソリューションアーキテクト入門', 3);

INSERT INTO chapters (book_id, chapter_title, order_no)
VALUES
-- Book 1
(1, '第1章: プログラミングの基礎', 1),
(1, '第2章: 変数とデータ型', 2),
(1, '第3章: 制御構文', 3),

-- Book 2
(2, 'Chapter 1: Introduction to Databases', 1),
(2, 'Chapter 2: SQL Basics', 2),
(2, 'Chapter 3: Advanced Queries', 3),

-- Book 3
(3, 'Part 1: Getting Started', 1),
(3, 'Part 2: Component Design', 2),
(3, 'Part 3: State Management', 3);
