export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          company_name: string | null
          contact_email: string | null
          plan_tier: string
          created_at: string
        }
        Insert: {
          id: string
          company_name?: string | null
          contact_email?: string | null
          plan_tier?: string
          created_at?: string
        }
        Update: {
          id?: string
          company_name?: string | null
          contact_email?: string | null
          plan_tier?: string
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          slug: string
          title: string
          content: string | null
          excerpt: string | null
          category: string | null
          tags: string[] | null
          published: boolean
          published_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          content?: string | null
          excerpt?: string | null
          category?: string | null
          tags?: string[] | null
          published?: boolean
          published_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          content?: string | null
          excerpt?: string | null
          category?: string | null
          tags?: string[] | null
          published?: boolean
          published_at?: string | null
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          client_id: string | null
          scheduled_at: string | null
          status: string
          notes: string | null
        }
        Insert: {
          id?: string
          client_id?: string | null
          scheduled_at?: string | null
          status?: string
          notes?: string | null
        }
        Update: {
          id?: string
          client_id?: string | null
          scheduled_at?: string | null
          status?: string
          notes?: string | null
        }
      }
      ai_interactions: {
        Row: {
          id: string
          session_id: string | null
          prompt_hash: string | null
          response_length: number | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id?: string | null
          prompt_hash?: string | null
          response_length?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string | null
          prompt_hash?: string | null
          response_length?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
