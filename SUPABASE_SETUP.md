# Supabase Setup Instructions

To make this application work, you need to set up a Supabase project and create the necessary tables.

## 1. Create a Supabase Project
Go to [Supabase](https://supabase.com/) and create a new project.

## 2. Get Credentials
In your project settings, find your `Project URL` and `anon public` API key.
Update your `.env.local` file with these values:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Create Database Table
Go to the **SQL Editor** in your Supabase dashboard and run the following SQL query to create the `bookmarks` table and set up security policies:

```sql
-- Create the bookmarks table
create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table bookmarks enable row level security;

-- Create policies
create policy "Users can view their own bookmarks"
  on bookmarks for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own bookmarks"
  on bookmarks for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own bookmarks"
  on bookmarks for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own bookmarks"
  on bookmarks for delete
  using ( auth.uid() = user_id );
```

## 4. Authentication
Ensure `Google` auth provider is enabled in Supabase Authentication settings if you wish to use Google Login, or just use Email/Password if you modify the login page.
