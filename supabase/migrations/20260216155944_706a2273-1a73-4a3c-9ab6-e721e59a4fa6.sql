
-- Daily briefings table
CREATE TABLE public.daily_briefings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pillar TEXT NOT NULL,
  pillar_label TEXT NOT NULL,
  headline TEXT NOT NULL,
  briefing TEXT NOT NULL,
  sources JSONB NOT NULL DEFAULT '[]',
  question TEXT NOT NULL,
  reflection TEXT NOT NULL,
  briefing_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- AI updates table
CREATE TABLE public.ai_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('model', 'tool', 'tutorial', 'analysis')),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  sources JSONB NOT NULL DEFAULT '[]',
  tags TEXT[] NOT NULL DEFAULT '{}',
  tutorial_content JSONB,
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_daily_briefings_date ON public.daily_briefings (briefing_date DESC);
CREATE INDEX idx_ai_updates_date ON public.ai_updates (published_date DESC);

-- Enable RLS (public read, no public write)
ALTER TABLE public.daily_briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read daily briefings"
  ON public.daily_briefings FOR SELECT USING (true);

CREATE POLICY "Public can read ai updates"
  ON public.ai_updates FOR SELECT USING (true);

-- Service role insert (for edge functions)
CREATE POLICY "Service role can insert daily briefings"
  ON public.daily_briefings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can insert ai updates"
  ON public.ai_updates FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can delete daily briefings"
  ON public.daily_briefings FOR DELETE
  USING (true);

CREATE POLICY "Service role can delete ai updates"
  ON public.ai_updates FOR DELETE
  USING (true);
