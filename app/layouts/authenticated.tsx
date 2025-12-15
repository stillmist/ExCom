import { Outlet, redirect } from "react-router";

import Nav from "~/components/nav";
import { supabase } from "~/lib/supabase";
import type { Route } from "../+types/root";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // User not logged in, redirect to login page
  if (!session?.user) {
    const searchParams = new URL(request.url).searchParams;
    return redirect(`/login?${searchParams.toString()}&redirected=1`);
  }
}

/**
 * Layout for pages that need the user to be authenticated.
 */
export default function Authenticated() {
  return (
    <>
      <Nav />

      <Outlet />
    </>
  );
}
