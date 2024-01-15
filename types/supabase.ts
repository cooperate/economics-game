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
      business_types: {
        Row: {
          demand: number | null
          supply: number | null
          type: string
        }
        Insert: {
          demand?: number | null
          supply?: number | null
          type: string
        }
        Update: {
          demand?: number | null
          supply?: number | null
          type?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          balance: number | null
          company_id: string
          current_stock_price: number | null
          name: string
          total_nodes: number | null
          type: string
        }
        Insert: {
          balance?: number | null
          company_id?: string
          current_stock_price?: number | null
          name: string
          total_nodes?: number | null
          type: string
        }
        Update: {
          balance?: number | null
          company_id?: string
          current_stock_price?: number | null
          name?: string
          total_nodes?: number | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "companies_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "business_types"
            referencedColumns: ["type"]
          }
        ]
      }
      company_actions: {
        Row: {
          action_id: string
          action_type: string | null
          company_id: string | null
          effect: string | null
          round_id: string | null
        }
        Insert: {
          action_id?: string
          action_type?: string | null
          company_id?: string | null
          effect?: string | null
          round_id?: string | null
        }
        Update: {
          action_id?: string
          action_type?: string | null
          company_id?: string | null
          effect?: string | null
          round_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_actions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_actions_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "game_rounds"
            referencedColumns: ["round_id"]
          }
        ]
      }
      game_players: {
        Row: {
          game_id: string
          player_id: string
        }
        Insert: {
          game_id: string
          player_id: string
        }
        Update: {
          game_id?: string
          player_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_players_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["game_id"]
          },
          {
            foreignKeyName: "game_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["player_id"]
          }
        ]
      }
      game_rounds: {
        Row: {
          active: boolean | null
          current_phase: string | null
          round_id: string
          time_remaining: number | null
        }
        Insert: {
          active?: boolean | null
          current_phase?: string | null
          round_id?: string
          time_remaining?: number | null
        }
        Update: {
          active?: boolean | null
          current_phase?: string | null
          round_id?: string
          time_remaining?: number | null
        }
        Relationships: []
      }
      games: {
        Row: {
          current_round: number | null
          game_id: string
          max_players: number | null
          status: string | null
        }
        Insert: {
          current_round?: number | null
          game_id?: string
          max_players?: number | null
          status?: string | null
        }
        Update: {
          current_round?: number | null
          game_id?: string
          max_players?: number | null
          status?: string | null
        }
        Relationships: []
      }
      player_actions: {
        Row: {
          action_detail: Json | null
          action_id: string
          action_type: string
          game_id: string | null
          player_id: string | null
          round_id: string | null
          timestamp: string | null
        }
        Insert: {
          action_detail?: Json | null
          action_id?: string
          action_type: string
          game_id?: string | null
          player_id?: string | null
          round_id?: string | null
          timestamp?: string | null
        }
        Update: {
          action_detail?: Json | null
          action_id?: string
          action_type?: string
          game_id?: string | null
          player_id?: string | null
          round_id?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_actions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["game_id"]
          },
          {
            foreignKeyName: "player_actions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "player_actions_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "game_rounds"
            referencedColumns: ["round_id"]
          }
        ]
      }
      players: {
        Row: {
          balance: number | null
          display_name: string
          player_id: string
          user_id: string | null
        }
        Insert: {
          balance?: number | null
          display_name: string
          player_id?: string
          user_id?: string | null
        }
        Update: {
          balance?: number | null
          display_name?: string
          player_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "players_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      room_users: {
        Row: {
          room_id: string
          user_id: string
        }
        Insert: {
          room_id: string
          user_id: string
        }
        Update: {
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_users_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["room_id"]
          },
          {
            foreignKeyName: "room_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rooms: {
        Row: {
          game_id: string
          max_players: number
          room_code: string
          room_id: string
        }
        Insert: {
          game_id: string
          max_players: number
          room_code: string
          room_id?: string
        }
        Update: {
          game_id?: string
          max_players?: number
          room_code?: string
          room_id?: string
        }
        Relationships: []
      }
      stock_ownership: {
        Row: {
          location: string | null
          owner_id: string | null
          ownership_id: string
          quantity: number | null
          stock_id: string | null
        }
        Insert: {
          location?: string | null
          owner_id?: string | null
          ownership_id?: string
          quantity?: number | null
          stock_id?: string | null
        }
        Update: {
          location?: string | null
          owner_id?: string | null
          ownership_id?: string
          quantity?: number | null
          stock_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_ownership_stock_id_fkey"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["stock_id"]
          }
        ]
      }
      stocks: {
        Row: {
          company_id: string | null
          price: number | null
          stock_id: string
          total_shares: number | null
        }
        Insert: {
          company_id?: string | null
          price?: number | null
          stock_id?: string
          total_shares?: number | null
        }
        Update: {
          company_id?: string | null
          price?: number | null
          stock_id?: string
          total_shares?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stocks_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          }
        ]
      }
      transactions: {
        Row: {
          player_id: string | null
          price_at_transaction: number | null
          quantity: number | null
          stock_id: string | null
          timestamp: string | null
          transaction_id: string
          type: string
        }
        Insert: {
          player_id?: string | null
          price_at_transaction?: number | null
          quantity?: number | null
          stock_id?: string | null
          timestamp?: string | null
          transaction_id?: string
          type: string
        }
        Update: {
          player_id?: string | null
          price_at_transaction?: number | null
          quantity?: number | null
          stock_id?: string | null
          timestamp?: string | null
          transaction_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "transactions_stock_id_fkey"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["stock_id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
