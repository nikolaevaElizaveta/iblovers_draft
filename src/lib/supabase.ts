import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cetbesttkckliqqvwmvn.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNldGJlc3R0a2NrbGlxcXZ3bXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkyNTc5ODUsImV4cCI6MjAwNDgzMzk4NX0.ymrwSf7Et9KOhCg1J5lqtrEmv53axfrXXuccG-div1U';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
