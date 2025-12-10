"use server";

import { createServerSupabase } from "../supabase/server";

export async function getSession() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getSession();

  return data.session;
}
