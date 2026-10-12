CREATE TABLE rules (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  body TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
INSERT INTO rules (id, body) VALUES (1, '- Interns, new grads, entry-level and junior engineers are the top priority.
- Mid-level and senior roles (SDE2, senior, staff, "non new grad") are not the target audience: score them 2 or lower, even when the interview is soon.');
