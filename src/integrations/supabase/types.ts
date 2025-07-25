export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      ad_analytics: {
        Row: {
          advertisement_id: string | null
          created_at: string | null
          event_type: string
          id: string
          ip_address: unknown | null
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          advertisement_id?: string | null
          created_at?: string | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          advertisement_id?: string | null
          created_at?: string | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_analytics_advertisement_id_fkey"
            columns: ["advertisement_id"]
            isOneToOne: false
            referencedRelation: "advertisements"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_subscriptions: {
        Row: {
          advertisement_id: string | null
          amount_thb: number
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_type: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          advertisement_id?: string | null
          amount_thb: number
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          advertisement_id?: string | null
          amount_thb?: number
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_subscriptions_advertisement_id_fkey"
            columns: ["advertisement_id"]
            isOneToOne: false
            referencedRelation: "advertisements"
            referencedColumns: ["id"]
          },
        ]
      }
      advertisements: {
        Row: {
          business_name: string
          clicks: number | null
          created_at: string | null
          description: string
          description_thai: string | null
          end_date: string | null
          id: string
          image_url: string | null
          link_url: string
          plan_type: string
          start_date: string | null
          status: string
          title: string
          title_thai: string | null
          updated_at: string | null
          user_id: string | null
          video_url: string | null
          views: number | null
        }
        Insert: {
          business_name: string
          clicks?: number | null
          created_at?: string | null
          description: string
          description_thai?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          link_url: string
          plan_type: string
          start_date?: string | null
          status?: string
          title: string
          title_thai?: string | null
          updated_at?: string | null
          user_id?: string | null
          video_url?: string | null
          views?: number | null
        }
        Update: {
          business_name?: string
          clicks?: number | null
          created_at?: string | null
          description?: string
          description_thai?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          link_url?: string
          plan_type?: string
          start_date?: string | null
          status?: string
          title?: string
          title_thai?: string | null
          updated_at?: string | null
          user_id?: string | null
          video_url?: string | null
          views?: number | null
        }
        Relationships: []
      }
      attractions: {
        Row: {
          category: Database["public"]["Enums"]["attraction_category"]
          contact_info: Json | null
          created_at: string | null
          description: string
          description_thai: string
          featured: boolean | null
          id: string
          images: string[] | null
          location: Json
          name: string
          name_thai: string
          opening_hours: Json | null
          price_range: string | null
          rating: number | null
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["attraction_category"]
          contact_info?: Json | null
          created_at?: string | null
          description: string
          description_thai: string
          featured?: boolean | null
          id?: string
          images?: string[] | null
          location: Json
          name: string
          name_thai: string
          opening_hours?: Json | null
          price_range?: string | null
          rating?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["attraction_category"]
          contact_info?: Json | null
          created_at?: string | null
          description?: string
          description_thai?: string
          featured?: boolean | null
          id?: string
          images?: string[] | null
          location?: Json
          name?: string
          name_thai?: string
          opening_hours?: Json | null
          price_range?: string | null
          rating?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_date: string
          contact_info: Json
          created_at: string | null
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_type"]
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          booking_date: string
          contact_info: Json
          created_at?: string | null
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_type"]
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          booking_date?: string
          contact_info?: Json
          created_at?: string | null
          entity_id?: string
          entity_type?: Database["public"]["Enums"]["entity_type"]
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          company: string
          company_thai: string | null
          contact_info: Json
          created_at: string | null
          description: string
          description_thai: string | null
          featured: boolean | null
          id: string
          job_type: Database["public"]["Enums"]["job_type"]
          location: Json
          requirements: string[] | null
          requirements_thai: string[] | null
          salary_range: string | null
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          title_thai: string | null
          updated_at: string | null
        }
        Insert: {
          company: string
          company_thai?: string | null
          contact_info: Json
          created_at?: string | null
          description: string
          description_thai?: string | null
          featured?: boolean | null
          id?: string
          job_type: Database["public"]["Enums"]["job_type"]
          location: Json
          requirements?: string[] | null
          requirements_thai?: string[] | null
          salary_range?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          title_thai?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string
          company_thai?: string | null
          contact_info?: Json
          created_at?: string | null
          description?: string
          description_thai?: string | null
          featured?: boolean | null
          id?: string
          job_type?: Database["public"]["Enums"]["job_type"]
          location?: Json
          requirements?: string[] | null
          requirements_thai?: string[] | null
          salary_range?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          title_thai?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      payment_logs: {
        Row: {
          amount: number | null
          created_at: string | null
          currency: string | null
          customer_email: string | null
          error: string | null
          id: number
          payment_intent_id: string | null
          status: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          customer_email?: string | null
          error?: string | null
          id?: never
          payment_intent_id?: string | null
          status?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          customer_email?: string | null
          error?: string | null
          id?: never
          payment_intent_id?: string | null
          status?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          contact_info: Json | null
          created_at: string | null
          cuisine_type: Database["public"]["Enums"]["cuisine_type"]
          description: string
          description_thai: string
          featured: boolean | null
          features: string[] | null
          id: string
          images: string[] | null
          location: Json
          name: string
          name_thai: string
          opening_hours: Json | null
          price_range: string
          rating: number | null
          updated_at: string | null
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string | null
          cuisine_type: Database["public"]["Enums"]["cuisine_type"]
          description: string
          description_thai: string
          featured?: boolean | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          location: Json
          name: string
          name_thai: string
          opening_hours?: Json | null
          price_range: string
          rating?: number | null
          updated_at?: string | null
        }
        Update: {
          contact_info?: Json | null
          created_at?: string | null
          cuisine_type?: Database["public"]["Enums"]["cuisine_type"]
          description?: string
          description_thai?: string
          featured?: boolean | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          location?: Json
          name?: string
          name_thai?: string
          opening_hours?: Json | null
          price_range?: string
          rating?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          comment_thai: string | null
          created_at: string | null
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_type"]
          id: string
          rating: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          comment_thai?: string | null
          created_at?: string | null
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_type"]
          id?: string
          rating: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          comment_thai?: string | null
          created_at?: string | null
          entity_id?: string
          entity_type?: Database["public"]["Enums"]["entity_type"]
          id?: string
          rating?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          contact_info: Json | null
          created_at: string | null
          description: string
          description_thai: string
          featured: boolean | null
          id: string
          images: string[] | null
          location: Json
          name: string
          name_thai: string
          price_range: string | null
          rating: number | null
          service_type: Database["public"]["Enums"]["service_type"]
          updated_at: string | null
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string | null
          description: string
          description_thai: string
          featured?: boolean | null
          id?: string
          images?: string[] | null
          location: Json
          name: string
          name_thai: string
          price_range?: string | null
          rating?: number | null
          service_type: Database["public"]["Enums"]["service_type"]
          updated_at?: string | null
        }
        Update: {
          contact_info?: Json | null
          created_at?: string | null
          description?: string
          description_thai?: string
          featured?: boolean | null
          id?: string
          images?: string[] | null
          location?: Json
          name?: string
          name_thai?: string
          price_range?: string | null
          rating?: number | null
          service_type?: Database["public"]["Enums"]["service_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      table_name: {
        Row: {
          data: Json | null
          id: number
          inserted_at: string
          name: string | null
          updated_at: string
        }
        Insert: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      expire_ads: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      attraction_category:
        | "temple"
        | "park"
        | "museum"
        | "historical"
        | "cultural"
        | "nature"
        | "shopping"
        | "entertainment"
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      cuisine_type:
        | "thai"
        | "northern_thai"
        | "international"
        | "street_food"
        | "cafe"
        | "bar"
        | "fast_food"
      entity_type: "attraction" | "restaurant" | "service"
      job_status: "active" | "filled" | "expired" | "draft"
      job_type:
        | "full_time"
        | "part_time"
        | "freelance"
        | "contract"
        | "internship"
      service_type:
        | "accommodation"
        | "transport"
        | "tour_guide"
        | "rental"
        | "spa"
        | "shopping"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      attraction_category: [
        "temple",
        "park",
        "museum",
        "historical",
        "cultural",
        "nature",
        "shopping",
        "entertainment",
      ],
      booking_status: ["pending", "confirmed", "cancelled", "completed"],
      cuisine_type: [
        "thai",
        "northern_thai",
        "international",
        "street_food",
        "cafe",
        "bar",
        "fast_food",
      ],
      entity_type: ["attraction", "restaurant", "service"],
      job_status: ["active", "filled", "expired", "draft"],
      job_type: [
        "full_time",
        "part_time",
        "freelance",
        "contract",
        "internship",
      ],
      service_type: [
        "accommodation",
        "transport",
        "tour_guide",
        "rental",
        "spa",
        "shopping",
        "other",
      ],
    },
  },
} as const
