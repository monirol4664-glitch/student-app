CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  enrollment_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  instructor TEXT
);

INSERT INTO students (name, email, enrollment_date) VALUES 
('John Doe', 'john@example.com', '2026-01-01') ON CONFLICT DO NOTHING;
