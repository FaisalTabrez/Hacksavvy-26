-- Add checked_in column to members table
ALTER TABLE members ADD COLUMN checked_in BOOLEAN DEFAULT FALSE;
