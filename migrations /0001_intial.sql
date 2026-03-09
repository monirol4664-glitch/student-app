-- Create faculty table
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

-- Create courses table
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

-- Create news table
CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT,
    published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category TEXT,
    featured BOOLEAN DEFAULT 0
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    organizer TEXT
);

-- Insert sample faculty data
INSERT INTO faculty (name, title, department, email, bio) VALUES
('Dr. Sarah Johnson', 'Professor', 'Computer Science', 's.johnson@university.edu', 'AI and Machine Learning expert'),
('Dr. Michael Chen', 'Associate Professor', 'Mathematics', 'm.chen@university.edu', 'Number theory researcher'),
('Dr. Emily Rodriguez', 'Assistant Professor', 'Physics', 'e.rodriguez@university.edu', 'Quantum physics specialist');

-- Insert sample courses
INSERT INTO courses (course_code, title, description, department, credits, instructor_id) VALUES
('CS101', 'Introduction to Programming', 'Learn basics of programming', 'Computer Science', 3, 1),
('MATH201', 'Calculus III', 'Advanced calculus concepts', 'Mathematics', 4, 2),
('PHYS101', 'General Physics', 'Introduction to physics', 'Physics', 3, 3);

-- Insert sample news
INSERT INTO news (title, content, author, category, featured) VALUES
('New Research Grant Awarded', 'University receives $5M for AI research', 'Dr. Sarah Johnson', 'Research', 1),
('Spring Registration Open', 'Register for spring semester now', 'Registrar Office', 'Academic', 1);