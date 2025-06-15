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
      diary_records: {
        Row: {
          day: string
          id: string
          user_id: string | null
        }
        Insert: {
          day: string
          id?: string
          user_id?: string | null
        }
        Update: {
          day?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      food: {
        Row: {
          carbs_g_per_100: number
          category_id: string | null
          created_by: string | null
          fat_g_per_100: number
          id: string
          kcal_per_100: number
          name: string
          protein_g_per_100: number
        }
        Insert: {
          carbs_g_per_100: number
          category_id?: string | null
          created_by?: string | null
          fat_g_per_100: number
          id?: string
          kcal_per_100: number
          name: string
          protein_g_per_100: number
        }
        Update: {
          carbs_g_per_100?: number
          category_id?: string | null
          created_by?: string | null
          fat_g_per_100?: number
          id?: string
          kcal_per_100?: number
          name?: string
          protein_g_per_100?: number
        }
        Relationships: []
      }
      meal_entries: {
        Row: {
          diary_record_id: string | null
          entry_type: Database["public"]["Enums"]["entry_type"]
          food_id: string | null
          id: string
          quantity_g: number | null
          recipe_id: string | null
          slot: Database["public"]["Enums"]["meal_slot"]
        }
        Insert: {
          diary_record_id?: string | null
          entry_type: Database["public"]["Enums"]["entry_type"]
          food_id?: string | null
          id?: string
          quantity_g?: number | null
          recipe_id?: string | null
          slot: Database["public"]["Enums"]["meal_slot"]
        }
        Update: {
          diary_record_id?: string | null
          entry_type?: Database["public"]["Enums"]["entry_type"]
          food_id?: string | null
          id?: string
          quantity_g?: number | null
          recipe_id?: string | null
          slot?: Database["public"]["Enums"]["meal_slot"]
        }
        Relationships: [
          {
            foreignKeyName: "meal_entries_diary_record_id_fkey"
            columns: ["diary_record_id"]
            isOneToOne: false
            referencedRelation: "diary_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_entries_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "food"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_entries_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      recipe: {
        Row: {
          description: string | null
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      recipe_components: {
        Row: {
          food_id: string
          quantity_g: number
          recipe_id: string
        }
        Insert: {
          food_id: string
          quantity_g: number
          recipe_id: string
        }
        Update: {
          food_id?: string
          quantity_g?: number
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_components_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "food"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_components_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      entry_type: "food" | "recipe"
      meal_slot:
        | "breakfast"
        | "morning_snack"
        | "lunch"
        | "afternoon_snack"
        | "dinner"
        | "night_snack"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      entry_type: ["food", "recipe"],
      meal_slot: [
        "breakfast",
        "morning_snack",
        "lunch",
        "afternoon_snack",
        "dinner",
        "night_snack",
      ],
    },
  },
} as const
