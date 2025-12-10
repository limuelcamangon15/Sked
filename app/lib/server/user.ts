"use server";

import { supabase } from "../supabase";

export async function findUserByEmail(email: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("something went wrong", error);
  }
}

export async function insertUser(
  firstName: string,
  lastName: string,
  email: string
) {
  try {
    const user = { firstName, lastName, email };

    const { error } = await supabase.from("users").insert(user);

    if (error) {
      console.error("failed inserting user", error);
      return error;
    }

    return null;
  } catch (error) {
    console.error("something went wrong", error);
  }
}
