-- Create the tables in your Supabase project
-- Copy and paste this SQL into the SQL Editor in Supabase

-- Table for users
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  points INTEGER DEFAULT 0,
  avatar TEXT
);

-- Table for todos
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  size TEXT CHECK (size IN ('small', 'medium', 'large'))
);

-- Add initial users
INSERT INTO users (id, name, points, avatar) VALUES
  ('user1', 'User 1', 0, '/assets/User_1.jpg'),
  ('user2', 'User 2', 0, '/assets/User_2.jpg'),
  ('user3', 'User 3', 0, '/assets/User_3.jpg');

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for this demo)
-- In a production app, you would add proper authentication
CREATE POLICY "Allow public access to users" ON users
  FOR ALL USING (true);

CREATE POLICY "Allow public access to todos" ON todos
  FOR ALL USING (true); 