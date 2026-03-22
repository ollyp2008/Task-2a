// js/supabaseClient.js

const { createClient } = supabase;

const SUPABASE_URL = 'https://lbfrilgmcnlguresqjrh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZnJpbGdtY25sZ3VyZXNxanJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMTAyNzAsImV4cCI6MjA4OTc4NjI3MH0.2_rCrzwkY3XEPtl1fWxYAvTHWKZlW_BqII-sP77Hs9Y';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);