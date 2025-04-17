export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'admin' | 'customer' | 'staff'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string | null
          name: string | null
          avatar_url: string | null
          role: UserRole
        }
        Insert: {
          id: string
          created_at?: string
          email?: string | null
          name?: string | null
          avatar_url?: string | null
          role?: UserRole
        }
        Update: {
          id?: string
          created_at?: string
          email?: string | null
          name?: string | null
          avatar_url?: string | null
          role?: UserRole
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
      user_role: UserRole
    }
  }
}