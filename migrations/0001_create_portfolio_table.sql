-- Create portfolio settings table
CREATE TABLE IF NOT EXISTS portfolio_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT,  -- JSON array
    image_data TEXT,  -- RFC 2397 data URL
    link TEXT,
    featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (username: admin, password: admin123)
-- Change this immediately after first login!
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2b$10$YourHashedPasswordHere');

-- Insert default portfolio settings
INSERT INTO portfolio_settings (key, value) VALUES 
    ('hero_title', 'Hi, I''m [Your Name]'),
    ('hero_subtitle', 'Full-Stack Developer & Creative Technologist'),
    ('hero_description', 'I build exceptional digital experiences that combine beautiful design with powerful functionality.'),
    ('about_text', 'I''m a passionate developer with years of experience building web applications.'),
    ('profile_image', ''),
    ('contact_email', 'your.email@example.com'),
    ('github_url', 'https://github.com/yourusername'),
    ('linkedin_url', 'https://linkedin.com/in/yourusername'),
    ('twitter_url', 'https://twitter.com/yourusername');