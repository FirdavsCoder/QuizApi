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

CREATE VIEW user_select AS
SELECT u.id, u.login, u.password, u.full_name, u.birthdate, u.role, row_to_json(f) AS file
FROM quizapi.users u
         LEFT JOIN files f ON u.file_id = f.id;


SELECT *
from quizapi.user_select
WHERE id = 2;



CREATE VIEW user_passed_test_findall_view AS
SELECT upt.id,
       jsonb_build_object('id', u.id, 'login', u.login, 'password', u.password, 'full_name', u.full_name,
                          'birthdate', u.birthdate, 'role', u.role, 'file',
                          row_to_json(f.*)) AS users,
       row_to_json(t.*)                     as variants,
       upt.total_questions,
       upt.passed_questions,
       upt.created_at
FROM quizapi.user_passed_tests upt
         INNER JOIN quizapi.users u ON upt.user_id = u.id
         INNER JOIN quizapi.tests t ON upt.test_id = t.id
         INNER JOIN quizapi.files f ON f.id = u.file_id;

SELECT *
FROM user_passed_test_findall_view;


CREATE VIEW variant_findall_view AS
SELECT v.id, v.title, v.description, v.is_correct, row_to_json(q) AS question
FROM variants v
         left join questions q ON q.id = v.question_id;

SELECT *
FROM variant_findall_view;


CREATE VIEW test_findall_view AS
SELECT t.*                                                             AS test,
       (SELECT jsonb_agg(jsonb_build_object('question', row_to_json(q),
                                            'variants',
                                            (SELECT jsonb_agg(v) FROM variants v WHERE v.question_id = q.id)))
        FROM questions q
                 LEFT JOIN test_questions tq ON q.id = tq.question_id) AS questions
FROM tests t;

SELECT *
FROM test_findall_view;


CREATE VIEW question_findall_view AS
SELECT q.*, json_agg(row_to_json(v)) AS variants
FROM questions q
         INNER JOIN variants v ON q.id = v.question_id
group by q.id;

SELECT * FROM question_findall_view;