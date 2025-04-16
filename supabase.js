// חיבור ל-Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const supabase = createClient(
  'https://fannhshmrvgwhqgnzgsp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbm5oc2htcnZnd2hxZ256Z3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMTczMTgsImV4cCI6MjA1NjU5MzMxOH0.duVlDi7OpY6ZhQ5FLfj76gNi5MTc8Y9sZDK895lf5-Q'
);
