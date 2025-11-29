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

INSERT INTO chapter_status
    (user_id, chapter_id, progress_percent, last_studied, created_at, updated_at)
VALUES
    (1, 1, 0, NOW(), NOW(), NOW()),
    (1, 2, 20, NOW(), NOW(), NOW()),
    (1, 3, 40, NOW(), NOW(), NOW()),
    (1, 4, 60, NOW(), NOW(), NOW()),
    (1, 5, 80, NOW(), NOW(), NOW());

INSERT INTO study_logs (user_id, chapter_id, study_date, duration_minutes, notes)
VALUES
(1, 1, '2025-01-10', 30, '基礎内容を軽く復習した'),
(1, 1, '2025-01-11', 45, '問題演習を実施'),
(1, 2, '2025-01-12', 60, '新しい章を読み始めた'),
(1, 2, '2025-01-13', 40, '復習＋まとめノート作成'),
(1, 3, '2025-01-15', 50, '難易度高め、理解に時間がかかった'),
(1, 3, '2025-01-17', 30, '例題を解いて理解を深めた'),
(1, 4, '2025-01-18', 20, '軽く内容確認'),
(1, 5, '2025-01-20', 70, '集中して取り組めた');
