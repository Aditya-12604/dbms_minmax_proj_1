-- A. Departments
INSERT INTO departments (name, code) VALUES 
('Computer Science', 'CS'),
('Theoretical Physics', 'PHY'),
('Modern Literature', 'LIT'),
('Mathematics', 'MATH');

-- B. Roles
INSERT INTO roles (name, can_peer_review, is_professor) VALUES 
('Student', FALSE, FALSE),
('Certified Professor', TRUE, TRUE),
('Teaching Assistant', TRUE, FALSE),
('Admin', TRUE, TRUE);

-- C. Users (Using CTEs to capture IDs dynamically)
-- C. Users
INSERT INTO profiles (email, full_name, bio, dept_id, role_id) VALUES
    ('alex@uni.edu', 'Alex Student', 'CS undergrad interested in AI and ML.', 1, 1),
    ('dr.stone@uni.edu', 'Dr. Stone', 'Senior Researcher in Quantum Mechanics.', 2, 2),
    ('ta.jones@uni.edu', 'Jamie Jones', 'TA for CS101.', 1, 3)
;

-- D. Papers
INSERT INTO papers (title, abstract, file_type, raw_content, author_id, dept_id)
VALUES
    (
        'Quantum Entanglement in React State',
        'A playful cross-disciplinary paper exploring entanglement analogies in state management.',
        'md',
        '# Intro\nReact state can feel entangled across components...',
        (SELECT id FROM profiles WHERE email = 'dr.stone@uni.edu'),
        (SELECT id FROM departments WHERE code = 'PHY')
    ),
    (
        'Why CSS Grid is Superior',
        'Comparing Grid to Flexbox for complex 2D layouts.',
        'txt',
        'Grid allows true 2D layouting...',
        (SELECT id FROM profiles WHERE email = 'alex@uni.edu'),
        (SELECT id FROM departments WHERE code = 'CS')
    )
;

-- E. Comments
INSERT INTO comments (content, user_id, paper_id)
VALUES
    ('Great insights — loved the analogies to reactive programming.', (SELECT id FROM profiles WHERE email = 'alex@uni.edu'), (SELECT id FROM papers WHERE title = 'Quantum Entanglement in React State')),
    ('Can you open-source the experiment code?', (SELECT id FROM profiles WHERE email = 'ta.jones@uni.edu'), (SELECT id FROM papers WHERE title = 'Quantum Entanglement in React State'))
;

-- F. Votes
INSERT INTO votes (user_id, paper_id, vote_value)
VALUES
    ((SELECT id FROM profiles WHERE email = 'alex@uni.edu'), (SELECT id FROM papers WHERE title = 'Quantum Entanglement in React State'), 1),
    ((SELECT id FROM profiles WHERE email = 'ta.jones@uni.edu'), (SELECT id FROM papers WHERE title = 'Quantum Entanglement in React State'), 1),
    ((SELECT id FROM profiles WHERE email = 'dr.stone@uni.edu'), (SELECT id FROM papers WHERE title = 'Why CSS Grid is Superior'), 1)
;