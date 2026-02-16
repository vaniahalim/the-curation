
-- Drop overly permissive policies
DROP POLICY "Service role can insert daily briefings" ON public.daily_briefings;
DROP POLICY "Service role can insert ai updates" ON public.ai_updates;
DROP POLICY "Service role can delete daily briefings" ON public.daily_briefings;
DROP POLICY "Service role can delete ai updates" ON public.ai_updates;

-- No INSERT/DELETE/UPDATE policies for anon/authenticated roles
-- Edge functions use the service_role key which bypasses RLS entirely
-- This means only the service role can write, and public can only read
