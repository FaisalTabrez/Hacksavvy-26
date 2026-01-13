-- Create teams table
create table if not exists teams (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  track text not null,
  size int not null,
  upi_reference text not null,
  payment_screenshot_url text not null,
  user_id uuid references auth.users(id)
);

-- Create members table
create table if not exists members (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  team_id uuid references teams(id) on delete cascade not null,
  name text not null,
  email text not null,
  phone text not null,
  college text not null,
  roll_no text,
  branch text,
  accommodation boolean default false,
  food_preference text not null,
  is_leader boolean default false
);

-- Set up RLS (Row Level Security)
alter table teams enable row level security;
alter table members enable row level security;

-- Allow authenticated users to insert their own team
create policy "Users can insert their own team"
  on teams for insert
  with check (auth.uid() = user_id);

-- Allow authenticated users to view their own team
create policy "Users can view their own team"
  on teams for select
  using (auth.uid() = user_id);

-- Allow authenticated users to insert members for their team
create policy "Users can insert members for their team"
  on members for insert
  with check (
    exists (
      select 1 from teams
      where teams.id = members.team_id
      and teams.user_id = auth.uid()
    )
  );

-- Allow authenticated users to view members of their team
create policy "Users can view members of their team"
  on members for select
  using (
    exists (
      select 1 from teams
      where teams.id = members.team_id
      and teams.user_id = auth.uid()
    )
  );

-- Create storage bucket for payments if it doesn't exist
insert into storage.buckets (id, name, public)
values ('payments', 'payments', false)
on conflict (id) do nothing;

-- Policy for uploading payment screenshots
create policy "Authenticated users can upload payment screenshots"
  on storage.objects for insert
  with check (
    bucket_id = 'payments' AND
    auth.role() = 'authenticated'
  );
