-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) DEFAULT '/noavatar.png',
    isAdmin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    username VARCHAR(255),
    image VARCHAR(255),
    created DATE DEFAULT CURRENT_DATE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_posts_userId ON posts(userId);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created);

-- Insert sample users (passwords are hashed for '123')
INSERT INTO users (username, email, password, avatar, isAdmin) VALUES
('test', 'test@123.com', '$2b$10$iuYn3hkM7e2RbyjnV/A4oO6MOa8XLIeMIzYhtUPxaY2Z5wD0icezK', '/noavatar.png', FALSE),
('admin', 'admin@example.com', '$2b$10$iuYn3hkM7e2RbyjnV/A4oO6MOa8XLIeMIzYhtUPxaY2Z5wD0icezK', '/noavatar.png', TRUE),
('yuqiao1205', 'loranpy1226@gmail.com', '$2b$10$iuYn3hkM7e2RbyjnV/A4oO6MOa8XLIeMIzYhtUPxaY2Z5wD0icezK', '/noavatar.png', FALSE)
ON CONFLICT (email) DO NOTHING;

-- Insert sample posts
INSERT INTO posts (title, body, userId, username, image, created) VALUES
('Exploring AI world with you111', 'Welcome Exploring AI world with you.', 1, 'Lauren Peng', 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg', '2024-06-10'),
('A robot''s day at the beach', 'Relaxing at the sunny beach.', 2, 'John Doe', 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg', '2024-06-12'),
('City Lights and Nights', 'The city that never sleeps.', 3, 'Jane Smith', 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg', '2024-06-14'),
('Adventures in the Desert', 'Surviving the harsh desert.', 4, 'Alice Johnson', 'https://images.pexels.com/photos/8294659/pexels-photo-8294659.jpeg', '2024-06-16'),
('Forest Trails', 'Hiking through the dense forest.', 1, 'Lauren Peng', 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg', '2025-05-18'),
('Robot world', 'Eploring robot', 2, 'Admin', 'https://images.pexels.com/photos/8849289/pexels-photo-8849289.jpeg', '2025-11-13')
ON CONFLICT DO NOTHING;