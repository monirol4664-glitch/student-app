-- db/schema.sql

-- Table for storing site content managed by the (future) admin page.
CREATE TABLE site_content (
    id INTEGER PRIMARY KEY,
    content_key TEXT NOT NULL UNIQUE, -- e.g., 'hero_title', 'project_1_description'
    content_text TEXT,
    content_image_data_url TEXT -- Stores the image as a base64 data URL (rfc2397)
);

-- Table for simple user/API credentials (Simplified for initial setup)
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL -- In a real app, this would be a secure hash
);

-- Initial data insertion (Example content)
INSERT INTO users (username, password_hash) VALUES ('admin', 'placeholder_hash');

INSERT INTO site_content (content_key, content_text, content_image_data_url) VALUES
('hero_title', 'Hello! I am a Developer showcasing my work.', NULL),
('project_1_name', 'Project Alpha', NULL),
('project_1_description', 'A cutting-edge application built with XYZ.', 'data:image/png;base64,...EXAMPLE_BASE64_STRING_FOR_PROJECT_1...'),
('project_2_name', 'Project Beta', NULL),
('project_2_description', 'A robust backend service using Workers.', NULL);