import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "types/supabase";

export const supabaseBrowserClient = (): SupabaseClient<Database> => {
 return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}