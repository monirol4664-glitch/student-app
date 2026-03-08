CREATE TABLE students (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT,
 email TEXT UNIQUE,
 program TEXT,
 year INTEGER
);

CREATE TABLE courses (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT,
 code TEXT UNIQUE,
 credits INTEGER
);

CREATE TABLE enrollments (
 student_id INTEGER,
 course_id INTEGER,
 grade TEXT,
 PRIMARY KEY(student_id, course_id)
);