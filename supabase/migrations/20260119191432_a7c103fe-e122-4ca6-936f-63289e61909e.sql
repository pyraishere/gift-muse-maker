-- Create a table to track generated gift ideas count
CREATE TABLE public.gift_generation_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  total_generated INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial row with starting count
INSERT INTO public.gift_generation_stats (id, total_generated) 
VALUES ('00000000-0000-0000-0000-000000000001', 0);

-- Enable RLS but allow public read access
ALTER TABLE public.gift_generation_stats ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the stats (public counter)
CREATE POLICY "Anyone can view gift stats" 
ON public.gift_generation_stats 
FOR SELECT 
USING (true);

-- Create a function to increment the counter (will be called from edge function)
CREATE OR REPLACE FUNCTION public.increment_gift_count(count_to_add INTEGER DEFAULT 6)
RETURNS INTEGER AS $$
DECLARE
  new_total INTEGER;
BEGIN
  UPDATE public.gift_generation_stats 
  SET total_generated = total_generated + count_to_add,
      updated_at = now()
  WHERE id = '00000000-0000-0000-0000-000000000001'
  RETURNING total_generated INTO new_total;
  
  RETURN new_total;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;