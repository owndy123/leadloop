-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase Auth)
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  plan TEXT DEFAULT 'starter',
  total_enrichments INTEGER DEFAULT 0
);

-- Enrichment usage tracking
CREATE TABLE public.enrichment_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  score INTEGER,
  freshness_timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrichment_logs ENABLE ROW LEVEL SECURITY;

-- Policies: users can only see their own data
CREATE POLICY "Users can see own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON public.users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can see own logs" ON public.enrichment_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs" ON public.enrichment_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to record enrichment
CREATE OR REPLACE FUNCTION public.record_enrichment(
  p_email TEXT,
  p_success BOOLEAN,
  p_score INTEGER DEFAULT NULL
) RETURNS void AS $$
BEGIN
  INSERT INTO public.enrichment_logs (user_id, email, success, score)
  VALUES (auth.uid(), p_email, p_success, p_score);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
