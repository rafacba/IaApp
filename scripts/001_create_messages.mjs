import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Use the REST API to execute SQL via the rpc endpoint
const { error: createError } = await supabase.rpc("exec_sql", {
  query: "SELECT 1",
}).catch(() => ({ error: null }));

// Create table using raw SQL via the Supabase management API
const sql = `
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'success',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'messages' AND policyname = 'Allow public read access'
  ) THEN
    CREATE POLICY "Allow public read access" ON public.messages FOR SELECT USING (true);
  END IF;
END
$$;
`;

// Execute via postgres connection
const response = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "apikey": supabaseKey,
    "Authorization": `Bearer ${supabaseKey}`,
  },
});

// Since we can't execute raw SQL easily via REST, let's just try to insert into the table
// First, let's check if the table exists by trying to select from it
const { data: existing, error: selectError } = await supabase
  .from("messages")
  .select("*")
  .limit(1);

if (selectError) {
  console.log("Table does not exist yet. Please run the following SQL in your Supabase SQL Editor:");
  console.log(sql);
  console.log("\nThen run this script again to seed data.");
  process.exit(1);
}

console.log("Table 'messages' exists. Checking for seed data...");

if (existing && existing.length > 0) {
  console.log("Seed data already exists:", existing);
} else {
  const { data, error: insertError } = await supabase
    .from("messages")
    .insert({
      message: "Hello from Supabase! The backend has been migrated successfully.",
      status: "success",
    })
    .select();

  if (insertError) {
    console.error("Failed to insert seed data:", insertError);
    process.exit(1);
  }

  console.log("Seed data inserted:", data);
}

console.log("Migration complete!");
