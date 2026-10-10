CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  post TEXT NOT NULL CHECK (json_valid(post)),
  result TEXT CHECK (result IS NULL OR json_valid(result)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'useful', 'dismissed', 'contacted')),
  feedback TEXT,
  report_id TEXT,
  submitted_at TEXT,
  message_id TEXT
);
CREATE INDEX leads_ungraded ON leads(created_at) WHERE result IS NULL;
CREATE INDEX leads_unreported ON leads(created_at) WHERE report_id IS NULL AND submitted_at IS NULL;

CREATE TABLE reports (
  id TEXT PRIMARY KEY,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  submitted_at TEXT,
  message_id TEXT
);
CREATE INDEX reports_pending ON reports(created_at) WHERE submitted_at IS NULL;

CREATE TABLE inbox (
  id TEXT PRIMARY KEY,
  payload TEXT NOT NULL CHECK (json_valid(payload)),
  received_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE TABLE runs (
  id TEXT PRIMARY KEY,
  started_at TEXT NOT NULL,
  finished_at TEXT,
  status TEXT NOT NULL,
  summary TEXT
);
CREATE TABLE run_lock (id INTEGER PRIMARY KEY CHECK (id = 1), token TEXT NOT NULL, expires_at INTEGER NOT NULL);
