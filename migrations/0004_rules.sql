CREATE TABLE rules (
  name TEXT PRIMARY KEY CHECK (name IN ('grading', 'style')),
  body TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
INSERT INTO rules (name, body) VALUES ('grading', '- Interns, new grads, entry-level and junior engineers are the top priority.
- Mid-level and senior roles (SDE2, senior, staff, "non new grad") are not the target audience: score them 2 or lower, even when the interview is soon.');
INSERT INTO rules (name, body) VALUES ('style', 'Messages the owner sent:
> [removed]');
