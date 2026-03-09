CREATE TABLE IF NOT EXISTS faculty (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    bio TEXT,
    research_interests TEXT,
    photo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    department TEXT NOT NULL,
    credits INTEGER,
    instructor_id INTEGER,
    schedule TEXT,
    semester TEXT,
    year INTEGER,
    FOREIGN KEY (instructor_id) REFERENCES faculty(id)
);


CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT,
    published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category TEXT,
    featured BOOLEAN DEFAULT 0
);


CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    organizer TEXT
);


CREATE INDEX IF NOT EXISTS idx_faculty_department ON faculty(department);
CREATE INDEX IF NOT EXISTS idx_faculty_email ON faculty(email);
CREATE INDEX IF NOT EXISTS idx_faculty_name ON faculty(name);

CREATE INDEX IF NOT EXISTS idx_courses_department ON courses(department);
CREATE INDEX IF NOT EXISTS idx_courses_code ON courses(course_code);
CREATE INDEX IF NOT EXISTS idx_courses_instructor ON courses(instructor_id);

CREATE INDEX IF NOT EXISTS idx_news_published ON news(published_date);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(featured);

CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);

-- Insert sample data
INSERT OR IGNORE INTO faculty (id, name, title, department, email, bio) VALUES
(1, 'Dr. Sarah Johnson', 'Professor', 'Computer Science', 's.johnson@university.edu', 'AI and Machine Learning expert'),
(2, 'Dr. Michael Chen', 'Associate Professor', 'Mathematics', 'm.chen@university.edu', 'Number theory researcher'),
(3, 'Dr. Emily Rodriguez', 'Assistant Professor', 'Physics', 'e.rodriguez@university.edu', 'Quantum physics specialist');

INSERT OR IGNORE INTO courses (course_code, title, description, department, credits, instructor_id) VALUES
('CS101', 'Introduction to Programming', 'Learn basics of programming', 'Computer Science', 3, 1),
('MATH201', 'Calculus III', 'Advanced calculus concepts', 'Mathematics', 4, 2),
('PHYS101', 'General Physics', 'Introduction to physics', 'Physics', 3, 3);

INSERT OR IGNORE INTO news (title, content, author, category, featured) VALUES
('New Research Grant Awarded', 'University receives $5M for AI research', 'Dr. Sarah Johnson', 'Research', 1),
('Spring Registration Open', 'Register for spring semester now', 'Registrar Office', 'Academic', 1);

INSERT OR IGNORE INTO events (title, description, location, start_date, organizer) VALUES
('Guest Lecture: Future of AI', 'Industry expert discusses AI trends', 'Science Hall 101', datetime('now', '+7 days'), 'CS Department'),
('Career Fair 2024', 'Meet top employers', 'Student Union', datetime('now', '+14 days'), 'Career Services');


PRAGMA optimize;