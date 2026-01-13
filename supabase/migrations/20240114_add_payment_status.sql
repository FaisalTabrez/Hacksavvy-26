-- Add payment_status column to teams table
alter table teams 
add column if not exists payment_status text default 'pending' not null;

-- Add check constraint for payment_status values
alter table teams
add constraint payment_status_check 
check (payment_status in ('pending', 'verified', 'rejected'));
