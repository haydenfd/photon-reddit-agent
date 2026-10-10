ALTER TABLE leads ADD COLUMN updated_at TEXT;
ALTER TABLE inbox ADD COLUMN response TEXT;

CREATE TABLE lead_revisions (
  id INTEGER PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id),
  post TEXT NOT NULL CHECK (json_valid(post)),
  result TEXT CHECK (result IS NULL OR json_valid(result)),
  recorded_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  UNIQUE (lead_id, post, result)
);
INSERT INTO lead_revisions (lead_id, post, result) SELECT id, post, result FROM leads;
CREATE UNIQUE INDEX revision_content ON lead_revisions(lead_id, post, IFNULL(result, 'null'));

CREATE TABLE feedback_history (
  id INTEGER PRIMARY KEY,
  lead_id TEXT NOT NULL REFERENCES leads(id),
  verdict TEXT NOT NULL CHECK (verdict IN ('useful', 'dismissed', 'contacted', 'legacy')),
  reason TEXT NOT NULL,
  recorded_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  inbound_event_id TEXT UNIQUE REFERENCES inbox(id)
);
INSERT INTO feedback_history (lead_id, verdict, reason)
  SELECT id, CASE WHEN status IN ('useful', 'dismissed', 'contacted') THEN status ELSE 'legacy' END,
    feedback FROM leads WHERE feedback IS NOT NULL AND feedback != '';

CREATE TABLE report_items (
  report_id TEXT NOT NULL REFERENCES reports(id),
  lead_id TEXT NOT NULL REFERENCES leads(id),
  item_index INTEGER CHECK (item_index BETWEEN 1 AND 5),
  snapshot TEXT NOT NULL CHECK (json_valid(snapshot)),
  PRIMARY KEY (report_id, lead_id),
  UNIQUE (report_id, item_index)
);
CREATE TABLE notification_submissions (
  id INTEGER PRIMARY KEY,
  report_id TEXT NOT NULL REFERENCES reports(id),
  platform TEXT NOT NULL,
  space_id TEXT,
  message_id TEXT NOT NULL,
  submitted_at TEXT NOT NULL,
  UNIQUE (platform, message_id)
);
INSERT OR IGNORE INTO reports (id, body, submitted_at, message_id)
  SELECT COALESCE(report_id, 'legacy:' || message_id), '[Legacy report: item ordering unavailable]',
    submitted_at, message_id FROM leads WHERE message_id IS NOT NULL;
INSERT OR IGNORE INTO report_items (report_id, lead_id, item_index, snapshot)
  SELECT COALESCE(report_id, 'legacy:' || message_id), id, NULL,
    json_object('post', json(post), 'result', json(result)) FROM leads
    WHERE message_id IS NOT NULL OR report_id IN (SELECT id FROM reports);
INSERT OR IGNORE INTO notification_submissions (report_id, platform, space_id, message_id, submitted_at)
  SELECT id, 'imessage', NULL, message_id, COALESCE(submitted_at, created_at)
    FROM reports WHERE message_id IS NOT NULL;
CREATE INDEX feedback_by_lead ON feedback_history(lead_id, id);
CREATE INDEX revisions_by_lead ON lead_revisions(lead_id, id);
CREATE INDEX reports_by_message ON notification_submissions(platform, space_id, message_id);
