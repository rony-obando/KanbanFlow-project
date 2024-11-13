import { createClient } from '@supabase/supabase-js'


const supabase = createClient('https://zbcfvssbvaystlanduzr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiY2Z2c3NidmF5c3RsYW5kdXpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNDY2NjUsImV4cCI6MjA0NjkyMjY2NX0.aJJHEgcSz1SaWLCrIBua49zKxnGP0KZw7EZI1Q0FrZQ')

export default supabase;