-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Public Profiles (Optional, if needed for extended user metadata)
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text,
  full_name text,
  updated_at timestamp with time zone
);

-- MCP Servers Registry
create table public.mcp_servers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  endpoint_url text not null,
  access_token text, -- Encrypted or secured appropriately in real prod, initially text for hackathon speed if acceptable
  protocol_type text default 'stdio', -- 'stdio' | 'sse' | 'websocket'
  status text default 'offline', -- 'active' | 'offline' | 'error'
  last_ping_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Validation Logs / Audit Trails
create table public.validation_logs (
  id uuid default gen_random_uuid() primary key,
  server_id uuid references public.mcp_servers not null,
  trace_output jsonb, -- Stores the JSON-RPC exchange debug info
  pass_fail_status boolean default false,
  created_at timestamp with time zone default now()
);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.mcp_servers enable row level security;
alter table public.validation_logs enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Policies for MCP Servers
create policy "Users can view their own servers."
  on mcp_servers for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own servers."
  on mcp_servers for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own servers."
  on mcp_servers for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own servers."
  on mcp_servers for delete
  using ( auth.uid() = user_id );

-- Policies for Validation Logs
create policy "Users can view logs for their servers."
  on validation_logs for select
  using ( exists ( select 1 from mcp_servers where id = validation_logs.server_id and user_id = auth.uid() ) );

create policy "Users can insert logs for their servers."
  on validation_logs for insert
  with check ( exists ( select 1 from mcp_servers where id = validation_logs.server_id and user_id = auth.uid() ) );
