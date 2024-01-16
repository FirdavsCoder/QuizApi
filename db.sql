-- role_user type ni yaratib olamiz o'zimiz uchun
CREATE TYPE role_user AS ENUM ('user', 'admin');

-- users table ni yaratib olamiz
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(250) NOT NULL ,
    password TEXT NOT NULL ,
    full_name VARCHAR(250) NOT NULL ,
    birthdate DATE NOT NULL,
    role role_user NOT NULL
);

-- files tableni yaratib olamiz
CREATE TABLE IF NOT EXISTS files(
    id SERIAL PRIMARY KEY,
    original_name VARCHAR(300) NOT NULL ,
    path VARCHAR(350) NOT NULL ,
    size INT NOT NULL ,
    mime_type VARCHAR(251) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- DROP TABLE users CASCADE ;
-- DROP TABLE user_files;
-- DROP TABLE files;


ALTER TABLE users
    ADD COLUMN file_id INT default null;
ALTER TABLE users
    ADD CONSTRAINT fk_file_id FOREIGN KEY (file_id) REFERENCES files(id);




-- user files tableni yaratib FOREIGN KEY qilamiz
CREATE TABLE IF NOT EXISTS user_files(
    if SERIAL PRIMARY KEY ,
    user_id INT NOT NULL UNIQUE ,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    file_id INT NOT NULL UNIQUE ,
    CONSTRAINT fk_file_id FOREIGN KEY (file_id) REFERENCES files(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- TESTS tableni yaratib olamiz
CREATE TABLE IF NOT EXISTS tests(
    id SERIAL PRIMARY KEY ,
    title VARCHAR(250) NOT NULL ,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Question table ni yaratib olamiz
CREATE TABLE IF NOT EXISTS questions(
    id SERIAL PRIMARY KEY ,
    title VARCHAR(250) NOT NULL ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- test questions table ni yaratib olamiz
CREATE TABLE IF NOT EXISTS test_questions(
    id SERIAL PRIMARY KEY,
    test_id INT NOT NULL ,
    CONSTRAINT fk_test_id FOREIGN KEY (test_id) REFERENCES tests(id),
    question_id INT NOT NULL ,
    CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES questions(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Variantlar tablesini yaratib olamiz
CREATE TABLE IF NOT EXISTS variants(
    id SERIAL PRIMARY KEY ,
    title VARCHAR(250) NOT NULL ,
    description TEXT NOT NULL ,
    question_id INT NOT NULL ,
    CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES questions(id),
    is_correct BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User yechgan testlar table ni yaratib olamiz
CREATE TABLE IF NOT EXISTS user_passed_tests(
    id SERIAL PRIMARY KEY ,
    user_id INT NOT NULL ,
    test_id INT NOT NULL ,
    total_questions INT NOT NULL ,
    passed_questions INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_test_id FOREIGN KEY (test_id) REFERENCES tests(id)
);



SELECT q.title AS question, row_to_json(t.*) AS test,row_to_json(v.*) as variant
FROM questions q INNER JOIN test_questions tq ON q.id = tq.question_id INNER JOIN tests t ON tq.test_id = t.id INNER JOIN variants v ON q.id = v.question_id;


SELECT t.title AS test, jsonb_build_object('id', q.id, 'title', q.title, 'variants', (SELECT jsonb_agg(v) FROM variants v WHERE v.question_id = q.id)) AS question
FROM tests t INNER JOIN test_questions tq ON t.id = tq.test_id INNER JOIN questions q ON tq.question_id = q.id;

-- TESTS uchun hammasini belgilab olish
SELECT t.title AS test, jsonb_build_object('questions', (SELECT jsonb_agg(jsonb_build_object('question', row_to_json(q), 'variants', (SELECT jsonb_agg(v) FROM variants v WHERE v.question_id = q.id))) FROM questions q INNER JOIN test_questions tq ON q.id = tq.question_id)) AS question
FROM tests t;


SELECT v.id, v.title, v.description, v.is_correct, row_to_json(q) AS question
FROM variants v  left join  questions q ON q.id = v.question_id  WHERE v.id = 2;


SELECT * FROM user_passed_tests;

INSERT INTO user_passed_tests(user_id, test_id, total_questions, passed_questions)
VALUES (3, 5, 20, 12);


SELECT upt.id, jsonb_build_object('id', u.id, 'login', u.login, 'password', u.password, 'full_name', u.full_name, 'birthdate', u.birthdate, 'role', u.role, 'file', row_to_json(f.*)) AS users,row_to_json(t.*) as variants, upt.total_questions, upt.passed_questions, upt.created_at
FROM user_passed_tests upt INNER JOIN users u ON upt.user_id = u.id INNER JOIN tests t ON upt.test_id = t.id INNER JOIN files f ON f.id = u.file_id;



SELECT
    upt.id,
    jsonb_build_object(
            'id', u.id,
            'login', u.login,
            'password', u.password,
            'full_name', u.full_name,
            'birthdate', u.birthdate,
            'role', u.role,
            'file', row_to_json(f.*)) AS users,
    row_to_json(t.*) as variants,
    upt.total_questions,
    upt.passed_questions,
    upt.created_at
FROM user_passed_tests upt
    INNER JOIN users u ON upt.user_id = u.id
    INNER JOIN tests t ON upt.test_id = t.id
    INNER JOIN files f ON f.id = u.file_id WHERE upt.id = 1;



INSERT INTO user_passed_tests(user_id, test_id, total_questions, passed_questions)
VALUES (1, 1, 12, 12);

SELECT * FROM user_passed_tests;

DELETE FROM user_passed_tests WHERE id = 4;