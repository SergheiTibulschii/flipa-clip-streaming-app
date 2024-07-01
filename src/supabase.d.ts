export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      author_stats: {
        Row: {
          author_id: string
          likes_count: number | null
          views_count: number | null
        }
        Insert: {
          author_id: string
          likes_count?: number | null
          views_count?: number | null
        }
        Update: {
          author_id?: string
          likes_count?: number | null
          views_count?: number | null
        }
        Relationships: []
      }
      likes: {
        Row: {
          author_id: string | null
          created_at: string | null
          user_id: string
          video_id: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          user_id: string
          video_id: string
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "author_stats"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "likes_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "video_stats"
            referencedColumns: ["video_id"]
          },
        ]
      }
      video_stats: {
        Row: {
          author_id: string | null
          likes_count: number | null
          video_id: string
          views_count: number | null
        }
        Insert: {
          author_id?: string | null
          likes_count?: number | null
          video_id: string
          views_count?: number | null
        }
        Update: {
          author_id?: string | null
          likes_count?: number | null
          video_id?: string
          views_count?: number | null
        }
        Relationships: []
      }
      views: {
        Row: {
          author_id: string | null
          created_at: string | null
          user_id: string
          video_id: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          user_id: string
          video_id: string
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "views_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "author_stats"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "views_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "video_stats"
            referencedColumns: ["video_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_all_creator_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          creator_id: string
          views_count: number
        }[]
      }
      get_video_stats: {
        Args: {
          p_video_id: string
        }
        Returns: {
          video_id: string
          likes_count: number
          views_count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
