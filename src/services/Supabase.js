
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://vhpqrploghtetniapeht.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocHFycGxvZ2h0ZXRuaWFwZWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwODAyNjEsImV4cCI6MjAyMzY1NjI2MX0.wP3JRLrsENS27gBryALaZpyXY789iJklj9gD4sa3Hng'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase