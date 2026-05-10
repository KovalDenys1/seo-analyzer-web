import { createClient } from "@supabase/supabase-js";

export type Plan = "free" | "pro" | "business";

export interface User {
  id: string;
  email: string;
  name: string | null;
  plan: Plan;
  created_at: string;
}

export interface ApiKey {
  id: string;
  user_id: string;
  key_hash: string;
  key_prefix: string;
  name: string;
  created_at: string;
  last_used: string | null;
}

export interface UsageLog {
  id: number;
  user_id: string;
  key_id: string | null;
  endpoint: string;
  url: string | null;
  score: number | null;
  status: number;
  duration_ms: number | null;
  created_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
