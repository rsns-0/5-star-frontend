SELECT
  r.created_at,
  r.user_id,
  r.channel_id,
  r.reminder_message,
  r.webhook_id,
  r.id,
  r."time"
FROM
  reminders r
WHERE
  (r."time" > NOW());