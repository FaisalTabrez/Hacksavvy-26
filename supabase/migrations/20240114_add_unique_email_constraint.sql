-- Add unique constraint to members email
ALTER TABLE members ADD CONSTRAINT members_email_key UNIQUE (email);
