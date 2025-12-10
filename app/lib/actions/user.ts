"use server";

import { CreateUserType } from "@/app/types/user";
import { supabase } from "../supabase";
import { findUserByEmail, insertUser } from "../server/user";

export async function createUser({
  firstName,
  lastName,
  email,
  password,
}: CreateUserType) {
  try {
    const data = await findUserByEmail(email);

    if (data) return console.error("user already exist", data);

    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      console.error("error creating user", signupError);
      return { success: false, error: signupError };
    }

    const insertError = await insertUser(firstName, lastName, email);

    if (insertError) {
      console.error("error inserting user", insertError);
      return { success: false, error: insertError };
    }

    console.log("user created success!");
    return { success: true, error: null };
  } catch (error) {
    console.error("something went wrong creating user", error);
  }
}
