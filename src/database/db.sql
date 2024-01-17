CREATE TYPE role_user AS ENUM ('user', 'admin');
CREATE SCHEMA quizapi;



CREATE TABLE IF NOT EXISTS quizapi.users
(
    id        SERIAL PRIMARY KEY,
    login     VARCHAR(250) NOT NULL,
    password  TEXT         NOT NULL,
    full_name VARCHAR(250) NOT NULL,
    birthdate DATE         NOT NULL,
    role      role_user    NOT NULL
);

CREATE TABLE IF NOT EXISTS quizapi.files
(
    id            SERIAL PRIMARY KEY,
    original_name VARCHAR(300) NOT NULL,
    path          VARCHAR(350) NOT NULL,
    size          INT          NOT NULL,
    mime_type     VARCHAR(251) NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE quizapi.users
    ADD COLUMN file_id INT default null;
ALTER TABLE quizapi.users
    ADD CONSTRAINT fk_file_id FOREIGN KEY (file_id) REFERENCES quizapi.files (id);

CREATE TABLE IF NOT EXISTS quizapi.user_files
(
    if         SERIAL PRIMARY KEY,
    user_id    INT NOT NULL UNIQUE,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES quizapi.users (id),
    file_id    INT NOT NULL UNIQUE,
    CONSTRAINT fk_file_id FOREIGN KEY (file_id) REFERENCES quizapi.files (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quizapi.tests
(
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(250) NOT NULL,
    description TEXT      DEFAULT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quizapi.questions
(
    id         SERIAL PRIMARY KEY,
    title      VARCHAR(250) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quizapi.test_questions
(
    id          SERIAL PRIMARY KEY,
    test_id     INT NOT NULL,
    CONSTRAINT fk_test_id FOREIGN KEY (test_id) REFERENCES tests (id),
    question_id INT NOT NULL,
    CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES quizapi.questions (id),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quizapi.variants
(
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(250) NOT NULL,
    description TEXT         NOT NULL,
    question_id INT          NOT NULL,
    CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES quizapi.questions (id),
    is_correct  BOOLEAN   DEFAULT false,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quizapi.user_passed_tests
(
    id               SERIAL PRIMARY KEY,
    user_id          INT NOT NULL,
    test_id          INT NOT NULL,
    total_questions  INT NOT NULL,
    passed_questions INT NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES quizapi.users (id),
    CONSTRAINT fk_test_id FOREIGN KEY (test_id) REFERENCES quizapi.tests (id)
);



