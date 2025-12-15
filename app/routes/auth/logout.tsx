import { redirect } from "react-router";
import { supabase } from "~/lib/supabase";

export async function clientAction() {
  await supabase.auth.signOut();

  return redirect("/login");
}
