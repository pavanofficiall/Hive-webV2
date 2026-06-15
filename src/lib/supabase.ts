import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  cover_image: string | null
  content: string
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}
