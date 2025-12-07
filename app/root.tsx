import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { AlertCircleIcon } from "lucide-react";
import type { Route } from "./+types/root";
import "./app.css";
import Nav from "./components/nav";
import { Alert, AlertTitle } from "./components/ui/alert";
import { Spinner } from "./components/ui/spinner";
import { useOnlineStatus } from "./hooks/useOnlineStatus";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* manifest from pwa */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body className=" bg-background text-foreground font-sans h-screen overflow-hidden">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/** Shown while the UI is loading */
export function HydrateFallback() {
  return (
    <div className="h-screen flex items-center justify-center gap-4">
      <Spinner className="size-6" />
      <span className="text-xl">Loading</span>
    </div>
  );
}

export default function App() {
  const isOnline = useOnlineStatus();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/** Alert when offline */}
      {!isOnline && (
        <div className="py-1 px-4 sticky top-0 z-50">
          <Alert variant={"destructive"}>
            <AlertCircleIcon />
            <AlertTitle>
              You are currently offline. Some features may not work
            </AlertTitle>
          </Alert>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
