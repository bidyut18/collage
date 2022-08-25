import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.6";

const SUPER_URL = Deno.env.get("SUPER_URL") || "";

const SERVICE_KEY = Deno.env.get("SERVICE_KEY") || "";

export const supabaseClient = createClient(SUPER_URL, SERVICE_KEY);
