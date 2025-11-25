INSERT INTO users (user_name, email, password, is_active, created_at, updated_at)
VALUES
('alice', 'alice@example.com', 'password', TRUE, NOW(), NOW()),
('bob', 'bob@example.com', 'password', TRUE, NOW(), NOW());

INSERT INTO books (id, book_name, exam_id) VALUES
(1, '基本情報技術者試験 テキスト', 1),
(2, '応用情報技術者試験 問題集', 1),
(3, 'Java Silver テキスト', 2),
(4, 'AWS ソリューションアーキテクト入門', 3);