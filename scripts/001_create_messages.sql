-- Create the messages table to replace the FastAPI /api/message endpoint
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'success',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow public read access (no auth required, matching the original FastAPI behavior)
CREATE POLICY "Allow public read access" ON public.messages
  FOR SELECT
  USING (true);

-- Seed an initial message
INSERT INTO public.messages (message, status)
VALUES ('Hello from Supabase! The backend has been migrated successfully.', 'success');
