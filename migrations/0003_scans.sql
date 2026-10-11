ALTER TABLE reports ADD COLUMN scan_key TEXT;
CREATE UNIQUE INDEX reports_scan_key ON reports(scan_key) WHERE scan_key IS NOT NULL;
CREATE TABLE scan_state (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  next_index INTEGER NOT NULL DEFAULT 0,
  not_before INTEGER NOT NULL DEFAULT 0
);
INSERT INTO scan_state (id) VALUES (1);
