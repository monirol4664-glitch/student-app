-- RESET TABLES
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS results;

-- USERS TABLE
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'student',   -- student / admin
  approved INTEGER DEFAULT 0,    -- 0 = pending, 1 = approved
  full_name TEXT,
  email TEXT,
  department TEXT,
  photo TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- RESULTS TABLE
CREATE TABLE results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  subject TEXT NOT NULL,
  marks INTEGER NOT NULL,
  grade TEXT,
  gpa REAL,
  semester TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);