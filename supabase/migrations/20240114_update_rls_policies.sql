-- Drop existing policy
drop policy "Users can view their own team" on teams;

-- Create new policy allowing users to view their own team OR admin to view all
create policy "Users can view their own team or admin can view all"
  on teams for select
  using (
    auth.uid() = user_id
    OR
    (select auth.jwt() ->> 'email') = 'admin@example.com' -- REPLACE with actual admin email
  );
