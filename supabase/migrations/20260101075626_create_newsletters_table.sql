create table newsletters (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null unique,
  newsletter boolean default true,
  project text,
  nature text not null default 'newsletter',
  created_at timestamptz default now()
);

alter table newsletters enable row level security;