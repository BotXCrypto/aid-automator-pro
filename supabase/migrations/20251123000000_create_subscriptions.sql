-- Create subscriptions table for newsletter signups
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (subscribe) but only admins can select
CREATE POLICY "Anyone can insert subscription"
ON public.subscriptions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view subscriptions"
ON public.subscriptions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete subscriptions"
ON public.subscriptions
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));
