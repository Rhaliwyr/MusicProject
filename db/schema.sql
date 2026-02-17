-- Create artists table
create table public.artists (
  id uuid not null primary key,
  name text not null
);

-- Create songs table
create table public.songs (
  id text not null primary key,
  artist_id uuid references public.artists(id),
  title text not null,
  lyrics text[] null,
  lyrics_fr text[] null,
  lyrics_synonym text[] null,
  title_emoji text[] null
);

-- Enable Row Level Security (RLS)
alter table public.artists enable row level security;
alter table public.songs enable row level security;

-- Create policies to allow public read access
create policy "Allow public read access" on public.artists for select using (true);
create policy "Allow public read access" on public.songs for select using (true);

-- Create vs_sessions table
create table public.vs_sessions (
  id text not null primary key,
  song_ids text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create vs_scores table
create table public.vs_scores (
  id uuid not null default gen_random_uuid() primary key,
  session_id text references public.vs_sessions(id),
  player_name text not null,
  score int not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.vs_sessions enable row level security;
alter table public.vs_scores enable row level security;

-- Policies for VS Mode (Public for now as requested)
create policy "Allow public insert" on public.vs_sessions for insert with check (true);
create policy "Allow public select" on public.vs_sessions for select using (true);

create policy "Allow public insert" on public.vs_scores for insert with check (true);
create policy "Allow public select" on public.vs_scores for select using (true);
