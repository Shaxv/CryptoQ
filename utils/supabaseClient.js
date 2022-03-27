import { createClient } from '@supabase/supabase-js'
    
const SUPABASE_URL = "https://mbslofwmpndqlwauavpf.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ic2xvZndtcG5kcWx3YXVhdnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc3NzI4MTQsImV4cCI6MTk2MzM0ODgxNH0.4ZzkAcb0V9GoBYGYRw1coWiyOPQwtoHTI1k4iEIS5Ss"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default supabase