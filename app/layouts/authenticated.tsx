import { Outlet } from "react-router";

import Nav from "~/components/nav";

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
