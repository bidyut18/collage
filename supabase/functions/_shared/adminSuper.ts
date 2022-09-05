import { createClient } from "./deps.ts";

export const rootFilePath = Deno.env.get("ROOT_FOLDER") || "public";
const SUPER_URL = Deno.env.get("SUPABASE_URL") || "";
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

export const supabaseClient = createClient(SUPER_URL, SERVICE_KEY);
