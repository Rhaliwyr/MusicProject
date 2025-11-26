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
