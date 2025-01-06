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
      airdrops: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          status: 'pending' | 'completed' | 'missed'
          deadline: string | null
          url: string
          requirements: Json | null
          reward_amount: number | null
          reward_token: string | null
          user_id: string
          completed_at: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          status?: 'pending' | 'completed' | 'missed'
          deadline?: string | null
          url: string
          requirements?: Json | null
          reward_amount?: number | null
          reward_token?: string | null
          user_id: string
          completed_at?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          status?: 'pending' | 'completed' | 'missed'
          deadline?: string | null
          url?: string
          requirements?: Json | null
          reward_amount?: number | null
          reward_token?: string | null
          user_id?: string
          completed_at?: string | null
          notes?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          username: string | null
          email: string | null
          wallet_address: string | null
          settings: Json | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username?: string | null
          email?: string | null
          wallet_address?: string | null
          settings?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string | null
          email?: string | null
          wallet_address?: string | null
          settings?: Json | null
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
