import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://oghpioezrsfirzdsawft.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9naHBpb2V6cnNmaXJ6ZHNhd2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjg4MDEsImV4cCI6MjA1MjkwNDgwMX0.eckwvvHs5RRNlG0TDwDo9gjeb_4wD2fO1np4NTnaMmA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})