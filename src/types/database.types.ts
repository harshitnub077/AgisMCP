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
                    username: string | null
                    full_name: string | null
                    updated_at: string | null
                }
                Insert: {
                    id: string
                    username?: string | null
                    full_name?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    username?: string | null
                    full_name?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            mcp_servers: {
                Row: {
                    id: string
                    user_id: string
                    name: string
                    endpoint_url: string
                    access_token: string | null
                    protocol_type: string
                    status: string
                    last_ping_at: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    name: string
                    endpoint_url: string
                    access_token?: string | null
                    protocol_type?: string
                    status?: string
                    last_ping_at?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    name?: string
                    endpoint_url?: string
                    access_token?: string | null
                    protocol_type?: string
                    status?: string
                    last_ping_at?: string | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "mcp_servers_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            validation_logs: {
                Row: {
                    id: string
                    server_id: string
                    trace_output: Json | null
                    pass_fail_status: boolean | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    server_id: string
                    trace_output?: Json | null
                    pass_fail_status?: boolean | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    server_id?: string
                    trace_output?: Json | null
                    pass_fail_status?: boolean | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "validation_logs_server_id_fkey"
                        columns: ["server_id"]
                        referencedRelation: "mcp_servers"
                        referencedColumns: ["id"]
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
