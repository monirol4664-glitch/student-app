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
    tech_stack TEXT,
    image_data TEXT,
    link TEXT,
    featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default portfolio settings
INSERT OR IGNORE INTO portfolio_settings (key, value) VALUES 
    ('hero_title', "Hi, I'm Your Name"),
    ('hero_subtitle', 'Full-Stack Developer & Creative Technologist'),
    ('hero_description', 'I build exceptional digital experiences that combine beautiful design with powerful functionality.'),
    ('about_text', "I'm a passionate developer with years of experience building web applications. I love creating digital experiences that make a difference."),
    ('profile_image', ''),
    ('contact_email', 'your.email@example.com'),
    ('github_url', 'https://github.com/yourusername'),
    ('linkedin_url', 'https://linkedin.com/in/yourusername'),
    ('twitter_url', 'https://twitter.com/yourusername');

-- Note: You need to insert admin user with proper bcrypt hash
-- Run this command to generate hash: node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"
-- Then insert with the generated hash
INSERT OR IGNORE INTO admin_users (username, password_hash) 
VALUES ('admin', '$2b$10$YourGeneratedHashHere');