-- Active: 1748140440345@@127.0.0.1@3306@mysql
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age INT,
    grade VARCHAR(10)
);

INSERT INTO students (name, age, grade) VALUES ('Alice', 20, 'A');
INSERT INTO students (name, age, grade) VALUES ('Bob', 22, 'B');
INSERT INTO students (name, age, grade) VALUES ('Charlie', 21, 'A-');
