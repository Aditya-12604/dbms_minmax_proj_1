-- 1. Departments (Lookup Table)
-- Drop tables if they exist (drop children first)
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS papers;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE -- e.g., 'CS', 'PHY'
);

-- 2. Roles (Lookup Table)
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'Student', 'Professor', 'Admin'
    can_peer_review BOOLEAN DEFAULT FALSE,
    is_professor BOOLEAN DEFAULT FALSE
);

-- 3. Profiles (The User Table)
-- Note: In Supabase, 'id' usually links to auth.users, but for local we use UUID
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT, -- The 500 char description
    dept_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
    role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Papers
CREATE TABLE papers (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    abstract TEXT,
    content_url TEXT, -- Path to PDF/MD file
    file_type VARCHAR(10) CHECK (file_type IN ('pdf', 'md', 'txt')),
    raw_content TEXT, -- If it's MD/TXT, store text here for searching
    author_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    dept_id INTEGER REFERENCES departments(id), -- Helps with filtering/feed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Votes (Upvote/Downvote)
CREATE TABLE votes (
    user_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    paper_id INTEGER REFERENCES papers(id) ON DELETE CASCADE,
    vote_value INTEGER CHECK (vote_value IN (-1, 1)),
    PRIMARY KEY (user_id, paper_id) -- Ensures 1 vote per paper per user
);

-- 6. Comments
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    paper_id INTEGER REFERENCES papers(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Professor Reviews (The Special Rating)
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    paper_id INTEGER REFERENCES papers(id) ON DELETE CASCADE,
    reviewer_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_review UNIQUE(paper_id, reviewer_id)
);