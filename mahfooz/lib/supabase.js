import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pwkpsyfgiracqhsdvrbf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3a3BzeWZnaXJhY3Foc2R2cmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MTQ1ODcsImV4cCI6MjA5MzE5MDU4N30.Th-8bek4uKmM1fE5xsTWlsmJEfJWhgNKm0CFpTb5Kmg'

export const supabase = createClient(supabaseUrl, supabaseKey)