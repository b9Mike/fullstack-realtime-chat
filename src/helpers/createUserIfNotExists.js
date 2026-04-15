import { supabase } from "../supabaseClient";

export const createUserIfNotExists = async (user) => {
  if (!user) return;

  const { error } = await supabase.from("users").upsert({
    id: user.id,
    name: user.user_metadata?.full_name,
    avatar_url: user.user_metadata?.avatar_url,
    email: user.email,
  });

  if (error) {
    console.error("Error upserting user:", error);
  }
};